import { useState, useEffect, useRef } from "react";
import Header from "@/components/common/Header";
import {
  Review,
  ReviewsResponse,
  Wine,
  WinesResponse,
} from "@/types/myProfileTypes";
import {
  getReviews,
  getWines,
  updateUser,
  uploadImage,
} from "@/lib/profileApi";
import { getUser } from "@/lib/authApi";
import Image from "next/image";
import profileDefault from "@/assets/img/profile-default.svg";
import Button from "@/components/common/Button";
import { useAuthStore } from "@/store/authStore";
import MyReviewCard from "@/components/myprofile/MyReviewCard";
import MyWineCard from "@/components/myprofile/MyWineCard";
import { REVIEW_MODE } from "@/types/reviewTypes";
import { showToast } from "@/components/common/Toast";
import ReviewModal from "@/components/wineDetails/ReviewModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { useReviewRerenderStore } from "@/store/reviewStore";

import useRedirectAuthenticated from "@/hooks/useRedirectAuthenticated";
import { useWineRerenderStore } from "@/store/wineStore";

export interface ProfileData {
  id: number;
  nickname: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
  teamId: string;
}
export default function Myprofile() {
  const [reviews, setReview] = useState<ReviewsResponse | null>(null);
  const [wines, setWine] = useState<WinesResponse | null>(null);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [newNickname, setNewNickname] = useState("");
  const [activeTab, setActiveTab] = useState<"reviews" | "wines">("reviews");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthStore();
  const { isMyWineRerendered, setMyWineRerendered } = useWineRerenderStore();

  const { isReviewRerendered, setReviewRerendered } = useReviewRerenderStore(
    (state) => ({
      isReviewRerendered: state.isReviewRerendered,
      setReviewRerendered: state.setReviewRerendered,
    })
  );
  const { isReviewCardRerendered, setReviewCardRerendered } =
    useReviewRerenderStore((state) => ({
      isReviewCardRerendered: state.isReviewCardRerendered,
      setReviewCardRerendered: state.setReviewCardRerendered,
    }));

  useRedirectAuthenticated();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        // 파일 크기 체크 (5MB 제한)
        if (file.size > 5 * 1024 * 1024) {
          showToast("파일 크기는 5MB를 초과할 수 없습니다.", "error");
          return;
        }

        const imageUrl = await uploadImage(file);
        const updatedProfile = await updateUser({ image: imageUrl });
        setProfile(updatedProfile);
        showToast("프로필 이미지가 성공적으로 업데이트되었습니다.", "success");
      } catch (error) {
        console.error("Failed to update profile image:", error);
        showToast("프로필 이미지 업데이트에 실패했습니다.", "error");
      }
    }
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewNickname(e.target.value.trim());
    newNickname.trim();
  };

  useEffect(() => {
    if (isReviewCardRerendered) {
      setReviewCardRerendered(false);
    }

    const fetchData = async () => {
      try {
        const userProfile = await getUser();
        if (userProfile) {
          setProfile(userProfile);
          setNewNickname(userProfile.nickname);
        }

        const reviewsData = await getReviews(100);
        const winesList: Wine[] = await getWines(100);

        setReview(reviewsData);
        setWine({
          totalCount: winesList.length,
          nextCursor: null, // 적절한 값으로 대체
          list: winesList,
        });
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (isMyWineRerendered) {
      setMyWineRerendered(false);
    }

    fetchData();
  }, [
    isMyWineRerendered,
    isReviewRerendered,
    isReviewCardRerendered,
    setReviewCardRerendered,
  ]);

  const handleUpdateNickname = async () => {
    if (newNickname === profile?.nickname) {
      return; // 닉네임이 변경되지 않았다면 함수 실행을 중단
    }

    if (newNickname.length > 10) {
      return showToast("10글자를 초과할 수 없습니다.", "error");
    }

    try {
      const updatedProfile = await updateUser({ nickname: newNickname });
      setProfile(updatedProfile);

      showToast("닉네임이 성공적으로 변경되었습니다.", "success");
    } catch (error) {
      console.error("Failed to update nickname:", error);
      showToast("닉네임 변경에 실패했습니다.", "error");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.nativeEvent.isComposing) {
      e.preventDefault(); // 기본 동작(버튼 클릭 등)을 막음
      handleUpdateNickname();
    }
  };

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 10;
  const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);
  const [visibleWines, setVisibleWines] = useState<Wine[]>([]);

  useEffect(() => {
    if (reviews?.list) {
      setVisibleReviews(reviews.list.slice(0, itemsPerPage));
      setHasMore(reviews.list.length > itemsPerPage);
      console.log("초기 hasMore 설정:", reviews.list.length > itemsPerPage);
      console.log("전체 리뷰 수:", reviews.list.length);
      console.log("한 페이지당 아이템 수:", itemsPerPage);
    }
  }, [reviews]);

  useEffect(() => {
    if (wines?.list) {
      setVisibleWines(wines.list.slice(0, itemsPerPage));
      setHasMore(wines.list.length >= visibleWines.length);
      console.log(wines.list.length >= visibleWines.length);
    }
  }, [wines]);

  const fetchMoreData = () => {
    console.log("fetchMoreData 호출됨");

    const nextPage = page + 1;

    if (activeTab === "reviews" && reviews?.list) {
      const newVisibleReviews = reviews.list.slice(0, nextPage * itemsPerPage);
      console.log("다음 페이지 리뷰 수:", newVisibleReviews.length);
      console.log("전체 리뷰 수:", reviews.list.length);
      setVisibleReviews(newVisibleReviews);
      setHasMore(newVisibleReviews.length < reviews.list.length);
    } else if (activeTab === "wines" && wines?.list) {
      const newVisibleWines = wines.list.slice(0, nextPage * itemsPerPage);
      setVisibleWines(newVisibleWines);
      setHasMore(newVisibleWines.length < wines.list.length);
    }

    setPage(nextPage);
  };

  return (
    <>
      <Header />
      <div className=" lg:flex lg:gap-60 lg:pt-37 lg:px-30 pb-100">
        <div
          className="w-343 h-241 p-20 mt-90 mb-30 mx-auto rounded-16 border border-color-gray-300
            md:w-704 md:mt-117 md:h-247 md:mb-37 md:px-40 md:py-23 
            lg:w-280 lg:mt-0 lg:h-530 lg:px-20 lg:py-28"
        >
          <div
            className=" flex flex-col gap-20 
              md:gap-30
              lg:gap-48"
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
              cursor-pointer
              "
                onClick={handleImageClick}
              >
                <Image
                  src={profile?.image || profileDefault}
                  alt="프로필 사진"
                  layout="fill"
                  objectFit="cover"
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                  title="파일 선택"
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
              <div className="w-full flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-24 lg:flex-col lg:gap-8">
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
                    onChange={handleNicknameChange}
                    onKeyDown={handleKeyPress}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    title="변경하기"
                    items="changeProfile"
                    onClick={handleUpdateNickname}
                  />
                </div>
              </div>
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
              총{" "}
              {activeTab === "reviews"
                ? reviews?.totalCount
                : wines?.totalCount}
              개
            </p>
          </div>
          {/* <div className="flex flex-col gap-16">
            {activeTab === "reviews" &&
              reviews?.list.map((review) => (
                <MyReviewCard
                  key={review.id}
                  review={review}
                  mode={REVIEW_MODE.EDIT}
                />
              ))}
            {activeTab === "wines" &&
              wines?.list.map((wine) => (
                <MyWineCard key={wine.id} wine={wine} />
              ))}
          </div>
        </div>
        <ReviewModal mode={REVIEW_MODE.EDIT} />
      </div> */}
          <div className="flex flex-col gap-16">
            {activeTab === "reviews" ? (
              <InfiniteScroll
                dataLength={visibleReviews.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p className="mt-20 text-gray-800 border boder-gray-300 rounded-16 w-200 p-[10px_20px] text-center">
                    마지막 리뷰입니다.
                  </p>
                }
                style={{ overflow: "auto" }}
              >
                {visibleReviews.map((review) => (
                  <MyReviewCard
                    key={review.id}
                    review={review}
                    mode={REVIEW_MODE.EDIT}
                  />
                ))}
              </InfiniteScroll>
            ) : (
              <InfiniteScroll
                dataLength={visibleWines.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p className="mt-20 text-gray-800 border boder-gray-300 rounded-16 w-200 p-[10px_20px] text-center">
                    마지막 와인입니다.
                  </p>
                }
                style={{ overflow: "hidden" }}
              >
                {visibleWines.map((wine) => (
                  <MyWineCard key={wine.id} wine={wine} />
                ))}
              </InfiniteScroll>
            )}
          </div>
        </div>
        <ReviewModal mode={REVIEW_MODE.EDIT} />
      </div>
    </>
  );
}
