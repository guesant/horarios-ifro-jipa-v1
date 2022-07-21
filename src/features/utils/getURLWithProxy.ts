const NEXT_PUBLIC_PROXY_URL = process.env.NEXT_PUBLIC_PROXY_URL!;

export const getURLWithProxy = (url: string) =>
  `${NEXT_PUBLIC_PROXY_URL}${url}`;
