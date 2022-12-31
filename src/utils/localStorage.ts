export function getLocalStorage<T>(value: string): Array<T> | [] {
  let parse = [];
  const valueLocalStorage = localStorage.getItem(value);
  if (valueLocalStorage) {
    parse = JSON.parse(valueLocalStorage);
  }
  return parse;
}

export function setLocalStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}
