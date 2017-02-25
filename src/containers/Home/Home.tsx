import * as React from 'react'
import { connect } from 'react-redux'

import { load as loadInfo } from '../../redux/modules/info'

@connect(
  (store) => ({ info: store.info.stuff }),
  (dispatch) => ({ dispatch }),
)
export class Home extends React.Component {
  private props
  render() {
    return (
      <div>
        <span>simple component. fetched data from store: {this.props.info}</span>
        <hr />
        <button onClick={this.getInfo}>fetch data</button>
      </div>
    )
  }

  componentDidMount() {
    this.props.dispatch(loadInfo())
  }

  getInfo = () => {
    this.props.dispatch(loadInfo())
  }
}
