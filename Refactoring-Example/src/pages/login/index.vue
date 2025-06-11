<script setup>
import { useRouter } from "vue-router";
import { ref, onBeforeUnmount, onMounted } from "vue";
import { useStore } from "@/stores/index";

import axios from "@/plugins/axios";

const store = useStore();

const router = useRouter();

const TARGET_URLS = Object.freeze({
  LOCAL: "http://localhost:27080",
  STAGE: "https://stage-carrotfarm.carrotenglish.com",
  PRODUCTION: "https://carrotfarm.carrotenglish.com",
});

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

const getTargetUrl = (path = "") => {
  if (location.origin.includes("local")) {
    return TARGET_URLS.LOCAL + path;
  } else if (location.origin.includes("stage") || location.origin.includes("192.168.")) {
    return TARGET_URLS.STAGE + path;
  } else {
    return TARGET_URLS.PRODUCTION + path;
  }
};

const receiveMessage = async (event) => {
  if (event.origin !== getTargetUrl() || !event.data?.accessToken) return;

  const accessToken = event.data?.accessToken;
  if (accessToken) {
    const location = store.getLoginLocation;

    store.setAccessToken(accessToken);

    router.push({ path: `/home` });
  } else {
    router.push({ path: `/home` });
    store.setAccessToken("");
    alert("로그인에 실패했습니다.");
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
