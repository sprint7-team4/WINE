import axios from "axios";
import instance from "./axios";

type dataType = {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
};

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  data?: dataType;
}

const fetchRequest = async (url: string, options: RequestOptions) => {
  try {
    const response = await instance(url, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "요청에 실패했습니다.");
    } else {
      throw new Error("요청에 실패했습니다.");
    }
  }
};

export const signup = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: dataType) => {
  const url = "auth/signUp";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      nickname,
      password,
      passwordConfirmation,
    },
  };
  return fetchRequest(url, options);
};

export const login = async ({ email, password }: dataType) => {
  const url = "auth/signIn";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      email,
      password,
    },
  };
  const data = await fetchRequest(url, options);
  localStorage.setItem("accessToken", data.accessToken);
  return data;
};
