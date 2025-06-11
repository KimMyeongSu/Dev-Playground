<script setup>
import { ref } from "vue";

const processList = [
  { title: "초등 기본", goal: "문장 기초 + 기본 커뮤니케이션", grade: "초등 저학년", level: "LV 2" },
  { title: "초등 심화", goal: "문장 강화 + 커뮤니케이션 확장", grade: "초등 고학년", level: "LV 3-4" },
  { title: "중등 기본", goal: "문법 활용 + 자기 의견 표현", grade: "초등 고학년 - 중등", level: "LV 5-6" },
  { title: "중등 심화", goal: "고급 문법 + 원어민 수준의 말하기 능력", grade: "중등", level: "LV 6 이상" },
];

const openIndex = ref(null);

function toggle(index) {
  openIndex.value = openIndex.value === index ? null : index;
}
</script>

<template>
  <article class="con02">
    <div
      class="pt-[60px] pb-[70px] px-[18px] bg-[#F4F5F6] overflow-hidden tablet:py-[70px] pc:pt-0 pc:pb-[160px] pc:px-0 pc:bg-white"
    >
      <p
        class="text-[34px] text-center font-bold leading-[46px] mb-[34px] tablet:text-4xl tablet:mb-4 pc:text-[54px] pc:mb-[60px]"
      >
        온스쿨 브릿지 <br class="tablet:hidden" />
        <span class="text-[#3182F6]">학습 프로세스</span>
      </p>

      <div class="tablet:hidden">
        <ul class="space-y-3">
          <li v-for="(item, i) in processList" :key="i" class="space-y-1.5">
            <div
              @click="toggle(i)"
              class="py-4 px-[18px] bg-white rounded-xl shadow-[0_5px_10px_rgba(0,0,0,0.06)] flex justify-between items-center"
            >
              <p class="font-bold">{{ item.title }}</p>
              <img
                src="@/assets/img/group-on-school/bridge/con02/arrow.png"
                alt=""
                :class="{ 'rotate-180': openIndex === i }"
                class="flex-none w-3"
              />
            </div>

            <ul
              v-show="openIndex === i"
              class="py-[26px] px-[18px] bg-white border border-solid border-[#D1D4D8] rounded-xl space-y-4"
            >
              <li class="space-y-2">
                <p class="inline-block text-[#3182F6] font-medium py-1 px-2.5 bg-[#D8EFFE] rounded-full">학습목표</p>
                <p class="font-medium ml-2.5">{{ item.goal }}</p>
              </li>

              <li class="space-y-2">
                <p class="inline-block text-[#3182F6] font-medium py-1 px-2.5 bg-[#D8EFFE] rounded-full">대상</p>
                <p class="font-medium ml-2.5">{{ item.grade }}</p>
              </li>

              <li class="space-y-2">
                <p class="inline-block text-[#3182F6] font-medium py-1 px-2.5 bg-[#D8EFFE] rounded-full">당근영어 주니어 레벨</p>
                <p class="font-medium ml-2.5">{{ item.level }}</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="hidden tablet:block pc:hidden">
        <img src="@/assets/img/group-on-school/bridge/con02/con-t.png" alt="" class="w-[768px] mx-auto" />
      </div>

      <div class="hidden pc:block">
        <img src="@/assets/img/group-on-school/bridge/con02/con-p.png" alt="" class="w-[1200px] mx-auto" />
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss"></style>
