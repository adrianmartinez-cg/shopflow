import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { v7 as uuidv7 } from "uuid";
import { shuffle } from "lodash-es";

const TAGS = [
  "Electronics",
  "Books",
  "Gaming",
  "Fashion",
  "Kitchen",
  "Fitness",
  "Decoration",
  "Music",
  "Outdoors",
  "Office",
];

const MOCK_IMAGES = Array.from(
  { length: 10 },
  (_, i) => `mock_images_0${i}.png`,
);
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const up = async (queryInterface, _Sequelize) => {
  const userMap = new Map([
    ["Ismael Tillman", "ismael.tillman@mail.com"],
    ["Johnnie Koepp", "johnnie.koepp@mail.com"],
    ["Kim Labadie", "kim.labadie@mail.com"],
    ["Vivian Rippin", "vivian.rippin@mail.com"],
    ["Lloyd Kunze", "lloyd.kunze@mail.com"],
  ]);

  const usersData = [];
  for (const [name, email] of userMap.entries()) {
    const password = email.split("@")[0];
    const hashedPassword = await bcrypt.hash(password, 10);
    usersData.push({
      id: uuidv7(),
      name,
      email,
      hashed_password: hashedPassword,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    });
  }
  await queryInterface.bulkInsert("users", usersData, {});

  const productsData = Array.from({ length: 20 }).map(() => {
    const tagCount = getRandomInt(1, 4);
    const shuffledTags = shuffle(TAGS);
    const selectedTags = shuffledTags.slice(0, tagCount);
    const tagsString = selectedTags.join(",");
    return {
      id: uuidv7(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price({ min: 50, max: 5000, dec: 2 }),
      tags: tagsString,
      created_at: new Date(),
      updated_at: new Date(),
    };
  });
  await queryInterface.bulkInsert("products", productsData, {});

  const imagesData = [];
  for (const product of productsData) {
    const imageCount = getRandomInt(0, 5);
    if (imageCount === 0) {
      continue;
    }
    const shuffledImages = shuffle(MOCK_IMAGES);
    for (let i = 0; i < imageCount; i++) {
      imagesData.push({
        id: uuidv7(),
        url: `${process.env.SERVER_HOST ?? "http://localhost:3000"}/uploads/${shuffledImages[i]}`,
        product_id: product.id,
        created_at: new Date(),
        updated_at: new Date(),
      });
    }
  }
  if (imagesData.length > 0) {
    await queryInterface.bulkInsert("product_images", imagesData, {});
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
    await queryInterface.bulkInsert("product_reviews", reviewsData, {});
  }
};

export const down = async (queryInterface, _Sequelize) => {
  await queryInterface.bulkDelete("product_images", null, {});
  await queryInterface.bulkDelete("product_reviews", null, {});
  await queryInterface.bulkDelete("products", null, {});
  await queryInterface.bulkDelete("users", null, {});
};
