import React from "react";
import styled from "@emotion/styled";
import BoxButton from "../BoxButton";
import { ReactComponent as CoverDonation } from "../../assets/img/cover_donation.svg";
import { ReactComponent as Credit } from "../../assets/img/credit.svg";

const CardWrapper = styled.div`
  width: 282px;
  margin: 0 10px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 158px;
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
  border-radius: inherit;
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: inherit;
`;

const Overlay = styled(CoverDonation)`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 100%;
`;

const StyledBoxButton = styled(BoxButton)`
  position: absolute; /* 절대 위치 지정 */
  bottom: 20px; /* 하단에서 20px 위로 */
  left: 50%; /* 수평 중앙 정렬 */
  transform: translateX(-50%); /* 버튼을 가운데로 이동 */
  z-index: 1;

  @media (max-width: 768px) {
    width: 128px;
    height: 32px;
    bottom: 5px; /* 하단에서 5px 위로 */
  }
`;

const Content = styled.div`
  width: 100%;
  padding: 10px;
  text-align: left;
  color: var(--white);
`;

const Title = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const Subtitle = styled.h3`
  font-size: 16px;
  color: var(--gray-200);
  margin: 5px 0;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const Footer = styled.div`
  width: 100%;
  padding: 10px;
  color: var(--white);
`;

const DonationInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CreditIcon = styled(Credit)``;

const DonationDetails = styled.div`
  display: flex;
  align-items: center;
  color: var(--coralpink);
  font-size: 14px;
`;

const DonationAmount = styled.span`
  font-size: 12px;
  margin-left: 1px; /* 아이콘과 텍스트 사이의 간격 */
`;

const DaysLeft = styled.span`
  font-size: 12px;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  background-color: var(--white); /* 배경 색 */
  border-radius: 5px; /* 둥근 모서리 */
  height: 1px; /* 프로그레스 바 높이 */
  margin: 5px 0;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.percentage}%; /* 진행률에 따라 동적으로 너비 설정 */
  background-color: var(--coralpink); /* 진행된 부분 색 */
  height: 100%;
`;

function CardProfile({ item }) {
  const percentage = Math.min(
    (item.receivedDonations / item.targetDonation) * 100,
    100,
  ); // 진행률 계산

  return (
    <CardWrapper key={item.id}>
      <ImageWrapper>
        <CardImage src={item.idol.profilePicture} alt={item.idol.name} />
        <Overlay preserveAspectRatio="none" />
        <StyledBoxButton size="medium">후원하기</StyledBoxButton>
      </ImageWrapper>
      <Content>
        <Subtitle>{item.subtitle}</Subtitle>
        <Title>{item.title}</Title>
      </Content>
      <Footer>
        <DonationInfo>
          <DonationDetails>
            <CreditIcon width="12" height="12" />
            <DonationAmount>
              {item.receivedDonations.toLocaleString()}
            </DonationAmount>
          </DonationDetails>
          <DaysLeft>
            {Math.ceil(
              (new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24),
            )}
            일 남음
          </DaysLeft>
        </DonationInfo>
        <ProgressBarContainer>
          <ProgressBar percentage={percentage} />
        </ProgressBarContainer>
      </Footer>
    </CardWrapper>
  );
}

export default CardProfile;
