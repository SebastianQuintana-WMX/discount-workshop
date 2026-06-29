const { calculateDiscount } = require('./discount');

describe('calculateDiscount', () => {
  describe('gold member discount', () => {
    test('applies 20% discount for gold member', () => {
      const result = calculateDiscount(100, 'gold');
      expect(result).toBe(80);
    });

    test('rounds to 2 decimal places for gold member', () => {
      const result = calculateDiscount(33.33, 'gold');
      expect(result).toBe(26.66);
    });
  });

  describe('silver member discount', () => {
    test('applies 10% discount for silver member', () => {
      const result = calculateDiscount(100, 'silver');
      expect(result).toBe(90);
    });

    test('rounds to 2 decimal places for silver member', () => {
      const result = calculateDiscount(17.77, 'silver');
      expect(result).toBe(15.99);
    });
  });

  describe('regular member (no discount)', () => {
    test('applies no discount for regular member', () => {
      const result = calculateDiscount(100, 'regular');
      expect(result).toBe(100);
    });

    test('applies no discount for unknown member type', () => {
      const result = calculateDiscount(50, 'unknown');
      expect(result).toBe(50);
    });

    test('applies no discount when member type not provided', () => {
      const result = calculateDiscount(75);
      expect(result).toBe(75);
    });
  });

  describe('price validation', () => {
    test('throws error for negative price', () => {
      expect(() => calculateDiscount(-10, 'gold')).toThrow('Price must be positive');
    });

    test('throws error for zero price', () => {
      expect(() => calculateDiscount(0, 'gold')).toThrow('Price must be positive');
    });

    test('accepts positive prices', () => {
      expect(() => calculateDiscount(0.01, 'gold')).not.toThrow();
    });

    test('throws error for null price', () => {
      expect(() => calculateDiscount(null, 'gold')).toThrow();
    });

    test('throws error for undefined price', () => {
      expect(() => calculateDiscount(undefined, 'gold')).toThrow();
    });

    test('throws error for string price', () => {
      expect(() => calculateDiscount('100', 'gold')).toThrow();
    });
  });

  describe('rounding edge cases', () => {
    test('rounds up when decimal is >= 0.5', () => {
      const result = calculateDiscount(12.495, 'gold');
      expect(result).toBe(10.00);
    });

    test('rounds down when decimal is < 0.5', () => {
      const result = calculateDiscount(12.49, 'gold');
      expect(result).toBe(9.99);
    });
  });

  describe('large price values', () => {
    test('handles large prices without precision loss', () => {
      const result = calculateDiscount(1000000.99, 'gold');
      expect(result).toBe(800000.79);
    });

    test('handles large prices with silver discount', () => {
      const result = calculateDiscount(1000000.99, 'silver');
      expect(result).toBe(900000.89);
    });
  });

  describe('discount correctness', () => {
    test('gold member discount is always less than original price', () => {
      const result = calculateDiscount(100, 'gold');
      expect(result).toBeLessThan(100);
    });

    test('silver member discount is always less than original price', () => {
      const result = calculateDiscount(100, 'silver');
      expect(result).toBeLessThan(100);
    });

    test('discounted price is numeric', () => {
      const result = calculateDiscount(100, 'gold');
      expect(typeof result).toBe('number');
    });
  });
});
