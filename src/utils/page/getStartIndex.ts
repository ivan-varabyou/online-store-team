export const getStartIndex = (page: number, limit: number) => {
  return page * limit - limit;
};
