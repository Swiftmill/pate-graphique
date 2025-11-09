import { FormEvent, useEffect, useState } from "react";
import useSWR from "swr";
import Layout from "../../app/components/Layout";
import { DiscordBadge, DiscordRole, DiscordUser } from "../../app/types";
import { apiFetch } from "../../utils/apiClient";

interface AdminState {
  session: {
    username: string;
  } | null;
}

interface AdminData {
  users: DiscordUser[];
  roles: DiscordRole[];
  badges: DiscordBadge[];
}

const fetcher = (url: string) => apiFetch(url);

const PanelPage = () => {
  const { data: state, mutate } = useSWR<AdminState>("/auth/session", fetcher);
  const { data: adminData, mutate: mutateData } = useSWR<AdminData>(state?.session ? "/admin/data" : null, fetcher);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<DiscordUser>>({ roleId: "knight", badges: [] });
  const [preview, setPreview] = useState<DiscordUser | null>(null);

  useEffect(() => {
    if (form.username) {
      setPreview({
        username: form.username,
        displayName: form.displayName ?? form.username,
        avatar: form.avatar ?? "/avatars/sir-pixel.svg",
        banner: form.banner ?? "/banners/knight-energy.svg",
        roleId: form.roleId ?? "knight",
        biography: form.biography ?? "Bio épique à écrire...",
        quote: form.quote ?? "Citation légendaire en préparation...",
        activity: form.activity ?? "En ligne",
        badges: (form.badges as string[]) ?? [],
        status: form.status ?? "online",
        activityScore: form.activityScore ?? 0
      });
    }
  }, [form]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const formData = new FormData(event.currentTarget);
    const body = {
      username: formData.get("username"),
      password: formData.get("password")
    };

    try {
      await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify(body)
      });
      await mutate();
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleLogout = async () => {
    await apiFetch("/auth/logout", { method: "POST" });
    mutate(null);
  };

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    try {
      await apiFetch("/admin/users", {
        method: "POST",
        body: JSON.stringify(form)
      });
      await mutateData();
      setForm({ roleId: "knight", badges: [] });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const handleDelete = async (username: string) => {
    await apiFetch(`/admin/users/${username}`, { method: "DELETE" });
    await mutateData();
  };

  if (!state?.session) {
    return (
      <Layout title="Panel Admin - Les Pâtes Graphiques">
        <section className="px-6 py-16">
          <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl backdrop-blur">
            <h1 className="text-3xl font-display uppercase tracking-[0.5rem]">Connexion Admin</h1>
            <p className="mt-4 text-sm text-white/70">Authentification nécessaire pour gérer les membres.</p>
            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <input
                className="w-full rounded-full border border-white/10 bg-black/40 px-6 py-3 text-sm uppercase tracking-[0.3em]"
                placeholder="Pseudo"
                name="username"
                required
              />
              <input
                className="w-full rounded-full border border-white/10 bg-black/40 px-6 py-3 text-sm uppercase tracking-[0.3em]"
                placeholder="Mot de passe"
                type="password"
                name="password"
                required
              />
              <button
                className="w-full rounded-full bg-gradient-to-r from-knight-neon to-civil-glow px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#080a18]"
                type="submit"
              >
                Entrer dans le panel
              </button>
              {error && <p className="text-sm text-red-400">{error}</p>}
            </form>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout title="Panel Admin - Les Pâtes Graphiques">
      <section className="px-6 py-16">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-display uppercase tracking-[0.6rem]">Panel Admin</h1>
            <p className="text-white/60 text-sm">Bienvenue {state.session.username}</p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-full border border-white/10 bg-white/10 px-5 py-2 text-xs uppercase tracking-[0.3em]"
          >
            Déconnexion
          </button>
        </header>

        <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
          <form onSubmit={handleSave} className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
            <h2 className="text-2xl font-display uppercase tracking-[0.4rem]">Créer ou mettre à jour un membre</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Pseudo
                <input
                  value={form.username ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                  required
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Nom affiché
                <input
                  value={form.displayName ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, displayName: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Avatar (URL)
                <input
                  value={form.avatar ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, avatar: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Bannière (URL)
                <input
                  value={form.banner ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, banner: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60 md:col-span-2">
                Biographie
                <textarea
                  value={form.biography ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, biography: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                  rows={3}
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Citation
                <input
                  value={form.quote ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, quote: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Activité
                <input
                  value={form.activity ?? ""}
                  onChange={(event) => setForm((prev) => ({ ...prev, activity: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Statut
                <select
                  value={form.status ?? "online"}
                  onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                >
                  <option value="online">En ligne</option>
                  <option value="idle">Absent</option>
                  <option value="dnd">Ne pas déranger</option>
                  <option value="offline">Hors ligne</option>
                </select>
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Score héroïque
                <input
                  type="number"
                  value={form.activityScore ?? 0}
                  onChange={(event) => setForm((prev) => ({ ...prev, activityScore: Number(event.target.value) }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                />
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Rôle
                <select
                  value={form.roleId ?? "knight"}
                  onChange={(event) => setForm((prev) => ({ ...prev, roleId: event.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm"
                >
                  {adminData?.roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="space-y-2 text-xs uppercase tracking-[0.3em] text-white/60">
                Badges
                <select
                  multiple
                  value={(form.badges as string[]) ?? []}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      badges: Array.from(event.target.selectedOptions).map((option) => option.value)
                    }))
                  }
                  className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm h-32"
                >
                  {adminData?.badges.map((badge) => (
                    <option key={badge.id} value={badge.id}>
                      {badge.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <button
              type="submit"
              className="rounded-full bg-gradient-to-r from-knight-neon to-civil-glow px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#080a18]"
            >
              Enregistrer le membre
            </button>
            {error && <p className="text-sm text-red-400">{error}</p>}
          </form>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-display uppercase tracking-[0.4rem]">Aperçu en temps réel</h2>
              {preview ? (
                <div className="mt-4 space-y-3">
                  <h3 className="text-xl font-semibold">{preview.displayName}</h3>
                  <p className="text-white/70 text-sm">{preview.biography}</p>
                  <p className="text-white/60 text-xs uppercase tracking-[0.3em]">Activité: {preview.activity}</p>
                  <div className="flex flex-wrap gap-2">
                    {(preview.badges ?? []).map((badgeId) => (
                      <span key={badgeId} className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase">
                        {badgeId}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-sm text-white/60">Remplis le formulaire pour afficher un aperçu.</p>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
              <h2 className="text-2xl font-display uppercase tracking-[0.4rem]">Membres existants</h2>
              <div className="mt-4 space-y-3">
                {adminData?.users.map((user) => (
                  <div key={user.username} className="flex items-center justify-between rounded-2xl bg-black/30 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold">{user.displayName}</p>
                      <p className="text-xs text-white/60">{user.roleId}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(user.username)}
                      className="text-xs uppercase tracking-[0.3em] text-red-300"
                    >
                      Supprimer
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PanelPage;
