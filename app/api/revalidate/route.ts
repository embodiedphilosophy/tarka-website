import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { DESK_TAG } from "@/lib/desk";

// Tarka Desk calls this after publishing or taking an article down, so the site refreshes at once
// instead of waiting for its 5-minute cache. Closed unless REVALIDATE_SECRET is set.
export async function POST(req: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) return Response.json({ error: "Not configured" }, { status: 503 });
  const given = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  const a = Buffer.from(given), b = Buffer.from(secret);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return Response.json({ error: "Unauthorised" }, { status: 401 });

  const body = (await req.json().catch(() => ({}))) as { slug?: string };
  const slug = typeof body.slug === "string" && /^[a-z0-9-]+$/.test(body.slug) ? body.slug : null;

  revalidateTag(DESK_TAG, "max");
  for (const path of ["/", "/archive", "/search", "/issues", "/topics", ...(slug ? [`/articles/${slug}`] : [])]) revalidatePath(path);
  return Response.json({ revalidated: true, slug });
}
