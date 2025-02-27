export const formatDate = (isoString: string): string => {
  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  // Get day, month, and year
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
  const year = date.getFullYear() + 1; // Increment year by 1

  return `${day}.${month}.${year}`;
};
