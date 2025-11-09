import { GetStaticProps } from "next";
import { useMemo, useState } from "react";
import Layout from "../app/components/Layout";
import MemberCard from "../app/components/MemberCard";
import RankingList from "../app/components/RankingList";
import { DiscordBadge, DiscordRole, DiscordUser } from "../app/types";
import { getBadges, getRoles, getUsers } from "../app/lib/data";

interface MembersPageProps {
  roles: DiscordRole[];
  badges: DiscordBadge[];
  users: DiscordUser[];
}

const MembersPage = ({ roles, badges, users }: MembersPageProps) => {
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filteredUsers = useMemo(() => {
    return users
      .filter((user) => (filterRole ? user.roleId === filterRole : true))
      .filter((user) => user.username.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => (b.activityScore ?? 0) - (a.activityScore ?? 0));
  }, [filterRole, search, users]);

  const knights = filteredUsers.filter((user) => user.roleId === "knight");
  const civilians = filteredUsers.filter((user) => user.roleId === "civil");

  const ranking = useMemo(
    () =>
      [...users]
        .filter((user) => user.roleId === "knight")
        .sort((a, b) => (b.activityScore ?? 0) - (a.activityScore ?? 0))
        .slice(0, 5)
        .map((user) => ({ username: user.username, score: user.activityScore ?? 0, avatar: user.avatar })),
    [users]
  );

  const roleTheme = (roleId: string) => (roleId === "knight" ? "knight" : "civil");

  const badgeLookup = useMemo(() => {
    return badges.reduce<Record<string, DiscordBadge>>((acc, badge) => {
      acc[badge.id] = badge;
      return acc;
    }, {});
  }, [badges]);

  return (
    <Layout title="Membres - Les Pâtes Graphiques">
      <section className="px-8 py-16">
        <header className="mb-12 flex flex-col gap-6 text-center">
          <h1 className="text-5xl font-display uppercase tracking-[0.8rem]">Membres</h1>
          <p className="text-white/70 max-w-3xl mx-auto">
            Parcours les Chevaliers Graphiques et les Civils Pâtes Graphiques. Filtre par rôle, recherche par pseudo et découvre
            les citations croustillantes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setFilterRole(null)}
              className={`rounded-full border px-5 py-2 uppercase tracking-[0.3em] text-xs transition ${
                !filterRole ? "border-civil-glow bg-white/10" : "border-white/10 text-white/60"
              }`}
            >
              Tous
            </button>
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setFilterRole(role.id)}
                className={`rounded-full border px-5 py-2 uppercase tracking-[0.3em] text-xs transition ${
                  filterRole === role.id ? "border-white/40 bg-white/10" : "border-white/10 text-white/60"
                }`}
              >
                {role.name}
              </button>
            ))}
          </div>
          <input
            type="search"
            placeholder="Rechercher un membre"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="mx-auto w-full max-w-xl rounded-full border border-white/10 bg-white/5 px-6 py-3 text-center text-sm uppercase tracking-[0.3em] placeholder:text-white/40"
          />
        </header>

        <div className="grid gap-12 md:grid-cols-[2fr_1fr]">
          <div className="space-y-10">
            <h2 className="text-3xl font-display uppercase tracking-[0.5rem] text-knight-aura">Chevaliers Graphiques</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {knights.map((member) => (
                <MemberCard
                  key={member.username}
                  username={member.username}
                  avatar={member.avatar}
                  role="Chevalier"
                  quote={member.quote}
                  activity={member.activity}
                  badges={member.badges.map((badgeId) => badgeLookup[badgeId]).filter(Boolean)}
                  theme="knight"
                />
              ))}
            </div>

            <h2 className="text-3xl font-display uppercase tracking-[0.5rem] text-civil-glow">Civiles Pâtes Graphiques</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {civilians.map((member) => (
                <MemberCard
                  key={member.username}
                  username={member.username}
                  avatar={member.avatar}
                  role="Civil"
                  quote={member.quote}
                  activity={member.activity}
                  badges={member.badges.map((badgeId) => badgeLookup[badgeId]).filter(Boolean)}
                  theme="civil"
                />
              ))}
            </div>
          </div>

          <aside className="space-y-6">
            <RankingList entries={ranking} />
            <div className="rounded-3xl border border-white/10 bg-[#080a18]/80 p-6 shadow-2xl backdrop-blur">
              <h3 className="text-2xl font-display uppercase tracking-[0.3rem] mb-4">Filtres rapides</h3>
              <div className="space-y-3 text-sm text-white/70">
                <p>• Tri automatique par activité.</p>
                <p>• Survole un membre pour révéler sa citation.</p>
                <p>• Active le mode Pâtes Sacrées pour un monde doré.</p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps<MembersPageProps> = async () => {
  const roles = getRoles();
  const badges = getBadges();
  const users = getUsers();

  return {
    props: {
      roles,
      badges,
      users
    }
  };
};

export default MembersPage;
