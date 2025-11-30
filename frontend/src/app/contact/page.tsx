// frontend/src/app/contact/page.tsx
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; error?: string }>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        setResult({
          ok: false,
          error: data.error ?? "送信に失敗しました。",
        });
      } else {
        setResult({ ok: true });
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      console.error(err);
      setResult({ ok: false, error: "通信エラーが発生しました。" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-800 px-4 py-16">
      <h1 className="mb-6 text-24 font-semibold">お問い合わせ</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-16 font-medium" htmlFor="name">
            お名前
          </label>
          <input id="name" type="text" className="w-full rounded border px-16 py-8 text-16" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div>
          <label className="block text-16 font-medium" htmlFor="email">
            メールアドレス
          </label>
          <input id="email" type="email" className="w-full rounded border px-16 py-8 text-16" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>

        <div>
          <label className="block text-16 font-medium" htmlFor="message">
            お問い合わせ内容
          </label>
          <textarea id="message" className="h-200 w-full rounded border px-16 py-8 text-16" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>

        <button type="submit" className="rounded bg-black px-6 py-8 text-16 font-semibold text-white disabled:opacity-60" disabled={submitting}>
          {submitting ? "送信中..." : "送信する"}
        </button>
      </form>

      {result && <p className="mt-4 text-16">{result.ok ? "送信が完了しました。" : `送信に失敗しました: ${result.error ?? ""}`}</p>}
    </main>
  );
}
