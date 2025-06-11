<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useStore } from "@/stores/index";
import axios from "@/plugins/axios";

const store = useStore();
const router = useRouter();

const TARGET_URLS = Object.freeze({
  LOCAL: "http://localhost:5174",
  STAGE: "https://stage-carrotfarm.carrotenglish.com",
  PRODUCTION: "https://carrotfarm.carrotenglish.com",
});

const getTargetUrl = (path = "") => {
  if (location.origin.includes("local")) {
    return TARGET_URLS.LOCAL + path;
  } else if (location.origin.includes("testpage") || location.origin.includes("192.168.")) {
    return TARGET_URLS.STAGE + path;
  } else {
    return TARGET_URLS.PRODUCTION + path;
  }
};

const receiveMessage = async (event) => {
  if (event.origin !== getTargetUrl() || !event.data?.accessToken) return;

  const accessToken = event.data?.accessToken;
  if (accessToken) {
    await store.setAccessToken(accessToken);
    const location = store.getLoginLocation;
    /* store.setUserInfo(await getUserInfo()); */
    router.push({ path: `/Home` });
  } else {
    router.push({ path: `/Home` });
    store.setAccessToken("");
    alert("로그인에 실패했습니다.");
  }
};

const getUserInfo = async () => {
  try {
    const { data } = await axios.get("/app/myInfo/getUserInfo");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

onMounted(() => {
  if (router.currentRoute.value.query.token) {
    receiveMessage({
      origin: getTargetUrl(),
      data: {
        accessToken: router.currentRoute.value.query.token,
      },
    });
  }
});
</script>
<template></template>
<style scoped></style>
