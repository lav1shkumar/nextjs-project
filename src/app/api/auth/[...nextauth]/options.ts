import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import UserModel from "@/model/user";
import dbConnect from "@/lib/dbConnect";
import { Provider } from "react";
import z from "zod";
import { signInSchema } from "@/schemas/signInSchema";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(raw):Promise<any> {
        const parsed = signInSchema.safeParse(raw);
        if (!parsed.success) return null;
        const { identifier, password } = parsed.data;

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: identifier },
              { username: identifier },
            ],
          });
          if (!user) {
            throw new Error("No user found with this email/username!");
          }

          // if (!user.isVerified) {
          //     throw new Error("Please verify your account before login")
          // }

          const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
          );
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error("Please check your password!");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id?.toString();
        session.user.isVerified = token.isVerified;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.username = token.username;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.username = user.username;
      }
      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
