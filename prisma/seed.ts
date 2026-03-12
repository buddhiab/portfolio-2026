import { PrismaClient } from '../lib/generated/prisma' 

const prisma = new PrismaClient()

async function main() {
  // Clear out the old data first
  await prisma.project.deleteMany();

  // Insert your actual GitHub projects with local screenshots
  await prisma.project.createMany({
    data: [
      {
        title: "SpendWise: Expense Management",
        category: "Full-Stack Application",
        description: "A comprehensive personal finance management dashboard featuring budget tracking and analytics.",
        imageUrl: "/projects/spendwise-ui.png", 
        githubUrl: "https://github.com/buddhiab/expenses-management.git"
      },
      {
        title: "AI Book Summarizer",
        category: "AI Integration",
        description: "An intelligent platform that processes and distills lengthy book content into concise, actionable summaries.",
        imageUrl: "/projects/summai-ui.png", 
        githubUrl: "https://github.com/buddhiab/AI-book-summarizer.git"
      },
      {
        title: "TravelPlan: Car Rental Microservice",
        category: "Web Platform",
        description: "A premium car rental platform featuring island-wide delivery, secure flexible bookings, and an administrative dashboard.",
        imageUrl: "/projects/travel-plan-ui.png", 
        githubUrl: "https://github.com/mlswijerathne/travel-plan-platform.git"
      },
      {
        title: "E-Sim Portal",
        category: "E-Commerce / Telecom",
        description: "A digital storefront and provisioning portal for immediate electronic SIM card distribution and management.",
        // Keep a placeholder here until you grab a screenshot of the E-Sim portal!
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop", 
        githubUrl: "https://github.com/Kavii200310/e-sim-portal.git"
      }
    ]
  });

  console.log("Database seeded with real GitHub projects and local UI screenshots!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })