import React, { Component } from 'react'
import './App.css'
import { extendObservable } from 'mobx'
import { observer } from 'mobx-react'

class App extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      cycleStats: {},
      timeLeft: 0
    })
    this.timeInterval = null
    this.updateCetusCycle()
  }

  render() {
    return (
      this.cycleStats && (
        <div className="cycle-stats">
          {/* {JSON.stringify(this.cycleStats)} */}
          <p>Currently it is: {this.cycleStats.isDay ? 'day' : 'night'}</p>
          <p>Time left: {msToTime(this.timeLeft)}</p>
        </div>
      )
    )
  }

  updateCetusCycle() {
    fetch('https://api.warframestat.us/pc/cetusCycle')
      .then(res => res.json())
      .then(data => {
        this.cycleStats = data
        console.log(this.cycleStats)
        if (this.timeInterval) clearInterval(this.timeInterval)
        this.timeInterval = setInterval(() => {
          this.updateTimeLeft()
          if (this.timeLeft < 0) this.updateCetusCycle()
        }, 1000)
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
  return hrs + ':' + mins + ':' + secs
}

export default observer(App)
