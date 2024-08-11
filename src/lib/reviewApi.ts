import { Review, Wine, WineReview } from "@/types/wineTypes";
import axios from "./axios";
import { SendReview } from "@/types/reviewTypes";

export const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

export const getWineId = async (id: string) => {
  try {
    const response = await axios.get<WineReview>(`wines/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching wines", error);
    throw error;
  }
};

export const getReviewId = async (id: number) => {
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

export const deleteReview = async (id: number) => {
  let res;
  try {
    const token = getAccessToken();

    res = await axios.delete(`reviews/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }

  return res.status === 200;
};

export const patchReview = async (reviewId: number, reviewData: SendReview) => {
  try {
    const token = getAccessToken();

    const { id, teamId, user, wineId, updatedAt, createdAt, ...dataToPatch } =
      reviewData;

    await axios.patch(`reviews/${reviewId}`, dataToPatch, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error patching review:", error);
    throw error;
  }
};

export const createLike = async (id: number) => {
  try {
    const token = getAccessToken();

    await axios.post(`reviews/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating like:", error);
    throw error;
  }
};

export const deleteLike = async (id: number) => {
  try {
    const token = getAccessToken();

    await axios.delete(`reviews/${id}/like`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error deleting like:", error);
    throw error;
  }
};
