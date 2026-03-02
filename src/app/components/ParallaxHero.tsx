import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function ParallaxHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

    return (
        <div ref={containerRef} className="relative h-screen overflow-hidden">
            {/* Fixed Background Logo */}
            <div className="fixed inset-0 flex items-center justify-center z-0 pointer-events-none">
                <motion.div
                    style={{ opacity, scale }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-lg px-8"
                >
                    <img
                        src="/logo-titular.png"
                        alt="La Titular Perfumería"
                        className="w-full h-auto object-contain opacity-90 drop-shadow-2xl"
                    />
                </motion.div>
            </div>

            {/* Hero Content (Floating above) */}
            <div className="relative z-10 h-full flex flex-col items-center justify-end pb-20 bg-gradient-to-b from-transparent to-black/30">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="text-center"
                >
                    <div className="w-1 h-20 bg-white/30 mx-auto mb-6 animate-bounce" />
                    <p className="font-['Montserrat'] text-white/70 uppercase tracking-[0.4em] text-xs">
                        Desliza para explorar
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
