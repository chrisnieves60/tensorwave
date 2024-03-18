import React from "react";
import "tailwindcss/tailwind.css";
import MSFT from "../public/MSFT.png";
import Image from "next/image";
import Link from "next/link";
const StockCard = ({ symbol, data }) => {
  /*const { "Meta Data": metaData, ...timeSeriesData } = data;
  const timeSeriesKey = Object.keys(timeSeriesData)[0];
  const timeSeries = timeSeriesData[timeSeriesKey];

  // check if metadata exists first.
  const stockSymbol = metaData ? metaData["2. Symbol"] : "";
  const information = metaData ? metaData["1. Information"] : "";

  // RETURNS MOST RECENT PRICE DATA
  const recentPriceData = timeSeries ? Object.values(timeSeries)[0] : null;
  const recentPrice = recentPriceData ? recentPriceData["4. close"] : "";

  // only render if symbol is valid
  */
  if (!symbol) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mx-auto my-4 md:w-1/2 lg:w-1/3">
      <Link key={symbol} href={`/stocks/${symbol}`}>
        <div className="flex flex-col items-center">
          {/* Header section with symbol and logo */}
          <div className="flex items-center mb-4">
            <h3 className="text-2xl font-bold">{symbol}</h3>
            <div className="ml-4 p-1 border rounded-lg bg-gray-50">
              <Image
                src={`/${symbol}.png`}
                alt={`${symbol} logo`}
                width={60} // Adjusted for balance
                height={60} // Adjusted for balance
                className="squared-full"
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StockCard;
