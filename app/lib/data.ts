import fs from "fs";
import path from "path";
import { DiscordBadge, DiscordRole, DiscordUser } from "../types";

const dataDir = path.join(process.cwd(), "data");

const readJson = <T>(file: string): T => {
  const filePath = path.join(dataDir, file);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
};

export const getRoles = (): DiscordRole[] => readJson<DiscordRole[]>("roles.json");
export const getBadges = (): DiscordBadge[] => readJson<DiscordBadge[]>("badges.json");
export const getUsers = (): DiscordUser[] => readJson<DiscordUser[]>("users.json");

export const findUser = (username: string): DiscordUser | undefined =>
  getUsers().find((user) => user.username.toLowerCase() === username.toLowerCase());

export const enrichUser = (user: DiscordUser, roles: DiscordRole[], badges: DiscordBadge[]) => {
  const role = roles.find((r) => r.id === user.roleId);
  const enrichedBadges = user.badges
    .map((badgeId) => badges.find((badge) => badge.id === badgeId))
    .filter((badge): badge is DiscordBadge => Boolean(badge));

  return {
    ...user,
    role,
    enrichedBadges
  };
};
