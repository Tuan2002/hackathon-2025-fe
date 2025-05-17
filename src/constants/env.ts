const ENVIRONMENT = {
  BACKEND_URL: import.meta.env.VITE_BACKEND_URL || '',
  CLOUD_NAME: import.meta.env.VITE_CLOUD_NAME || '',
  CLOUD_BASE_URL: import.meta.env.VITE_CLOUD_BASE_URL || '',
  CLOUD_API_KEY: import.meta.env.VITE_CLOUD_API_KEY || '',
  CLOUD_API_SECRET: import.meta.env.VITE_CLOUD_API_SECRET || '',
  CLOUDINARY_URL: import.meta.env.VITE_CLOUDINARY_URL || '',
  AUTH_SERVER_URL: import.meta.env.VITE_AUTH_SERVER_URL || '',
  AUTH_CLIENT_ID: import.meta.env.VITE_CLIENT_ID || '',
  REDIRECT_URL: import.meta.env.VITE_REDIRECT_URL || '',
  VITE_TTS_TOKEN: import.meta.env.VITE_TTS_TOKEN || '',
};
export default ENVIRONMENT;
