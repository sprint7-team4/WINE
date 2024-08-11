import { useState, useEffect } from "react";
import Header from "@/components/common/Header";
import { Review, ReviewsResponse, Wine } from "@/types/myProfileTypes";
import { getReviews, getWines } from "@/lib/profileApi";
import { getUser } from "@/lib/authApi";
import Image from "next/image";
import profileDefault from "@/assets/img/profile-default.svg";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/store/authStore";
import MyReviewCard from "@/components/myprofile/MyReviewCard";
import MyWineCard from "@/components/myprofile/MyWineCard";
import { REVIEW_MODE } from "@/types/reviewTypes";
import Tabs from "@/components/myprofile/tab";

export interface ProfileData {
  id: number;
  nickname: string;
  image: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}
export default function Myprofile() {
  const [reviews, setReview] = useState<ReviewsResponse | null>(null);
  const [wines, setWine] = useState<Wine[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const { user } = useAuthStore();

  const handleTabChange = (tab: "reviews" | "wines") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfile = await getUser();
        if (userProfile) setProfile(userProfile);

        const reviewsData = await getReviews(10);
        // const winesData = await getWines(10);

        setReview(reviewsData);
        // setWine(winesData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
    console.log(user);
  }, []);

  return (
    <>
      <Header />
      <div className="lg:flex lg:gap-60 lg:pt-37 ">
        <div
          className="w-343 h-241 p-20 mt-90 mb-30 mx-auto rounded-16 border border-color-gray-300
            md:w-704 md:mt-117 md:h-247 md:mb-37 md:px-40 md:py-23 
            lg:w-280 lg:mt-0 lg:h-530 lg:px-20 lg:py-28"
        >
          <div
            className=" flex flex-col gap-20 
              md:gap-30"
          >
            <div
              className="flex gap-16 
              md:gap-32
              lg:flex lg:flex-col lg:flex-center"
            >
              <div
                className="relative w-60 h-60 rounded-full border border-color-gray-300 overflow-hidden
              md:w-80 md:h-80
              lg:w-164 lg:h-164
              "
              >
                <Image
                  src={profile?.image || profileDefault}
                  alt="프로필 사진"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div
                className="w-fit flex flex-col gap-4 
                md:w-155
                lg:flex-center"
              >
                <p className="font-bold-20 md:font-bold-24 w-fit">
                  {profile?.nickname}
                </p>
                <p className="font-regular-14 text-grayscale-500 md:font-regular-16">
                  {user.email}
                </p>
              </div>
            </div>
            <div className="w-full">
              <form className="w-full flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-24 lg:flex-col lg:gap-8">
                <div
                  className="flex flex-col gap-8  
                              md:gap-10  "
                >
                  <label className="font-medium-14" htmlFor="inputNickname">
                    닉네임
                  </label>
                  <input
                    className="w-full h-42 rounded-12 border border-color-grayscale-300 px-20 py-14 
                    md:rounded-16 md:w-480
                    lg:w-240"
                    placeholder={profile?.nickname}
                  />
                </div>
                <div className="flex justify-end">
                  <Button title="변경하기" items="changeProfile" />
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="w-343 flex flex-col gap-16 mx-auto md:w-704 lg:w-800">
          <div className="w-auto flex justify-between">
            <div className="flex-center justify-between gap-16">
              <button
                className={`font-bold-18 ${activeTab === "reviews" ? "" : "text-grayscale-500"}`}
                onClick={() => setActiveTab("reviews")}
              >
                내가 쓴 후기
              </button>
              <button
                className={`font-bold-18 ${activeTab === "wines" ? "" : "text-grayscale-500"}`}
                onClick={() => setActiveTab("wines")}
              >
                내가 등록한 와인
              </button>
            </div>
            <p className="font-regular-12 text-main flex-center">
              총 {reviews?.totalCount}개
            </p>
          </div>
          <div className="flex flex-col gap-16">
            {activeTab === "reviews" &&
              reviews?.list.map((review) => (
                <MyReviewCard
                  key={review.id}
                  review={review}
                  mode={REVIEW_MODE.EDIT}
                />
              ))}
            {activeTab === "wines" && (
              // wines.map((wine) => <MyWineCard key={wine.id} wine={wine} />)}
              <MyWineCard />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
