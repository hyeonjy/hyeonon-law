"use client";

import { logoutAction } from "../../actions/logout";

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  return (
    <button
      onClick={() => logoutAction()}
      className={`${className} cursor-pointer`}
    >
      로그아웃
    </button>
  );
}
