import styled from "styled-components";
import { fetchPriceInfo } from "../api";
import { useQuery } from "react-query";

const InfoContainer = styled.div`
  width: 100%;
  padding: 20px 100px;
  border: 3px solid ${(props) => props.theme.accentColor};
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  span {
    &:first-child {
      text-transform: uppercase;
      color: ${(props) => props.theme.accentColor};
      font-size: 20px;
      font-weight: bold;
    }
  }
`;
const PriceSpan = styled.span<{ isRed: boolean }>`
  font-size: 30px;
  color: ${(props) => (props.isRed ? "red" : "green")};
`;
interface IChartPops {
  coinId: string;
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

function Price({ coinId }: IChartPops) {
  const { isLoading: priceLoading, data: priceData } = useQuery<IPriceData>(
    ["price", coinId],
    () => fetchPriceInfo(coinId),
    { refetchInterval: 5000 }
  );
  return (
    <div>
      {priceLoading ? (
        <p>Price Info Loading...</p>
      ) : (
        <div>
          <InfoContainer>
            <span>market cap change(24h)</span>
            {priceData?.quotes.USD.market_cap_change_24h ? (
              priceData?.quotes.USD.market_cap_change_24h < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.market_cap_change_24h}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.market_cap_change_24h}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <span>percent_change(15m)</span>
            {priceData?.quotes.USD.percent_change_15m ? (
              priceData?.quotes.USD.percent_change_15m < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.percent_change_15m}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.percent_change_15m}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <span>percent_change(1h)</span>
            {priceData?.quotes.USD.percent_change_1h ? (
              priceData?.quotes.USD.percent_change_1h < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.percent_change_1h}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.percent_change_1h}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <span>percent_change(6h)</span>
            {priceData?.quotes.USD.percent_change_6h ? (
              priceData?.quotes.USD.percent_change_6h < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.percent_change_6h}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.percent_change_6h}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <span>percent_change(12h)</span>
            {priceData?.quotes.USD.percent_change_12h ? (
              priceData?.quotes.USD.percent_change_12h < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.percent_change_12h}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.percent_change_12h}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <span>percent_change(7d)</span>
            {priceData?.quotes.USD.percent_change_7d ? (
              priceData?.quotes.USD.percent_change_7d < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.percent_change_7d}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.percent_change_7d}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
          <InfoContainer>
            <span>percent_change(30d)</span>
            {priceData?.quotes.USD.percent_change_30d ? (
              priceData?.quotes.USD.percent_change_30d < 0 ? (
                <PriceSpan isRed={true}>
                  {priceData?.quotes.USD.percent_change_30d}
                </PriceSpan>
              ) : (
                <PriceSpan isRed={false}>
                  {priceData?.quotes.USD.percent_change_30d}
                </PriceSpan>
              )
            ) : null}
          </InfoContainer>
        </div>
      )}
    </div>
  );
}
export default Price;
