import { IQAirKey } from "./env";

type AQIData =
  | {
      status: "success";
      data: {
        classification: "good" | "moderate" | "sensitive" | "unhealthy" | "very_unhealthy" | "hazardous";
        current: {
          pollution: {
            ts: string;
            aqius: number;
          };
        };
      };
    }
  | {
      status: "fail";
      data: {
        message: string;
      };
    };

function getAQIClassification(aqi: number) {
  if (aqi >= 0 && aqi <= 50) {
    return "good";
  } else if (aqi >= 51 && aqi <= 100) {
    return "moderate";
  } else if (aqi >= 101 && aqi <= 150) {
    return "sensitive";
  } else if (aqi >= 151 && aqi <= 200) {
    return "unhealthy";
  } else if (aqi >= 201 && aqi <= 300) {
    return "very_unhealthy";
  } else {
    return "hazardous";
  }
}

export async function getAQI() {
  const response = await fetch(
    "http://api.airvisual.com/v2/city?city=yogyakarta&state=yogyakarta&country=indonesia&key=" +
      IQAirKey,
    {
      cache: "force-cache",
      headers: {
        "Cache-Control": "max-age=86400",
      },
    },
  );
  const data = (await response.json()) as AQIData;
  if(data.status === "success") {
    data.data.classification = getAQIClassification(data.data.current.pollution.aqius);
  }

  return data.status === "success"
    ? {
        ...data
      }
    : data;
}
