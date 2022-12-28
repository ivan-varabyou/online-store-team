export function getProductOldPrice(price: number, discount: number): number {
  return Math.ceil(price + (price / 100) * discount);
}
