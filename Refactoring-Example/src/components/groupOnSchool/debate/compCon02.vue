<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const router = useRouter();
const route = useRoute();
const swiperModules = [Autoplay, Navigation];

import imgT1 from "@/assets/img/group-on-school/debate/con02/slide-t1.png";
import imgT2 from "@/assets/img/group-on-school/debate/con02/slide-t2.png";
import imgT3 from "@/assets/img/group-on-school/debate/con02/slide-t3.png";
import imgT4 from "@/assets/img/group-on-school/debate/con02/slide-t4.png";
import imgT5 from "@/assets/img/group-on-school/debate/con02/slide-t5.png";
import imgT6 from "@/assets/img/group-on-school/debate/con02/slide-t6.png";
import imgT7 from "@/assets/img/group-on-school/debate/con02/slide-t7.png";
import imgT8 from "@/assets/img/group-on-school/debate/con02/slide-t8.png";
import imgT9 from "@/assets/img/group-on-school/debate/con02/slide-t9.png";
import imgT10 from "@/assets/img/group-on-school/debate/con02/slide-t10.png";
import imgT11 from "@/assets/img/group-on-school/debate/con02/slide-t11.png";
import imgT12 from "@/assets/img/group-on-school/debate/con02/slide-t12.png";
const slide1List = [
  { text: "Is Homework\nNecessary?", img: imgT1 },
  { text: "Should Schools\nRequire Students\nto Wear Uniforms?", img: imgT2 },
  { text: "Should School\nStart Later?", img: imgT3 },
  { text: "Grades vs. Learning:\nShould We Get Rid\nof Grades in School?", img: imgT4 },
  { text: "Are Energy Drinks\nReally that Bad?", img: imgT5 },
  { text: "Are Video Games\nGood for You and\nYour Brain?", img: imgT6 },
  { text: "Should Schools\nBan Junk Food\nfor Students?", img: imgT7 },
  { text: "Should All People\nBe Vegetarians?", img: imgT8 },
  { text: "Would Banning\nPlastic Bottles\nHelp the Planet?", img: imgT9 },
  { text: "Should We Ban\nUsing Plastic Straws?", img: imgT10 },
  { text: "Adventure Tourism:\nThrill-Seeking or\nRisk-Taking?", img: imgT11 },
  { text: "Should the\nDeath Penalty\nBe Legal?", img: imgT12 },
];

import imgB1 from "@/assets/img/group-on-school/debate/con02/slide-b1.png";
import imgB2 from "@/assets/img/group-on-school/debate/con02/slide-b2.png";
import imgB3 from "@/assets/img/group-on-school/debate/con02/slide-b3.png";
import imgB4 from "@/assets/img/group-on-school/debate/con02/slide-b4.png";
import imgB5 from "@/assets/img/group-on-school/debate/con02/slide-b5.png";
import imgB6 from "@/assets/img/group-on-school/debate/con02/slide-b6.png";
import imgB7 from "@/assets/img/group-on-school/debate/con02/slide-b7.png";
import imgB8 from "@/assets/img/group-on-school/debate/con02/slide-b8.png";
import imgB9 from "@/assets/img/group-on-school/debate/con02/slide-b9.png";
import imgB10 from "@/assets/img/group-on-school/debate/con02/slide-b10.png";
import imgB11 from "@/assets/img/group-on-school/debate/con02/slide-b11.png";
import imgB12 from "@/assets/img/group-on-school/debate/con02/slide-b12.png";
const slide2List = [
  { text: "Is It Time to Stop\nAnimal Testing?", img: imgB1 },
  { text: "Should We Ban\nSchool Suspensions?", img: imgB2 },
  { text: "School vs\nHomeschool:\nWhich Student\nDoes Better?", img: imgB3 },
  { text: "Are There Positives\nto Distance Learning?", img: imgB4 },
  { text: "Is Facial Recognition\nInvading Your\nPrivacy?", img: imgB5 },
  { text: "Is the Internet\nExpanding or\nNarrowing Your\nMind?", img: imgB6 },
  { text: "Does Surveillance\nTech Make\nSchools Safer?", img: imgB7 },
  { text: "Can TikTok\nBe Good for Your\nMental Health?", img: imgB8 },
  { text: "To Bean or Not to\nBean: Is Coffee\nHelping or\nHarming You?", img: imgB9 },
  { text: "Are Video\nGames Really Making\nUs More Violent?", img: imgB10 },
  { text: "Why Are People\nBanning Books\nin Schools?", img: imgB11 },
  { text: "Should There\nBe a Carbon Tax?", img: imgB12 },
];

const activeTab = ref(0);
const tabList = [{ title: "Intermediate" }, { title: "Advanced" }];

const isModal = ref(false);
const toggleModal = () => {
  isModal.value = !isModal.value;
};
</script>

<template>
  <article class="con02">
    <div class="py-[50px] px-[18px] bg-[#F7F7F7] tablet:py-[70px] pc:py-[140px] pc:px-0">
      <p class="text-[34px] text-center font-bold leading-[46px] mb-4 tablet:text-4xl tablet:mb-5 pc:text-[54px] pc:mb-7">
        온스쿨 디베이트 <br class="tablet:hidden" />
        <span class="text-[#3182F6]">TOPIC</span>
      </p>

      <p class="text-center leading-6 mb-10 pc:text-[22px] pc:leading-[34px] pc:mb-[90px]">
        학교 생활과 관련된 간단한 주제부터<br class="tablet:hidden" />
        환경/윤리/글로벌 이슈까지!<br />
        단순한 영어 실력을 넘어 이슈에 대한<br class="tablet:hidden" />
        깊이 있는 이해, 논리적 사고,<br class="pc:hidden" />
        문제 해결 능력을 키웁니다.
      </p>

      <ul
        class="max-w-[324px] mx-auto flex flex-col gap-[18px] mb-[30px] tablet:max-w-[732px] tablet:grid tablet:grid-cols-7 tablet:gap-4 tablet:mb-10 pc:max-w-[1200px] pc:gap-[27px] pc:mb-[54px]"
      >
        <li class="tablet:flex tablet:flex-col tablet:gap-3.5 tablet:col-span-3">
          <div
            class="relative rounded-[18px] rounded-bl-none overflow-hidden tablet:rounded-3xl tablet:rounded-bl-none pc:rounded-[36px] pc:rounded-bl-none"
          >
            <swiper
              :autoplay="{
                delay: 4000,
                disableOnInteraction: false,
              }"
              :loop="true"
              :slidesPerView="1"
              :centeredSlides="true"
              :navigation="{
                prevEl: '.top-button-prev-custom',
                nextEl: '.top-button-next-custom',
              }"
              :modules="swiperModules"
            >
              <swiper-slide v-for="(item, i) in slide1List" :key="i" class="relative">
                <div class="absolute top-0 left-0 w-full pt-6 pl-5 tablet:pt-[26px] tablet:pl-5 pc:pt-[50px] pc:pl-[42px]">
                  <p
                    class="inline-block text-white py-1.5 px-3.5 border border-solid border-white rounded-full mb-2.5 tablet:py-1 pc:text-2xl"
                  >
                    Intermediate
                  </p>

                  <p
                    class="text-[28px] text-white font-bold leading-8 whitespace-pre-line tablet:text-[27px] pc:text-[40px] pc:leading-[48px]"
                  >
                    {{ item.text }}
                  </p>
                </div>

                <img :src="item.img" alt="" />
              </swiper-slide>
            </swiper>

            <div
              class="absolute -bottom-px left-0 w-[111px] h-[68px] bg-[url(@/assets/img/group-on-school/debate/con02/slide-bg-m1.png)] bg-no-repeat bg-contain z-[1] tablet:w-[119px] tablet:h-[70px] tablet:bg-[url(@/assets/img/group-on-school/debate/con02/slide-bg-t1.png)] pc:w-[141px] pc:h-[83px] pc:bg-[url(@/assets/img/group-on-school/debate/con02/slide-bg-p1.png)]"
            >
              <ul class="absolute bottom-0 left-0 flex justify-center gap-1 pc:gap-2">
                <li class="size-10 top-button-prev-custom rounded-full overflow-hidden tablet:size-[34px] pc:size-[46px]">
                  <img src="@/assets/img/group-on-school/debate/con02/arrow-prev.png" alt="icon" class="cursor-pointer" />
                </li>

                <li class="size-10 top-button-next-custom rounded-full overflow-hidden tablet:size-[34px] pc:size-[46px]">
                  <img src="@/assets/img/group-on-school/debate/con02/arrow-next.png" alt="icon" class="cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>

          <div class="hidden tablet:block">
            <ul class="grid grid-cols-3 tablet:gap-3.5 pc:gap-[27px]">
              <li></li>

              <li class="overflow-hidden tablet:rounded-3xl pc:rounded-[36px]">
                <img src="@/assets/img/group-on-school/debate/con02/thumb1.png" alt="" />
              </li>

              <li class="overflow-hidden tablet:rounded-3xl pc:rounded-[36px]">
                <img src="@/assets/img/group-on-school/debate/con02/thumb2.png" alt="" />
              </li>
            </ul>
          </div>
        </li>

        <li>
          <ul class="grid grid-cols-3 gap-2.5 tablet:grid-cols-1 tablet:gap-3.5 pc:gap-[27px]">
            <li
              class="hidden tablet:block rounded-[18px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.03)] tablet:rounded-3xl pc:rounded-[36px]"
            >
              <img src="@/assets/img/group-on-school/debate/con02/thumb6.png" alt="" />
            </li>

            <li
              class="hidden tablet:block rounded-[18px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.03)] tablet:rounded-3xl pc:rounded-[36px]"
            >
              <img src="@/assets/img/group-on-school/debate/con02/thumb5.png" alt="" />
            </li>

            <li class="rounded-[18px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.03)] tablet:rounded-3xl pc:rounded-[36px]">
              <img src="@/assets/img/group-on-school/debate/con02/thumb4.png" alt="" />
            </li>

            <li class="rounded-[18px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.03)] tablet:hidden">
              <img src="@/assets/img/group-on-school/debate/con02/thumb8.png" alt="" />
            </li>

            <li class="rounded-[18px] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.03)] tablet:rounded-3xl pc:rounded-[36px]">
              <img src="@/assets/img/group-on-school/debate/con02/thumb3.png" alt="" />
            </li>
          </ul>
        </li>

        <li class="tablet:flex tablet:flex-col tablet:gap-3.5 tablet:col-span-3">
          <div class="hidden tablet:block">
            <ul class="grid grid-cols-3 tablet:gap-3.5 pc:gap-[27px]">
              <li class="overflow-hidden tablet:rounded-3xl pc:rounded-[36px]">
                <img src="@/assets/img/group-on-school/debate/con02/thumb7.png" alt="" />
              </li>

              <li class="overflow-hidden tablet:rounded-3xl pc:rounded-[36px]">
                <img src="@/assets/img/group-on-school/debate/con02/thumb8.png" alt="" />
              </li>

              <li></li>
            </ul>
          </div>

          <div
            class="relative rounded-[18px] rounded-tr-none overflow-hidden tablet:rounded-3xl tablet:rounded-tr-none pc:rounded-[36px] pc:rounded-tr-none"
          >
            <swiper
              :autoplay="{
                delay: 4000,
                disableOnInteraction: false,
              }"
              :loop="true"
              :slidesPerView="1"
              :centeredSlides="true"
              :navigation="{
                prevEl: '.bottom-button-prev-custom',
                nextEl: '.bottom-button-next-custom',
              }"
              :modules="swiperModules"
            >
              <swiper-slide v-for="(item, i) in slide2List" :key="i" class="relative">
                <div class="absolute bottom-0 right-0 w-full pb-6 pr-5 tablet:pt-[26px] tablet:pr-5 pc:pb-[50px] pc:pr-[42px]">
                  <div class="flex justify-end mb-2.5">
                    <p
                      class="inline-block text-white py-1.5 px-3.5 border border-solid border-white rounded-full tablet:py-1 pc:text-2xl"
                    >
                      Advanced
                    </p>
                  </div>

                  <p
                    class="text-[28px] text-white text-right font-bold leading-8 whitespace-pre-line tablet:text-[27px] pc:text-[40px] pc:leading-[48px]"
                  >
                    {{ item.text }}
                  </p>
                </div>

                <img :src="item.img" alt="" />
              </swiper-slide>
            </swiper>

            <div
              class="absolute top-0 right-0 w-[111px] h-[68px] bg-[url(@/assets/img/group-on-school/debate/con02/slide-bg-m2.png)] bg-no-repeat bg-contain z-[1] pc:w-[140px] pc:h-[85px] pc:bg-[url(@/assets/img/group-on-school/debate/con02/slide-bg-p2.png)]"
            >
              <ul class="absolute top-0 right-0 flex justify-center gap-1 pc:gap-2">
                <li class="size-10 bottom-button-prev-custom rounded-full overflow-hidden pc:size-[46px]">
                  <img src="@/assets/img/group-on-school/debate/con02/arrow-prev.png" alt="icon" class="cursor-pointer" />
                </li>

                <li class="size-10 bottom-button-next-custom rounded-full overflow-hidden pc:size-[46px]">
                  <img src="@/assets/img/group-on-school/debate/con02/arrow-next.png" alt="icon" class="cursor-pointer" />
                </li>
              </ul>
            </div>
          </div>
        </li>
      </ul>

      <div class="flex justify-center">
        <p
          @click="toggleModal('isModal')"
          class="font-bold py-[18px] px-[52px] border border-solid border-[#cccccc] rounded-full cursor-pointer pc:text-xl pc:py-[22px] pc:px-[62px] pc:leading-tight"
        >
          TOPIC 전체보기
        </p>
      </div>
    </div>
  </article>

  <!-- topic 모달 -->
  <div v-if="isModal">
    <div class="fixed inset-0 bg-[#18181B]/70 overflow-y-auto z-10">
      <div class="flex justify-center items-center py-[90px] px-[18px] min-h-full">
        <div class="w-full max-w-[560px] space-y-2.5">
          <div class="flex justify-between items-center gap-6">
            <div class="flex-none w-3.5"></div>

            <ul class="grid grid-cols-2 bg-white rounded-full overflow-hidden">
              <li
                v-for="(tab, index) in tabList"
                :key="index"
                @click="activeTab = index"
                class="text-center font-light py-2 px-3.5 rounded-full cursor-pointer"
                :class="[activeTab === index ? 'text-white bg-[#3182F6]' : 'text-[#a1a3a8] border-[#cccccc]']"
              >
                {{ tab.title }}
              </li>
            </ul>

            <img
              @click="toggleModal('isModal')"
              src="@/assets/img/group-on-school/debate/con02/close.png"
              alt=""
              class="flex-none w-3.5 cursor-pointer"
            />
          </div>

          <div class="pt-6 px-3.5 pb-3.5 bg-white rounded-[14px] mb-3.5 pc:px-[26px] pc:pt-[38px] pc:pb-[26px] pc:rounded-3xl">
            <img
              src="@/assets/img/group-on-school/debate/con02/modal-icon.png"
              alt=""
              class="w-10 mx-auto mb-3 pc:w-[50px] pc:mb-2.5"
            />

            <ul>
              <li v-show="activeTab === 0">
                <div class="space-y-6">
                  <p class="text-[22px] text-center font-bold pc:text-2xl">Intermediate</p>

                  <ul class="flex flex-col gap-4">
                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">School & Learning</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Is Homework Necessary?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should Schools Require Students to Wear Uniforms?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should School Start Later?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">
                              Grades vs. Learning: Should We Get Rid of Grades in School?
                            </td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              05
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">School vs Homeschool: Which Student Does Better?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              06
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">
                              Is AI a Homework Helper or a Cheating Tool for Students?
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>

                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">Health & Daily Life</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Are Energy Drinks Really that Bad?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Are Video Games Good for You and Your Brain?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should Schools Ban Junk Food for Students?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should All People Be Vegetarians?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              05
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Screen Time: How Much Is Too Much?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              06
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Can Procrastination Be a Good Thing?</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>

                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">Environment & Society</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Would Banning Plastic Bottles Help the Planet?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should We Ban Using Plastic Straws?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Adventure Tourism: Thrill-Seeking or Risk-Taking?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should the Death Penalty Be Legal?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              05
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">No One Should Ever Tell a Lie?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              06
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Is Facial Recognition Invading Your Privacy?</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </li>

              <li v-show="activeTab === 1">
                <div class="space-y-6">
                  <p class="text-[22px] text-center font-bold pc:text-2xl">Advanced</p>

                  <ul class="flex flex-col gap-4">
                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">School & Education</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should We Ban School Suspensions?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">School vs Homeschool: Which Student Does Better?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Are There Positives to Distance Learning?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should Schools Be Single-Gender?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              05
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Lowering the Voting Age: Should Teens Have a Say?</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>

                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">Technology & Society</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Is Facial Recognition Invading Your Privacy?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Is the Internet Expanding or Narrowing Your Mind?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Does Surveillance Tech Make Schools Safer?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Are Risk Assessment Algorithms Fair, or Racist?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              05
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should Autonomous Vehicles Be Allowed on the Roads?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              06
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Is Social Media Good for Society?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              07
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">
                              Do Robots Deserve Rights? What if Machines Become Conscious?
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </li>

                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">Health & Well-being</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Can TikTok Be Good for Your Mental Health?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">
                              To Bean or Not to Bean: Is Coffee Helping or Harming You?
                            </td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Are Video Games Really Making Us More Violent?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Are Parasocial Relationships Healthy or Harmful?</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>

                    <li class="rounded-[14px] overflow-hidden pc:rounded-2xl">
                      <p class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg">Ethics & Environment</p>

                      <table>
                        <tbody>
                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              01
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Why Are People Banning Books in Schools?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              02
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should There Be a Carbon Tax?</td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              03
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Is It Time to Stop Animal Testing?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              04
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">
                              Is Lab-Grown Meat the Answer to Our Meat Eating Problems?
                            </td>
                          </tr>

                          <tr class="bg-[#F4F5F6]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              05
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should We Get Rid of Cash?</td>
                          </tr>

                          <tr class="bg-[#E8E9EB]">
                            <td
                              class="w-[50px] text-sm text-center font-bold py-3.5 px-4 border-r border-solid border-[#d1d4d8] pc:w-[70px] pc:text-base"
                            >
                              06
                            </td>
                            <td class="text-sm py-3.5 px-4 pc:text-base">Should the Death Penalty Be Legal?</td>
                          </tr>
                        </tbody>
                      </table>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>

          <p
            @click="toggleModal('isModal')"
            class="text-white text-center font-medium py-4 bg-[#54A7F6] pc:text-lg rounded-[14px] cursor-pointer"
          >
            닫기
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
