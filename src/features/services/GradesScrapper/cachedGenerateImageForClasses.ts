import { getCachedBlob, setCached } from "../../utils/cacheModule";
import { readBlobAsArrayBuffer } from "../../utils/readBlobAsArrayBuffer";

export const generateImageForClassesPromise = () =>
  import("../ImageGenerator/generateImageForClasses").then(
    ({ generateImageForClasses }) => generateImageForClasses
  );

export const cachedGenerateImageForClasses = async (
  pdfLink: string,
  selectedClass: string
) => {
  const targetCacheKey = `result-${selectedClass}@${pdfLink}`;

  const cachedBlob = await getCachedBlob(targetCacheKey, { type: "image/png" });

  if (cachedBlob) {
    return cachedBlob;
  }

  const generateImageForClasses = await generateImageForClassesPromise();

  const blob = await generateImageForClasses({ pdfLink }, [selectedClass]);

  if (blob) {
    requestIdleCallback(async () => {
      const data = Array.from(new Int8Array(await readBlobAsArrayBuffer(blob)));
      await setCached(targetCacheKey, data);
    });
  }

  return blob;
};
