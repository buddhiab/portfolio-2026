import { PrismaClient } from './lib/generated/prisma/index.js';
const p = new PrismaClient();
const r1 = await p.project.deleteMany({ where: { title: "Component Library" } });
const r2 = await p.project.deleteMany({ where: { title: "Storybook UI" } });
console.log(`🗑️ Deleted Component Library (${r1.count}) and Storybook UI (${r2.count})`);
const remaining = await p.project.findMany({ select: { title: true } });
console.log("Remaining:", remaining.map(p => p.title));
await p.$disconnect();
