import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { z } from "zod";

const EmailSchema = z.object({
  to: z.string().email(),
  from: z.string(),
  subject: z.string(),
  htmlBody: z.string(),
});

const transporter = nodemailer.createTransport({
  host: "mail.privateemail.com",
  port: 465,
  secure: true,
  auth: {
    user: "contact@trusovia.com",
    pass: "ct@Secure2025",
  },
});

export async function POST(request: Request, response: Response) {
  const body = await request.json();

  try {
    const parseBody = EmailSchema.safeParse(body);

    if (!parseBody.success) {
      throw parseBody.error;
    }

    const { to, from, subject, htmlBody } = parseBody.data;
    // Your code to process the transaction goes here.

    const info = await transporter.sendMail({
      from: from, // sender address
      to: to,
      subject: subject, // Subject line
      html: htmlBody, // html body
    });

    console.log("Message sent: %s", info.messageId);

    return NextResponse.json(
      {
        message: "Email sent successfully",
        data: info.messageId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred: ", error);

    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
