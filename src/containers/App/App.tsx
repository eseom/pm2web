import * as React from 'react'
import { connect } from 'react-redux'
import { asyncConnect } from 'redux-connect';
import { Link } from 'react-router'

import {isLoaded as isInfoLoaded, load as loadInfo} from '../../redux/modules/info'

interface IProps {
  dispatch: Function,
  info: Object,
}

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = []
    if (!isInfoLoaded(getState())) {
      promises.push(dispatch(loadInfo()))
    }
    return Promise.all(promises)
  },
}])
@connect(
  (store) => ({ info: store.info }),
  (dispatch) => ({ dispatch }),
)
export class App extends React.Component<IProps, {}> {

  private props

  render() {
    return (
      <div>
        <header>
          <h2>pm2web {this.props.info.loaded}</h2>
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
