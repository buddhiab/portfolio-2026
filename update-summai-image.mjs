import { PrismaClient } from './lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
    const result = await prisma.project.updateMany({
        where: { title: { contains: "Book Summ" } },
        data: { imageUrl: "/projects/summai-ui.png" }
    });

    console.log(`✅ Updated ${result.count} project(s) with the new SummAI image.`);

    const proj = await prisma.project.findFirst({ where: { title: { contains: "Book Summ" } } });
    console.log("Project:", proj?.title, "| imageUrl:", proj?.imageUrl);
}

main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
