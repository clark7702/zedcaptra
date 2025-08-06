import { NextResponse } from "next/server";
import { createTransaction } from "../../../../lib/actions";
import { sendTransactionEmail } from "../../../../lib/mail";
import { revalidatePath } from "next/cache";

export async function POST(request: Request) {
  const body = await request.json();

  const { transaction, user } = body;

  try {
    await createTransaction({
      transaction: transaction,
      user: user,
    });

    await sendTransactionEmail(transaction, user);

    revalidatePath("/secure/dashboard");

    return NextResponse.json(
      { message: "Transaction successful" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "error");

    if (error.statusCode === 409) {
      return NextResponse.json(
        { message: "Transaction already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ message: "An error occured" }, { status: 400 });
  }
}
