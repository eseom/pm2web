// react
import * as React from 'react'
import * as ReactDOM from 'react-dom/server'

// hapi
import * as Hapi from 'hapi'
import * as Inert from 'inert'

// webpack
import * as WebpackIsomorphicTools from 'webpack-isomorphic-tools'
import { isomorphicConfig } from '../webpack/isomorphic-tools'

// App
import { Html } from './containers/App/Html'
import { App } from './containers/App/App'


const webpackIsomorphicTools = new WebpackIsomorphicTools(isomorphicConfig)

webpackIsomorphicTools.server(`${__dirname}/..`, () => {
  const reducers = (state, action) => {
    switch (action.type) {
      default:
        return state
    }
  }

  const defaultAction = {
    type: 'test',
  }

  const preRenderedDOM = `<!doctype html>${ReactDOM.renderToString(<Html assets={webpackIsomorphicTools.assets()} component={<App />} />)}`

  const server = new Hapi.Server()
  const host = 'localhost'
  const port = 3000

  server.connection({
    host,
    port,
  })

  server.register([
    Inert,
  ])

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
    }
  })

  server.start()
  console.log(`✅  server has started at ${host}:${port}.`)
});