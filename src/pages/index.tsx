import Button from "@/components/common/Button";

export default function Home() {
  return (
    <>
      <Button title="와인 구경하러 가기" items="goWine" />
      <Button title="가입하기" items="signUp" />
      <Button title="로그인" items="signIn" />
      <Button title="와인 등록하기" items="wineRegister" />
      <Button title="Red" items="wineTypes" />
      <Button title="리뷰 남기기" items="reviewSubmit" />
      <Button title="변경하기" items="changeProfile" />
      <Button title="삭제하기" items="delete" />
    </>
  );
}
