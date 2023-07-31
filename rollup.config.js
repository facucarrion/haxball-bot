import { nodeResolve } from '@rollup/plugin-node-resolve'
import nodePollyfills from 'rollup-plugin-polyfill-node'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'

export default {
  input: 'src/main.js',
  plugins: [
    babel({
      babelHelpers: 'bundled',
      minified: true,
      compact: false,
      comments: false,
      sourceMaps: true,
      presets: [
        '@babel/preset-env'
      ]
    }),
    commonjs({
      include: 'node_modules/**',
      ignoreGlobal: true,
      sourceMap: false
    }),
    nodePollyfills(),
    nodeResolve({
      browser: true
    })
  ],
  output: {
    file: 'dist/main.js',
    format: 'iife',
    globals: {
      mysql: 'mysql2'
    }
  }
}
