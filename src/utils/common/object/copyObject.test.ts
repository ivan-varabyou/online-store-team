import { copyObject } from './copyObject';

test('copyObject', () => {
  const frontend = { name: 'Mike', age: 30 };
  const backend = { name: 'John', age: 37 };
  const manager = { name: 'Adam', age: 35 };
  expect(copyObject(frontend)).toEqual(frontend);
  expect(copyObject(backend)).toEqual(backend);
  expect(copyObject(manager)).toEqual(manager);
});
