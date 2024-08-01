import axios from "./axios";
import { GetWinesParams, GetWinesResponse, Wine } from "../types/wineTypes";

export const getWines = async (
  params: GetWinesParams
): Promise<GetWinesResponse> => {
  try {
    const res = await axios.get<GetWinesResponse>("wines", { params });
    return res.data;
  } catch (error) {
    console.error("Error fetching wines", error);
    throw error;
  }
};

export const getRecommendedWines = async (
  params: GetWinesParams
): Promise<Wine[]> => {
  try {
    const res = await axios.get<Wine[]>("wines/recommended", {
      params,
    });
    return res.data;
  } catch (error) {
    console.log("Error fetching recommended Wines", error);
    throw error;
  }
};
