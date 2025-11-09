import { motion } from "framer-motion";
import Link from "next/link";
import ParticleBackground from "./ParticleBackground";

interface RoleCardProps {
  title: string;
  description: string;
  href: string;
  theme: "knight" | "civil";
  icon: string;
}

const RoleCard = ({ title, description, href, theme, icon }: RoleCardProps) => {
  const isKnight = theme === "knight";

  return (
    <Link href={href}>
      <motion.article
        whileHover={{ scale: 1.03 }}
        className={`relative overflow-hidden rounded-3xl border border-white/10 px-10 py-14 shadow-xl transition-all duration-500 backdrop-blur glow-border ${
          isKnight ? "bg-gradient-to-br from-[#090e2d]/80 via-[#0b1c49]/60 to-[#020412]/90" : "bg-gradient-to-br from-[#302104]/70 via-[#4b3510]/50 to-[#0e0a04]/90"
        }`}
      >
        <ParticleBackground />
        <div
          className={`absolute inset-0 opacity-40 mix-blend-screen ${
            isKnight ? "bg-knightGradient" : "bg-civilGradient"
          }`}
        />
        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl">{icon}</span>
            <h3 className="font-display text-4xl uppercase tracking-[0.4em] text-white drop-shadow-xl">
              {title}
            </h3>
          </div>
          <p className="text-white/70 text-sm leading-relaxed max-w-md">{description}</p>
          <div className="mt-6 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.35em] uppercase">
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            Entrer dans le royaume
            <span className="h-[1px] w-16 bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          </div>
        </div>
      </motion.article>
    </Link>
  );
};

export default RoleCard;
