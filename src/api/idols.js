import axios from "axios";
import { retryRequest } from "./retryApi";

const BASE_URL = "https://fandom-k-api.vercel.app";

// 아이돌 목록 조회
export const getIdols = async (cursor = 0, pageSize = 10, keyword = "") => {
  const axiosRequestFunction = () =>
    axios.get(`${BASE_URL}/9-2/idols`, {
      params: {
        cursor: cursor, // cursor 값을 직접 전달
        pageSize: pageSize,
        keyword: keyword,
      },
    });

  return retryRequest(axiosRequestFunction); // 재시도 가능한 요청
};
// 새로운 아이돌 생성
export const postIdols = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/9-2/idols`);
    return response.data;
  } catch (error) {
    console.error("새로운 아이돌을 생성하는데 실패했습니다.", error);
    throw error;
  }
};

// 아이돌 정보 업데이트
export const putIdols = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/9-2/idols/${id}`);
    return response.data;
  } catch (error) {
    console.error("아이돌 정보를 업데이트하는데 실패했습니다.", error);
    throw error;
  }
};

// 아이돌 삭제
export const deleteIdols = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/9-2/idols/${id}`);
    return response.data;
  } catch (error) {
    console.error("아이돌을 삭제하는데 실패했습니다.", error);
    throw error;
  }
};
