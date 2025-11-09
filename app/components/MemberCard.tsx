import Image from "next/image";
import { motion } from "framer-motion";
import { DiscordBadge } from "../types";

interface MemberCardProps {
  username: string;
  avatar: string;
  role: string;
  quote: string;
  activity: string;
  badges: DiscordBadge[];
  theme: "knight" | "civil";
}

const MemberCard = ({ username, avatar, role, quote, activity, badges, theme }: MemberCardProps) => {
  const auraClass = theme === "knight" ? "from-knight-neon via-knight-aura to-white" : "from-civil-glow via-civil-aura to-white";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="relative rounded-3xl border border-white/10 bg-[#0d0f1e]/70 p-6 shadow-2xl backdrop-blur-lg overflow-hidden group"
    >
      <div className={`absolute inset-0 opacity-40 blur-3xl bg-gradient-to-br ${auraClass}`} />
      <div className="relative z-10 flex gap-5 items-center">
        <div className="relative h-24 w-24">
          <Image
            src={avatar}
            alt={username}
            fill
            sizes="96px"
            className="rounded-2xl object-cover border-2 border-white/20 shadow-xl"
          />
          <span className="absolute -right-2 -bottom-2 rounded-full bg-[#05070f] px-3 py-1 text-xs uppercase tracking-[0.3em] border border-white/10">
            {role}
          </span>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="text-2xl font-semibold">{username}</h4>
          <p className="text-white/70 italic">“{quote}”</p>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60">
            <span className="h-[1px] w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            Activité : {activity}
          </div>
          <div className="flex flex-wrap gap-2">
            {badges.map((badge) => (
              <span
                key={badge.id}
                className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase border border-white/20"
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>
      </div>
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/60 flex items-center justify-center text-center p-6"
        initial={false}
      >
        <p className="text-white/80 text-sm">{quote}</p>
      </motion.div>
    </motion.div>
  );
};

export default MemberCard;
