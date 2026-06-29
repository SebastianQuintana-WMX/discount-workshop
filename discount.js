function calculateDiscount(price, memberType) {
  if (typeof price !== 'number' || price === undefined || price === null) {
    throw new Error('Price must be a positive number');
  }

  if (price <= 0) {
    throw new Error('Price must be positive');
  }

  let discountMultiplier = 1;

  if (memberType === 'gold') {
    discountMultiplier = 0.8;
  } else if (memberType === 'silver') {
    discountMultiplier = 0.9;
  }

  const finalPrice = price * discountMultiplier;
  return Math.round(finalPrice * 100) / 100;
}

module.exports = { calculateDiscount };
