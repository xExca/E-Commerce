import { useQuery, useMutation, useQueryClient,UseMutationOptions, QueryClient  } from '@tanstack/react-query';
import axiosAPI from '../axios-api';
import { Axios, AxiosError, isAxiosError } from 'axios';

type AddToCartPayload = {
  product_id: number;
  user_id: number;
}
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

// Create data
export const usePostAPI = (endpoint:string) => {
  return useMutation({
    mutationFn: async (values: any) => {
      const data = JSON.stringify(values);
      try {
        const response = await axiosAPI.post(endpoint, data);
        return response.data;
      }
      catch (error: unknown){
        if(error instanceof AxiosError){
          console.log(error);
        }else{
          console.log("usePostAPI error: ", error);
        }
      }
    }
  })
}

export const useDeleteAPI = (endpoint: string) => {
  return useMutation({
    mutationFn: async ({ card_id, user_id }: { card_id: number; user_id: number }) => {
      try {
        const response = await axiosAPI.delete(`${endpoint}/${card_id}`, {
          data: { user_id }, // Send additional payload if needed
        });
        return response.data;
      } catch (error) {
        console.error(error);
        throw error; // Ensure errors propagate to the `onError` callback
      }
    },
  });
};