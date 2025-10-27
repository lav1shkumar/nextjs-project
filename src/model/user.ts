import mongoose,{Schema, Document} from "mongoose";


export interface Message extends Document{
    content: string;
    createdAt: Date
}

const MessageSchema: Schema<Message> = new Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    message: Message[]
}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        trim: true,
        required: [true,"Username Required!!!"],
        unique: true
    },
    email: {
        type: String,
        required: [true,"Email Required!!!"],
        unique: true,
        match: [
            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
            "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true,"Password Required!!!"],
    },
    verifyCode: {
        type: String,
        required: [true,"Verify code Required!!!"],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true,"Verify code Expiry Required!!!"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    message: {
        type: [MessageSchema],
        required: [true,"Message Required!!!"],
    },
}) 

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User",UserSchema)

export default UserModel;