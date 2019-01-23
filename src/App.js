import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'
import { CustomInput } from 'reactstrap'

const bell = new Audio('./MM_ClockTower_Bell.wav')

class App extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      cycleStats: {},
      timeLeft: 0,
      dayOrNight: '',
      soundEnabled: true,
      bounties: []
    })
    this.timeInterval = null
    this.updateCetusCycle()
  }

  render() {
    return (
      this.cycleStats && (
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
      )
    )
  }

  updateCetusCycle() {
    fetch('https://api.warframestat.us/pc')
      .then(res => res.json())
      .then(res => {
        const cycleStats = res.cetusCycle
        this.cycleStats = cycleStats
        if (
          cycleStats &&
          cycleStats.isDay === false &&
          this.dayOrNight === 'day' &&
          this.soundEnabled
        )
          bell.play()
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
          let bounties = res.syndicateMissions.find(
            missions => missions.syndicate === 'Ostrons'
          )
          this.bounties = bounties
          console.log(this.bounties)
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
