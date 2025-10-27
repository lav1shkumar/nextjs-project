"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useEffect,useState } from "react";

import { signIn,useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";





const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  password: z
    .string()
    .min(3, "Password must be at least 6 characters long"),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema), 
  });

  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session, status } = useSession();
  
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const identifier = data.username
    const password = data.password

    const res = await signIn("credentials", {
      redirect: false,
      identifier,    
      password,
      callbackUrl: searchParams.get("callbackUrl") || "/"
    });

    if (res?.error) {
        setError(res.error);
        console.log(error)
      } else {
        router.push("/");
      }
  };

  
  return (
    <div className="flex flex-col justify-center items-center w-screen h-screen" >
      <h2 className="text-5xl font-bold m-5 text-center">Sign in</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center"
          onFocus={()=>setError("")}
        >
          <div className="flex flex-col items-center justify-center gap-1 max-w-60">
            <Label className="self-start" htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              className="mt-1 h-10 w-64"
              placeholder="Enter username"
              {...register("username")}
            />
          </div>
          {errors.username && (
              <p className="text-red-500 text-sm self-start">
                {errors.username.message}
              </p>
            )}
          <div className="flex flex-col items-center justify-center gap-1 max-w-60">
            <Label className="self-start mt-2" htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              className="mt-1 h-10 w-64"
              placeholder="Enter password"
              {...register("password")}
            />
          </div>
          {errors.password && (
              <p className="text-red-500 text-sm self-start">
                {errors.password.message}
              </p>
            )}
          
          <Button variant="outline" size="lg"  type="submit" className="mt-5">
            Sign In
          </Button>

          { (
              <p className="text-red-500 text-sm m-2">
                {error}
              </p>
            )}

        </form>
    </div>
  );
}
