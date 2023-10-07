import _decompress from "./build/decompress_binding.js";
let exports;
export async function decompress(buffer) {
  if (!exports) exports = await _decompress();
  const result = exports.decompress(buffer);
  if (result === false) throw new Error("ConvertWOFF2ToTTF failed");
  return result;
}
