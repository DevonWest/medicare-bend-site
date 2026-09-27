import { buildMarketUpdatesNewsSitemap } from "@/lib/marketUpdates";

export const dynamic = "force-static";

export async function GET() {
  return new Response(buildMarketUpdatesNewsSitemap(), {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
