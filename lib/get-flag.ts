export function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char, i) => 127397 + char.charCodeAt(i));
  return String.fromCodePoint(...codePoints);
}
