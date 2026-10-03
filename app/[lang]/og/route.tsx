import { ImageResponse } from "next/og";
import { getT, initServerI18next } from "next-i18next/server";
import i18nConfig from "../../../i18n.config";

initServerI18next(i18nConfig);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ lang: "en" | "zh-CN" }> },
) {
  try {
    const { lang } = await params;
    const { t } = await getT("layout", { lng: lang });

    const { searchParams } = new URL(request.url);
    const displayTitle = searchParams.get("title") || t("metadata.title");
    const description =
      searchParams.get("description") || t("metadata.description");
    const avatarUrl = new URL("/avatar.png", request.url).toString();

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
          padding: "72px 84px",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            width={144}
            height={144}
            alt=""
            style={{ borderRadius: 36, border: "3px solid #ffffff" }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            <span style={{ fontSize: 64, fontWeight: 700 }}>
              {t("metadata.title")}
            </span>
            <span style={{ fontSize: 40, color: "#22292b" }}>
              debertjamie.com
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            marginTop: "auto",
            marginBottom: "auto",
            maxWidth: 1500,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 152,
              fontWeight: 700,
              lineHeight: 1.08,
            }}
          >
            {displayTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
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
            fontSize: 44,
            color: "#67787c",
            borderTop: "2px solid #d8d4cc",
            paddingTop: 20,
          }}
        >
          <span>Great oaks from little acorns grow.</span>
        </div>
      </div>,
      { width: 2400, height: 1260 },
    );
  } catch {
    return new Response(`Failed to generate image`, { status: 500 });
  }
}
