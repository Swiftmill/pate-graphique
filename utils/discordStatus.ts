import axios from "axios";
import { DiscordUser } from "../app/types";

interface DiscordPresenceResponse {
  data: {
    activities?: { name: string }[];
    status?: string;
  };
}

export const fetchDiscordPresence = async (user: DiscordUser) => {
  if (!user.discordId) return { status: user.status ?? "offline", activity: user.activity };

  try {
    const response = await axios.get<DiscordPresenceResponse>(`https://discord.com/api/users/${user.discordId}/profile`, {
      headers: {
        Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN ?? ""}`
      }
    });

    return {
      status: response.data?.data?.status ?? user.status ?? "offline",
      activity: response.data?.data?.activities?.[0]?.name ?? user.activity
    };
  } catch (error) {
    return {
      status: user.status ?? "offline",
      activity: user.activity
    };
  }
};
