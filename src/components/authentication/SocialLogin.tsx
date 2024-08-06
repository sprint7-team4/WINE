import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { loginWithGoogle } from "@/lib/authApi";

type socialDataType = {
  id: string;
  innerText: string;
  altText: string;
  titleText: string;
  srcUrl: string;
};

interface Props {
  socialData: socialDataType[];
}

export default function SocialLogin({ socialData }: Props) {
  const { data: session } = useSession();

  const handleSubmitClick = async (id: string) => {
    signIn(id, { callbackUrl: "/" });

    await loginWithGoogle({
      token: session?.idToken,
      provider: id.toUpperCase(),
    });
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
