import * as React from 'react'
import { connect } from 'react-redux'

// redux
import { load as loadInfo } from '../../redux/modules/info'

@connect(store => ({
  info: store.info.stuff,
}), dispatch => ({
    dispatch,
  }),
)
export class App extends React.Component {
  private props: {
    dispatch: Function,
    info: Object,
  }

  private getInfo = () => {
    this.props.dispatch(loadInfo())
  }

  protected componentDidMount() {
    this.props.dispatch(loadInfo())
  }

  public render() {
    return (
      <div>
        <span>simple component. fetched data from store: {this.props.info}</span>
        <hr />
        <button onClick={this.getInfo}>fetch data</button>
      </div>
    )
  }
}