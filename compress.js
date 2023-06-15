'use strict'

import _compress from './build/compress_binding.js'

// const runtimeInit = new Promise((resolve) => {
//     onRuntimeInitialized = resolve;
// });

export async function compress (buffer) {
  const func = await _compress()
  const result = await func.compress(buffer)
  if (result === false) throw new Error('ConvertTTFToWOFF2 failed')
  return result
}
