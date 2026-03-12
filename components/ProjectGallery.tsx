"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

interface Project {
    id: string;
    title: string;
    category: string;
    description: string | null;
    imageUrl: string;
    githubUrl: string | null;
    liveDemoUrl: string | null;
}

interface ProjectGalleryProps {
    projects: Project[];
}

export default function ProjectGallery({ projects }: ProjectGalleryProps) {
    return (
        <section className="relative w-full py-24 bg-zinc-950 overflow-hidden text-white flex flex-col items-center">

            <div className="text-center mb-12">
                <h2 className="text-4xl font-bold tracking-tight">
                    Selected <span className="text-blue-500">Works</span>
                </h2>
                <p className="text-zinc-400 mt-2">Swipe to explore the repositories</p>
            </div>

            <div className="w-full max-w-6xl">
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    loop={true}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 250,
                        modifier: 2.5,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="w-full py-10"
                >
                    {projects.map((project) => (
                        <SwiperSlide
                            key={project.id}
                            className="w-[300px] h-[400px] sm:w-[400px] sm:h-[500px]"
                        >
                            <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/10 group cursor-pointer">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                {/* Engineering Overlay */}
                                <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black/95 via-black/60 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <span className="mb-1 text-xs font-bold uppercase tracking-wider text-blue-400">
                                        {project.category}
                                    </span>
                                    <h3 className="mb-2 text-xl font-bold text-white">
                                        {project.title}
                                    </h3>
                                    <p className="mb-5 text-sm text-zinc-300 line-clamp-2">
                                        {project.description}
                                    </p>

                                    {/* The new GitHub Button */}
                                    {project.githubUrl && (
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex w-max items-center justify-center rounded-md border border-white/20 bg-white/10 px-5 py-2 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/20 hover:scale-105 z-10"
                                            onClick={(e) => e.stopPropagation()} // Prevents swiper from dragging when clicking the button
                                        >
                                            View Source Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}