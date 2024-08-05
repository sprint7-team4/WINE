import React from "react";
import Slider from "./Slider";
import { BalancedProfile } from "@/types/reviewTypes";

interface ProfileSlidersProps {
  profilesArray: BalancedProfile[];
}

const ProfileSliders: React.FC<ProfileSlidersProps> = ({ profilesArray }) => {
  return (
    <>
      {profilesArray.map((profile) => (
        <Slider mode={""} key={profile.name} profile={profile} />
      ))}
    </>
  );
};

export default ProfileSliders;
