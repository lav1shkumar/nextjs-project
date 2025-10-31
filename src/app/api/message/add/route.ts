import dbConnect from "@/lib/dbConnect";
import UserModel, { Message, User } from "@/model/user";
import { usernameValidation } from "@/schemas/signUpSchema";
import z from "zod";

export async function POST(req:Request){
    await dbConnect()

    const usernameQuerySchema = z.object({
      username: usernameValidation,
    });

    const {content,username} = await req.json()

    try {
        const user = await UserModel.findOne({username})
        
        if (!user) {
            return Response.json(
            {
                success: false,
                message: "User not found!",
            },
            { status: 401 }
            );
        }
        if (!user.isAcceptingMessage) {
            return Response.json(
            {
                success: false,
                message: "User is not acceping messages!",
            },
            { status: 403 }
            );
        }

        const newMsg = {
            content,
            createdAt: new Date()
        }
        user.messages.push(newMsg as Message)
        await user.save()

        return Response.json(
            {
                success: true,
                message: "Message sent successfully!"
            },
            { status: 200 }
        );
        
    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Unexpected error occured!",
            },
            { status: 500 }
        );
    }
}