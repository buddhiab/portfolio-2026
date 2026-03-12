import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        await prisma.project.create({
            data: {
                title: "Fruit Web",
                category: "E-Commerce",
                description: "A modern, responsive e-commerce web platform for fresh fruit delivery. Built with standard web technologies and integrated with modern UI principles.",
                imageUrl: "/projects/fruit-web.png",
                githubUrl: "https://github.com/buddhiab/fruit-web",
                technologies: "HTML,CSS,JavaScript",
            }
        });
        return NextResponse.json({ success: true, message: "Added Fruit Web" });
    } catch (error) {
        return NextResponse.json({ success: false, error: String(error) });
    }
}
