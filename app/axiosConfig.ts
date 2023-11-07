import axios from 'axios';
import Cookies from 'js-cookie';

// console.log(Cookies.get('jwt'), 'jwt');
// console.log(localStorage.getItem('jwt'), 'jwtlocal');

// const token: string | null =
//   window.localStorage.getItem('jwt') && window.localStorage.getItem('jwt');
const token: string | null | undefined =
  Cookies.get('accessTokenJwt') && Cookies.get('accessTokenJwt');
const TOKEN = `Bearer ${token}`;

console.log(TOKEN, 'Token');

const Axios = axios.create({
  // configurations
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: TOKEN,
    'Content-Type': 'application/json',
  },
});

export default Axios;
