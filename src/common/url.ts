export const Backend_API_URL =
  process.env.NODE_ENV === "production"
    ? process.env.NEXT_PUBLIC_BACKEND_API_URL_PROD
    : process.env.NEXT_PUBLIC_BACKEND_API_URL_DEV;
