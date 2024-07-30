import axios from './axios';
import { GetWinesParams, GetWinesResponse } from '../types/wineTypes';

export const getWines = async (
  params: GetWinesParams
): Promise<GetWinesResponse> => {
  try {
    const response = await axios.get<GetWinesResponse>('wines', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching wines', error);
    throw error;
  }
};
