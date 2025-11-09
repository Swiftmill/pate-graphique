import { motion } from "framer-motion";
import Layout from "../app/components/Layout";
import ParticleBackground from "../app/components/ParticleBackground";
import RoleCard from "../app/components/RoleCard";

const HomePage = () => {
  return (
    <Layout title="LES PÂTES GRAPHIQUES" description="Serveur Discord héroïque et croustillant">
      <section className="relative min-h-[80vh] flex flex-col items-center justify-center px-8 py-20 text-center">
        <ParticleBackground />
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative text-6xl md:text-8xl font-display uppercase tracking-[1.2rem] text-transparent bg-clip-text bg-gradient-to-r from-knight-neon via-white to-civil-glow drop-shadow-[0_0_35px_rgba(92,212,255,0.7)]"
        >
          LES PÂTES GRAPHIQUES.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-8 max-w-2xl text-lg text-white/70"
        >
          Un serveur Discord où les chevaliers du GPU croisent le fer avec des civils dorés, le tout arrosé d'humour al-dente.
        </motion.p>
        <div className="mt-16 grid w-full max-w-5xl gap-10 md:grid-cols-2">
          <RoleCard
            title="Chevaliers Graphiques"
            description="Les héros bleutés du rendu, porteurs d'auras électriques et gardiens des pixels sacrés."
            href="/members?role=knight"
            theme="knight"
            icon="⚔️"
          />
          <RoleCard
            title="Civiles Pâtes Graphiques"
            description="Les civil·e·s dorés qui nourrissent le royaume avec humour, pâtes et reflets culinaires."
            href="/members?role=civil"
            theme="civil"
            icon="🍝"
          />
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
