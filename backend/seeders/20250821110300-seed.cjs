'use strict';

import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { sequelize } from '../config/sequelize.js';
import { User } from '../model/user.js';
import { Product } from '../model/product.js';
import { ProductReview } from '../model/productReview.js';

const TAGS = [
  'Electronics', 'Books', 'Gaming', 'Fashion',
  'Kitchen', 'Fitness', 'Decoration', 'Music',
  'Outdoors', 'Office'
];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const userMap = new Map([
  ['Ismael Tillman', 'ismael.tillman@mail.com'],
  ['Johnnie Koepp', 'johnnie.koepp@mail.com'],
  ['Kim Labadie', 'kim.labadie@mail.com'],
  ['Vivian Rippin', 'vivian.rippin@mail.com'],
  ['Lloyd Kunze', 'lloyd.kunze@mail.com'],
  ['Susie Maggio', 'susie.maggio@mail.com'],
  ['Louis Fritsch', 'louis.fritsch@mail.com'],
  ['Stephen Swaniawski', 'stephen.swaniawski@mail.com'],
  ['Ryan Cummerata', 'ryan.cummerata@mail.com'],
  ['Stephen Casper', 'stephen.casper@mail.com']
]);

export async function up() {
  await sequelize.sync({ force: true });

  const users = await Promise.all(
    Array.from(userMap.entries()).map(async ([name, email]) => {
      const password = email.split('@')[0];
      const hashedPassword = await bcrypt.hash(password, 10);
      return await User.create({
        name,
        email,
        hashedPassword,
        role: 'user',
      });
    })
  );

  const products = await Promise.all(
    Array.from({ length: 20 }).map(() =>
      Product.create({
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 50, max: 5000, dec: 2 }),
        tags: getRandom(TAGS),
      })
    )
  );

  for (const product of products) {
    const reviewCount = getRandomInt(0, 5);
    for (let i = 0; i < reviewCount; i++) {
      const user = getRandom(users);
      const rating = getRandomInt(1, 5);
      const comment = faker.lorem.sentences(2);
      await ProductReview.create({
        rating,
        comment,
        userId: user.id,
        productId: product.id,
      });
    }
  }
}

export async function down() {
  await ProductReview.destroy({ where: {} });
  await Product.destroy({ where: {} });
  await User.destroy({ where: {} });
}
