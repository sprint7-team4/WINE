import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/router";
import { login } from "@/lib/authApi";
import useRedirectAuthenticated from "@/hooks/useRedirectAuthenticated";

interface FormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();

  const [loginError, setLoginError] = useState("");

  useRedirectAuthenticated();

  const {
    control,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      await login({ ...data });
      router.push("/");
    } catch (error: any) {
      console.error("로그인 오류:", error);
      if (error.message === "Validation Failed") {
        setLoginError(
          "이메일 또는 비밀번호가 잘못 되었습니다. 이메일과 비밀번호를 정확히 입력해 주세요."
        );
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
        }}
        render={({ field }) => (
          <>
            <input
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              {...field}
              className={`mb-10 px-20 py-14 h-42 md:h-48 border-1 border-solid ${
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
              <span className="text-red-500 relative top-[-2px] md:top-[-1px] mb-10">
                {errors.password.message}
              </span>
            )}
          </>
        )}
      />
      <div className="mb-40 md:mb-56 font-regular-12 md:font-regular-14 text-main cursor-pointer">
        비밀번호를 잊으셨나요?
      </div>
      {loginError && (
        <span className="text-red-500 mt-[-32px] md:mt-[-50px] mb-16">
          {loginError}
        </span>
      )}
      <button
        type="submit"
        title="로그인버튼"
        className="mb-16 h-48 md:h-50 rounded-12 font-bold-14 md:font-bold-16 text-white bg-main"
      >
        로그인
      </button>
    </form>
  );
}
