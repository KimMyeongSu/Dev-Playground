<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import { getDetailPageInfo } from "@/api/board";

const router = useRouter();
const route = useRoute();
const notice = ref({
  info: {},
  prev: {},
  next: {},
});
const prevPage = router.options.history.state.page;

onMounted(async () => {
  const noticeContents = await getDetailPageInfo(route.query.idx);

  notice.value = {
    info: noticeContents.info,
    prev: noticeContents.prev,
    next: noticeContents.next,
  };
});

const goToList = () => {
  router.push({ path: "/notice", query: { page: prevPage } });
};
const goToDetail = (idx) => {
  if (!idx) return;

  router.push({
    name: "noticeDetailPage",
    params: { idx: idx },
    state: { page: prevPage },
  });
};
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div class="max-w-[1200px] mx-auto pt-[70px] px-5 pb-[72px] pc:pt-[124px] pc:pb-[160px] pc:px-0">
        <p class="text-xl text-[#18181B] font-bold mb-2 pc:text-2xl pc:mb-3.5">
          {{ notice.info.title }}
        </p>

        <p class="text-sm text-[#6B7280] border-b-2 border-solid border-[#18181B] pb-9 pc:pb-6 pc:mb-[60px]">
          {{ notice.info.date }}
        </p>

        <div class="max-w-[780px] mx-auto whitespace-pre-line mb-[54px]" v-html="notice.info.contents"></div>

        <ul class="border-y border-solid border-[#09090B] mb-[30px] pc:mb-[38px]">
          <li
            class="flex flex-col gap-1.5 px-2.5 py-4 border-b border-solid border-[#D1D5DB] pc:flex-row pc:items-center pc:gap-7 pc:p-5"
          >
            <p class="text-sm text-[#09090B] font-bold pc:text-base">다음글</p>

            <p @click="goToDetail(notice.next?.idx)" class="text-[#09090B] cursor-pointer">
              {{ notice.next ? notice.next.title : "-" }}
            </p>
          </li>

          <li class="flex flex-col gap-1.5 px-2.5 py-4 pc:flex-row pc:items-center pc:gap-7 pc:p-5">
            <p class="text-sm text-[#09090B] font-bold pc:text-base">이전글</p>

            <p @click="goToDetail(notice.prev?.idx)" class="text-[#09090B] cursor-pointer">
              {{ notice.prev ? notice.prev.title : "-" }}
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
