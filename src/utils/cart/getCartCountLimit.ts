export function getCartCountLimit(count: number): number {
  const result = count > 100 ? 100 : count;
  return result > 0 ? result : 0;
}
