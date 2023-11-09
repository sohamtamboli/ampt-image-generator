import axios from 'axios';
import Cookies from 'js-cookie';

const token: string | null | undefined =
  Cookies.get('accessTokenJwt') && Cookies.get('accessTokenJwt');
const TOKEN = `Bearer ${token}`;

const Axios = axios.create({
  // configurations
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: TOKEN,
    'Content-Type': 'application/json',
  },
});

export default Axios;
