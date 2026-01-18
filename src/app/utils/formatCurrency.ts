const formatCurrency = (price: number) => {
  const formattedPrice = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  }).format(price);

  return formattedPrice;
};

export default formatCurrency;