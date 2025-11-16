// src/app/page.tsx（実装用）
export const dynamic = "force-dynamic"; // 常に最新を取りに行く場合

import Link from "next/link";
import Image from "next/image";
import type { WPPost } from "@/types/wp";

async function fetchPosts(): Promise<WPPost[]> {
  const base = process.env.WP_API_BASE_SERVER ?? "http://wordpress";

  const res = await fetch(`${base}/wp-json/wp/v2/posts?_embed&per_page=6`, {
    // force-dynamic と組み合わせる前提（タグ付きキャッシュを使う場合はここを書き換える）
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts from WordPress");
  }

  return res.json() as Promise<WPPost[]>;
}

export default async function Page() {
  const posts = await fetchPosts();

  return (
    <main className="mx-auto max-w-640 px-4 py-10">
      <section className="mb-10 rounded-20 border p-8">
        <h1 className="text-20 font-semibold">Welcome</h1>
        <p className="mt-2 text-16">WordPress から最新の記事を表示します。</p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p: WPPost) => {
          const media = p._embedded?.["wp:featuredmedia"]?.[0];
          const src = media?.source_url;
          const alt = media?.alt_text || p.title.rendered.replace(/<[^>]+>/g, "") || "";
          const excerptHtml = (p.excerpt?.rendered ?? "").trim();

          return (
            <article key={p.id} className="overflow-hidden rounded-2xl border" suppressHydrationWarning>
              {src && (
                <div className="relative aspect-[16/9]">
                  <Image src={src} alt={alt} fill className="object-cover" sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-16 font-medium leading-snug" dangerouslySetInnerHTML={{ __html: p.title.rendered }} />
                <div
                  className="mt-2 line-clamp-3 text-16"
                  suppressHydrationWarning
                  dangerouslySetInnerHTML={{
                    __html: excerptHtml || "&nbsp;",
                  }}
                />
                <div className="mt-4">
                  <Link href={`/${p.slug}`} className="text-12 underline">
                    続きを読む
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}
