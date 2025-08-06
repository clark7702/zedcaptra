import { signIn } from "@/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    console.log(email, password, "email and password in route");

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    console.log(response, "response in route");

    return NextResponse.json({ message: "Login successful" });
  } catch (error) {
    console.log(error, "error in route");
    return NextResponse.json({ message: "Login failed" });
  }
}
