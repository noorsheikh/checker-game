export const dictionary = [
  '0vmin',
  '8vmin',
  '16vmin',
  '24vmin',
  '32vmin',
  '40vmin',
  '48vmin',
  '56vmin',
  '64vmin',
  '72vmin',
];

export const dist = (x1: any, y1: any, x2: any, y2: any) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

export const authHttpFlag = process.env.REACT_APP_HTTP_FLAG;
export const host = process.env.REACT_APP_HOST;
export const authHttpPort = process.env.REACT_APP_HTTP_PORT;
export const authHttpsPort = process.env.REACT_APP_HTTPS_PORT;
