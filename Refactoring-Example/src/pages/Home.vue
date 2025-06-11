<script setup>
import { onMounted, onBeforeUnmount, reactive } from "vue";
import { useStore } from "@/stores";
import { useRouter } from "vue-router";
import axios from "@/plugins/axios";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import compCon01 from "@/components/main/compCon01.vue";
import compCon02 from "@/components/main/compCon02.vue";
import compCon03 from "@/components/main/compCon03.vue";
import compCon04 from "@/components/main/compCon04.vue";
import compCon05 from "@/components/main/compCon05.vue";
import compCon06 from "@/components/main/compCon06.vue";

const store = useStore();
const router = useRouter();

const mainApp = reactive({
  bannerData: {
    topBanner: {},
    bestStudent: {},
  },

  getBannerData: async () => {
    const {
      data: { data },
    } = await axios.get("junior/home/main");
    mainApp.bannerData = data;
    console.log("mainApp.bannerData", mainApp.bannerData);
    mainApp.bannerData.topBanner = stringToHTML(mainApp.bannerData.topBanner);
  },
});

const stringToHTML = (banner) => {
  if (!banner) return banner;
  banner.title = banner.title.replace(/\{(.+?)\}/g, `<span class="text-[#FFA024]">$1</span>`);

  return banner;
};

onMounted(() => {
  if (store.isJuniorLogin) {
    store.setIsJuniorLogin(false);
    router.push("/courseRegister/viewHistory");
  }
  mainApp.getBannerData();

  const header = document.querySelector(".bar > header");

  const onScroll = () => {
    if (!header) return;
    if (window.scrollY > 0) {
      header.classList.add("border-b");
      header.classList.remove("border-b-0");
    } else {
      header.classList.remove("border-b");
      header.classList.add("border-b-0");
    }
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  onBeforeUnmount(() => {
    window.removeEventListener("scroll", onScroll);
  });
});
</script>

<template>
  <div>
    <compHeader :topBanner="mainApp.bannerData.topBanner" class="bar" />
    <compCon01 :bannerData="mainApp.bannerData" />
    <compCon02 />
    <compCon03 />
    <compCon04 />
    <compCon05 :bestStudent="mainApp.bannerData.bestStudent" />
    <compCon06 />

    <div class="fixed bottom-0 left-0 w-full px-[18px] z-10">
      <a
        href="/freeClass"
        class="flex justify-center items-center gap-3.5 max-w-[480px] mx-auto py-4 bg-white rounded-t-[18px] shadow-[0_-20px_50px_rgba(62,82,91,0.1)] cursor-pointer pc:py-[18px]"
      >
        <p class="text-[#1D1D1F] font-bold pc:text-xl"><span class="text-[#FF9016]">무료수업</span> 신청하기</p>

        <img src="@/assets/img/banner/go.png" alt="icon" class="w-2" />
      </a>
    </div>

    <compFooter />
  </div>
</template>

<style scoped lang="scss"></style>
