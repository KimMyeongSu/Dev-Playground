import { defineStore } from "pinia";

interface State {
  accessToken: string | null;
  isJuniorLogin: boolean;
  userInfo: object;
}

export const useStore = defineStore("CarrotJunior", {
  state: (): State => ({
    accessToken: null,
    isJuniorLogin: false,
    userInfo: {
      uid: "",
      mobile: "",
      kname: "",
    },
  }),
  actions: {
    async setAccessToken(token: string) {
      this.accessToken = token;
    },
    async setIsJuniorLogin(isJuniorLogin: boolean) {
      this.isJuniorLogin = isJuniorLogin;
    },
    clearAccessToken() {
      this.accessToken = null;
    },
    setUserInfo(userInfo: object) {
      this.userInfo = userInfo;
    },
    clearUserInfo() {
      this.userInfo = {};
    },
  },
  persist: {
    key: "CarrotJunior",
  },
});
