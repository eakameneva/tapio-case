export function truncateText(text: string, maxLength: number) {
  if (text.length <= maxLength) {
    return text;
  }
  const truncated = text.slice(0, maxLength);
  return `${truncated.slice(0, truncated.lastIndexOf(" "))}...`;
}

export const getIsStringIncludesNormalized = (
  sourceString: string,
  targetString: string
) => {
  return sourceString.toLowerCase().includes(targetString.toLowerCase());
};
