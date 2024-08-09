import React, { useState } from "react";
import Slider from "./Slider";
import { BalancedProfile, REVIEW_MODE } from "@/types/reviewTypes";

interface ProfileSlidersProps {
  mode?: REVIEW_MODE;
  profilesArray: BalancedProfile[];
  onSliderValuesChange?: (values: number[]) => void;
}

const ProfileSliders: React.FC<ProfileSlidersProps> = ({
  mode = REVIEW_MODE.REVIEW,
  profilesArray,
  onSliderValuesChange,
}) => {
  const [sliderValues, setSliderValues] = useState<number[]>(
    new Array(profilesArray.length).fill(0)
  );

  const handleSliderChange = (index: number, value: number) => {
    if (mode !== REVIEW_MODE.REVIEW) {
      const newValues = [...sliderValues];
      newValues[index] = value;

      setSliderValues(newValues);

      if (onSliderValuesChange) {
        onSliderValuesChange(newValues);
      }
    }
  };

  return (
    <>
      {profilesArray.map((profile, index) => (
        <Slider
          mode={mode}
          key={profile.name}
          profile={profile}
          onChange={(value) => handleSliderChange(index, value)}
        />
      ))}
    </>
  );
};

export default ProfileSliders;
