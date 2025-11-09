import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { href: "/", label: "Accueil" },
  { href: "/members", label: "Membres" },
  { href: "/hall-des-legendes", label: "Hall des Légendes" },
  { href: "/panel", label: "Panel Admin" }
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-20 flex items-center justify-between px-8 py-6 backdrop-blur bg-[#05070f]/70 border-b border-white/5 shadow-lg"
    >
      <Link href="/" className="flex items-center gap-3 text-2xl font-display tracking-[0.4em]">
        <span className="relative inline-flex items-center">
          <span className="absolute -inset-3 rounded-full bg-gradient-to-r from-knight-neon via-civil-glow to-knight-aura opacity-60 blur" />
          <span className="relative font-bold uppercase text-transparent bg-clip-text bg-gradient-to-r from-knight-neon via-white to-civil-glow">
            GPU🍝
          </span>
        </span>
      </Link>
      <div className="flex items-center gap-6 text-sm uppercase">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="group relative px-4 py-2 font-semibold tracking-[0.3em] text-white/70 hover:text-white"
          >
            <span className="absolute inset-x-1 bottom-0 h-[2px] bg-gradient-to-r from-knight-aura to-civil-glow opacity-0 transition-opacity group-hover:opacity-100" />
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
