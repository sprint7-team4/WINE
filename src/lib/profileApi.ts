import axios from "axios";
import { ProfileData, Review, Wine } from "@/types/myProfileTypes";
import instance from "./axios";

const getAccessToken = () => {
  return localStorage.getItem("token");
};

export const getProfile = async (): Promise<ProfileData | undefined> => {
  try {
    const token = getAccessToken();
    console.log(token);
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await instance.get<ProfileData>("users/me", config);
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.error("프로필 데이터를 불러오는 중 오류 발생", error);
  }
};
