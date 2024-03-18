"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import StockCard from "@/components/StockCard";
import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const [stockData, setStockData] = useState({});
  const symbols = [
    "AAPL",
    "GOOGL",
    "MSFT",
    "AMZN",
    "IBM",
    "TSLA",
    "BRK.A",
    "SBUX",
    "JNJ",
    "AMD",
    "NVDA",
    "JPM",
    "UNH",
    "SOFI",
    "CSCO",
  ];

  //TRIED DISPLAYING STOCK ON HOME PAGE, LED TO TOO MANY API CALLS(REACHED MAX LIMIT)
  //HAD TO SETTLE FOR JUST DISPLAYING SYMBOL AND LOGO ON HOME PAGE ONLY.

  //const API_KEY = "NHPLOBO4IY2X819E";
  /*useEffect(() => {
    const fetchStocks = async () => {
      const promises = symbols.map(async (symbol) => {
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=demo`;
        const response = await fetch(url);
        const data = await response.json();
        return { [symbol]: data };
      });
      const results = await Promise.all(promises);
      // turn  arr of objects into a single object, keep results more streamlined.
      const combinedResults = results.reduce((acc, result) => {
        return { ...acc, ...result };
      }, {});
      setStockData(combinedResults);
    };

    fetchStocks();
  }, []);*/

  return (
    <div>
      <Header />
      <h1 className="text-3xl font-bold text-center my-8">Stock Tickers</h1>
      <div>
        {symbols.map((symbol) => (
          <StockCard key={symbol} symbol={symbol} />
        ))}
      </div>
    </div>
  );
}
