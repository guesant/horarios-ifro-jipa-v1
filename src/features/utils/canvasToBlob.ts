export const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type?: string | undefined,
  quality?: any
) =>
  new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });
