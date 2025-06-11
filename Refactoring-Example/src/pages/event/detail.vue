<script setup>
import { ref, onMounted, onUnmounted, nextTick } from "vue";
import { useRouter, useRoute } from "vue-router";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import { getDetailPageInfo } from "@/api/board.js";

const route = useRoute();
const router = useRouter();

const event = ref({
  info: {},
  prev: {},
  next: {},
});
const htmlContainer = ref(null);
const originalWidth = 780; // 원본 이미지 너비

onMounted(async () => {
  const eventDetail = await getDetailPageInfo(route.query.idx);
  console.log(eventDetail);
  event.value = {
    info: eventDetail.info,
    prev: eventDetail.prev,
    next: eventDetail.next,
  };

  parseHtml();
  window.addEventListener("resize", setCoords);
});

const parseHtml = () => {
  const parser = new DOMParser();
  const contents = parser.parseFromString(event.value.info.contents, "text/html");
  const img = contents?.querySelector("img[usemap]");
  const areas = contents?.querySelectorAll("map area");

  if (!img || areas.length === 0) {
    console.warn("이미지 맵 또는 영역이 없습니다.");
    return;
  }

  areas.forEach((area) => {
    area.dataset.coords = area.getAttribute("coords");
  });

  event.value.info.contents = contents.body.innerHTML;

  nextTick(() => {
    setCoords();
  });
};

const setCoords = () => {
  const container = htmlContainer.value;
  const img = container?.querySelector("img[usemap]");
  const areas = container?.querySelectorAll("map area");

  if (!img || areas.length === 0) {
    console.warn("이미지 맵 또는 영역이 없습니다.");
    return;
  }

  const currentWidth = img.offsetWidth;
  const scaleFactor = currentWidth / originalWidth;

  areas.forEach((area) => {
    const originalCoords = area.dataset.coords.split(",").map(Number);
    const scaledCoords = originalCoords.map((coord) => Math.round(coord * scaleFactor));
    area.setAttribute("coords", scaledCoords.join(","));
  });
};

const goToList = () => {
  router.push({ path: "/event" });
};

const goToDetail = (idx) => {
  if (!idx) return;

  router.push({ path: "/event/detail", query: { idx: idx } });
};

onUnmounted(() => {
  window.removeEventListener("resize", setCoords);
});
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div class="max-w-[1200px] mx-auto pt-[70px] px-5 pb-[72px] pc:pt-[124px] pc:pb-[160px] pc:px-0">
        <p class="text-xl text-[#18181B] font-bold mb-2 pc:text-2xl pc:mb-3.5">
          {{ event.info.title }}
        </p>

        <p class="text-sm text-[#6B7280] border-b-2 border-solid border-[#18181B] pb-9 pc:pb-6 pc:mb-[60px]">
          {{ event.info.date }}
        </p>

        <div class="max-w-[780px] mx-auto whitespace-pre-line mb-[54px]" ref="htmlContainer" v-html="event.info.contents"></div>

        <ul class="border-y border-solid border-[#09090B] mb-[30px] pc:mb-[38px]">
          <li
            class="flex flex-col gap-1.5 px-2.5 py-4 border-b border-solid border-[#D1D5DB] pc:flex-row pc:items-center pc:gap-7 pc:p-5"
          >
            <p class="text-sm text-[#09090B] font-bold pc:text-base">다음글</p>

            <p @click="goToDetail(event.next?.idx)" class="text-[#09090B] cursor-pointer">
              {{ event.next ? event.next.title : "-" }}
            </p>
          </li>

          <li class="flex flex-col gap-1.5 px-2.5 py-4 pc:flex-row pc:items-center pc:gap-7 pc:p-5">
            <p class="text-sm text-[#09090B] font-bold pc:text-base">이전글</p>

            <p @click="goToDetail(event.prev?.idx)" class="text-[#09090B] cursor-pointer">
              {{ event.prev ? event.prev.title : "-" }}
            </p>
          </li>
        </ul>

        <div class="flex justify-center">
          <p
            @click="goToList"
            class="text-sm text-[#09090B] font-medium px-9 py-4 border border-solid border-[#D1D5DB] rounded-[10px] cursor-pointer pc:px-[52px] pc:py-5 pc:text-lg"
          >
            목록 보기
          </p>
        </div>
      </div>
    </main>

    <compFooter />
  </div>
</template>
<style scoped></style>
