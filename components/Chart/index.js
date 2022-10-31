import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

import axios from "axios";
import dayjs from "dayjs";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = () => {
  // ========== Usestates ========== //
  const [data, setData] = useState([]);
  // ========== Usestates ========== //

  // ========== useEffects ========== //
  useEffect(() => {
    axios
      .get("https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h")
      .then(function (response) {
        response.data.map((item) => {
          setData((prev) => {
            return [
              {
                x: new Date(item[0]),
                y: [
                  parseInt(item[1]),
                  parseInt(item[2]),
                  parseInt(item[3]),
                  parseInt(item[4]),
                ],
              },
              ...prev,
            ];
          });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  // ========== useEffects ========== //

  // ========== Options Chart ========== //
  const options = {
    chart: {
      height: 350,
      type: "candlestick",
      id: "candles",
      zoom: {
        enabled: true,
        type: "xy",
      },
    },
    fill: {
      opacity: 1,
      type: ["solid", "gradient"],
      gradient: {
        opacityFrom: [0.8, 0.3],
        opacityTo: [1, 0.4],
      },
    },
    stroke: {
      curve: "straight",
      width: [1, 3],
      dashArray: [0, 8],
      lineCap: "square",
    },
    dataLabels: {
      enabled: true,
      enabledOnSeries: [1],
      formatter: function (val, opts) {
        return "(" + val + ")";
      },
      textAnchor: "end",
      background: {
        enabled: true,
        opacity: 0.7,
      },
      dropShadow: {
        enabled: true,
        left: 0,
        top: 0,
        opacity: 0.1,
      },
    },
    title: {
      text: "CandleStick Chart - Category X-axis",
      align: "left",
    },
    annotations: {
      yaxis: [
        {
          y: 6606.0,
          strokeDashArray: 3,
          borderColor: "gray",
          fillColor: "gray",
          label: {
            borderColor: "gray",
            style: {
              fontSize: "12px",
              color: "#fff",
              background: "black",
            },
            orientation: "vertical",
            offsetY: 5,
            offsetX: 60,
            text: "6606.00",
          },
        },
      ],
    },
    tooltip: {
      enabled: true,
      theme: "dark",
      shared: false,
      intersect: true,
    },
    xaxis: {
      type: "datetime",
      labels: {
        show: true,
        formatter: function (val) {
          return dayjs(val).format("MMM DD HH:mm");
        },
      },
    },
    yaxis: {
      opposite: true,
      tooltip: {
        enabled: true,
      },
    },
    markers: {
      size: 8,
      strokeWidth: 0,
      fillOpacity: 0.6,
      shape: "square",
      radius: 0,
      showNullDataPoints: false,
    },
  };
  // ========== Options Chart ========== //

  // ========== Series Chart ========== //
  const series = [
    {
      name: "candle",
      type: "candlestick",
      data,
    },
  ];
  // ========== Series Chart ========== //

  return (
    <div className="chart-box">
      <div id="chart-candlestick">
        <ReactApexChart
          options={options}
          series={series}
          type="candlestick"
          height={"290%"}
          width={"100%"}
        />
      </div>
    </div>
  );
};

export default ApexChart;
