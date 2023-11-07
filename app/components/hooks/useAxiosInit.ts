// import Axios from 'axios';
// import Cookies from 'js-cookie';
// import getConfig from 'next/config';
// const { publicRuntimeConfig } = getConfig();

//  Initialise axios
// const useAxiosInit = () => {
//   axios.defaults.baseURL = publicRuntimeConfig.base_url;
//   const token: string =
//     Cookies.get('jwtToken') &&
//     JSON.parse((Cookies.get('jwtToken') as unknown as string) || '');
//   const TOKEN = `Bearer ${token}`;
//   // Assign the token globally
//   if (TOKEN) {
//     axios.defaults.headers.common['Authorization'] = TOKEN;
//     axios.defaults.headers.common['Content-Type'] = 'application/json';
//   }
//   return [axios];
// };

// const useAxiosInit = () => {
//   const axios = Axios.create({
//     baseURL: publicRuntimeConfig.base_url,
//   });
//   console.log(Cookies.get('jwtToken'), 'set');
//   const token: string =
//     Cookies.get('jwtToken') &&
//     JSON.parse((Cookies.get('jwtToken') as unknown as string) || '');
//   const TOKEN = `Bearer ${token}`;
//   // Assign the token globally
//   if (TOKEN) {
//     axios.defaults.headers.common['Authorization'] = TOKEN;
//     axios.defaults.headers.common['Content-Type'] = 'application/json';
//   }
//   return [axios];
// };

// export default useAxiosInit;
