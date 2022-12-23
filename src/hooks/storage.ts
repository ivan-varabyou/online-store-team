import { TypeCartItem } from '../models';

export function getLocalStorage(value: string): Array<TypeCartItem> | [] {
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
