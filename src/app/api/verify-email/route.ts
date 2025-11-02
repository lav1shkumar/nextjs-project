import UserModel from "@/utils/user";
import dbConnect from "@/lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);

    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found!",
        },
        { status: 500 }
      );
    }

    if (user.isVerified) {
      return Response.json(
        {
          success: true,
          message: "User already verified!",
        },
        { status: 200 }
      );
    }

    const isCodeValid = code === user.verifyCode;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeValid) {
      return Response.json(
        {
          success: false,
          message: "Wrong verify code!",
        },
        { status: 400 }
      );
    }
    if (!isCodeNotExpired) {
      return Response.json(
        {
          success: false,
          message: "Verify code has been expired!",
        },
        { status: 400 }
      );
    }

    user.isVerified = true;
    await user.save();

    return Response.json(
      {
        success: true,
        message: "Account verified successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying code!", error);
    return Response.json(
      {
        success: false,
        message: "Error verifying code!",
      },
      {
        status: 500,
      }
    );
  }
}
