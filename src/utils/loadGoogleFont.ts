import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

async function loadLocalFont(filename: string): Promise<ArrayBuffer> {
  const fontPath = resolve(process.cwd(), "public/fonts", filename);
  const buffer = await readFile(fontPath);
  return buffer.buffer.slice(
    buffer.byteOffset,
    buffer.byteOffset + buffer.byteLength
  ) as ArrayBuffer;
}

async function loadGoogleFonts(
  _text: string
): Promise<Array<{ name: string; data: ArrayBuffer; weight: number; style: string }>> {
  const [regularData, boldData] = await Promise.all([
    loadLocalFont("atkinson-regular.woff"),
    loadLocalFont("atkinson-bold.woff"),
  ]);

  return [
    { name: "Atkinson Hyperlegible", data: regularData, weight: 400, style: "normal" },
    { name: "Atkinson Hyperlegible", data: boldData, weight: 700, style: "bold" },
  ];
}

export default loadGoogleFonts;
