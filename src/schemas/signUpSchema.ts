import {z} from 'zod';


export const usernameValidation = z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(10, "Username must be at most 10 characters")
    .regex(/^[A-Za-z0-9_]+$/, "Username must not contain special characters")


export const signUpSchema = z.object({
    username: usernameValidation,
    email : z.email({message: "Invalid email address"}),
    password: z.string().min(8,{message: "Password must be atleast 8 characters"})
})
