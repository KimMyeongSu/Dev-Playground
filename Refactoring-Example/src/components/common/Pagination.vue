<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  total: Number,
  perSize: Number,
  pageSize: Number,
  currentPage: Number,
});

const totalPage = computed(() => Math.ceil(props.total / props.pageSize));
const emit = defineEmits(["change-page"]);

const changePage = (page) => {
  if (page === props.currentPage) return;

  emit("change-page", page);
};

const prevPage = () => {
  if (props.currentPage > 1) {
    changePage(props.currentPage - 1);
  }
};

const nextPage = () => {
  if (props.currentPage < totalPage.value) {
    changePage(props.currentPage + 1);
  }
};
const getPageRange = () => {
  const start = Math.max(1, Math.floor((props.currentPage - 1) / props.perSize) * props.perSize + 1);
  const end = Math.min(totalPage.value, start + props.perSize - 1);

  return { start, end };
};

const getPages = () => {
  const { start, end } = getPageRange();

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return pages;
};
</script>
<template>
  <div class="flex items-center justify-center gap-5">
    <img @click="prevPage" src="@/assets/img/common/arrow.png" alt="icon" class="rotate-180 cursor-pointer w-1.5 pc:w-2" />

    <ul class="flex gap-1">
      <li
        v-for="page in getPages()"
        :key="page"
        @click="changePage(page)"
        class="size-[30px] flex justify-center items-center"
        :class="{ 'bg-[#E5E7EB] rounded-full': page === props.currentPage }"
      >
        <p class="text-base text-[#18181B] font-medium cursor-pointer">{{ page }}</p>
      </li>
    </ul>

    <img @click="nextPage" src="@/assets/img/common/arrow.png" alt="icon" class="cursor-pointer w-1.5 pc:w-2" />
  </div>
</template>
<style scoped></style>
