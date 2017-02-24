import { resolve } from 'dns';
import * as webpack from 'webpack'
import * as Path from 'path'
import * as CleanPlugin from 'clean-webpack-plugin'
import { TsConfigPathsPlugin } from 'awesome-typescript-loader'

import { isomorphicConfig } from './isomorphic-tools'
import * as WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

import { webpackBaseConfig } from './base'

const webpackIsomorphicToolsPlugin = new WebpackIsomorphicToolsPlugin(isomorphicConfig)
const projectRootPath = Path.resolve(__dirname, '../');
const assetsPath = Path.resolve(projectRootPath, './static/dist');

export default { // export default, because webpack expects json format
  ...webpackBaseConfig,
  entry: {
    main: [
      './src/client.tsx',
    ],
  },
  output: {
    filename: 'static/dist/[name]-[hash].js',
  },
  plugins: [
    new CleanPlugin([assetsPath], { root: projectRootPath }),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
    new TsConfigPathsPlugin(/* { tsconfig, compiler } */),
    webpackIsomorphicToolsPlugin,
    new webpack.DefinePlugin({
      'process.env': {
        EXEC_ENV: JSON.stringify('client'),
        NODE_ENV: JSON.stringify('production'),
      },
    }),
  ],
}