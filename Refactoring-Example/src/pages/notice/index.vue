<script setup>
import { useHead } from "@vueuse/head";
import { reactive, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import Pagination from "@/components/common/Pagination.vue";
import { useBoardStore } from "@/stores/board";

useHead({
  title: "당근영어 주니어",
  meta: [
    { name: "title", content: "당근영어 주니어 | 공지사항" },
    { name: "description", content: "당근영어 주니어의 다양한 최신 소식을 빠르게 만나보세요!" },
    { name: "keywords", content: "화상영어, 전화영어, 영어회화, 원어민영어, 주니어영어, 어린이영어, 당근영어, 당근영어 주니어" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "당근영어 주니어 | 공지사항" },
    { property: "og:description", content: "당근영어 주니어의 다양한 최신 소식을 빠르게 만나보세요!" },
    { property: "og:url", content: "https://carrotjunior.kr/notice?page=1" },
  ],
});

const boardStore = useBoardStore();
const route = useRoute();

onMounted(async () => {
  if (!route.query.page) {
    router.replace({ path: "/notice", query: { page: notice.currentPage } });
  } else {
    notice.currentPage = Number(route.query.page);
  }

  if (!boardStore.noticeInfo.list) {
    await boardStore.getNotices();
  }

  notice.list = boardStore.noticeInfo.list;
  notice.total = boardStore.noticeInfo.total;
});

const goToDetail = (idx) => {
  router.push({
    path: "/notice/detail",
    query: { idx: idx },
    state: { page: notice.currentPage },
  });
};

const changePage = (selectedPage) => {
  notice.currentPage = selectedPage;

  router.push({ path: "/notice", query: { page: notice.currentPage } });
};

const notices = computed(() => {
  const start = (notice.currentPage - 1) * notice.pageSize;
  const end = notice.currentPage * notice.pageSize;

  return notice.list.slice(start, end);
});

const router = useRouter();
const notice = reactive({
  list: [],
  currentPage: 1,
  pageSize: 10,
  perSize: 10,
  total: 0,
});
</script>
<template>
  <compHeader />

  <main>
    <div class="max-w-[1200px] mx-auto pt-[70px] px-5 pb-[72px] pc:pt-[124px] pc:pb-[160px] pc:px-0">
      <p class="text-[40px] text-[#18181B] font-bold mb-9 pc:text-[50px] pc:mb-16">공지사항</p>

      <ul class="border-t-2 border-solid border-[#18181B] mb-14 pc:mb-[70px]">
        <li
          v-for="notice in notices"
          :key="notice.rowNum"
          class="flex flex-col gap-2 py-5 border-b border-solid border-[#E5E7EB] pc:flex-row pc:justify-between pc:items-center pc:gap-0 pc:p-[26px]"
        >
          <div class="flex pc:flex-row pc:items-center pc:gap-[86px]">
            <p class="hidden pc:block pc:text-[#18181B] pc:flex-none pc:w-8 pc:text-base">
              {{ notice.rowNum }}
            </p>

            <p @click="goToDetail(notice.idx)" class="text-[#18181B] font-medium cursor-pointer pc:text-lg">
              {{ notice.title }}
            </p>
          </div>

          <p class="text-[#6B7280] pc:text-base">{{ notice.createDate }}</p>
        </li>
      </ul>
      <Pagination
        v-if="notice.total > 0"
        :pageSize="notice.pageSize"
        :perSize="notice.perSize"
        :total="notice.total"
        :currentPage="notice.currentPage"
        @change-page="changePage"
      />
    </div>
  </main>

  <compFooter />
</template>
<style scoped></style>
