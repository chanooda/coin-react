import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

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
  }
  color: ${(props) => props.theme.textColor};
  width: 100%;
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
            type="candlestick"
            series={[
              {
                data: historyData?.map((price) => {
                  return {
                    x: price.time_open,
                    y: [price.open, price.high, price.low, price.close],
                  };
                }),
              },
            ]}
            options={{
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
                type: "datetime",
              },
              chart: { width: "auto", background: "transparent" },
              stroke: { width: 1 },
              theme: { mode: isDark ? "dark" : "light" },
            }}
          />
          <Link to="../chart">
            <span>Close Line Chart &rarr;</span>
          </Link>
        </div>
      )}
    </ChartContainer>
  );
}
export default Chart;
