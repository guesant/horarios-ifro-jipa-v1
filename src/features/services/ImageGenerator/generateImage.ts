import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { canvasToBlob } from "../../utils/canvasToBlob";
import { IGenerateImagePayload } from "./interfaces/IGenerateImagePayload";

GlobalWorkerOptions.workerSrc =
  "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.14.305/build/pdf.worker.min.js";

const getFinalCanvasWidth = (elementsImageDatas: ImageData[]) =>
  elementsImageDatas.reduce((acc, i) => acc + i.width, 0);

const getFinalCanvasHeight = (elementsImageDatas: ImageData[]) =>
  elementsImageDatas.reduce((acc, i) => Math.max(acc, i.height), -Infinity);

export const generateImage = async (payload: IGenerateImagePayload) => {
  const { pdfLink, scale = 4, header, columns } = payload;

  const pdf = await getDocument(pdfLink).promise;

  const elementsImageDatas: ImageData[] = [];

  for (const element of [header, ...columns]) {
    const page = await pdf.getPage(element.page);

    const pageCanvas = document.createElement("canvas");
    const pageCanvasContext = pageCanvas.getContext("2d")!;

    const viewport = page.getViewport({ scale });

    pageCanvas.height = viewport.height;
    pageCanvas.width = viewport.width;

    // Render PDF page into canvas context
    await page.render({
      viewport: viewport,
      canvasContext: pageCanvasContext,
    }).promise;

    const getRealValue = (factor: number) => factor * viewport.width;

    const [top, left, width, height] = [
      element.top,
      element.left,
      element.width,
      element.height,
    ].map(getRealValue);

    const imageData = pageCanvasContext.getImageData(left, top, width, height);

    elementsImageDatas.push(imageData);
  }

  const finalCanvas = document.createElement("canvas");
  const finalCanvasContext = finalCanvas.getContext("2d")!;

  finalCanvas.width = getFinalCanvasWidth(elementsImageDatas);
  finalCanvas.height = getFinalCanvasHeight(elementsImageDatas);

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
