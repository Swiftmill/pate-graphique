import { GetStaticProps } from "next";
import Layout from "../app/components/Layout";
import ParticleBackground from "../app/components/ParticleBackground";
import { DiscordBadge, DiscordRole, DiscordUser } from "../app/types";
import { enrichUser, getBadges, getRoles, getUsers } from "../app/lib/data";

interface HallProps {
  legends: (DiscordUser & { role: DiscordRole | undefined; enrichedBadges: DiscordBadge[] })[];
}

const HallDesLegendes = ({ legends }: HallProps) => {
  return (
    <Layout title="Hall des Légendes - Les Pâtes Graphiques">
      <section className="relative min-h-[60vh] px-6 py-16">
        <ParticleBackground />
        <div className="mx-auto max-w-5xl space-y-12">
          <header className="text-center space-y-4">
            <h1 className="text-5xl font-display uppercase tracking-[0.8rem]">Hall des Légendes</h1>
            <p className="text-white/70">
              Les héros et héroïnes ayant marqué l'histoire des Pâtes Graphiques. Lumière bleue, dorure sacrée et memes éternels.
            </p>
          </header>

          <div className="grid gap-8">
            {legends.map((legend) => (
              <article
                key={legend.username}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-knight-neon/20 via-transparent to-civil-glow/20 opacity-60" />
                <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center">
                  <img
                    src={legend.avatar}
                    alt={legend.displayName}
                    className="h-32 w-32 rounded-3xl border border-white/20 object-cover"
                  />
                  <div className="flex-1 space-y-3 text-center md:text-left">
                    <h2 className="text-3xl font-display uppercase tracking-[0.5rem]">{legend.displayName}</h2>
                    <p className="text-white/70">{legend.biography}</p>
                    <blockquote className="text-white/80 italic">“{legend.quote}”</blockquote>
                    <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                      {legend.enrichedBadges.map((badge) => (
                        <span
                          key={badge.id}
                          className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]"
                        >
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Activité</p>
                    <p className="mt-2 text-lg font-semibold text-white">{legend.activity}</p>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60 mt-4">Score héroïque</p>
                    <p className="mt-2 text-lg font-semibold text-white">{legend.activityScore ?? 0}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<HallProps> = async () => {
  const roles = getRoles();
  const badges = getBadges();
  const users = getUsers();

  const legends = users
    .filter((user) => user.legend)
    .map((user) => enrichUser(user, roles, badges));

  return {
    props: {
      legends
    }
  };
};

export default HallDesLegendes;
