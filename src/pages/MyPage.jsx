import styled from "@emotion/styled/macro";
import React, { useState, useEffect } from "react";
import { LeftArrowButton, RightArrowButton } from "../components/ArrowButton";
import BoxButton from "../components/BoxButton";
import addIcon from "../assets/icon/add_icon.svg";
import FavoriteIdolList from "../components/Mypage/FavoriteIdolList";
import IdolList from "../components/Mypage/IdolList";
import { useIdols } from "../hooks/useIdols";
import { usePageSize } from "../hooks/usePageSize";

export default function MyPage() {
  const { pages, cursor, currentPageIndex, setCurrentPageIndex, loadIdols } =
    useIdols(0);
  const pageSize = usePageSize();
  const [favoriteIdols, setFavoriteIdols] = useState([]); // 관심있는 아이돌
  const [selectedIdols, setSelectedIdols] = useState([]); // 추가 전 선택된 아이돌

  useEffect(() => {
    const storedIdols = JSON.parse(localStorage.getItem("favoriteIdols")) || [];
    // 중복 제거를 위해 Set을 사용하여 아이돌 id 기준으로 고유 값만 남김
    const uniqueStoredIdols = Array.from(
      new Set(storedIdols.map((idol) => idol.id)),
    ).map((id) => storedIdols.find((idol) => idol.id === id));

    setFavoriteIdols(uniqueStoredIdols);
    loadIdols(0, 16, true);
  }, []);

  function handleLeftClick() {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  }

  function handleRightClick() {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    } else if (cursor !== null) {
      loadIdols(cursor, pageSize);
    }
  }

  function handleSelect(id) {
    if (selectedIdols.includes(id)) {
      setSelectedIdols((prevList) => prevList.filter((item) => item !== id));
      return;
    }
    setSelectedIdols((prevList) => [...prevList, id]);
  }

  function handleAdd() {
    const idolsToAdd = pages
      .flat()
      .filter((idol) => selectedIdols.includes(idol.id));

    // 중복 제거를 위한 Map을 활용
    const idolMap = new Map(favoriteIdols.map((idol) => [idol.id, idol]));
    idolsToAdd.forEach((idol) => idolMap.set(idol.id, idol)); // 중복 제거

    const newFavoriteIdols = Array.from(idolMap.values());

    setFavoriteIdols(newFavoriteIdols);
    setSelectedIdols([]);
    localStorage.setItem("favoriteIdols", JSON.stringify(newFavoriteIdols));
  }

  function handleDelete(id) {
    const newList = favoriteIdols.filter((idol) => idol.id !== id);
    setFavoriteIdols(newList);
    localStorage.setItem("favoriteIdols", JSON.stringify(newList));
  }

  const currentIdols = pages[currentPageIndex] || [];

  const isLoadDisabled = cursor === null;

  return (
    <Container>
      <AddedWrapper>
        <Title> 내가 관심있는 아이돌</Title>
        <FavoriteIdolList idols={favoriteIdols} onDelete={handleDelete} />
      </AddedWrapper>
      <Divider />
      <AddWrapper>
        <Title>관심 있는 아이돌을 추가해보세요.</Title>
        <Slide>
          <ArrowWarpper direction="left">
            <LeftArrowButton onClick={handleLeftClick} />
          </ArrowWarpper>
          <IdolList
            currentIdols={currentIdols}
            favoriteIdols={favoriteIdols}
            selectedIdols={selectedIdols}
            onSelect={handleSelect}
          />
          <ArrowWarpper direction="right" isDisabled={isLoadDisabled}>
            <RightArrowButton onClick={handleRightClick} />
          </ArrowWarpper>
        </Slide>
        <BoxButtonWrapper>
          <BoxButton
            size="medium"
            onClick={handleAdd}
            isRound={true}
            icon={addIcon}
          >
            추가하기
          </BoxButton>
        </BoxButtonWrapper>
      </AddWrapper>
    </Container>
  );
}

const AddedWrapper = styled.section`
  width: 1200px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 524px;
  }

  @media (max-width: 768px) {
    width: 328px;
  }
`;

const AddWrapper = styled.section`
  width: 1200px;
  margin-top: 40px;
  margin: 0 auto;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Divider = styled.div`
  width: 1200px;
  border-top: 1px solid var(--gray-300);
  margin: 0 auto;
  margin-top: 30px;
  margin-bottom: 30px;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  align-items: center;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Title = styled.h2`
  font-size: 26px;
  font-weight: 700;
  color: var(--white-darker);

  @media (max-width: 1024px) {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Slide = styled.div`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(2, auto);
  position: relative;
  row-gap: 16px;
  gap: 16px;
  margin-top: 32px;

  @media (max-width: 1024px) {
    width: 524px;
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 768px) {
    width: 328px;
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ArrowWarpper = styled.div`
  position: absolute;
  top: 25%;
  left: ${(props) => (props.direction === "left" ? "-5%" : "")};
  right: ${(props) => (props.direction === "right" ? "-5%" : "")};

  @media (max-width: 1024px) {
    left: ${(props) => (props.direction === "left" ? "-10%" : "")};
    right: ${(props) => (props.direction === "right" ? "-10%" : "")};
  }

  @media (max-width: 768px) {
    left: ${(props) => (props.direction === "left" ? "-15%" : "")};
    right: ${(props) => (props.direction === "right" ? "-15%" : "")};
  }
`;

const BoxButtonWrapper = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: center;
`;
