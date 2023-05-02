export function uniqueObjectList<T extends Object>(data: T[], key: keyof T) {
  return [...new Map(data.map(item => [item[key], item])).values()];
}
