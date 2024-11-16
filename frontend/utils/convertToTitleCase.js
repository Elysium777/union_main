const convertToTitleCase = (str) => {
  return str
    .split("-")
    .map((word) =>
      word.toLowerCase() === "dao"
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

export default convertToTitleCase;
