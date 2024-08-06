import React, { useState } from "react";
import Slider from "./Slider";
import { BalancedProfile, ReviewMode } from "@/types/reviewTypes";

interface ProfileSlidersProps {
  mode?: ReviewMode;
  profilesArray: BalancedProfile[];
}

const ProfileSliders: React.FC<ProfileSlidersProps> = ({
  mode = "review",
  profilesArray,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(50);

  const handleSliderChange = (value: number) => {
    if (mode !== "review") {
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
