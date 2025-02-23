export const DOMAIN =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DOMAIN_NAME!
    : "http://localhost:3000";
    
export const API_BASE_URL = `${DOMAIN}/api`;
