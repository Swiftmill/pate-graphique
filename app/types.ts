export interface DiscordBadge {
  id: string;
  label: string;
  description: string;
  color: string;
}

export interface DiscordRole {
  id: string;
  name: string;
  slug: string;
  theme: "knight" | "civil";
  description: string;
}

export interface DiscordUser {
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  roleId: string;
  biography: string;
  quote: string;
  activity: string;
  badges: string[];
  discordId?: string;
  status?: string;
  legend?: boolean;
  activityScore?: number;
}

export interface AdminSession {
  username: string;
  role: "admin";
}
