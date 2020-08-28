import ErrorCatch from '../Layout/ErrorBoundary'
import React, { Component } from 'react'

function errorCatch(Target) {
  class Wrap extends Component {
    render() {
      return (
        <ErrorCatch>
          <Target {...this.props} />
        </ErrorCatch>
      )
    }
  }
  return Wrap
}

export default errorCatch
