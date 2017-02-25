import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

interface IProps {
  dispatch: Function,
  info: Object,
}

@connect(
  (store) => ({ info: store.info.stuff }),
  (dispatch) => ({ dispatch }),
)
export class App extends React.Component<IProps, {}> {

  private props

  render() {
    return (
      <div>
        <header>
          <h2>pm2web</h2>
        </header>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </nav>
        {this.props.children}
      </div>
    )
  }
}
