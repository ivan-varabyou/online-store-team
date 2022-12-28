export function copyObject<T>(data: T): T {
  return JSON.parse(JSON.stringify(data));
}
