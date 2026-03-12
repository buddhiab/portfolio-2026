"use client";

import { motion } from "framer-motion";
import { User, TerminalSquare } from "lucide-react";

export default function ChatInterface() {
    // The engineering-focused conversation data
    const messages = [
        {
            id: 1,
            sender: "client",
            name: "Tech Lead",
            text: "The UI looks clean, but can you handle complex backend integrations and full-stack architecture?",
            avatarBg: "bg-zinc-700",
        },
        {
            id: 2,
            sender: "me",
            name: "Janitha Kapuwatta",
            text: "Absolutely. I specialize in building secure, scalable systems using Next.js, Supabase, and headless CMS platforms. Check out the architecture flows below.",
            avatarBg: "bg-blue-600",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 1.5,
                delayChildren: 0.5,
            },
        },
    };

    const bubbleVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.9 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: "spring", stiffness: 200, damping: 20 }
        },
    };

    return (
        <section className="flex w-full justify-center py-20 bg-zinc-950 overflow-hidden border-t border-white/5">
            <motion.div
                className="flex w-full max-w-2xl flex-col gap-6 px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {messages.map((msg) => {
                    const isMe = msg.sender === "me";

                    return (
                        <motion.div
                            key={msg.id}
                            variants={bubbleVariants}
                            className={`flex w-full items-end gap-3 ${isMe ? "justify-end" : "justify-start"
                                }`}
                        >
                            {/* Avatar for Lead (Left Side) */}
                            {!isMe && (
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.avatarBg} text-white shadow-lg`}>
                                    <User size={20} />
                                </div>
                            )}

                            {/* Message Bubble */}
                            <div className="flex flex-col gap-1 max-w-[75%]">
                                <span className={`text-xs text-zinc-500 px-2 ${isMe ? "text-right" : "text-left"}`}>
                                    {msg.name}
                                </span>
                                <div
                                    className={`relative rounded-2xl px-5 py-3 text-sm md:text-base leading-relaxed shadow-xl border ${isMe
                                        ? "bg-linear-to-br from-indigo-500 to-blue-600 text-white border-blue-400/20 rounded-br-sm"
                                        : "bg-zinc-800/80 text-zinc-100 border-white/5 backdrop-blur-md rounded-bl-sm"
                                        }`}
                                >
                                    {msg.text}
                                </div>
                            </div>

                            {/* Avatar for You (Right Side) */}
                            {
                                isMe && (
                                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${msg.avatarBg} text-white shadow-lg`}>
                                        <TerminalSquare size={18} />
                                    </div>
                                )
                            }
                        </motion.div>
                    );
                })}
            </motion.div>
        </section >
    );
}