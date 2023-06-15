#! /usr/bin/env node

/* eslint-disable no-console */

'use strict'

import { readFileSync, writeFileSync } from 'fs'
import { ArgumentParser } from 'argparse'

import decompress from '../decompress.js'
import { swap_ext } from './utils.js'

const parser = new ArgumentParser({
  prog: 'woff2_decompress.js',
  add_help: true
})

parser.add_argument('-v', '--version', {
  action: 'version',
  version: require('../package.json').version
})

parser.add_argument('infile', {
  nargs: 1,
  help: 'Input .woff2 file'
})

parser.add_argument('outfile', {
  nargs: '?',
  help: 'Output .ttf file (- for stdout)'
})

const args = parser.parse_args()
const infile = args.infile[0]
let outfile = args.outfile
let input

try {
  input = readFileSync(infile)
} catch (e) {
  console.error(`Can't open input file (${infile})`)
  process.exit(1)
}

decompress(input).then(
  (ttf) => {
    if (outfile === '-') {
      // convert UInt8Array into a disk writeable buffer
      process.stdout.write(Buffer.from(ttf))
    } else {
      if (!outfile) {
        outfile = swap_ext(infile, '.woff2', '.ttf')
      }

      writeFileSync(outfile, ttf)
    }
  },
  (error) => {
    console.log(error)
  }
)
