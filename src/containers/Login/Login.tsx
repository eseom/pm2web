import * as React from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

@connect(
  (store) => ({}),
  (dispatch) => ({ dispatch }),
)
export class Login extends React.Component {

  private props

  gotoHome() {
    this.props.dispatch(push('/'))
  }

  render() {
    return (
      <div>
        <h3>Login page</h3>
        <div>
          <button onClick={this.gotoHome.bind(this)}>go to home</button>
        </div>
      </div>
    )
  }
}
