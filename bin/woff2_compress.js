#! /usr/bin/env node

/* eslint-disable no-console */

'use strict'

import { readFileSync, writeFileSync } from 'fs'
import { ArgumentParser } from 'argparse'

import compress from '../compress.js'
import { swap_ext } from './utils.js'

const parser = new ArgumentParser({
  prog: 'woff2_compress.js',
  add_help: true
})

parser.add_argument('-v', '--version', {
  action: 'version',
  version: require('../package.json').version
})

parser.add_argument('infile', {
  nargs: 1,
  help: 'Input .ttf file'
})

parser.add_argument('outfile', {
  nargs: '?',
  help: 'Output .woff2 file (- for stdout)'
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

compress(input).then(
  (woff2) => {
    if (outfile === '-') {
      // convert UInt8Array into a disk writeable buffer
      process.stdout.write(Buffer.from(woff2))
    } else {
      if (!outfile) {
        outfile = swap_ext(infile, '.ttf', '.woff2')
      }

      writeFileSync(outfile, woff2)
    }
  },
  (error) => {
    console.log(error)
  }
)
