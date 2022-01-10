import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isDarkAtom } from "../atoms";
import { useRecoilValue } from "recoil";

interface IChartPops {
  coinId: string;
}
interface IChartData {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const ChartContainer = styled.div`
  * {
    color: ${(props) => props.theme.textColor};
  }
  width: 100%;
  color: black;
`;

function Chart({ coinId }: IChartPops) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading: historyIsLoading, data: historyData } = useQuery<
    IChartData[]
  >(["ohlcv", coinId], () => fetchCoinHistory(coinId));

  return (
    <ChartContainer>
      {historyIsLoading ? (
        <p>Loading chart...</p>
      ) : (
        <div>
          <ApexChart
            type="line"
            series={[
              {
                name: "Close Price",
                data: historyData?.map((price) => price.close),
              },
            ]}
            options={{
              theme: { mode: isDark ? "dark" : "light" },
              chart: { width: "auto", background: "transparent" },
              stroke: { curve: "smooth", width: 1, colors: ["#4834d4"] },
              tooltip: {
                enabled: true,
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
              yaxis: {
                show: true,
                labels: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                  style: {
                    fontSize: "13px",
                  },
                  offsetX: -15,
                  offsetY: 5,
                },
              },
              xaxis: {
                labels: { show: true, rotate: 0, offsetY: 3 },
                axisBorder: { show: false },
                type: "datetime",
                categories: historyData?.map((price) => price.time_close),
              },
              grid: {
                show: true,
              },
            }}
          />
          <Link to="../candlechart">
            <span>Candle Chart &rarr;</span>
          </Link>
        </div>
      )}
    </ChartContainer>
  );
}
export default Chart;
