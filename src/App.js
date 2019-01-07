import React, { Component } from 'react'
import './App.css'
import { observable, extendObservable } from 'mobx'
import { observer } from 'mobx-react'

class App extends Component {
  constructor(props) {
    super(props)
    extendObservable(this, {
      cycleStats: {}
    })
    this.updateCetusCycle()
  }

  render() {
    return this.cycleStats && <div>{JSON.stringify(this.cycleStats)}</div>
  }

  updateCetusCycle() {
    fetch('https://api.warframestat.us/pc/cetusCycle')
      .then(res => res.json())
      .then(data => {
        this.cycleStats = data
        console.log(this.cycleStats)
      })
  }
}

export default observer(App)
