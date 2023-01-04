export const getMaxCountPage = (arrayLength: number, limit: number): number => {
  return Math.ceil(arrayLength / limit);
};
