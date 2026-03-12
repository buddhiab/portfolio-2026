"use client";

import { ArrowUpRight, Github } from "lucide-react";

export default function BasicCard({
    title = "Example Title",
    description = "Example content for the basic card.",
    buttonText = "View Project",
    link = "#",
    tags = ["React", "Tailwind"],
    imageUrl
}) {
    return (
        <div className="w-[300px] h-[380px] rounded-2xl relative overflow-hidden shadow-2xl group select-none cursor-pointer border border-white/10">

            {/* Full-size Background Image */}
            {imageUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                    src={imageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            ) : (
                <div className="absolute inset-0 bg-linear-to-br from-zinc-800 to-zinc-900" />
            )}

            {/* Always-present dark gradient overlay at the bottom */}
            <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/50 to-transparent" />

            {/* Content sits on top of the image */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 z-10">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                    {tags && tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold px-2 py-0.5 bg-white/15 backdrop-blur-sm text-white rounded-full border border-white/20">
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-purple-300 transition-colors">
                    {title}
                </h3>

                {/* Description — hidden by default, slides up on hover */}
                <p className="text-zinc-300 text-xs leading-relaxed mb-4 line-clamp-2">
                    {description}
                </p>

                {/* CTA Button */}
                <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md text-white font-medium py-2.5 px-4 rounded-xl hover:bg-purple-600/80 transition-all duration-300 border border-white/20 pointer-events-auto text-sm group/btn"
                >
                    <Github size={14} />
                    {buttonText}
                    <ArrowUpRight size={14} className="group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </a>
            </div>
        </div>
    );
}
