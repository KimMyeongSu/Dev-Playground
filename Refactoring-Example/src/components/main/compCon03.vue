<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const router = useRouter();
const route = useRoute();
const activePersonalTab = ref(0);
const activeGroupTab = ref(0);
const personalTabs = [
  { title: "RISE", gradeM: "초1~3", gradeP: "초등 1~3학년" },
  { title: "EDGE", gradeM: "초4~5", gradeP: "초등 4~5학년" },
  { title: "SUMMIT", gradeM: "초6~중3", gradeP: "초등 6학년~중등 3학년" },
];
const groupTabs = [{ title: "온스쿨\n아카데미" }, { title: "온스쿨\n브릿지" }, { title: "온스쿨\n디베이트" }];
const swiperModules = [Autoplay, Pagination];

onMounted(() => {});
</script>

<template>
  <article class="con03">
    <div
      class="pt-20 pb-[50px] px-[18px] max-w-[1200px] mx-auto tablet:pt-[124px] tablet:pb-[90px] pc:pt-[180px] pc:pb-[140px] pc:px-0"
    >
      <div class="mb-20 tablet:mb-[124px] pc:mb-[160px]">
        <div class="pc:hidden">
          <img src="@/assets/img/main/con03/title-p-m.png" alt="" class="w-[182px] mb-3.5 mx-auto tablet:w-[228px] tablet:mb-4" />
        </div>

        <div class="hidden pc:block">
          <img src="@/assets/img/main/con03/title-p-p.png" alt="" class="w-[326px] mb-[22px] mx-auto" />
        </div>

        <p class="text-center leading-6 mb-[46px] tablet:text-xl tablet:mb-[50px] pc:text-2xl pc:leading-[34px] pc:mb-20">
          당근영어 주니어만의<br />
          100% 1:1 맞춤 수업으로 하이엔드 학습 경험이 가능합니다
        </p>

        <ul class="flex justify-center gap-3.5 mb-6 tablet:mb-9 pc:gap-10 pc:mb-[50px]">
          <li
            v-for="(tab, index) in personalTabs"
            :key="index"
            @click="activePersonalTab = index"
            :class="[
              'relative size-[98px] flex justify-center items-center border border-solid rounded-2xl cursor-pointer tablet:size-[128px] tablet:rounded-[30px] pc:size-[180px] pc:rounded-[36px]',
              activePersonalTab === index
                ? 'border-[#FF6714] shadow-[0_6px_20px_rgba(0,0,0,0.1)] -translate-y-1.5'
                : 'border-[#cccccc]',
            ]"
            class="group"
          >
            <div class="space-y-1">
              <p
                :class="[
                  activePersonalTab === index
                    ? 'text-xl text-[#FF6714] tablet:text-2xl pc:text-[28px]'
                    : 'text-lg tablet:text-xl pc:text-[26px]',
                ]"
                class="text-center font-bold leading-tight whitespace-pre-line pc:group-hover:text-2xl pc:group-hover:text-[28px]"
              >
                {{ tab.title }}
              </p>
              <div class="pc:hidden">
                <p class="text-sm text-center font-medium leading-tight">
                  {{ tab.gradeM }}
                </p>
              </div>
              <div class="hidden pc:block">
                <p class="text-center font-medium leading-tight">
                  {{ tab.gradeP }}
                </p>
              </div>
            </div>

            <div v-show="activePersonalTab === index" class="absolute left-1/2 -translate-x-1/2 bottom-2 pc:bottom-5">
              <img src="@/assets/img/main/con03/arrow.png" alt="" class="w-2 pc:w-3" />
            </div>
          </li>
        </ul>

        <ul class="max-w-[840px] mx-auto mb-[30px] tablet:mb-9 pc:max-w-full pc:mb-[52px]">
          <li v-show="activePersonalTab === 0">
            <div
              class="flex flex-col gap-5 p-5 bg-[#F4F5F6] rounded-2xl mb-4 tablet:flex-row tablet:justify-center tablet:items-start tablet:py-[26px] pc:py-[38px] pc:gap-[30px] pc:mb-6"
            >
              <div class="flex-none flex items-center gap-2">
                <img src="@/assets/img/main/con03/goal.png" alt="" class="w-5 pc:w-6" />
                <p class="font-bold tablet:text-xl pc:text-[22px]">학습 대상</p>
              </div>

              <div>
                <p class="text-sm font-bold leading-tight mb-3 tablet:text-base tablet:mb-1 pc:text-lg">
                  추천 레벨 : 당근영어 주니어 Lv 1-5 / AR 0.5-2.9
                </p>

                <ul class="space-y-2 tablet:space-y-1">
                  <li class="flex gap-1">
                    <div class="pc:hidden">
                      <div class="pt-1.5 tablet:pt-2">
                        <div class="size-1 bg-[#6D7076] rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                      기본적인 영어 학습을 하여 원어민과의 1:1 커뮤니케이션이 가능한 경우​
                    </p>
                  </li>

                  <li class="flex gap-1">
                    <div class="pc:hidden">
                      <div class="pt-1.5 tablet:pt-2">
                        <div class="size-1 bg-[#6D7076] rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                      영어로 소통하는 능력을 꾸준히 향상시키고 싶은 경우​
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tablet:hidden">
              <div class="relative">
                <Swiper
                  :pagination="{
                    el: '.slide-rise-pagination',
                    clickable: true,
                  }"
                  :loop="true"
                  :spaceBetween="16"
                  :modules="swiperModules"
                  class="mb-3"
                >
                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-rise/img1.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-rise/img2.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-rise/img3.png" alt="" />
                  </SwiperSlide>
                </Swiper>

                <div class="slide-rise-pagination"></div>
              </div>
            </div>

            <div class="hidden tablet:block">
              <ul class="grid grid-cols-3 tablet:gap-3 pc:gap-5">
                <li>
                  <img src="@/assets/img/main/con03/p-rise/img1.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/p-rise/img2.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/p-rise/img3.png" alt="" class="rounded-3xl" />
                </li>
              </ul>
            </div>
          </li>

          <li v-show="activePersonalTab === 1">
            <div
              class="flex flex-col gap-5 p-5 bg-[#F4F5F6] rounded-2xl mb-4 tablet:flex-row tablet:justify-center tablet:items-start tablet:py-[26px] pc:py-[38px] pc:gap-[30px] pc:mb-6"
            >
              <div class="flex-none flex items-center gap-2">
                <img src="@/assets/img/main/con03/goal.png" alt="" class="w-5 pc:w-6" />
                <p class="font-bold tablet:text-xl pc:text-[22px]">학습 대상</p>
              </div>

              <div>
                <p class="text-sm font-bold leading-tight mb-3 tablet:text-base tablet:mb-1 pc:text-lg">
                  추천 레벨 : 당근영어 주니어 Lv 6-8 / AR 3.0-4.5
                </p>

                <ul class="space-y-2 tablet:space-y-1">
                  <li class="flex gap-1">
                    <div class="pc:hidden">
                      <div class="pt-1.5 tablet:pt-2">
                        <div class="size-1 bg-[#6D7076] rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                      영어적 사고력을 통해 자신감 있게 이해하고 말하며, 자신의 생각을 작성하는​ 능력을 키우고 싶은 경우
                    </p>
                  </li>

                  <li class="flex gap-1">
                    <div class="pc:hidden">
                      <div class="pt-1.5 tablet:pt-2">
                        <div class="size-1 bg-[#6D7076] rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                      원어민과 자연스러운 1:1 수업이 가능한 경우
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tablet:hidden">
              <div class="relative">
                <Swiper
                  :pagination="{
                    el: '.slide-edge-pagination',
                    clickable: true,
                  }"
                  :loop="true"
                  :spaceBetween="16"
                  :modules="swiperModules"
                  class="mb-3"
                >
                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-edge/img1.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-edge/img2.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-edge/img3.png" alt="" />
                  </SwiperSlide>
                </Swiper>

                <div class="slide-edge-pagination"></div>
              </div>
            </div>

            <div class="hidden tablet:block">
              <ul class="grid grid-cols-3 tablet:gap-3 pc:gap-5">
                <li>
                  <img src="@/assets/img/main/con03/p-edge/img1.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/p-edge/img2.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/p-edge/img3.png" alt="" class="rounded-3xl" />
                </li>
              </ul>
            </div>
          </li>

          <li v-show="activePersonalTab === 2">
            <div
              class="flex flex-col gap-5 p-5 bg-[#F4F5F6] rounded-2xl mb-4 tablet:flex-row tablet:justify-center tablet:items-start tablet:py-[26px] pc:py-[38px] pc:gap-[30px] pc:mb-6"
            >
              <div class="flex-none flex items-center gap-2">
                <img src="@/assets/img/main/con03/goal.png" alt="" class="w-5 pc:w-6" />
                <p class="font-bold tablet:text-xl pc:text-[22px]">학습 대상</p>
              </div>

              <div>
                <p class="text-sm font-bold leading-tight mb-3 tablet:text-base tablet:mb-1 pc:text-lg">
                  추천 레벨 : 당근영어 주니어 Lv 9-10 / AR 4.6 이상
                </p>

                <ul class="space-y-2 tablet:space-y-1">
                  <li class="flex gap-1">
                    <div class="pc:hidden">
                      <div class="pt-1.5 tablet:pt-2">
                        <div class="size-1 bg-[#6D7076] rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                      인터뷰 등 실전 대비 영어 말하기 스킬이 필요한 경우​
                    </p>
                  </li>

                  <li class="flex gap-1">
                    <div class="pc:hidden">
                      <div class="pt-1.5 tablet:pt-2">
                        <div class="size-1 bg-[#6D7076] rounded-full"></div>
                      </div>
                    </div>
                    <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                      영어 수업이 중심인 학교 수업을 대비해야 하는 경우
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            <div class="tablet:hidden">
              <div class="relative">
                <Swiper
                  :pagination="{
                    el: '.slide-summit-pagination',
                    clickable: true,
                  }"
                  :loop="true"
                  :spaceBetween="16"
                  :modules="swiperModules"
                  class="mb-3"
                >
                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-summit/img1.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-summit/img2.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/p-summit/img3.png" alt="" />
                  </SwiperSlide>
                </Swiper>

                <div class="slide-summit-pagination"></div>
              </div>
            </div>

            <div class="hidden tablet:block">
              <ul class="grid grid-cols-3 tablet:gap-3 pc:gap-5">
                <li>
                  <img src="@/assets/img/main/con03/p-summit/img1.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/p-summit/img2.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/p-summit/img3.png" alt="" class="rounded-3xl" />
                </li>
              </ul>
            </div>
          </li>
        </ul>

        <div class="flex justify-center">
          <a
            href="/personalOnSchool"
            class="w-[212px] flex justify-between items-center py-3.5 pr-3.5 pl-7 border border-solid border-[#cccccc] rounded-full pc:w-[256px] pc:gap-0 pc:py-4 pc:pl-[34px] pc:pr-4"
          >
            <p class="font-bold pc:text-xl pc:leading-tight">1:1 퍼스널 바로가기</p>
            <img src="@/assets/img/main/con03/go1.png" alt="" class="w-[26px] pc:w-[34px]" />
          </a>
        </div>
      </div>

      <div>
        <div class="pc:hidden">
          <img
            src="@/assets/img/main/con03/title-g-m.png"
            alt=""
            class="w-[154px] mb-3.5 mx-auto tablet:w-[192px] tablet:mb-[18px]"
          />
        </div>

        <div class="hidden pc:block">
          <img src="@/assets/img/main/con03/title-g-p.png" alt="" class="w-[274px] mb-[22px] mx-auto" />
        </div>

        <p class="text-center leading-6 mb-[46px] tablet:text-xl tablet:mb-[50px] pc:text-2xl pc:leading-[34px] pc:mb-20">
          입체적인 소통이 가능한 영어 환경 속에서<br />
          영어로 말하는 자신감 UP!
        </p>

        <ul class="flex justify-center gap-3.5 mb-6 pc:gap-10 pc:mb-[50px]">
          <li
            v-for="(tab, index) in groupTabs"
            :key="index"
            @click="activeGroupTab = index"
            :class="[
              'relative size-[98px] flex justify-center items-center border border-solid rounded-2xl cursor-pointer tablet:size-[128px] tablet:rounded-[30px] pc:size-[180px] pc:rounded-[36px]',
              activeGroupTab === index
                ? 'border-[#3182F6] shadow-[0_6px_20px_rgba(0,0,0,0.1)] -translate-y-1.5'
                : 'border-[#cccccc]',
            ]"
            class="group"
          >
            <div class="space-y-1">
              <p
                :class="[
                  activeGroupTab === index
                    ? 'text-xl text-[#3182F6] tablet:text-2xl pc:text-[28px]'
                    : 'text-lg tablet:text-xl pc:text-[26px]',
                ]"
                class="text-center font-bold leading-tight whitespace-pre-line pc:group-hover:text-2xl pc:group-hover:text-[28px]"
              >
                {{ tab.title }}
              </p>
            </div>

            <div v-show="activeGroupTab === index" class="absolute left-1/2 -translate-x-1/2 bottom-2 pc:bottom-5">
              <img src="@/assets/img/main/con03/arrow.png" alt="" class="w-2 pc:w-3" />
            </div>
          </li>
        </ul>

        <ul class="max-w-[840px] mx-auto pc:max-w-full">
          <li v-show="activeGroupTab === 0">
            <div
              class="flex flex-col gap-5 p-5 bg-[#F4F5F6] rounded-2xl mb-4 tablet:flex-row tablet:justify-center tablet:items-start tablet:py-[26px] pc:py-[38px] pc:gap-[30px] pc:mb-6"
            >
              <div class="flex-none flex items-center gap-2">
                <img src="@/assets/img/main/con03/goal2.png" alt="" class="w-4 pc:w-5" />
                <p class="font-bold tablet:text-xl pc:text-[22px]">학습 목표</p>
              </div>

              <ul class="space-y-2 tablet:space-y-1">
                <li class="flex gap-1">
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">1.</p>
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                    미국 학년을 기준으로 각 학년에 필요한 학습 영역을 배우고 싶은 학생
                  </p>
                </li>

                <li class="flex gap-1">
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">2.</p>
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                    미국 교과 기반 콘텐츠를 소규모 수업으로 몰입도 있게 학습하고 싶은 학생​
                  </p>
                </li>
              </ul>
            </div>

            <div class="tablet:hidden">
              <div class="relative mb-[30px]">
                <Swiper
                  :pagination="{
                    el: '.slide-academy-pagination',
                    clickable: true,
                  }"
                  :loop="true"
                  :spaceBetween="16"
                  :modules="swiperModules"
                  class="mb-3"
                >
                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-academy/img1.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-academy/img2.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-academy/img3.png" alt="" />
                  </SwiperSlide>
                </Swiper>

                <div class="slide-academy-pagination"></div>
              </div>
            </div>

            <div class="hidden tablet:block">
              <ul class="grid grid-cols-3 gap-5 tablet:gap-3 tablet:mb-9 pc:mb-[52px]">
                <li>
                  <img src="@/assets/img/main/con03/g-academy/img1.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/g-academy/img2.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/g-academy/img3.png" alt="" class="rounded-3xl" />
                </li>
              </ul>
            </div>

            <div class="flex justify-center">
              <a
                href="/groupOnSchool/academy"
                class="w-[212px] flex justify-between items-center py-3.5 pr-3.5 pl-10 border border-solid border-[#cccccc] rounded-full pc:w-[256px] pc:gap-0 pc:py-4 pc:pl-12 pc:pr-4"
              >
                <p class="font-bold pc:text-xl pc:leading-tight">아카데미 바로가기</p>
                <img src="@/assets/img/main/con03/go2.png" alt="" class="w-[26px] pc:w-[34px]" />
              </a>
            </div>
          </li>

          <li v-show="activeGroupTab === 1">
            <div
              class="flex flex-col gap-5 p-5 bg-[#F4F5F6] rounded-2xl mb-4 tablet:flex-row tablet:justify-center tablet:items-start tablet:py-[26px] pc:py-[38px] pc:gap-[30px] pc:mb-6"
            >
              <div class="flex-none flex items-center gap-2">
                <img src="@/assets/img/main/con03/goal2.png" alt="" class="w-4 pc:w-5" />
                <p class="font-bold tablet:text-xl pc:text-[22px]">학습 목표</p>
              </div>

              <ul class="space-y-2 tablet:space-y-1">
                <li class="flex gap-1">
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">1.</p>
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                    정규 교과 과정 속 표현과 함께 실제 현지 대화에서 사용되는 흥미로운 표현을 배우고 싶은 학생​
                  </p>
                </li>

                <li class="flex gap-1">
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">2.</p>
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                    외우는 문법보다 대화를 통해 자연스럽게 문법을 체득하고 싶은 학생​
                  </p>
                </li>
              </ul>
            </div>

            <div class="tablet:hidden">
              <div class="relative mb-[30px]">
                <Swiper
                  :pagination="{
                    el: '.slide-bridge-pagination',
                    clickable: true,
                  }"
                  :loop="true"
                  :spaceBetween="16"
                  :modules="swiperModules"
                  class="mb-3"
                >
                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-bridge/img1.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-bridge/img2.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-bridge/img3.png" alt="" />
                  </SwiperSlide>
                </Swiper>

                <div class="slide-bridge-pagination"></div>
              </div>
            </div>

            <div class="hidden tablet:block">
              <ul class="grid grid-cols-3 gap-5 tablet:gap-3 tablet:mb-9 pc:mb-[52px]">
                <li>
                  <img src="@/assets/img/main/con03/g-bridge/img1.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/g-bridge/img2.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/g-bridge/img3.png" alt="" class="rounded-3xl" />
                </li>
              </ul>
            </div>

            <div class="flex justify-center">
              <a
                href="/groupOnSchool/bridge"
                class="w-[212px] flex justify-between items-center py-3.5 pr-3.5 pl-12 border border-solid border-[#cccccc] rounded-full pc:w-[256px] pc:gap-0 pc:py-4 pc:pr-4"
              >
                <p class="font-bold pc:text-xl pc:leading-tight">브릿지 바로가기</p>
                <img src="@/assets/img/main/con03/go2.png" alt="" class="w-[26px] pc:w-[34px]" />
              </a>
            </div>
          </li>

          <li v-show="activeGroupTab === 2">
            <div
              class="flex flex-col gap-5 p-5 bg-[#F4F5F6] rounded-2xl mb-4 tablet:flex-row tablet:justify-center tablet:items-start tablet:py-[26px] pc:py-[38px] pc:gap-[30px] pc:mb-6"
            >
              <div class="flex-none flex items-center gap-2">
                <img src="@/assets/img/main/con03/goal2.png" alt="" class="w-4 pc:w-5" />
                <p class="font-bold tablet:text-xl pc:text-[22px]">학습 목표</p>
              </div>

              <ul class="space-y-2 tablet:space-y-1">
                <li class="flex gap-1">
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">1.</p>
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                    비판적 사고와 논리적 토론 능력을 키우고 싶은 학생
                  </p>
                </li>

                <li class="flex gap-1">
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">2.</p>
                  <p class="text-sm text-[#6D7076] leading-tight tablet:text-base pc:text-lg">
                    자신의 의견을 효과적으로 표현하고, 토론을 통해 다양한 관점을 이해하고 싶은 학생
                  </p>
                </li>
              </ul>
            </div>

            <div class="tablet:hidden">
              <div class="relative mb-[30px]">
                <Swiper
                  :pagination="{
                    el: '.slide-debate-pagination',
                    clickable: true,
                  }"
                  :loop="true"
                  :spaceBetween="16"
                  :modules="swiperModules"
                  class="mb-3"
                >
                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-debate/img1.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-debate/img2.png" alt="" />
                  </SwiperSlide>

                  <SwiperSlide class="rounded-2xl overflow-hidden">
                    <img src="@/assets/img/main/con03/g-debate/img3.png" alt="" />
                  </SwiperSlide>
                </Swiper>

                <div class="slide-debate-pagination"></div>
              </div>
            </div>

            <div class="hidden tablet:block">
              <ul class="grid grid-cols-3 gap-5 tablet:gap-3 tablet:mb-9 pc:mb-[52px]">
                <li>
                  <img src="@/assets/img/main/con03/g-debate/img1.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/g-debate/img2.png" alt="" class="rounded-3xl" />
                </li>

                <li>
                  <img src="@/assets/img/main/con03/g-debate/img3.png" alt="" class="rounded-3xl" />
                </li>
              </ul>
            </div>

            <div class="flex justify-center">
              <a
                href="/groupOnSchool/debate"
                class="w-[212px] flex justify-between items-center py-3.5 pr-3.5 pl-10 border border-solid border-[#cccccc] rounded-full pc:w-[256px] pc:gap-0 pc:py-4 pc:pl-12 pc:pr-4"
              >
                <p class="font-bold pc:text-xl pc:leading-tight">디베이트 바로가기</p>
                <img src="@/assets/img/main/con03/go2.png" alt="" class="w-[26px] pc:w-[34px]" />
              </a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
:deep(.slide-rise-pagination),
:deep(.slide-edge-pagination),
:deep(.slide-summit-pagination),
:deep(.slide-academy-pagination),
:deep(.slide-bridge-pagination),
:deep(.slide-debate-pagination) {
  position: relative;
  inset: unset;
  display: flex;
  justify-content: center;
  gap: 12px;
  z-index: 1;

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background-color: #a0a2a5;
    opacity: 1;
    margin: 0;

    &.swiper-pagination-bullet-active {
      width: 24px;
      background-color: #2f2e30;
      border-radius: 4px;
    }
  }
}
</style>
