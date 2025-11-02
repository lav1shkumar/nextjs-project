import {z} from 'zod';


export const usernameValidation = z
    .string()
    .min(3, "Username must be at least 3 characters!")
    .max(10, "Username must be at most 10 characters!")
    .regex(/^[A-Za-z0-9_]+$/, "Username must not contain special characters!")


export const signUpSchema = z
  .object({
    username: usernameValidation,
    email: z.email({ message: "Invalid email address!" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters!" }),
    confirmpassword: z.string().min(6, { message: "Password must be at least 6 characters!" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Passwords do not match!",
    path: ["confirmpassword"],
  });

