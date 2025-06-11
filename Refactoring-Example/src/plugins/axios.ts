import axios from "axios";
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from "axios";
import { useStore } from "@/stores";

// 에러 알림 표시 여부를 추적하는 플래그
let hasShownError: boolean = false;

let targetUrl: string = "";
if (location.origin.includes("localhost") || location.origin.includes("testpage") || location.origin.includes("192.168")) {
  targetUrl = `https://stage-homeapi.carrotenglish.com/`;
} else {
  targetUrl = `https://homeapi.carrotenglish.com/`;
}
axios.defaults.headers.common["Content-Type"] = "application/json";

const instance: AxiosInstance = axios.create({
  baseURL: targetUrl,
  timeout: 100000,
  withCredentials: false,
});

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useStore();
    const accessToken = store.accessToken;
    Object.assign(config.headers, {
      accessToken: accessToken ? accessToken : "",
    });

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data.errorMessage !== undefined && !hasShownError) {
      hasShownError = true;
      alert(response.data.errorMessage);
      /* window.location.href = "https://carrotians.net"; */
    }
    return response;
  },
  (error: AxiosError) => {
    if (!hasShownError) {
      hasShownError = true;
      alert("연결이 끊어졌습니다. 인터넷을 확인해보시고, 다시 접속해주세요");
      /* window.location.href = "https://carrotians.net"; */
    }
    console.error("Network Error, Retry", error);
    return Promise.reject(error);
  }
);

// 페이지 이동 시 에러 플래그 초기화
window.addEventListener("popstate", () => {
  hasShownError = false;
});

export default instance;
export { targetUrl };