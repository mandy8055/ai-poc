import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';

// List of product families to generate one product for each
const productFamilies = [
  { id: 'CoffeeEspressoMachine', name: 'Automatic coffee-espresso machine' },
  { id: 'Washing_Machines', name: 'Washers' },
  { id: 'Dishwashers', name: 'Dishwashers' },
  { id: 'Ovens', name: 'Single Ovens' },
  { id: 'Double_Ovens', name: 'Double Ovens' },
  { id: 'Microwave_Ovens', name: 'Microwaves' },
  { id: 'Freezers', name: 'Freezers' },
  { id: 'Refrigeration', name: 'Refrigeration' },
];

// Usage: npx ts-node generate-one-product.ts <categoryIndex> <count>
const index = parseInt(process.argv[2] || '0', 10);
const count = parseInt(process.argv[3] || '1', 10);
const family = productFamilies[index % productFamilies.length];

import { generateMockProduct } from './mock-data-generator.js';

const products = Array.from({ length: count }, (_, i) => {
  const product = generateMockProduct(`${family.id}_${i + 1}`);
  product.productFamily = family;
  return product;
});

// Ensure the mocks directory exists
const outputPath = join(
  'src',
  'mocks',
  `${family.id.toLowerCase()}`,
  'data.json',
);
mkdirSync(dirname(outputPath), { recursive: true });

writeFileSync(outputPath, JSON.stringify(products, null, 2));
console.log(`Generated ${outputPath} with ${count} products.`);
