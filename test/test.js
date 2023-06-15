'use strict'

import { deepEqual } from 'assert'
import { readFileSync as read } from 'fs'
import { join, dirname } from 'path'

import { compress, decompress } from '../index.js'

import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
describe('chain', function () {
  const sample = Uint8Array.from(
    read(join(__dirname, './fixtures/sample.ttf'))
  )
  const sample_compressed = Uint8Array.from(
    read(join(__dirname, './fixtures/sample_compressed.woff2'))
  )
  const sample_decompressed = Uint8Array.from(
    read(join(__dirname, './fixtures/sample_decompressed.ttf'))
  )

  it('compress', async function () {
    this.timeout(3000)

    const out = await compress(sample)
    deepEqual(out, sample_compressed)
  })

  it('decompress', async function () {
    const out = await decompress(sample_compressed)
    deepEqual(out, sample_decompressed)
  })
})
