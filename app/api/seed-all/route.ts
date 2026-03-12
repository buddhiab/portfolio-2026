import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const projects = [
            {
                title: "Fruit Web",
                category: "E-Commerce",
                description: "A modern, responsive e-commerce web platform for fresh fruit delivery. Built with clean HTML, CSS and JavaScript.",
                imageUrl: "/projects/fruit-web.png",
                githubUrl: "https://github.com/buddhiab/fruit-web",
                liveDemoUrl: null,
            },
            {
                title: "SpendWise",
                category: "FinTech",
                description: "A full-scale financial dashboard with real-time analytics and predictive budget tracking. Empowers users to manage their personal finances effectively.",
                imageUrl: "/projects/spendwise-ui.png",
                githubUrl: null,
                liveDemoUrl: null,
            },
            {
                title: "SummAI",
                category: "AI / NLP",
                description: "An AI-powered document and article summarization tool. Leverages large language models to distill long-form content into concise, actionable summaries.",
                imageUrl: "/projects/summai-ui.png",
                githubUrl: null,
                liveDemoUrl: null,
            },
            {
                title: "Travel Planner",
                category: "Travel / Lifestyle",
                description: "A smart travel planning application that helps users build complete itineraries, discover destinations, and organize their trips from start to finish.",
                imageUrl: "/projects/travel-plan-ui.png",
                githubUrl: null,
                liveDemoUrl: null,
            },
            {
                title: "Component Library",
                category: "UI / Design System",
                description: "A Storybook-powered React component library with reusable, accessible UI primitives. Includes card layouts, buttons, typography, and interactive patterns.",
                imageUrl: "/projects/storybook-card.png",
                githubUrl: null,
                liveDemoUrl: null,
            },
        ];

        let results = [];

        for (const project of projects) {
            // Check if project already exists by title
            const existing = await prisma.project.findFirst({
                where: { title: project.title }
            });

            if (existing) {
                // Update image URL and description if it already exists
                await prisma.project.update({
                    where: { id: existing.id },
                    data: {
                        imageUrl: project.imageUrl,
                        description: project.description,
                        category: project.category,
                        githubUrl: project.githubUrl,
                        liveDemoUrl: project.liveDemoUrl,
                    }
                });
                results.push(`✅ Updated: ${project.title}`);
            } else {
                // Create new project
                await prisma.project.create({ data: project });
                results.push(`🆕 Created: ${project.title}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: "✨ Done! All projects seeded.",
            results
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}