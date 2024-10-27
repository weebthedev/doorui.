"use client"

import { Badge } from "@/components/ui/badge";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Features() {
    const { scrollYProgress } = useScroll();
    
    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const translateY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

    return (
        <div className="w-full py-20 lg:py-40">
            <motion.div 
                className="container mx-auto text-center mb-10"
                style={{ opacity, y: translateY }}
            >
                <h1 className="text-3xl md:text-5xl font-bold">Features</h1>
            </motion.div>
            <div className="container mx-auto">
                {/* Original Section */}
                <motion.div 
                    className="flex flex-col lg:flex-row gap-10 lg:items-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex gap-4 flex-col flex-1">
                        <div>
                            <Badge>Platform</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                                This is the start of something new
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                Managing a small business today is already tough. Avoid further
                                complications by ditching outdated, tedious trade methods. Our
                                goal is to streamline SMB trade, making it easier and faster than
                                ever.
                            </p>
                        </div>
                    </div>
                    <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
                </motion.div>

                {/* Opposite Layout Section */}
                <motion.div 
                    className="flex flex-col-reverse lg:flex-row gap-10 lg:items-center mt-20"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="bg-muted rounded-md w-full aspect-video h-full flex-1"></div>
                    <div className="flex gap-4 pl-0 lg:pl-20 flex-col flex-1">
                        <div>
                            <Badge>Platform</Badge>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="text-xl md:text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular text-left">
                                This is the end of something old
                            </h2>
                            <p className="text-lg max-w-xl lg:max-w-sm leading-relaxed tracking-tight text-muted-foreground text-left">
                                Managing a large corporation today is already easy. Embrace further
                                simplicity by adopting modern, efficient trade methods. Our
                                goal is to complicate enterprise trade, making it more challenging and slower than
                                ever before.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}