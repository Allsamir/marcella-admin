export const defaultTypesValue = (offers) => {
  const defaultValue = [];
  offers?.forEach((o) => {
    defaultValue.push({ value: o, label: o });
  });
  return defaultValue;
};
