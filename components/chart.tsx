"use client";

import dynamic from "next/dynamic";
const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export function RadarChart(props: { keys: string[]; values: number[] }) {
  const option = {
    chart: {
      id: "radar-scores",
    },
    xaxis: {
      categories: props.keys,
    },
    yaxis: {
      max: 1,
      min: 0,
    },
  };

  const series = [
    {
      name: "Score",
      data: props.values,
    },
  ];

  return (
    <>
      <ApexChart type="radar" options={option} series={series} />
    </>
  );
}
