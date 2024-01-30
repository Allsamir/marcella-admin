export const spaceToDash = (productName) => {
  // Replace "%20" with "-"
  const formattedProductName = productName
    .replace(/'/g, '')
    .replace(/&/g, 'and')
    .replace(/"/g, '')
    .replace(/,/g, '')
    .replace(/:/g, '')
    ?.replace(/\s/g, "-");

  return formattedProductName;
};
