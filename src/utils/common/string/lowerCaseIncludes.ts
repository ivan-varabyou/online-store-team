export const lowerCaseIncludes = (str: string, searchStr: string): boolean => {
  return String(str).toLowerCase().includes(String(searchStr));
};
