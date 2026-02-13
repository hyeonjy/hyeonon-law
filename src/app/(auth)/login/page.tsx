import { LoginForm } from "@/features/auth/login";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center bg-white px-4 py-[130px]">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-primary-100 mb-2">
            로그인
          </h1>
          <p className="text-base text-grayscale-400">계정에 로그인하세요</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
