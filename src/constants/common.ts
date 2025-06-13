export const APP_CONFIG = {
    API_BASE_URL: String(import.meta.env.VITE_API_BASE_URL) || '',
    API_USER_ID: Number(import.meta.env.VITE_API_USER_ID) || 0,
    API_ACCESS_TOKEN: String(import.meta.env.VITE_API_ACCESS_TOKEN) || '',
};