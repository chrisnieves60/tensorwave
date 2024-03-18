import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

//PRICE CHART
const PriceChart = ({ timeSeries }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price",
        data: [],
        options: {},
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });

  useEffect(() => {
    if (timeSeries && Object.keys(timeSeries).length > 0) {
      //reverse to properly display
      const labels = Object.keys(timeSeries).reverse();
      const dataEntries = Object.values(timeSeries).reverse();
      console.log(dataEntries);

      const prices = dataEntries.map((data) => parseFloat(data["4. close"]));
      const volume = dataEntries.map((data) => parseFloat(data["5. volume"]));
      setChartData({
        labels,
        datasets: [
          {
            label: "Price",
            data: prices,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
        options: {
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  const closePriceValue = context.raw.toFixed(2);
                  const vol = volume[context.dataIndex]; // access corresponding volume
                  const previousDayClose = prices[context.dataIndex - 1];
                  const percentageChange =
                    ((closePriceValue - previousDayClose) / previousDayClose) *
                    100;
                  return [
                    `Close Price: $${closePriceValue}`,
                    `Volume: ${vol}`,
                    `Percenage Change: %${percentageChange.toFixed(2)}`,
                  ];
                },
              },
            },
          },
        },
      });
    }
  }, [timeSeries]);

  return (
    <div className="p-4 bg-gray-100 rounded-lg ">
      <h2 className="text-2xl text-center font-bold mb-2 text-gray-800">
        Price Chart
      </h2>
      <p className="font-semibold text-gray-600 mb-4 text-center">
        Hover over data points to display volume, date, and percentage change
      </p>
      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          border: "1px solid #e2e8f0",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        {timeSeries && Object.keys(timeSeries).length > 0 ? (
          <Line data={chartData} options={chartData.options} />
        ) : (
          <p className="text-gray-600">No data available</p>
        )}
      </div>
    </div>
  );
};

export default PriceChart;
