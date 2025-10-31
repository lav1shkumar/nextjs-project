import dbConnect from "@/lib/dbConnect";
import UserModel, { Message, User } from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";


export async function POST(req:Request){
    await dbConnect()

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return Response.json(
            {
                success: false,
                message: "Not Authenticated!",
            },
            { status: 401 }
            );
    }
    const userId = session.user._id
    const {acceptMessages} = await req.json()

    try {
        const user = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessage: acceptMessages},
            {new: true}
        )
        
        if (!user) {
            return Response.json(
            {
                success: false,
                message: "Error while changing status!",
            },
            { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessages: user.isAcceptingMessage,
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