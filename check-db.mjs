import { PrismaClient } from './lib/generated/prisma/index.js';
const p = new PrismaClient();
const all = await p.project.findMany({ select: { id: true, title: true, imageUrl: true } });
console.log(JSON.stringify(all, null, 2));
await p.$disconnect();
