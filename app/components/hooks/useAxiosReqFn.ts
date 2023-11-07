// import { useQuery } from '@tanstack/react-query';
// import axios, { AxiosError } from 'axios';
// import { enqueueSnackbar } from 'notistack';

// type postRequestInterface = {
//   path: string;
//   body: object;
//   method?: string;
// };

// type axiosRequestInterface = {
//   path: string;
//   body: object;
//   method: string;
//   successMessage?: string;
//   errorMessage?: string;
// };

// // Reusable hooks for axios request
// export const axiosRequestFn = async ({
//   path,
//   body,
//   method,
//   successMessage = 'Success',
//   errorMessage = 'Something went wrong. Please try again',
// }: axiosRequestInterface) => {
//   try {
//     const res = await axios(path, {
//       method,
//       data: body,
//     });
//     enqueueSnackbar({
//       message: successMessage,
//       variant: 'success',
//     });
//     return res?.data;
//   } catch (error: unknown) {
//     if (error instanceof AxiosError) {
//       enqueueSnackbar({
//         message: error.response?.data.message
//           ? error.response?.data.message
//           : errorMessage,
//         variant: 'error',
//       });
//     } else {
//       enqueueSnackbar({
//         message: errorMessage,
//         variant: 'error',
//       });
//     }

//     throw error;
//   }
// };

// // Reusable hooks for post request
// export const postRequestFn = async ({ path, body }: postRequestInterface) => {
//   try {
//     if (localStorage.getItem('user')) {
//       const res = await axios(path, {
//         method: 'POST',
//         data: body,
//       });
//       return res?.data;
//     }
//   } catch (error) {
//     if ((error as any)?.response?.status === 403) {
//       enqueueSnackbar({
//         message: 'Forbidden',
//         variant: 'error',
//       });
//       return;
//     }
//     throw error;
//   }
// };

// //  Reusable hook for post request
// const usePostRequestByDataToFetch = (
//   path: string,
//   key: string | any[],
//   body: object,
//   enabled = true,
//   refetchInterval: boolean | number = false,
// ) => {
//   const { data, isLoading, error, refetch, isFetching, isSuccess } = useQuery(
//     [key, path, body],
//     () => postRequestFn({ path, body }),
//     {
//       enabled: enabled,
//       retry: 1,
//       refetchInterval: refetchInterval,
//     },
//   );

//   return { data, isLoading, error, refetch, isFetching, isSuccess };
// };

// export default usePostRequestByDataToFetch;
