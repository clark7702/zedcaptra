import { NextResponse } from "next/server";
import client from "../../../../../helpers/sanity";

export async function POST(request: Request) {
  const body = await request.json();
  const { password, id } = body;

  try {
    await client
      .patch(id)
      .set({
        password: password,
      })
      .commit();

    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "An error occured" }, { status: 400 });
  }
}
