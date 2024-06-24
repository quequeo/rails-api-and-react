const localhostApiVersion = 'v1';
const localhostApiUrl = `http://localhost:3000/api/${localhostApiVersion}`

export const API_URL = 
  process.env.NODE_ENV === 'test' ? localhostApiUrl : import.meta.env.VITE_API_URL;
