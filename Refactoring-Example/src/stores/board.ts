import { defineStore } from "pinia";
import axios from "@/plugins/axios.js";

// API 응답 타입 정의
interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

// 공지사항 타입 정의
interface Notice {
  // 실제 Notice 객체의 속성들을 여기에 정의
  // 예시:
  id?: number;
  title?: string;
  content?: string;
  createdAt?: string;
  // ... 기타 필요한 속성들
}

// 스토어 상태 타입 정의
interface BoardState {
  notices: Notice[];
}

export const useBoardStore = defineStore("board", {
  state: (): BoardState => ({
    notices: [],
  }),

  getters: {
    noticeInfo(state: BoardState): Notice[] {
      return state.notices;
    },
  },

  actions: {
    async getNotices(): Promise<void> {
      try {
        const response = await getNoticeList();
        this.notices = response as Notice[];
      } catch (err: unknown) {
        if (err instanceof Error) {
          throw new Error(err.message);
        }
        throw new Error("알 수 없는 에러가 발생했습니다.");
      }
    },
  },
});

export const getNoticeList = async (): Promise<Notice[]> => {
  try {
    const { data } = await axios.get<ApiResponse<Notice[]>>("/junior/notice/list");
    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message || "공지사항을 불러오는데 실패했습니다.");
    }
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("알 수 없는 에러가 발생했습니다.");
  }
};
