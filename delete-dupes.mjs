import { PrismaClient } from './lib/generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
    const toDelete = ["SummaI", "SummAI", "Travel Planner", "SpendWise"];

    for (const title of toDelete) {
        // Find all records with this title, sorted oldest first
        const records = await prisma.project.findMany({
            where: { title },
            orderBy: { createdAt: 'asc' }
        });

        if (records.length === 0) {
            console.log(`ℹ️  Not found: ${title}`);
        } else if (records.length === 1) {
            // Only one exists — delete it entirely
            await prisma.project.delete({ where: { id: records[0].id } });
            console.log(`🗑️  Deleted: ${title}`);
        } else {
            // Duplicates — keep the newest, delete the rest
            const [keep, ...dupes] = records.reverse(); // keep most recent
            for (const dupe of dupes) {
                await prisma.project.delete({ where: { id: dupe.id } });
            }
            console.log(`🧹 Removed ${dupes.length} duplicate(s) of: ${title} (kept id: ${keep.id})`);
        }
    }

    const remaining = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } });
    console.log(`\n✅ Done! Remaining projects (${remaining.length}):`);
    remaining.forEach(p => console.log(`  - ${p.title}`));
}

main()
    .then(async () => { await prisma.$disconnect(); })
    .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
