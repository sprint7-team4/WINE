import instance from "./axios";

export const imageUpload = async (url: FormData) => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await instance.post("images/upload", url, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.url;
  } catch (error) {
    console.error("이미지 업로드에 실패했습니다", error);
    throw error;
  }
};
