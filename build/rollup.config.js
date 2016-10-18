/**
 * Created by Layman <anysome@gmail.com> (http://github.com/anysome) on 16/10/18.
 */

import babel from 'rollup-plugin-babel';
import async from 'rollup-plugin-async';

const version = process.env.VERSION || require('../package.json').version;

module.exports = {
  entry: 'es6/index.js',
  dest: 'index.js',
  format: 'umd',
  moduleName: 'airloy-web',
  plugins: [babel(), async()],
  banner:
    `/**
 * Airloy Web v${version}
 * (c) ${new Date().getFullYear()} Layman
 * @license MIT
 */`
};
