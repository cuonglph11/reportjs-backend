const path = require('path')
const webpackMerge = require('webpack-merge').merge
const webpackExternalsPlugin = require('webpack-node-externals')
const WebpackShellPluginNext = require('webpack-shell-plugin-next')
const webpackTSConfigPlugin = require('tsconfig-paths-webpack-plugin')

const packages = require('./package.json')
const tsconfig = require('./tsconfig.json')

const nodeVersion = packages.engines.node
const nodeTarget = tsconfig.compilerOptions.target
const rootDir = path.resolve(__dirname)

/**
 *
 * @param {*} _
 * @param {import('webpack').WebpackOptionsNormalized} options
 * @returns
 */
module.exports = (_, options) => {
  switch (options.mode) {
    case 'development':
      return webpackMerge(baseConfigs(), devConfigs())
    case 'production':
      return webpackMerge(baseConfigs(), prodConfigs())
    default:
      throw new Error('No matching configuration was found!')
  }
}

function baseConfigs() {
  /** @type {import('webpack').Configuration} */
  const configs = {
    context: path.resolve(rootDir),
    entry: './src/index.ts',
    output: {
      path: path.resolve(rootDir, 'dist'),
      filename: 'index.js',
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'esbuild-loader',
          exclude: /node_modules/,
          options: {
            loader: 'ts',
            target: nodeTarget
          }
        }
      ]
    },
    target: `node${nodeVersion}`,
    resolve: {
      extensions: ['.ts'],
      plugins: [new webpackTSConfigPlugin()]
    },
    externalsPresets: {
      node: true
    },
    externals: [webpackExternalsPlugin()]
  }
  return configs
}

function devConfigs() {
  const { path, filename } = baseConfigs().output
  /** @type {import('webpack').Configuration} */
  const configs = {
    stats: false,
    mode: 'development',
    devtool: 'eval-source-map',
    watch: true,
    watchOptions: {
      // Stop watching when stdin stream has ended.
      stdin: true
    },
    plugins: [
      new WebpackShellPluginNext({
        onBuildStart: {
          scripts: [
            'echo ============================================================'
          ],
          blocking: true,
          parallel: false
        },
        onBuildEnd: {
          scripts: [
            'echo ============================================================',
            `nodemon -r dotenv/config --inspect ${path}/${filename}`
          ],
          blocking: false,
          parallel: true
        }
      })
    ]
  }
  return configs
}

function prodConfigs() {
  /** @type {import('webpack').Configuration} */
  const configs = {
    mode: 'production'
  }
  return configs
}
