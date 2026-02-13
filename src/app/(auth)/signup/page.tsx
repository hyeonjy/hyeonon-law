import { SignupForm } from "@/features/auth/signup";

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-[130px]">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-100 mb-2">
            회원가입
          </h1>
          <p className="text-base text-grayscale-400">
            서비스 이용을 위해 회원가입해주세요
          </p>
        </div>

        <SignupForm />
      </div>
    </div>
  );
}
