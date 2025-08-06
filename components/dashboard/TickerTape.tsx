"use client";
import React, { memo, useEffect } from "react";

function TickerTape() {
  useEffect(() => {
    // Dynamically load the TradingView script when the component mounts
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      symbols: [
        {
          proName: "FOREXCOM:SPXUSD",
          title: "S&P 500 Index",
        },
        {
          proName: "FOREXCOM:NSXUSD",
          title: "US 100 Cash CFD",
        },
        {
          proName: "FX_IDC:EURUSD",
          title: "EUR to USD",
        },
        {
          description: "Tesla",
          proName: "NASDAQ:TSLA",
        },
        {
          description: "Apple",
          proName: "NASDAQ:AAPL",
        },
        {
          description: "Amazon",
          proName: "NASDAQ:AMZN",
        },
        {
          description: "Microsoft",
          proName: "NASDAQ:MSFT",
        },
        {
          description: "Google",
          proName: "NASDAQ:GOOGL",
        },
        {
          description: "Coinbase",
          proName: "NASDAQ:COIN",
        },
      ],
      isTransparent: false,
      showSymbolLogo: true,
      displayMode: "adaptive",
      locale: "en",
    });
    document
      ?.getElementById("tradingview-widget-container")
      ?.appendChild(script);

    // Cleanup the script on component unmount
    return () => {
      const container = document.getElementById("tradingview-widget-container");
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <div
      className="tradingview-widget-container h-full"
      id="tradingview-widget-container"
    >
      <div className="tradingview-widget-container__widget"></div>
    </div>
  );
}

export default memo(TickerTape);
