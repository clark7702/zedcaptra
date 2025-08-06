import { NextResponse } from "next/server";
import client from "../../../../../helpers/sanity";

export async function POST(request: Request) {
  const body = await request.json();
  const { data, id } = body;

  const { firstName, middleName, lastName, name, occupation, mobile, address } =
    data;

  try {
  await  client
      .patch(id)
      .set({
        firstName,
        middleName,
        lastName,
        name,
        occupation,
        mobile,
        address,
      })
      .commit();

    return NextResponse.json(
      { message: "User updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ message: "An error occured" }, { status: 400 });
  }
}
