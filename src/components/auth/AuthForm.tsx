"use client";

import { signIn } from "next-auth/react";

export default function AuthForm() {
  return (
    <div className="mx-auto w-full border-2 border-red-900 bg-[#eadbbc] rounded-2xl px-15 py-10 text-center shadow-[0_12px_30px_rgba(60,35,15,0.7)]">
      <h1 className="text-4xl font-medium font-serif tracking-tight text-black">
        Welcome Back
      </h1>
      <p className="mt-2 text-lg font-semibold font-caveat text-[#4d4b46]">
        Login to continue to your journey
      </p>

      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2  bg-[#bb2214] border-2 rounded-full border-[#bb2214] px-4 py-3 text-sm font-medium text-neutral-50  transition-transform hover:-translate-y-0.5  "
      >
        <svg
          className="h-6 w-6 bg-white p-1  rounded-full"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.87c2.26-2.08 3.57-5.14 3.57-8.81Z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.07 7.93-2.91l-3.87-3c-1.07.72-2.44 1.14-4.06 1.14-3.12 0-5.76-2.1-6.7-4.93H1.29v3.1A11.99 11.99 0 0 0 12 24Z"
          />
          <path
            fill="#FBBC05"
            d="M5.3 14.3a7.19 7.19 0 0 1 0-4.6V6.6H1.29a12.02 12.02 0 0 0 0 10.8l4.01-3.1Z"
          />
          <path
            fill="#EA4335"
            d="M12 4.77c1.76 0 3.35.6 4.59 1.8l3.44-3.44A11.92 11.92 0 0 0 12 0 11.99 11.99 0 0 0 1.29 6.6l4.01 3.1C6.24 6.87 8.88 4.77 12 4.77Z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}
