import cModule from "cache-service-cache-module";

const cacheModuleConfig = {
  storage: "local",
  defaultExpiration: 60 * 60 * 24 * 3,
};

export const cacheModule =
  typeof window !== "undefined" && new cModule(cacheModuleConfig);

export const getCached = <T extends any>(key: string) =>
  new Promise<T | undefined>((resolve, reject) => {
    if (!cacheModule) {
      resolve(undefined);
      return;
    }

    cacheModule.get(key, (err: any, result?: T) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    });
  });

export const setCached = (key: string, value: any) =>
  new Promise((resolve) => {
    if (cacheModule) {
      cacheModule.set(key, value);
    }
    resolve(undefined);
  });

export const getCachedBlob = (
  key: string,
  options?: BlobPropertyBag | undefined
) =>
  getCached<number[]>(key).then(
    (data) => data && new Blob([Int8Array.from(data)], options)
  );
