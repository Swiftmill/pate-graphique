import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { motion } from "framer-motion";
import Layout from "../../app/components/Layout";
import { DiscordBadge, DiscordRole, DiscordUser } from "../../app/types";
import { findUser, getBadges, getRoles, getUsers, enrichUser } from "../../app/lib/data";
import ParticleBackground from "../../app/components/ParticleBackground";

interface UserProfileProps {
  user: DiscordUser & {
    role: DiscordRole | undefined;
    enrichedBadges: DiscordBadge[];
  };
}

const bannerBackground = (roleSlug: string | undefined) =>
  roleSlug === "knight" ? "bg-knightGradient" : "bg-civilGradient";

const UserProfilePage = ({ user }: UserProfileProps) => {
  return (
    <Layout title={`${user.displayName} - Les Pâtes Graphiques`}>
      <section className="relative min-h-[60vh] overflow-hidden px-6 py-16">
        <div className={`absolute inset-0 opacity-50 ${bannerBackground(user.role?.theme)}`} />
        <ParticleBackground />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 mx-auto flex max-w-5xl flex-col gap-10 rounded-3xl border border-white/10 bg-black/40 p-10 shadow-2xl backdrop-blur"
        >
          <div className="flex flex-col items-center gap-6 text-center md:flex-row md:text-left md:items-start">
            <div className="relative h-40 w-40 flex-shrink-0">
              <Image src={user.avatar} alt={user.displayName} fill sizes="160px" className="rounded-3xl object-cover" />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]">
                {user.role?.name ?? "Membre"}
              </span>
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-4xl font-display uppercase tracking-[0.5rem]">{user.displayName}</h1>
              <p className="text-white/70">{user.biography}</p>
              <blockquote className="text-lg italic text-white/80">“{user.quote}”</blockquote>
              <div className="flex flex-wrap justify-center gap-3 md:justify-start">
                {user.enrichedBadges.map((badge) => (
                  <span
                    key={badge.id}
                    className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.3em]"
                    style={{
                      boxShadow: `0 0 18px ${badge.color}55`
                    }}
                  >
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/60">Activité</h2>
              <p className="mt-2 text-xl font-semibold text-white">{user.activity}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/60">Statut</h2>
              <p className="mt-2 text-xl font-semibold text-white">{user.status ?? "offline"}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
              <h2 className="text-sm uppercase tracking-[0.3em] text-white/60">Score héroïque</h2>
              <p className="mt-2 text-xl font-semibold text-white">{user.activityScore ?? 0}</p>
            </div>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const users = getUsers();

  return {
    paths: users.map((user) => ({ params: { username: user.username } })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps<UserProfileProps> = async ({ params }) => {
  const username = params?.username as string;
  const user = findUser(username);

  if (!user) {
    return {
      notFound: true
    };
  }

  const roles = getRoles();
  const badges = getBadges();

  return {
    props: {
      user: enrichUser(user, roles, badges)
    }
  };
};

export default UserProfilePage;
