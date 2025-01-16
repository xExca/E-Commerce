import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosAPI from '../axios-api';
import Swal from 'sweetalert2';

// Fetch all data
export const useGetAPI = (endpoint:string, options = {}) => {
  return useQuery({
    queryKey: [endpoint],
    queryFn: async () => {
      try {
        const { data } = await axiosAPI.get(endpoint);
        return data;
      } catch (error) {
          throw error; // Let React Query handle Axios errors
      }
    },
    ...options,
  });
};

// // Fetch one data item
export const useGetDataAPI = (endpoint: string, id: number, options = {}) => {
  return useQuery({
    queryKey: [endpoint, id], // Cache key based on endpoint and id
    queryFn: async () => {
      const { data } = await axiosAPI.get(`${endpoint}/${id}`);
      return data; // Return the data received from the API
    },
    ...options, // Spread additional options for the query (like refetching, etc.)
  });
};

// // Create data
// export const useCreateAPI = (endpoint:string, options = {}) => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async (newData) => {
//       try {
//         const { data } = await axiosAPI.post(endpoint, newData);
//         return data;
//       } catch (error) {
//         if (axiosAPI.isAxiosError(error)) {
//           throw error;
//         }
//         throw new Error('An unknown error occurred');
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: [endpoint] });
//       },
//       ...options,
//     }
//   );
// };

// // Delete data
// export const useDeleteAPI = (endpoint:string, options = {}) => {
//   const queryClient = useQueryClient();
//   return useMutation(
//     async (id:number) => {
//       try {
//         const { data } = await axiosAPI.delete(`${endpoint}/${id}`);
//         return data;
//       } catch (error) {
//         if (axiosAPI.isAxiosError(error)) {
//           throw error;
//         }
//         throw new Error('An unknown error occurred');
//       }
//     },
//     {
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: [endpoint] });
//       },
//       ...options,
//     }
//   );
// };