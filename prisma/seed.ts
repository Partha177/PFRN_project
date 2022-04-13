import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

// seed function, Prisma fetching data from our DB
const seedData = async () => {
  if ((await db.post.count()) === 0) {
    return await Promise.all([
      db.post.create({
        data: {
          id: genId(),
          slug: 'ultimate-node-stack',
          title: 'The Ultimate Node/Dev Stack',
        },
      }),
      db.post.create({
        data: {
          id: genId(),
          slug: 'future blog post',
          title: 'The Future Blog Post1',
        },
      }),
    ]);
  }
};

seedData();