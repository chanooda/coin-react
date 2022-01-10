import {
  useLocation,
  useParams,
  Routes,
  Route,
  Link,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import Price from "./Price";
import Chart from "./Chart";
import CandleChart from "./CandleChart";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchPriceInfo } from "../api";
import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Container = styled.div`
  color: white;
  margin: 0 auto;
  padding: 0px 25px;
  max-width: 650px;
  min-width: 480px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};
  margin-top: 50px;
  hr {
    border-color: ${(props) => props.theme.accentColor};
    margin-bottom: 30px;
  }
`;
const Header = styled.header`
  width: 100%;
  position: relative;
  a {
    color: ${(props) => props.theme.textColor};
    display: block;
    left: 0px;
    font-size: 45px;
    position: absolute;
  }
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  margin-top: 200px;
  display: block;
  text-align: center;
  font-size: 50px;
`;

const InfoContainer = styled.div`
  width: 100%;
`;

const CoinInfoContainer = styled.div`
  background-color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 30px;
  padding: 10px 15px;
  p {
    display: block;
    font-size: 20px;
    line-height: 25px;
  }
`;

const DescriptionContainer = styled(CoinInfoContainer)`
  background-color: ${(props) => props.theme.bgColor};
  border: 3px solid ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
`;

const Taps = styled(CoinInfoContainer)`
  background-color: ${(props) => props.theme.bgColor};
  padding: 0px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? props.theme.bgColor : props.theme.textColor};
  border: 3px solid ${(props) => props.theme.accentColor};
  width: 48%;
  height: 50px;
  line-height: 40px;
  display: block;
  font-size: 25px;
  transition: 0.3s;
  text-align: center;
  background-color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.bgColor};

  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    border: 3px solid ${(props) => props.theme.accentColor};
  }
  a {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

const CoinInfoDiv = styled.div``;

const CoinInfo = styled.span`
  display: block;
  padding: 5px 0px;
  text-align: center;
  font-size: 25px;
`;

const CoinInfoTitle = styled(CoinInfo)`
  font-size: 12px;
`;

interface RouteLocation {
  state: { name: string };
}

interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

interface ICoinProps {}

type ICoinId = { coinId: string };

function Coin({}: ICoinProps) {
  const { coinId } = useParams() as ICoinId;
  const { state } = useLocation() as RouteLocation;
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchPriceInfo(coinId),
    { refetchInterval: 5000 }
  );

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const candlechartMatch = useMatch("/:coinId/candlechart");

  const loading = infoLoading && priceLoading;
  return (
    <Container>
      <HelmetProvider>
        <Helmet>
          <title>
            {state?.name
              ? state.name.toUpperCase()
              : loading
              ? "loading..."
              : infoData?.name.toUpperCase()}
          </title>
        </Helmet>
      </HelmetProvider>
      <Header>
        <Link to="/">&lt;</Link>
        <Title>
          {state?.name
            ? state.name.toUpperCase()
            : loading
            ? "loading..."
            : infoData?.name.toUpperCase()}
        </Title>
      </Header>
      {loading ? (
        <Loader>loading...</Loader>
      ) : (
        <InfoContainer>
          <CoinInfoContainer>
            <CoinInfoDiv>
              <CoinInfoTitle>RANK:</CoinInfoTitle>
              <CoinInfo>{infoData?.rank}</CoinInfo>
            </CoinInfoDiv>
            <CoinInfoDiv>
              <CoinInfoTitle>SYMBOL:</CoinInfoTitle>
              <CoinInfo>{infoData?.symbol}</CoinInfo>
            </CoinInfoDiv>
            <CoinInfoDiv>
              <CoinInfoTitle>CURRENT PRICE:</CoinInfoTitle>
              <CoinInfo>$ {priceData?.quotes.USD.price.toFixed(2)}</CoinInfo>
            </CoinInfoDiv>
          </CoinInfoContainer>
          <DescriptionContainer>
            <p>{infoData?.description}</p>
          </DescriptionContainer>
          <CoinInfoContainer>
            <CoinInfoDiv>
              <CoinInfoTitle>TOTAL_SUPPLY:</CoinInfoTitle>
              <CoinInfo>{priceData?.total_supply}</CoinInfo>
            </CoinInfoDiv>
            <CoinInfoDiv>
              <CoinInfoTitle>MAX SUPPLY:</CoinInfoTitle>
              <CoinInfo>{priceData?.max_supply}</CoinInfo>
            </CoinInfoDiv>
          </CoinInfoContainer>
          <Taps>
            <Tab isActive={chartMatch !== null || candlechartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Taps>
          <hr />
          <Routes>
            <Route path="price" element={<Price coinId={coinId} />} />
            <Route path="chart" element={<Chart coinId={coinId} />} />
            <Route
              path="candlechart"
              element={<CandleChart coinId={coinId} />}
            />
          </Routes>
        </InfoContainer>
      )}
    </Container>
  );
}

export default Coin;
