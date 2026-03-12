const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    console.log("Adding Fruit Web project to database...");

    await prisma.project.create({
        data: {
            title: "Fruit Web",
            category: "E-Commerce",
            description: "A modern, responsive e-commerce web platform for fresh fruit delivery. Built with standard web technologies and integrated with modern UI principles.",
            imageUrl: "/projects/fruit-web.png",
            githubUrl: "https://github.com/buddhiab/fruit-web",
            liveDemoUrl: null, // As it is just a GitHub repo right now
            technologies: "HTML,CSS,JavaScript",
        }
    });

    console.log("Successfully added Fruit Web to the database!");
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
