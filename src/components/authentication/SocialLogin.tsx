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

export default function SocialLogin({ socialData, setIsLoading }: Props) {
  const handleSubmitClick = (id: string) => {
    setIsLoading(true);
    localStorage.setItem("provider", id);
    signIn(id, { callbackUrl: "/authCallback" });
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
