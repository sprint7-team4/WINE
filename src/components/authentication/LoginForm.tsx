export default function LoginForm() {
  return (
    <form className="flex flex-col w-[100%]">
      <label
        htmlFor="email"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        이메일
      </label>
      <input
        type="email"
        id="email"
        placeholder="이메일 입력"
        className="mb-16 md:mb-24 px-20 py-14 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 placeholder-grayscale-500"
      />
      <label
        htmlFor="password"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        비밀번호
      </label>
      <input
        type="password"
        id="password"
        placeholder="비밀번호 입력"
        className="mb-10 px-20 py-14 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 placeholder-grayscale-500"
      />
      <div className="mb-40 md:mb-56 font-regular-12 md:font-regular-14 text-main cursor-pointer">
        비밀번호를 잊으셨나요?
      </div>
      <button
        type="button"
        title="로그인버튼"
        className="mb-16 h-48 md:h-50 rounded-12 font-bold-14 md:font-bold-16 text-white bg-main"
      >
        로그인
      </button>
    </form>
  );
}
