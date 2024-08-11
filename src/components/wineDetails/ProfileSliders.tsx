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
    new Array(profilesArray.length).fill(null)
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
          key={index}
          profile={profile}
          onChange={(value) => handleSliderChange(index, value)}
        />
      ))}
    </>
  );
};

export default ProfileSliders;
