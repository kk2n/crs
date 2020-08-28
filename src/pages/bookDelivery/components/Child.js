import React, { Component } from 'react'

class Child extends Component {
  async componentDidMount() {
    this.props.onFn && this.props.onFn(this)
  }
  myName = () => {
    console.log('2', 2)
  }
  render() {
    console.log('1', 1)
    return <div>sdfgs</div>
  }
}

export default Child
