import Image from "next/image";

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
  return (
    <>
      {socialData.map(({ id, titleText, altText, innerText, srcUrl }) => (
        <button
          type="button"
          title={titleText}
          className="flex-center gap-10 md:gap-12 h-48 md:h-52 rounded-12 font-medium-14 md:font-medium-16 border-1 border-solid border-grayscale-300"
          key={id}
        >
          <Image src={srcUrl} alt={altText} />
          <span>{innerText}</span>
        </button>
      ))}
    </>
  );
}
