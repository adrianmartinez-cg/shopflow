import { faker } from '@faker-js/faker';
import { sequelize } from '../config/sequelize';
import { User } from '../model/user';
import { Product } from '../model/product';
import { ProductReview } from '../model/productReview';
import bcrypt from 'bcrypt';

const TAGS = [
    'Electronics', 'Books', 'Gaming', 'Fashion',
    'Kitchen', 'Fitness', 'Decoration', 'Music',
    'Outdoors', 'Office'
];

const getRandom = (arr: any[]) => arr[Math.floor(Math.random() * arr.length)];
const getRandomInt = (min: number, max: number): number =>
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

async function createUser(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
        name,
        email,
        hashedPassword,
        role: 'user',
    });
    return newUser;
}

async function seed() {
    await sequelize.sync({ force: true });

    const users = await Promise.all(
        Array.from(userMap.entries()).map(async ([name, email]) => {
            const password = email.split('@')[0];
            return await createUser(name, email, password);
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
seed().catch(console.error);