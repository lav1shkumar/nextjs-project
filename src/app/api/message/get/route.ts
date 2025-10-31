import dbConnect from "@/lib/dbConnect";
import UserModel, { Message, User } from "@/model/user";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import mongoose from "mongoose";


export async function GET(){
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
    const userId = new mongoose.Types.ObjectId(session.user._id)

    try {
        const user = await UserModel.aggregate([
            {$match:{ id:userId }},
            {$unwind: '$messages'},
            {$sort:{'messages.createdAt':-1}},
            {$group: {_id:'$_id',messages:{$push:'messages'}}}
        ])
        
        if (!user) {
            return Response.json(
            {
                success: false,
                message: "Error while fetching data!",
            },
            { status: 500 }
            );
        }

        return Response.json(
            {
                success: true,
                messages: user[0].messages,
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