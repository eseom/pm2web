import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
// import * as serialize from 'serialize-javascript'

export class Html extends React.Component {

  private props: {
    assets: {
      javascript: {
        main: string,
      },
    },
    component: Object,
  }

  public render() {
    const { assets, component } = this.props
    const content = ReactDOM.renderToString(component)

    return (
      <html>
        <head>
          <link rel="icon" href="favicon.ico?v3" type="image/x-icon" />
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{ __html: content }} />

          {/*<script dangerouslySetInnerHTML={{ __html: `window.processedStore=${serialize(store.getState())};` }} charSet="UTF-8" />*/}
          <script src={assets.javascript.main} charSet="UTF-7" />
        </body>

      </html>
    )
  }
}
