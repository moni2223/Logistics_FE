export const calculateShipmentPrice = (weight, type, isEdit) => {
  let price = 0;
  if (type === "OFFICE") price = weight * 0.1 + 5;
  if (type === "ADDRESS") price = weight * 0.1 + 7.5;
  if (isEdit) price = price + 5;
  return price;
};
