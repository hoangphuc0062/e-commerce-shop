import { faker } from "@faker-js/faker";

export function createRanDomProduct() {
  return {
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(300, 300),
    description: faker.commerce.productDescription(),
    rating: faker.random.number(5),
    review: faker.random.number(1000),
    category: faker.commerce.department(),
  };
}
