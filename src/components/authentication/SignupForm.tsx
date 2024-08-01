export default function SignupForm() {
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
        htmlFor="nickname"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        닉네임
      </label>
      <input
        type="text"
        id="nickname"
        placeholder="닉네임 입력"
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
        placeholder="영문, 숫자 포함 8자 이상"
        className="mb-16 md:mb-24 px-20 py-14 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 placeholder-grayscale-500"
      />
      <label
        htmlFor="password-check"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        비밀번호 확인
      </label>
      <input
        type="password"
        id="password-check"
        placeholder="비밀번호 확인 입력"
        className="mb-40 md:mb-32 px-20 py-14 h-42 md:h-48 border-1 border-solid border-grayscale-300 rounded-12 placeholder-grayscale-500"
      />
      <button
        type="button"
        title="로그인버튼"
        className="mb-40 h-48 md:h-50 rounded-12 font-bold-14 md:font-bold-16 text-white bg-main"
      >
        가입하기
      </button>
    </form>
  );
}
