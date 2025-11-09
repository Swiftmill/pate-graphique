const API_BASE_URL = process.env.NEXT_PUBLIC_ADMIN_API ?? "http://localhost:4000";

export const apiFetch = async (path: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {})
    },
    ...options
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Erreur de l'API admin");
  }

  return response.json();
};

export default API_BASE_URL;
