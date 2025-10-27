import {z} from 'zod';


export const signInSchema = z.object({
    identifier: z.string().min(3, { message: "Username must be at least 3 characters" }).regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    password: z.string().min(5, { message: "Password must be at least 6 characters"}),
})
