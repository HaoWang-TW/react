import React, { Component } from 'react'
import { connect } from 'react-redux'

@connect(
    (state, props) => ({
      config: state.config,
    })
)
export default class welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: {},
    }
  }

  render() {
    return (
      <div className="welcome">
        <div className="content">
          <h2 className="title">肚皮叔：行，我等你</h2>
        </div>
      </div>
    )
  }
}
