import { SetStateAction, Dispatch } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

type socialDataType = {
  id: string;
  innerText: string;
  altText: string;
  titleText: string;
  srcUrl: string;
};

interface Props {
  socialData: socialDataType[];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

export default function SocialLogin({ socialData, setIsLoading }: Props) {
  const handleSubmitClick = (id: string) => {
    setIsLoading(true);

    if (id === "google") {
      localStorage.setItem("provider", id);
      signIn(id, { callbackUrl: "/auth/googleAuthCallback" });
    }
    if (id === "kakao") {
      window.location.href = link;
    }
  };

  return (
    <>
      {socialData.map(({ id, titleText, altText, innerText, srcUrl }) => (
        <button
          type="button"
          title={titleText}
          className="flex-center gap-10 md:gap-12 h-48 md:h-52 rounded-12 font-medium-14 md:font-medium-16 border-1 border-solid border-grayscale-300"
          key={id}
          onClick={() => handleSubmitClick(id)}
        >
          <Image src={srcUrl} alt={altText} />
          <span>{innerText}</span>
        </button>
      ))}
    </>
  );
}
