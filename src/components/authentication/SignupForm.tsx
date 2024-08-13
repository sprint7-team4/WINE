import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { signup } from "@/lib/authApi";
import useRedirectAuthenticated from "@/hooks/useRedirectAuthenticated";

interface FormValues {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

export default function SignupForm() {
  const router = useRouter();

  const [emailDuplicationError, setEmailDuplicationError] = useState("");

  useRedirectAuthenticated();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await signup({ ...data });
      router.push("/login");
    } catch (error: any) {
      console.error("회원가입 오류", error);
      if (error.message === "이미 사용중인 이메일입니다.") {
        setEmailDuplicationError(error.message);
      } else if (error.message === "Internal Server Error") {
        // Server Error 500 이긴 하지만 닉네임 중복일 때 발생해서 일단 추가해놓음
        setEmailDuplicationError("이미 사용중인 닉네임입니다.");
      }
    }
  };

  return (
    <form className="flex flex-col w-[100%]" onSubmit={handleSubmit(onSubmit)}>
      <label
        htmlFor="email"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        이메일
      </label>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        rules={{
          required: "이메일은 필수 입력입니다.",
          pattern: {
            value: /^\S+@\S+\.\S+$/,
            message: "이메일 형식으로 작성해 주세요.",
          },
        }}
        render={({ field }) => (
          <>
            <input
              type="email"
              id="email"
              placeholder="이메일 입력"
              {...field}
              className={`mb-16 md:mb-24 px-20 py-14 h-42 md:h-48 border-1 border-solid ${
                errors.email ? "border-red-500" : "border-grayscale-300"
              } rounded-12 placeholder-grayscale-500`}
              onBlur={async () => {
                await field.onBlur();
                trigger("email");
              }}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value) {
                  trigger("email");
                }
              }}
            />
            {errors.email && (
              <span className="text-red-500 relative top-[-8px] md:top-[-15px]">
                {errors.email.message}
              </span>
            )}
          </>
        )}
      />

      <label
        htmlFor="nickname"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        닉네임
      </label>
      <Controller
        name="nickname"
        control={control}
        defaultValue=""
        rules={{
          required: "닉네임은 필수 입력입니다.",
          maxLength: {
            value: 10,
            message: "닉네임은 최대 10자까지 가능합니다.",
          },
          validate: {
            noWhitespace: (value) =>
              !!value.trim() || "공백만 입력할 수 없습니다.",
          },
        }}
        render={({ field }) => (
          <>
            <input
              type="text"
              id="nickname"
              placeholder="닉네임 입력"
              {...field}
              className={`mb-16 md:mb-24 px-20 py-14 h-42 md:h-48 border-1 border-solid ${
                errors.nickname ? "border-red-500" : "border-grayscale-300"
              } rounded-12 placeholder-grayscale-500`}
              onBlur={async () => {
                await field.onBlur();
                trigger("nickname");
              }}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value) {
                  trigger("nickname");
                }
              }}
            />
            {errors.nickname && (
              <span className="text-red-500 relative top-[-8px] md:top-[-15px]">
                {errors.nickname.message}
              </span>
            )}
          </>
        )}
      />

      <label
        htmlFor="password"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        비밀번호
      </label>
      <Controller
        name="password"
        control={control}
        defaultValue=""
        rules={{
          required: "비밀번호는 필수 입력입니다.",
          minLength: {
            value: 8,
            message: "비밀번호는 최소 8자 이상입니다.",
          },
          pattern: {
            value: /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*]).{8,}$/,
            message:
              "비밀번호는 숫자, 영문, 특수문자가 모두 포함되어야 합니다.",
          },
        }}
        render={({ field }) => (
          <>
            <input
              type="password"
              id="password"
              placeholder="영문, 숫자, 특수문자 포함 8자 이상"
              {...field}
              className={`mb-16 md:mb-24 px-20 py-14 h-42 md:h-48 border-1 border-solid ${
                errors.password ? "border-red-500" : "border-grayscale-300"
              } rounded-12 placeholder-grayscale-500`}
              onBlur={async () => {
                await field.onBlur();
                trigger("password");
              }}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value) {
                  trigger("password");
                }
              }}
            />
            {errors.password && (
              <span className="text-red-500 relative top-[-8px] md:top-[-15px]">
                {errors.password.message}
              </span>
            )}
          </>
        )}
      />

      <label
        htmlFor="password-confirmation"
        className="mb-10 font-medium-14 md:font-medium-16 text-grayscale-800"
      >
        비밀번호 확인
      </label>
      <Controller
        name="passwordConfirmation"
        control={control}
        defaultValue=""
        rules={{
          required: "비밀번호 확인을 입력해주세요.",
          validate: (value, { password }) =>
            value === password || "비밀번호가 일치하지 않습니다.",
        }}
        render={({ field }) => (
          <>
            <input
              type="password"
              id="password-confirmation"
              placeholder="비밀번호 확인 입력"
              {...field}
              className={`mb-40 md:mb-32 px-20 py-14 h-42 md:h-48 border-1 border-solid ${
                errors.passwordConfirmation
                  ? "border-red-500"
                  : "border-grayscale-300"
              } rounded-12 placeholder-grayscale-500`}
              onBlur={async () => {
                await field.onBlur();
                trigger("passwordConfirmation");
              }}
              onChange={(e) => {
                field.onChange(e);
                if (e.target.value) {
                  trigger("passwordConfirmation");
                }
                if (e.target.value === field.value) {
                  trigger("passwordConfirmation");
                }
              }}
            />
            {errors.passwordConfirmation && (
              <span className="text-red-500 relative top-[-32px] md:top-[-23px]">
                {errors.passwordConfirmation.message}
              </span>
            )}
          </>
        )}
      />

      {emailDuplicationError && (
        <span className="text-red-500 mt-[-30px] md:mt-[-22px] mb-16">
          {emailDuplicationError}
        </span>
      )}

      <button
        type="submit"
        title="가입하기 버튼"
        className="mb-40 h-48 md:h-50 rounded-12 font-bold-14 md:font-bold-16 text-white bg-main"
      >
        가입하기
      </button>
    </form>
  );
}
