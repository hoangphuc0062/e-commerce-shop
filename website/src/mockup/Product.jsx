import { faker } from "@faker-js/faker";

export function createRanDomProduct() {
  return {
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(300, 300),
    description: faker.commerce.productDescription(),
    rating: faker.datatype.number(5),
    review: faker.datatype.number(1000),
    category: faker.commerce.department(),
  };
}

export const products = Array.from({ length: 20 }, createRanDomProduct);
