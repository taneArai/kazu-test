// frontend/src/app/api/contact/route.ts
import "server-only";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ ok: false, error: "Missing required fields" }), { status: 400 });
    }

    // デバッグ用に環境変数を軽く確認（必要に応じてコメントアウト可）
    console.log("SMTP_HOST:", process.env.SMTP_HOST);
    console.log("SMTP_USER:", process.env.SMTP_USER);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 接続確認（デバッグ用。問題なければ削除しても可）
    await transporter.verify();

    await transporter.sendMail({
      from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
      to: process.env.MAIL_TO ?? process.env.SMTP_USER,
      subject: `お問い合わせ: ${name}`,
      replyTo: email,
      text: `
お名前: ${name}
メール: ${email}

本文:
${message}
      `.trim(),
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: unknown) {
    console.error("MAIL ERROR:", err);

    const msg = err instanceof Error ? err.message : "Unknown error in mail handler";

    // ここだけ一時的に詳細を返す
    return new Response(JSON.stringify({ ok: false, error: msg }), { status: 500 });
  }
}
