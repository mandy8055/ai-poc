import {
  Brand,
  Product,
  ProductFamily,
  ProductHeader,
  ProductReviewStatistics,
  Price,
  ShopAvailability,
  AvailabilityStatus,
  Color,
} from '../generated/graphql';
function getRandomAvailability(): ShopAvailability {
  const statuses: AvailabilityStatus[] = ['GREEN', 'YELLOW', 'RED'];
  return {
    status: statuses[getRandomInt(0, statuses.length - 1)],
  };
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomFloat(min: number, max: number, decimals = 2): number {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
}

function getRandomBrand(): Brand {
  const brands: Brand[] = [
    'KITCHENTECH',
    'HOMEPRO',
    'APPLIANCE_PLUS',
    'COOKMASTER',
    'HOMEMATE',
  ];
  return brands[getRandomInt(0, brands.length - 1)];
}

function getRandomColor(): Color {
  const colors: Color[] = ['WHITE', 'SILVER', 'BLACK'];
  return colors[getRandomInt(0, colors.length - 1)];
}

function getRandomProductFamily(): ProductFamily {
  const families = [
    { id: 'CoffeeEspressoMachine', name: 'Automatic coffee-espresso machine' },
    { id: 'Washing_Machines', name: 'Washers' },
    { id: 'Dishwashers', name: 'Dishwashers' },
    { id: 'Ovens', name: 'Single Ovens' },
    { id: 'Double_Ovens', name: 'Double Ovens' },
    { id: 'Microwave_Ovens', name: 'Microwaves' },
    { id: 'Freezers', name: 'Freezers' },
    { id: 'Refrigeration', name: 'Refrigeration' },
  ];
  return families[getRandomInt(0, families.length - 1)];
}

function getRandomHeader(productId: string): ProductHeader[] {
  const series = [
    'Elite Series',
    'Pro Series',
    'Classic Series',
    'Premium Line',
  ];
  const productTypes = [
    'Built-in Kitchen Appliance',
    'Freestanding Appliance',
    'Integrated Kitchen Solution',
    'Modern Home Appliance',
  ];

  return [
    {
      block: 'HE_HEADER1',
      level: 1,
      value: series[getRandomInt(0, series.length - 1)],
    },
    {
      block: 'HE_HEADER2',
      level: 2,
      value: productTypes[getRandomInt(0, productTypes.length - 1)],
    },
    { block: 'HE_HEADER6', level: 6, value: productId },
  ];
}

function getRandomPrice(): Price {
  const amount = getRandomInt(299, 4999); // More realistic appliance price range
  return {
    displayPrice: {
      amount,
      currency: 'USD',
    },
  };
}

function getRandomReviewStatistics(): ProductReviewStatistics {
  return {
    averageRating: getRandomFloat(2.5, 5, 2),
    ratingCount: getRandomInt(1, 5000),
  };
}

function getProductIdPrefix(productFamily: ProductFamily): string {
  const prefixMap: { [key: string]: string } = {
    CoffeeEspressoMachine: 'CEM',
    Washing_Machines: 'WM',
    Dishwashers: 'DW',
    Ovens: 'OV',
    Double_Ovens: 'DOV',
    Microwave_Ovens: 'MW',
    Freezers: 'FZ',
    Refrigeration: 'RF',
  };

  return productFamily && productFamily.id && prefixMap[productFamily.id]
    ? prefixMap[productFamily.id]
    : 'KA';
}

export function generateMockProduct(
  productId: string,
  productFamily?: ProductFamily,
): Product {
  const family = productFamily || getRandomProductFamily();
  const finalProductId =
    productId ||
    `${getProductIdPrefix(family)}_${String(
      Math.floor(Math.random() * 9999) + 1,
    ).padStart(4, '0')}`;

  return {
    id: finalProductId,
    brand: getRandomBrand(),
    // header: getRandomHeader(finalProductId),
    color: getRandomColor(),
    price: getRandomPrice(),
    productFamily: family,
    // reviewStatistics: getRandomReviewStatistics(),
    // availability: getRandomAvailability(),
  };
}

export function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, i) => generateMockProduct(''));
}

export function generateMockProductsByCategory(
  count: number,
  categoryId: string,
): Product[] {
  const families = [
    { id: 'CoffeeEspressoMachine', name: 'Automatic coffee-espresso machine' },
    { id: 'Washing_Machines', name: 'Washers' },
    { id: 'Dishwashers', name: 'Dishwashers' },
    { id: 'Ovens', name: 'Single Ovens' },
    { id: 'Double_Ovens', name: 'Double Ovens' },
    { id: 'Microwave_Ovens', name: 'Microwaves' },
    { id: 'Freezers', name: 'Freezers' },
    { id: 'Refrigeration', name: 'Refrigeration' },
  ];

  const targetFamily = families.find((f) => f.id === categoryId) || families[0];

  return Array.from({ length: count }, (_, i) => {
    const prefix = getProductIdPrefix(targetFamily);
    const productId = `${prefix}_${String(i + 1).padStart(4, '0')}`;
    return generateMockProduct(productId, targetFamily);
  });
}

// Example usage:
// const products = generateMockProducts(10);
// console.log(JSON.stringify(products, null, 2));
//
// Generate products for specific category:
// const coffeeProducts = generateMockProductsByCategory(5, 'CoffeeEspressoMachine');
// // Will generate: CEM_0001, CEM_0002, CEM_0003, CEM_0004, CEM_0005
//
// const dishwashers = generateMockProductsByCategory(3, 'Dishwashers');
// // Will generate: DW_0001, DW_0002, DW_0003
