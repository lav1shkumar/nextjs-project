"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/schemas/signInSchema";
import { useEffect, useState } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  //const { data: session, status } = useSession();

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    const identifier = data.identifier;
    const password = data.password;

    const res = await signIn("credentials", {
      redirect: false,
      identifier,
      password,
      callbackUrl: searchParams.get("callbackUrl") || "/",
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push("/home-page");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="bg-base-300 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-1">Sign in to CodeX</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset my-3">
            <legend className="fieldset-legend">Username</legend>
            <label className="input w-full">
              <input
                type="text"
                placeholder="username"
                {...register("identifier")}
              />
            </label>
            {errors.identifier && (
              <p className="label text-red-500 -mb-2">
                {errors.identifier.message}
              </p>
            )}
          </fieldset>
          <fieldset className="fieldset my-3">
            <legend className="fieldset-legend">Password</legend>
            <label className="input w-full">
              <input
                type="text"
                placeholder="password"
                {...register("password")}
              />
            </label>
            {errors.password && (
              <p className="label text-red-500 text-[12px]">
                {errors.password.message}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            className="btn w-full btn-primary my-3 hover:brightness-95"
          >
            Login
          </button>
        </form>
        <div className="flex items-center my-4">
          <span className="flex-1 h-px bg-neutral-content/30"></span>
          <span className="mx-2 text-xs text-base-content/50">OR</span>
          <span className="flex-1 h-px bg-neutral-content/30"></span>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <button className="btn btn-outline btn-primary w-80 flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition">
            <svg
              aria-label="Google logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="none"></path>
                <path
                  fill="currentColor"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="currentColor"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="currentColor"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="currentColor"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Signin with Google
          </button>
          <button className="btn btn-outline btn-primary w-80 flex items-center justify-center gap-3 hover:bg-primary hover:text-white transition">
            <svg
              aria-label="GitHub logo"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 
              6.84 9.5.5.08.66-.23.66-.5 0-.27 0-.9 0-1.73-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.1-1.47-1.1-1.47-.91-.62.08-.64.08-.64 1 .07 1.53 1.03 1.53 1.03 1.87 2.52 4.34 2.07 4.91 1.83.09-.65.35-1.09.63-1.34C7.95 16.17 5.62 15.31 5.62 11.5c0-.68.38-1.57 1.03-2.28-.1-.25-.45-1.29 0-2.64 0 0 .84-.27 2.75 1.01a9.58 9.58 0 0 1 5 0c1.91-1.28 2.75-1.01 2.75-1.01.55 1.35.21 2.39.11 2.64.64.71 1.02 1.6 1.02 2.28 0 3.82-2.34 4.67-4.56 4.92.27.24.52.86.52 1.73 0 1.25 0 2.26 0 2.56 0 .27.16.59.67.49A10.01 10.01 0 0 0 22 12a10 10 0 0 0-10-10z"
              ></path>
            </svg>
            Signin with GitHub
          </button>
        </div>
        <p className="text-center text-sm mt-2">
          Don't have an account?
          <button
            type="submit"
            className="btn btn-link p-1"
            onClick={() => router.push("/sign-up")}
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
