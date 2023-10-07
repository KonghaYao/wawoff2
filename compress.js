import _compress from "./build/compress_binding.js";
let exports;
export async function compress(buffer) {
  if (!exports) exports = await _compress();
  const result = await exports.compress(buffer);
  if (result === false) throw new Error("ConvertTTFToWOFF2 failed");
  return result;
}
