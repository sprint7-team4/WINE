import axios from "axios";
import {
  ProfileData,
  Review,
  Wine,
  ReviewsResponse,
  WinesResponse,
} from "@/types/myProfileTypes";
import instance from "./axios";

const getAccessToken = () => {
  return localStorage.getItem("accessToken");
};

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  data?: dataType | OauthDataType | UpdateUserData | FormData;
}

type OauthDataType = {
  state?: string;
  redirectUri?: string;
  token: string | string[] | undefined;
  provider?: string;
};

type dataType = {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
};

type UpdateUserData = {
  nickname?: string;
  image?: string;
};

const fetchRequest = async (url: string, options: RequestOptions) => {
  try {
    const response = await instance(url, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      throw new Error(error.response.data.message || "요청에 실패했습니다.");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("요청에 실패했습니다.");
    }
  }
};

export const getUser = async (): Promise<ProfileData | undefined> => {
  const token = getAccessToken();

  const url = "/users/me";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };
  return fetchRequest(url, options);
};

export const getReviews = async (
  limit: number = 10,
  cursor?: number
): Promise<ReviewsResponse> => {
  const token = getAccessToken();
  const url = `/users/me/reviews?limit=${limit}${cursor ? `&cursor=${cursor.toString()}` : ""}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data: ReviewsResponse = await fetchRequest(url, options);
  return data;
};

export const getWines = async (
  limit: number = 10,
  cursor?: number
): Promise<WinesResponse> => {
  const token = getAccessToken();

  const url = `/users/me/wines?limit=${limit}${cursor ? `&cursor=${cursor.toString()}` : ""}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  const data: WinesResponse = await fetchRequest(url, options);
  return data;
};

export const updateUser = async (
  data: UpdateUserData
): Promise<ProfileData> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const url = "/users/me";
  const options: RequestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data,
  };

  return fetchRequest(url, options);
};

export const uploadImage = async (file: File): Promise<string> => {
  const token = getAccessToken();
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const formData = new FormData();
  formData.append("image", file);

  const url = "/images/upload";
  const options: RequestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: formData,
  };

  const response = await fetchRequest(url, options);
  return response.url;
};
