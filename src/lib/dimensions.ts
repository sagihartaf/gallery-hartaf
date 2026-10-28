export type Centimetres = {
  width: number;
  height: number;
};

const SIZE = /(\d+(?:\.\d+)?)\s*[×xX]\s*(\d+(?:\.\d+)?)/;

/**
 * The records print two measurements and do not say which is width.
 * Match them to the photograph: the longer side of the canvas is the longer side of the image.
 */
export function canvasCentimetres(
  size: string,
  imageWidth: number,
  imageHeight: number,
): Centimetres | null {
  const match = size.match(SIZE);
  if (!match || imageWidth <= 0 || imageHeight <= 0) return null;
  const a = Number(match[1]);
  const b = Number(match[2]);
  if (!Number.isFinite(a) || !Number.isFinite(b) || a <= 0 || b <= 0) return null;
  const imageIsWide = imageWidth >= imageHeight;
  const firstIsLonger = a >= b;
  if (imageIsWide === firstIsLonger) return { width: a, height: b };
  return { width: b, height: a };
}
