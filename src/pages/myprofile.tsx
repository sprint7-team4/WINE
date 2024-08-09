import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import instance from "@/lib/axios";
import Header from "@/components/common/Header";
import { Review, Wine } from "@/types/myProfileTypes";
import { getProfile } from "@/lib/profileApi";

interface ProfileData {
  id: string;
  name: string;
  email: string;
}

export default function Myprofile() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // const fetchProfile = async () => {
  //   try {
  //     const response = await instance.get("users/me");
  //     console.log(response.data);
  //     setProfile(response.data);
  //   } catch (err: any) {
  //     console.error("프로필 데이터를 불러오는 중 오류 발생:", err);
  //     setError("프로필 데이터를 불러오는 중 오류가 발생했습니다.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <>
      <Header />
      <div></div>
    </>
  );
}
