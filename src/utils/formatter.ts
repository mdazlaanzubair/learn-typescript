export const extractTitle = (desc: string, wordLimit: number = 5): string => {
  // Trim and split the description into words
  const words = desc.trim().split(/\s+/); // Split by whitespace

  // Take the first 'wordLimit' words
  const limitedWords = words.slice(0, wordLimit);

  // Capitalize each word
  const capitalizedWords = limitedWords.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
  );

  // Join the words back into a single string
  return capitalizedWords.join(" ");
};

export const truncateStringByWords = (
  desc: string,
  wordLimit: number = 40
): string => {
  if (wordLimit <= 0) {
    return desc;
  } else {
    // Trim and split the string into words
    const words = desc.trim().split(/\s+/); // Split by whitespace, handling multiple spaces

    // Take the first 'wordLimit' words
    const limitedWords = words.slice(0, wordLimit);

    // Join the words back into a single string
    return limitedWords.join(" ");
  }
};

export const countWords = (desc: string): number => {
  // Trim the string and split it into words using whitespace as a delimiter
  const words = desc.trim().split(/\s+/); // Handles multiple spaces or extra whitespace
  return words.length;
};
