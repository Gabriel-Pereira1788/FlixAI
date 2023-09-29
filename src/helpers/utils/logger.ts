export function log(...message: any[]) {
  if (__DEV__) {
    console.log(message);
  }
}

export const logger = {
  log,
};
