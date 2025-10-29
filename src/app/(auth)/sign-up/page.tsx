"use client";
import { GalleryVerticalEnd } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"


import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect,useState } from "react";
import { signUpSchema } from "@/schemas/signUpSchema";

import axios, { AxiosError } from 'axios';
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";


export default function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema), 
  });

  const [error, setError] = useState("");
  const [response, setResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  
  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {

    const username = data.username
    const email = data.email
    const password = data.password

    setIsProcessing(true)

    console.log(isSubmitting)
    
    try {
      const response = await axios.post('/api/sign-up', {
        username,
        email,
        password
      });
      console.log(response.data);
      const {success,message,status} = response.data
      setResponse(message)

      if(success){
        //setTimeout(()=>{router.replace("/sign-in")},1000)
      }
      
    } 
    catch (error) {
      console.error(error);
      
    }
    setIsProcessing(false)

  }

return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          Example
        </a>
        <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} onClick={()=>{setResponse("")}}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input id="username" type="text" placeholder="lavish" required {...register("username")} disabled={isSubmitting}/>
                {errors.username && (
                  <FieldDescription className="text-red-500 text-sm">
                  {errors.username.message}
                  </FieldDescription>
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  disabled={isSubmitting}
                  required
                />
              </Field>
              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" required {...register("password")} disabled={isSubmitting}/>

                  </Field>
                  
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" required {...register("confirmpassword")} disabled={isSubmitting}/>
                  </Field>
                </Field>
                <FieldDescription>
                  {errors.password && (
                      <FieldDescription className="text-red-500 text-sm self-center">
                      {errors.password.message}
                      </FieldDescription>
                  )}

                  {!errors.password && errors.confirmpassword && (
                      <FieldDescription className="text-red-500 text-sm self-center">
                      {errors.confirmpassword.message}
                      </FieldDescription>
                  )}
                </FieldDescription>
              </Field>
              <Field>
                {isProcessing?
                <Button variant="secondary" type="submit">Please Wait
                  <Spinner />
                </Button> : 
                <Button type="submit">Create Account
                </Button>}
                
                <FieldDescription className="text-center">
                  Already have an account? <a href="#">Sign in</a>
                  {response && (
                    <FieldDescription className="text-red-500 text-sm pt-2">
                    {response}
                    </FieldDescription>
                  )}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
      </div>
    </div>
  )
}
