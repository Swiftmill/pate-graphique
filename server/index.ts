import express from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import cookieParser from "cookie-parser";
import { DiscordBadge, DiscordRole, DiscordUser } from "../app/types";

const PORT = process.env.PORT ?? 4000;
const SESSION_SECRET = process.env.SESSION_SECRET ?? "pates-graphiques-secret";
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? "admin";
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH ?? bcrypt.hashSync("pasta123", 10);

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: false
    }
  })
);

const dataDir = path.join(process.cwd(), "data");

const readJson = <T>(file: string): T => {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
};

const writeJson = <T>(file: string, data: T) => {
  const filePath = path.join(dataDir, file);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
};

const requireAuth: express.RequestHandler = (req, res, next) => {
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).send("Non autorisé");
  }
};

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (username !== ADMIN_USERNAME) {
    return res.status(401).send("Identifiants invalides");
  }

  const valid = await bcrypt.compare(password ?? "", ADMIN_PASSWORD_HASH);

  if (!valid) {
    return res.status(401).send("Identifiants invalides");
  }

  if (req.session) {
    req.session.user = { username, role: "admin" };
  }

  res.json({ success: true });
});

app.post("/auth/logout", (req, res) => {
  req.session?.destroy(() => {
    res.json({ success: true });
  });
});

app.get("/auth/session", (req, res) => {
  res.json({ session: req.session?.user ?? null });
});

app.get("/admin/data", requireAuth, (_req, res) => {
  const users = readJson<DiscordUser[]>("users.json");
  const roles = readJson<DiscordRole[]>("roles.json");
  const badges = readJson<DiscordBadge[]>("badges.json");

  res.json({ users, roles, badges });
});

app.post("/admin/users", requireAuth, (req, res) => {
  const users = readJson<DiscordUser[]>("users.json");
  const body = req.body as Partial<DiscordUser>;

  if (!body.username) {
    return res.status(400).send("Le pseudo est requis");
  }

  const existingIndex = users.findIndex((user) => user.username === body.username);
  const newUser: DiscordUser = {
    username: body.username,
    displayName: body.displayName ?? body.username,
    avatar: body.avatar ?? "/avatars/sir-pixel.svg",
    banner: body.banner ?? "/banners/knight-energy.svg",
    roleId: body.roleId ?? "knight",
    biography: body.biography ?? "Nouvelle légende en écriture...",
    quote: body.quote ?? "",
    activity: body.activity ?? "En ligne",
    badges: body.badges ?? [],
    discordId: body.discordId,
    status: body.status ?? "online",
    activityScore: body.activityScore ?? 0,
    legend: body.legend ?? false
  };

  if (existingIndex >= 0) {
    users[existingIndex] = newUser;
  } else {
    users.push(newUser);
  }

  writeJson("users.json", users);
  res.json(newUser);
});

app.delete("/admin/users/:username", requireAuth, (req, res) => {
  const users = readJson<DiscordUser[]>("users.json");
  const username = req.params.username;

  const filtered = users.filter((user) => user.username !== username);
  writeJson("users.json", filtered);

  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Admin server ready on http://localhost:${PORT}`);
});
