"use client";
import { useEffect, useRef, memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

function RealtimeChart() {
  // const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "500",
      currencies: ["EUR", "USD", "JPY", "GBP", "CHF", "AUD", "CAD", "NZD"],
      isTransparent: true,
      colorTheme: "light",
      locale: "en",
      backgroundColor: "transparent",
    });

    document
      ?.getElementById("tradingview-widget-container-advanced")
      ?.appendChild(script);

    return () => {
      const container = document.getElementById(
        "tradingview-widget-container-advanced"
      );
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Market Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className="tradingview-widget-container-advanced rounded-lg"
          id="tradingview-widget-container-advanced"
        >
          <div className="tradingview-widget-container__widget rounded-lg"></div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(RealtimeChart);
