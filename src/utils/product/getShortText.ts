export function getShortText(text: string, length: number): string {
  return String(text).slice(0, length);
}
