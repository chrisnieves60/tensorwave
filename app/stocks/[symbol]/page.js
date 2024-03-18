"use client";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import PriceChart from "@/components/PriceChart";
import Header from "@/components/Header";
export default function Page() {
  const pathname = usePathname();
  const symbol = pathname.split("/")[2] || "defaultSymbol"; // get the stock symbol from the URL
  const [companyOverview, setCompanyOverview] = useState();
  const [timeSeries, setTimeSeries] = useState({});
  const [historicalPrices, setHistoricalPrices] = useState([]);

  //grab data from api, data such as company overview, and time series prices.
  useEffect(() => {
    const fetchCompanyOverview = async () => {
      const overviewResponse = await fetch(
        `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=NHPLOBO4IY2X819E`
      );
      const overviewData = await overviewResponse.json();
      setCompanyOverview(overviewData);
    };

    const fetchTimeSeriesDaily = async () => {
      const timeSeriesResponse = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=NHPLOBO4IY2X819E`
      );
      const timeSeriesData = await timeSeriesResponse.json();
      setTimeSeries(timeSeriesData["Time Series (Daily)"] || {}); // set to an empty object if not available
      // calculate the percentage change in price from the previous day
      const timeSeriesEntries = Object.entries(
        timeSeriesData["Time Series (Daily)"] || {}
      );
      const historicalPricesData = timeSeriesEntries.map(
        ([date, data], index) => {
          let percentageChange = null;
          if (index < timeSeriesEntries.length - 1) {
            const previousDayClose = parseFloat(
              timeSeriesEntries[index + 1][1]["4. close"]
            );
            const currentDayClose = parseFloat(data["4. close"]);
            percentageChange =
              ((currentDayClose - previousDayClose) / previousDayClose) * 100;
          }
          return {
            date,
            closePrice: data["4. close"],
            volume: data["5. volume"],
            percentageChange: percentageChange
              ? percentageChange.toFixed(2) + "%"
              : "N/A",
          };
        }
      );
      setHistoricalPrices(historicalPricesData);
    };
    if (symbol) {
      fetchCompanyOverview();
      fetchTimeSeriesDaily();
    }
  }, []);

  //if company overview isnt available, set as N/A
  const companyInfo = companyOverview
    ? {
        symbol: companyOverview.Symbol || "N/A",
        assetType: companyOverview.AssetType || "N/A",
        name: companyOverview.Name || "N/A",
        description: companyOverview.Description || "N/A",
        exchange: companyOverview.Exchange || "N/A",
        sector: companyOverview.Sector || "N/A",
        industry: companyOverview.Industry || "N/A",
        marketCap: companyOverview.MarketCapitalization || "N/A",
      }
    : {
        symbol: "N/A",
        assetType: "N/A",
        name: "N/A",
        description: "N/A",
        exchange: "N/A",
        sector: "N/A",
        industry: "N/A",
        marketCap: "N/A",
      };

  return (
    <div className="bg-gray-100 min-h-screen ">
      <Header />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-8 mt-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {companyInfo.name}
          </h1>
          <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {companyInfo.symbol}
          </span>
        </div>
        <p className="text-gray-600 mb-4">{companyInfo.description || "N/A"}</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 font-semibold mb-1">Asset Type</p>
            <p className="text-gray-800">{companyInfo.assetType || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Exchange</p>
            <p className="text-gray-800">{companyInfo.exchange || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Sector</p>
            <p className="text-gray-800">{companyInfo.sector || "N/A"}</p>
          </div>
          <div>
            <p className="text-gray-500 font-semibold mb-1">Industry</p>
            <p className="text-gray-800">{companyInfo.industry || "N/A"}</p>
          </div>
          <div className="col-span-2">
            <p className="text-gray-500 font-semibold mb-1">Market Cap</p>
            <p className="text-gray-800">{companyInfo.marketCap || "N/A"}</p>
          </div>
        </div>
      </div>
      {Object.keys(timeSeries).length > 0 && (
        <PriceChart timeSeries={timeSeries} />
      )}
      {historicalPrices.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold my-4">Historical Prices</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Close Price</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">% Change</th>
              </tr>
            </thead>
            <tbody>
              {historicalPrices.map((price, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{price.date}</td>
                  <td className="border px-4 py-2">{price.closePrice}</td>
                  <td className="border px-4 py-2">{price.volume}</td>
                  <td className="border px-4 py-2">{price.percentageChange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
