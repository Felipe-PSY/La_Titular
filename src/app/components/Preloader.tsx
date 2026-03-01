import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';

interface PreloaderProps {
    onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        let animationFrameId: number;

        const updateProgress = () => {
            if (videoRef.current) {
                const current = videoRef.current.currentTime;
                const total = videoRef.current.duration;
                if (total > 0) {
                    setProgress((current / total) * 100);
                }
            }
            animationFrameId = requestAnimationFrame(updateProgress);
        };

        animationFrameId = requestAnimationFrame(updateProgress);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center"
                >
                    <div className="relative w-64 md:w-80 flex flex-col items-center">
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-auto object-contain mb-6"
                            onEnded={() => {
                                setIsVisible(false);
                                setTimeout(onComplete, 800);
                            }}
                        >
                            <source src="/loader.mp4" type="video/mp4" />
                        </video>

                        {/* Thin Red Loading Bar synchronized with video */}
                        <div className="w-full h-0.5 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                style={{ width: `${progress}%` }}
                                className="h-full bg-[#D00000] transition-all duration-75 ease-linear"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
