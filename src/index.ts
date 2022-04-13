// console.log('Hello World');

// const unusedvariable = 123;
import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { nanoid } from 'nanoid';

const port = process.env.PORT ?? 8080;
const fastify = Fastify({ logger: true });
const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

// const seedData = async () => {
//   if (db && db.post && (await db!.post?.count()) === 0) {
//     await db.post.createMany({
//       data: [
//         {
//           id: genId(),
//           slug: 'ultimate-node-stack',
//           title: 'Ultimate Node Stack 2022'
//         },
//         {
//           id: genId(),
//           slug: 'draft-post',
//           title: 'Draft Post',
//         },
//       ],
//     });
//   }
// };
//seed function, Prisma fetching data from our DB
// const seedData = async () => {
//   if ((await db.post.count()) === 0) {
//     return await Promise.all([
//       db.post.create({
//         data: {
//           id: genId(),
//           slug: 'ultimate-node-stack',
//           title: 'The Ultimate Node/Dev Stack',
//         },
//       }),
//       db.post.create({
//         data: {
//           id: genId(),
//           slug: 'future blog post',
//           title: 'The Future Blog Post1',
//         },
//       }),
//     ]);
//   }
// };

// seedData();

fastify.get('/', async () => {
  // debugger;
  // const posts = await db.post.findMany({ where: { published: true } });
  // posts.map(post=>post.content)
  return db.post.findMany();
  // return { hello: 'world postgres' };
});

const start = async () => {
  try {
    await fastify.listen(port, '0.0.0.0');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
