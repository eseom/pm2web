// react
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'

// webpack
import * as WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import { isomorphicConfig } from '../webpack/isomorphic-tools'

// App
import { Html } from './containers/App/Html'
import { App } from './containers/App/App'

import { createStore } from './redux/createStore'
import { getServer } from './server/core'

const webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)

webpackIsomorphicTools.server(`${__dirname}/..`, async () => {

  const server = await getServer()
  const store = createStore()
  const rootComponent = (
    <Provider store={store}>
      <App />
    </Provider>
  )

  const preRenderedDOM = `<!doctype html>${ReactDOM.renderToString(
    <Html assets={webpackIsomorphicTools.assets()} component={rootComponent} />)}`

  server.route({
    path: '/static/{p*}',
    method: 'get',
    handler: (request, reply) => {
      reply.file(`${__dirname}/../static/${request.params['p']}`)
    },
  })

  server.route({
    path: '/{p*}',
    method: 'get',
    handler: (request, reply) => {
      if (process.env.NODE_ENV !== 'production') {
        // Do not cache webpack stats: the script file would change since
        // hot module replacement is enabled in the development env
        webpackIsomorphicTools.refresh();
      }

      reply(preRenderedDOM)
    },
  })

  server.start()

  console.log(`✅  server has started at ${server.info.uri}.`)
});