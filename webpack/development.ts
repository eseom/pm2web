import { resolve } from 'dns';
import * as webpack from 'webpack'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'

import { isomorphicConfig } from './isomorphic-tools'
import * as WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

import { webpackBaseConfig } from './base'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig)
const host = 'localhost'
const port = 3001

export const webpackConfig = {
  ...webpackBaseConfig,
  devtool: 'inline-source-map',
  entry: {
    main: [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=http://${host}:${port}/__webpack_hmr`,
      'webpack/hot/only-dev-server',
      './src/client.tsx',
    ],
  },
  output: {
    publicPath: `http://${host}:${port}/dist/`,
    filename: '[name]-[hash].js',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
    webpackIsomorphicToolsPlugin.development(),
    new webpack.DefinePlugin({
      'process.env': {
        EXEC_ENV: JSON.stringify('client'),
        NODE_ENV: JSON.stringify('development'),
      },
    }),
  ],
}
