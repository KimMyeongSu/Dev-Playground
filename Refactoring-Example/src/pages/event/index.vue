<script setup>
import { useHead } from "@vueuse/head";
import { reactive, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";

import { getEventList } from "@/api/board.js";

useHead({
  title: "당근영어 주니어",
  meta: [
    { name: "title", content: "당근영어 주니어 | 이벤트" },
    { name: "description", content: "당근영어 주니어의 다양한 이벤트 혜택을 확인하세요." },
    { name: "keywords", content: "화상영어, 전화영어, 영어회화, 원어민영어, 주니어영어, 어린이영어, 당근영어, 당근영어 주니어" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "당근영어 주니어 | 이벤트" },
    { property: "og:description", content: "당근영어 주니어의 다양한 이벤트 혜택을 확인하세요." },
    { property: "og:url", content: "https://carrotjunior.kr/event" },
  ],
});

const eventList = ref([]);
const IN_PROGRESS = "I";
const DONE = "E";

onMounted(async () => {
  const eventInfo = await getEventList();
  eventList.value = eventInfo.list;
});

const router = useRouter();
const goToDetail = (idx) => {
  router.push({ path: "/event/detail", query: { idx: idx } });
};
</script>
<template>
  <compHeader />
  <main>
    <div class="max-w-[1200px] mx-auto pt-[70px] px-5 pb-[72px] tablet:pb-[94px] pc:pt-[124px] pc:pb-[160px] pc:px-0">
      <p class="text-[40px] text-[#18181B] font-bold mb-2 tablet:text-[42px] tablet:mb-2.5 pc:text-[50px] pc:mb-5">이벤트</p>
      <p class="text-sm text-[#6B7280] mb-[34px] tablet:text-lg tablet:mb-[42px] pc:mb-[50px]">
        당근영어의 이벤트 혜택을 확인 하세요.
      </p>

      <ul class="grid grid-cols-1 gap-7 tablet:grid-cols-2 tablet:gap-x-4 tablet:gap-y-10 pc:grid-cols-3 pc:gap-x-5">
        <li
          @click="goToDetail(event.idx)"
          :class="event.progress === IN_PROGRESS ? 'cursor-pointer' : 'pointer-events-none'"
          v-for="event in eventList"
          :key="event.rowNum"
        >
          <div class="relative rounded-2xl mb-3.5 overflow-hidden">
            <img :src="event.fileUrl" alt="icon" />
            <div class="absolute inset-0 bg-[rgba(9,9,11,0.5)]" v-if="event.progress === DONE"></div>
          </div>
          <p
            class="inline-block text-sm font-medium px-1.5 py-1 rounded-md mb-1.5 text-[#6B7280] bg-[#E5E7EB]"
            :class="{ 'text-[#FF3378] bg-[#FFEAF1]': event.progress === IN_PROGRESS }"
          >
            {{ event.progress === IN_PROGRESS ? "진행중" : "종료" }}
          </p>
          <p class="text-[#18181B] font-bold mb-2.5">{{ event.title }}</p>
          <p class="text-sm text-[#6B7280]">{{ event.createDate }}</p>
        </li>
      </ul>
    </div>
  </main>

  <compFooter />
</template>
<style scoped></style>
