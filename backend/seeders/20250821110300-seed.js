'use strict';

const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const { v7: uuidv7 } = require('uuid');

const { User, Product, ProductReview } = require('../models');

const TAGS = [
  'Electronics', 'Books', 'Gaming', 'Fashion',
  'Kitchen', 'Fitness', 'Decoration', 'Music',
  'Outdoors', 'Office'
];

const MOCK_IMAGES = Array.from({ length: 10 }, (_, i) => `mock_image_0${i}.png`);
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

module.exports = {
  async up(queryInterface, Sequelize) {
    const userMap = new Map([
      ['Ismael Tillman', 'ismael.tillman@mail.com'],
      ['Johnnie Koepp', 'johnnie.koepp@mail.com'],
      ['Kim Labadie', 'kim.labadie@mail.com'],
      ['Vivian Rippin', 'vivian.rippin@mail.com'],
      ['Lloyd Kunze', 'lloyd.kunze@mail.com'],
    ]);

    const usersData = [];
    for (const [name, email] of userMap.entries()) {
      const password = email.split('@')[0];
      const hashedPassword = await bcrypt.hash(password, 10);
      usersData.push({
        id: uuidv7(),
        name,
        email,
        hashed_password: hashedPassword,
        role: 'user',
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
    await queryInterface.bulkInsert('users', usersData, {});

    const productsData = Array.from({ length: 20 }).map(() => ({
      id: uuidv7(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 50, max: 5000, dec: 2 }),
      tags: getRandom(TAGS),
      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert('products', productsData, {});

    const imagesData = [];
    for (const product of productsData) {
      const imageCount = getRandomInt(0, 10);
      for (let i = 0; i < imageCount; i++) {
        const imageName = getRandom(MOCK_IMAGES);
        imagesData.push({
          id: uuidv7(),
          url: `${process.env.SERVER_HOST ?? 'http://localhost:3000'}/uploads/${imageName}`,
          product_id: product.id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    if (imagesData.length > 0) {
      await queryInterface.bulkInsert('product_images', imagesData, {});
    }

    const reviewsData = [];
    for (const product of productsData) {
      const reviewCount = getRandomInt(0, 5);
      for (let i = 0; i < reviewCount; i++) {
        const user = getRandom(usersData);
        reviewsData.push({
          id: uuidv7(),
          rating: getRandomInt(1, 5),
          comment: faker.lorem.sentences(2),
          user_id: user.id,
          product_id: product.id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    if (reviewsData.length > 0) {
      await queryInterface.bulkInsert('product_reviews', reviewsData, {});
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_images', null, {});
    await queryInterface.bulkDelete('product_reviews', null, {});
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};