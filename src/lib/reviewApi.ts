import { Review, Wine, WineReview } from "@/types/wineTypes";
import axios from "./axios";
import { SendReview } from "@/types/reviewTypes";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getWineId = async (id: string): Promise<WineReview> => {
  try {
    const response = await axios.get<WineReview>(`wines/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wines", error);
    throw error;
  }
};

export const getReviewId = async (id: number): Promise<Review> => {
  try {
    const response = await axios.get<Review>(`reviews/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wines", error);
    throw error;
  }
};

export const createReview = async (
  reviewData: SendReview
): Promise<SendReview> => {
  try {
    const token = getAccessToken();

    const response = await axios.post("reviews/", reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
};
