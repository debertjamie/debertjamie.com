import { ImageResponse } from "next/og";
import { getT } from "@/src/lib/i18n-server";
import { AVATAR_DATA_URI } from "./avatar";

// Standard OG size: smaller/faster to render on Workers than 2400x1260, and it
// matches what the site metadata declares.
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// Long-lived, immutable cache so scrapers get a fast 200 PNG on repeat loads.
const OG_HEADERS = {
  "Cache-Control": "public, immutable, no-transform, max-age=31536000",
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params;
  const { t } = await getT("layout", { lng: lang });

  const { searchParams } = new URL(request.url);
  const displayTitle = searchParams.get("title") || t("metadata.title");
  const description =
    searchParams.get("description") || t("metadata.description");

  try {
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4f1eb",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(244,241,235,0.2))",
          color: "#1d2527",
          padding: "36px 42px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AVATAR_DATA_URI}
            width={72}
            height={72}
            alt=""
            style={{ borderRadius: 18, border: "3px solid #ffffff" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <span style={{ fontSize: 32, fontWeight: 700 }}>
              {t("metadata.title")}
            </span>
            <span style={{ fontSize: 20, color: "#22292b" }}>
              debertjamie.com
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            marginTop: "auto",
            marginBottom: "auto",
            maxWidth: 750,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#4b585b",
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#67787c",
            borderTop: "2px solid #d8d4cc",
            paddingTop: 10,
          }}
        >
          <span>Great oaks from little acorns grow.</span>
        </div>
      </div>,
      { width: OG_WIDTH, height: OG_HEIGHT, headers: OG_HEADERS },
    );
  } catch {
    // Fallback: never return a broken/empty preview to a scraper. Same card
    // without the avatar, still a 200 PNG with the same cache headers.
    return new ImageResponse(
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#f4f1eb",
          backgroundImage:
            "linear-gradient(135deg, rgba(255,255,255,0.75), rgba(244,241,235,0.2))",
          color: "#1d2527",
          padding: "36px 42px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 750,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              lineHeight: 1.35,
              color: "#4b585b",
            }}
          >
            {description}
          </div>
        </div>
      </div>,
      { width: OG_WIDTH, height: OG_HEIGHT, headers: OG_HEADERS },
    );
  }
}
