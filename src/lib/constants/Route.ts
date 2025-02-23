export const DOMAIN: string =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_DOMAIN_NAME!
    : "http://localhost:3000";
export const ROOT: string = `/`;
export const LOGIN: string = `${ROOT}login`;
export const SIGN_OUT: string = `${ROOT}signout`;
export const VERIFY_REQUEST: string = `${ROOT}/api/auth/callback/google`;
export const DASHBOARD: string = `${ROOT}dashboard`;

export const TODOS: string = `${DASHBOARD}/todo`;
