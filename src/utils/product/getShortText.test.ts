import { getShortText } from './getShortText';

test('GetShortText should return a new string of shortened length', () => {
  const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, deserunt!';
  expect(getShortText(lorem, 5)).toEqual('Lorem');
  expect(getShortText(lorem, 11)).toEqual('Lorem ipsum');
  expect(getShortText(lorem, 17)).toEqual('Lorem ipsum dolor');
});
