import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { extendObservable, toJS } from 'mobx'
import { observer } from 'mobx-react'
import { CustomInput, Container, Row, Col } from 'reactstrap'
import styled from 'styled-components'

const bell = new Audio('./MM_ClockTower_Bell.wav')

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 0.9rem;
  color: #bbbbbb;
`

class App extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      cycleStats: {},
      timeLeft: 0,
      dayOrNight: '',
      soundEnabled: true,
      bounties: [],
      bellPlayed: false,
      solarisBounties: []
    })
    this.timeInterval = null
    this.updateCetusCycle()
    setInterval(() => {
      if (this.bounties.length === 0) {
        this.updateCetusCycle()
      }
    }, 60000);
  }

  render() {
    return (
      this.cycleStats && (
        <div>
          <div className="cycle-stats">
            {/* {JSON.stringify(this.cycleStats)} */}
            <p>Currently it is: {this.dayOrNight}</p>
            <p>
              Time left:{' '}
              {this.timeLeft !== 0
                ? msToTime(this.timeLeft)
                : 'awaiting update...'}
            </p>
            <CustomInput
              type="switch"
              id="soundToggle"
              name="soundToggle"
              label="Enable sound on nightfall"
              defaultChecked
              onChange={e => {
                this.soundEnabled = e.currentTarget.checked
              }}
            />
          </div>
          <div>
            <Container className="text-center">
              <h4 className="mt-5 mb-2">
                Cetus Bounties
              </h4>
              <Row className="mt-4">
                {this.bounties &&
                  Array.isArray(this.bounties.jobs) &&
                  this.bounties.jobs.map((bounty, index) => (
                    <Col key={index}>
                      <h5>{bounty.type}</h5>
                      {Array.isArray(bounty.rewardPool) && <UnstyledList>
                        {bounty.rewardPool.map((reward, index) => <li key={index}>{reward}</li>)}
                      </UnstyledList>}
                    </Col>
                  ))}
              </Row>
            </Container>
            <Container className="text-center">
              <h4 className="mt-5 mb-2">
                Fortuna Bounties
              </h4>
              <Row className="mt-4">
                {this.solarisBounties &&
                  Array.isArray(this.solarisBounties.jobs) &&
                  this.solarisBounties.jobs.map((bounty, index) => (
                    <Col key={index}>
                      <h5>{bounty.type}</h5>
                      {Array.isArray(bounty.rewardPool) && <UnstyledList>
                        {bounty.rewardPool.map((reward, index) => <li key={index}>{reward}</li>)}
                      </UnstyledList>}
                    </Col>
                  ))}
              </Row>
            </Container>
          </div>
        </div>
      )
    )
  }

  updateCetusCycle() {
    fetch('https://api.warframestat.us/pc')
      .then(res => res.json())
      .then(res => {
        const cycleStats = res.cetusCycle
        this.cycleStats = cycleStats
        this.bellPlayed = false
        if (this.cycleStats)
          this.dayOrNight = this.cycleStats.isDay ? 'day' : 'night'
        console.log(this.cycleStats, new Date())
        this.updateTimeLeft()
        if (this.timeInterval) clearInterval(this.timeInterval)
        if (this.timeLeft < 0) {
          clearInterval(this.timeInterval)
          this.timeLeft = 0
          this.timeInterval = setInterval(() => {
            this.updateCetusCycle()
          }, 20000)
        } else {
          this.timeInterval = setInterval(() => {
            this.updateTimeLeft()
            if (this.timeLeft < 0) {
              clearInterval(this.timeInterval)
              this.updateCetusCycle()
            }
          }, 250)
        }
        try {
          const bounties = res.syndicateMissions.find(
            missions => missions.syndicate === 'Ostrons'
          )
          this.bounties = bounties
          console.log(res.syndicateMissions)
          const solarisBounties = res.syndicateMissions.find(
            missions => missions.syndicate === 'Solaris United'
          )
          this.solarisBounties = solarisBounties
        } catch (error) {
          console.warn('Bounties not found')
        }
      })
      .catch(() => {
        setTimeout(() => {
          this.updateCetusCycle()
        }, 30000)
      })
  }

  updateTimeLeft() {
    this.timeLeft = new Date(this.cycleStats.expiry).getTime() - Date.now()
    if (
      this.cycleStats &&
      this.dayOrNight === 'day' &&
      this.soundEnabled &&
      this.timeLeft < 5000 &&
      this.timeLeft > 0 &&
      !this.bellPlayed
    ) {
      bell.play()
      this.bellPlayed = true
    }
  }
}

function msToTime(s) {
  let ms = s % 1000
  s = (s - ms) / 1000
  let secs = s % 60
  s = (s - secs) / 60
  let mins = s % 60
  let hrs = (s - mins) / 60
  return (
    hrs +
    ':' +
    (mins < 10 ? '0' + mins : mins) +
    ':' +
    (secs < 10 ? '0' + secs : secs)
  )
}

export default observer(App)
