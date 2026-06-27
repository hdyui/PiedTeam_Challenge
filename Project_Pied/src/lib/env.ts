const API_URL = "http://localhost:5000/api/v1";

if (!API_URL) {
  throw new Error("Error");
}

export const env = {
  API_URL,
} as const;
