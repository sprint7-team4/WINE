import React, { useState } from "react";
import Slider from "./Slider";
import { BalancedProfile, REVIEW_MODE } from "@/types/reviewTypes";

interface ProfileSlidersProps {
  mode?: REVIEW_MODE;
  profilesArray: BalancedProfile[];
}

const ProfileSliders: React.FC<ProfileSlidersProps> = ({
  mode = REVIEW_MODE.REVIEW,
  profilesArray,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (value: number) => {
    if (mode !== REVIEW_MODE.REVIEW) {
      setSliderValue(value);
    }
  };

  return (
    <>
      {profilesArray.map((profile) => (
        <Slider
          mode={mode}
          key={profile.name}
          profile={profile}
          onChange={handleSliderChange}
        />
      ))}
    </>
  );
};

export default ProfileSliders;
