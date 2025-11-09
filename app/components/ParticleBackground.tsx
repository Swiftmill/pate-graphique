import { useMemo } from "react";
import { motion } from "framer-motion";

const ParticleBackground = () => {
  const particles = useMemo(
    () =>
      Array.from({ length: 60 }, (_, i) => ({
        id: i,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 10,
        x: Math.random() * 100,
        y: Math.random() * 100
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{
            opacity: [0.2, 0.9, 0.4],
            scale: [0.8, 1.2, 1],
            y: [particle.y + 10, particle.y - 10, particle.y + 5]
          }}
          transition={{
            repeat: Infinity,
            duration: particle.duration,
            delay: particle.delay,
            ease: "easeInOut"
          }}
          className="absolute rounded-full bg-gradient-to-br from-knight-neon/40 via-civil-glow/50 to-white/30 backdrop-blur"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`
          }}
        />
      ))}
    </div>
  );
};

export default ParticleBackground;
