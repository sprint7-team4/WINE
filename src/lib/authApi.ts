import axios from "axios";
import instance from "./axios";
import Router from "next/router";

type dataType = {
  email: string;
  nickname?: string;
  password: string;
  passwordConfirmation?: string;
};

type OauthDataType = {
  state?: string;
  redirectUri?: string;
  token: string | string[] | undefined;
  provider?: string;
};

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  data?: dataType | OauthDataType;
}

const fetchRequest = async (url: string, options: RequestOptions) => {
  try {
    const response = await instance(url, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        try {
          const newAccessToken = await refreshAccessToken();
          options.headers.Authorization = `Bearer ${newAccessToken}`;
          const retryResponse = await instance(url, options);
          return retryResponse.data;
        } catch (retryError) {
          throw new Error("재인증에 실패했습니다.");
        }
      }
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
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

export const loginWithSocial = async ({
  state,
  redirectUri,
  token,
  provider,
}: OauthDataType) => {
  const url = `auth/signIn/${provider}`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      state,
      redirectUri,
      token,
    },
  };
  const data = await fetchRequest(url, options);
  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("refreshToken", data.refreshToken);
  return data;
};

const refreshAccessToken = async () => {
  try {
    const response = await instance.post("auth/refresh-token", {
      refreshToken: localStorage.getItem("refreshToken"),
    });
    const { accessToken } = response.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (error) {
    // 리프레시 토큰도 만료된 경우 로그인 페이지로 이동
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    Router.push("/login");
    throw new Error("로그인이 필요합니다.");
  }
};

export const getUser = async () => {
  const token = localStorage.getItem("accessToken");

  if (!token) return;

  const url = "users/me";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetchRequest(url, options);
};
