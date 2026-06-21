import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await prisma.contactMessage.create({
      data: {
        fullName: parsed.data.fullName,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      },
    });

    await resend.emails.send({
      from: "Promise & Hope <onboarding@resend.dev>",
      to: process.env.CONTACT_RECEIVER_EMAIL!,
      subject: `New Contact Message: ${parsed.data.subject}`,
      replyTo: parsed.data.email,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${parsed.data.fullName}</p>
        <p><strong>Email:</strong> ${parsed.data.email}</p>
        <p><strong>Phone:</strong> ${parsed.data.phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${parsed.data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${parsed.data.message}</p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message received and email sent",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}