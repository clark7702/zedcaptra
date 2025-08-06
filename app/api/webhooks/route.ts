import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { updateUserBalance } from "../../../lib/actions";

export async function POST(req: Request, res: Response) {
  const body = await req.json();

  const transfer = body;

  try {
 await updateUserBalance(transfer);

    revalidatePath("/secure/dashboard");
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error, "error");
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
