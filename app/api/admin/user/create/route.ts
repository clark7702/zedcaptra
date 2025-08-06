import { NextResponse } from "next/server";
import client from "../../../../../helpers/sanity";
// import { sendApplicationSubmmittedEmail } from "../../../../../lib/mail";

export async function POST(request: Request) {
  const body = await request.json();
  const user = body;

  try {
    await client.createIfNotExists({
      _type: "accounts",
      ...user,
    });

    // await sendApplicationSubmmittedEmail(user);

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "An error occured" }, { status: 400 });
  }
}
