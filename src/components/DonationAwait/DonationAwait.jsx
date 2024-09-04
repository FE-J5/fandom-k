import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "@emotion/styled";
import CardProfile from "./CardProfile";
import { LeftArrowButton, RightArrowButton } from "../ArrowButton";
import { getDonation } from "../../api/donations";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  margin: auto;

  .slick-prev:before,
  .slick-next:before {
    display: none;
  }

  .slick-prev,
  .slick-next {
    width: 40px;
    height: 78.33px;
    transform: none;
  }

  .slick-prev {
    left: -70px;
  }

  .slick-next {
    right: -70px;
  }

  .slick-slide {
    margin-bottom: 40px;
  }

  @media (max-width: 1200px) {
    width: 700px;
    overflow: hidden;
  }

  @media (max-width: 744px) {
    width: 327px;
    overflow: hidden;
  }
`;

const Title = styled.h2`
  color: var(--white);
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;

  @media (max-width: 744px) {
    font-size: 16px;
  }
`;

function DonationAwait() {
  const [donations, setDonations] = useState([]); // API에서 받아온 카드 목록
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 인덱스 상태 추가

  useEffect(() => {
    const fetchInitialDonations = async () => {
      try {
        const data = await getDonation();

        // 남은 날짜 수로 정렬
        const sortedData = data.list.sort((a, b) => {
          const aDaysLeft = Math.ceil(
            (new Date(a.deadline) - new Date()) / (1000 * 60 * 60 * 24),
          );
          const bDaysLeft = Math.ceil(
            (new Date(b.deadline) - new Date()) / (1000 * 60 * 60 * 24),
          );
          return aDaysLeft - bDaysLeft;
        });

        setDonations(sortedData);
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      }
    };

    fetchInitialDonations();

    const intervalId = setInterval(fetchInitialDonations, 10000); // 10초마다 데이터 갱신

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  const fetchMoreDonations = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const data = await getDonation();
      const newDonations = data.list.filter(
        (item) => !donations.some((donation) => donation.id === item.id),
      );
      setDonations((prevDonations) => [...prevDonations, ...newDonations]);
    } catch (error) {
      console.error("더 많은 데이터를 가져오는데 실패했습니다.", error);
    } finally {
      setLoading(false);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow:
      currentIndex < donations.length - 4 ? <RightArrowButton /> : null, // 조건부 렌더링
    prevArrow: currentIndex > 0 ? <LeftArrowButton /> : null, // 조건부 렌더링

    afterChange: (current) => {
      setCurrentIndex(current); // 현재 슬라이드 인덱스 업데이트
      if (current + 4 >= donations.length) {
        fetchMoreDonations();
      }
    },
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
          arrows: false,
        },
      },
      {
        breakpoint: 744,
        settings: {
          slidesToShow: 2.05,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div>
      <Container>
        <Title>후원을 기다리는 조공</Title>
        {donations.length > 0 && (
          <Slider {...settings}>
            {donations.map((item) => (
              <CardProfile key={item.id} item={item} />
            ))}
          </Slider>
        )}
      </Container>
    </div>
  );
}

export default DonationAwait;
