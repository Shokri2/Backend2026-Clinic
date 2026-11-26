// Base URL of the backend server (without the /api suffix).
// Set VITE_API_URL in .env (development) and .env.production (deployment).
export const SERVER_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/api\/?$/, "");
