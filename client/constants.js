const localhostApiUrl = 'http://localhost:3000/api/v1';

export const API_URL = 
  process.env.NODE_ENV === 'test' ? localhostApiUrl : import.meta.env.VITE_API_URL;
