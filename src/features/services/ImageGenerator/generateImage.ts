import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { canvasToBlob } from "../../utils/canvasToBlob";
import { IGenerateImagePayload } from "./interfaces/IGenerateImagePayload";

GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.min.js";

export const generateImage = async (payload: IGenerateImagePayload) => {
  const { pdfLink, scale = 4, header, columns } = payload;

  const pdf = await getDocument(pdfLink).promise;

  const elementsImageDatas: ImageData[] = [];

  for (const element of [header, ...columns]) {
    const page = await pdf.getPage(element.page);

    const pageCanvas = document.createElement("canvas");
    const pageCanvasContext = pageCanvas.getContext("2d")!;

    // Prepare canvas using PDF page dimensions
    const viewport = page.getViewport({ scale });
    pageCanvas.height = viewport.height;
    pageCanvas.width = viewport.width;

    // Render PDF page into canvas context
    await page.render({
      viewport: viewport,
      canvasContext: pageCanvasContext,
    }).promise;

    const top = Math.round(element.top * viewport.width);
    const left = Math.round(element.left * viewport.width);
    const width = Math.round(element.width * viewport.width);
    const height = Math.round(element.height * viewport.width);

    const imageData = pageCanvasContext.getImageData(left, top, width, height);

    elementsImageDatas.push(imageData);
  }

  const finalCanvas = document.createElement("canvas");
  const finalCanvasContext = finalCanvas.getContext("2d")!;

  finalCanvas.width = elementsImageDatas.reduce((acc, i) => acc + i.width, 0);

  finalCanvas.height = elementsImageDatas.reduce(
    (acc, i) => Math.max(acc, i.height),
    -Infinity
  );

  let cursorX = 0;
  let cursorY = 0;

  for (const imageData of elementsImageDatas) {
    finalCanvasContext.putImageData(imageData, cursorX, cursorY);
    cursorX += imageData.width;
    cursorY += 0;
  }

  const blob = await canvasToBlob(finalCanvas);

  return blob;
};
