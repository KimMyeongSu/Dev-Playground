<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
const aiBgCon = ref(null);
const aiWrapper = ref(null);
const sysCon = ref(null);
const sysWrapper = ref(null);

const router = useRouter();
const route = useRoute();
const swiperModules = [Autoplay, Thumbs];
const thumbsCon4Swiper = ref(null);
const setThumbsCon4Swiper = (swiper) => {
  thumbsCon4Swiper.value = swiper;
};

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger);

  if (window.innerWidth < 1200) return;

  setTimeout(() => {
    gsap.fromTo(
      aiBgCon.value,
      {
        width: "800px",
      },
      {
        width: "1952px",
        scrollTrigger: {
          trigger: aiWrapper.value,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      sysCon.value,
      {
        width: "800px",
      },
      {
        width: "1952px",
        scrollTrigger: {
          trigger: sysWrapper.value,
          start: "top center",
          end: "top top",
          scrub: true,
        },
      }
    );

    ScrollTrigger.refresh();
  }, 1000);
});
</script>

<template>
  <article class="con04">
    <div
      ref="aiWrapper"
      class="py-[50px] px-[18px] bg-[#F7F7F7] overflow-hidden tablet:py-[90px] pc:py-[140px] pc:px-0 ai-bg-wrapper"
    >
      <p class="text-[34px] text-center font-bold mb-[30px] tablet:text-[42px] tablet:mb-11 pc:text-[60px] pc:mb-[54px]">
        당근영어 주니어만의<br />
        프리미엄 학습 솔루션
      </p>

      <div class="-mx-[18px] pc:-mx-0">
        <img src="@/assets/img/main/con04/icon1.png" alt="" class="w-14 mx-auto mb-3 tablet:w-[70px] tablet:mb-[18px]" />

        <p class="text-xl text-center font-bold leading-tight mb-[30px] tablet:text-[32px] tablet:mb-9 pc:mb-[68px]">
          캐럿 AI 학습 솔루션!
        </p>

        <div
          class="relative bg-[url(@/assets/img/main/con04/bg-ai-m.png)] bg-no-repeat bg-[center_top_38px] bg-[length:822px_394px] tablet:bg-none"
        >
          <div class="hidden tablet:block pc:hidden">
            <div class="absolute top-[50px] left-1/2 -translate-x-1/2 w-[1580px] overflow-hidden ai-bg-con">
              <img src="@/assets/img/main/con04/bg-ai-t.png" alt="" class="w-[1580px] h-[467px] object-cover" />
            </div>
          </div>

          <div class="hidden pc:block">
            <div
              ref="aiBgCon"
              class="absolute top-[59px] left-1/2 -translate-x-1/2 w-[800px] rounded-3xl overflow-hidden ai-bg-con"
            >
              <img src="@/assets/img/main/con04/bg-ai-p.png" alt="" class="w-[1952px] h-[577px] object-cover" />
            </div>
          </div>

          <div
            class="relative w-[250px] h-[475px] mx-auto shadow-[20px_30px_28px_rgba(0,0,0,0.22)] rounded-[28px] mb-[42px] overflow-hidden tablet:w-[294px] tablet:h-[558px] tablet:rounded-[35px] tablet:mb-10 pc:w-[364px] pc:h-[695px] pc:rounded-[40px] pc:mb-12"
          >
            <swiper
              :thumbs="{ swiper: thumbsCon4Swiper }"
              :autoplay="{ delay: 5000, disableOnInteraction: false }"
              :loop="true"
              :modules="swiperModules"
              class="rounded-lg"
            >
              <swiper-slide class="bg-[#F3F4F6]">
                <div class="pc:hidden">
                  <img src="@/assets/img/main/con04/img1-m.png" alt="" />
                </div>

                <div class="hidden pc:block">
                  <img src="@/assets/img/main/con04/img1-p.png" alt="" />
                </div>
              </swiper-slide>

              <swiper-slide class="bg-[#F3F4F6]">
                <div class="pc:hidden">
                  <img src="@/assets/img/main/con04/img2-m.png" alt="" />
                </div>

                <div class="hidden pc:block">
                  <img src="@/assets/img/main/con04/img2-p.png" alt="" />
                </div>
              </swiper-slide>

              <swiper-slide class="bg-white">
                <div class="pc:hidden">
                  <img src="@/assets/img/main/con04/img3-m.png" alt="" />
                </div>

                <div class="hidden pc:block">
                  <img src="@/assets/img/main/con04/img3-p.png" alt="" />
                </div>
              </swiper-slide>

              <swiper-slide class="bg-white">
                <div class="pc:hidden">
                  <img src="@/assets/img/main/con04/img4-m.png" alt="" />
                </div>

                <div class="hidden pc:block">
                  <img src="@/assets/img/main/con04/img4-p.png" alt="" />
                </div>
              </swiper-slide>
            </swiper>

            <div class="pc:hidden">
              <img src="@/assets/img/main/con04/phone-m.png" alt="" class="absolute inset-0 z-[1]" />
            </div>

            <div class="hidden pc:block">
              <img src="@/assets/img/main/con04/phone-p.png" alt="" class="absolute inset-0 z-[1]" />
            </div>
          </div>

          <div class="px-[18px] pc:px-0">
            <swiper
              @swiper="setThumbsCon4Swiper"
              :slidesPerView="4"
              :watchSlidesProgress="true"
              :modules="swiperModules"
              class="title-slide"
            >
              <swiper-slide class="cursor-pointer">
                <div class="flex flex-col items-center gap-2 tablet:gap-3 pc:gap-5">
                  <img src="@/assets/img/main/con04/title1-off.png" alt="" class="w-16 tablet:w-[90px] pc:w-[98px]" />
                  <p
                    class="text-sm text-[#A1A3A8] text-center font-medium leading-tight tablet:text-base tablet:leading-tight pc:text-lg pc:leading-tight"
                  >
                    Shadowing<br />
                    Practice
                  </p>
                </div>
              </swiper-slide>

              <swiper-slide class="cursor-pointer">
                <div class="flex flex-col items-center gap-2 tablet:gap-3 pc:gap-5">
                  <img src="@/assets/img/main/con04/title2-off.png" alt="" class="w-16 tablet:w-[90px] pc:w-[98px]" />
                  <p
                    class="text-sm text-[#A1A3A8] text-center font-medium leading-tight tablet:text-base tablet:leading-tight pc:text-lg pc:leading-tight"
                  >
                    AI<br />
                    Speaking
                  </p>
                </div>
              </swiper-slide>

              <swiper-slide class="cursor-pointer">
                <div class="flex flex-col items-center gap-2 tablet:gap-3 pc:gap-5">
                  <img src="@/assets/img/main/con04/title3-off.png" alt="" class="w-16 tablet:w-[90px] pc:w-[98px]" />
                  <p
                    class="text-sm text-[#A1A3A8] text-center font-medium leading-tight tablet:text-base tablet:leading-tight pc:text-lg pc:leading-tight"
                  >
                    AI<br />
                    페르소나
                  </p>
                </div>
              </swiper-slide>

              <swiper-slide class="cursor-pointer">
                <div class="flex flex-col items-center gap-2 tablet:gap-3 pc:gap-5">
                  <img src="@/assets/img/main/con04/title4-off.png" alt="" class="w-16 tablet:w-[90px] pc:w-[98px]" />
                  <p
                    class="text-sm text-[#A1A3A8] text-center font-medium leading-tight tablet:text-base tablet:leading-tight pc:text-lg pc:leading-tight"
                  >
                    AI 개인 맞춤<br />
                    학습 분석
                  </p>
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </div>

      <div ref="sysWrapper" class="-mx-[18px] pt-20 tablet:pt-[142px] pc:pt-[188px]">
        <img src="@/assets/img/main/con04/icon2.png" alt="" class="w-14 mx-auto mb-3 tablet:w-[70px] tablet:mb-[18px]" />

        <p class="text-xl text-center font-bold leading-tight mb-[86px] tablet:text-[32px] tablet:mb-9 pc:mb-[68px]">
          맞춤형 밀착 학습 관리 시스템
        </p>

        <div
          class="relative h-[512px] bg-[url(@/assets/img/main/con04/bg-system-m.png)] bg-no-repeat bg-center bg-[length:822px_512px] mb-9 tablet:bg-none tablet:mb-[86px] pc:h-[694px] pc:mb-[70px]"
        >
          <div class="hidden tablet:block pc:hidden">
            <div class="absolute top-[50px] left-1/2 -translate-x-1/2 w-[1525px] rounded-3xl overflow-hidden">
              <img src="@/assets/img/main/con04/bg-system-t.png" alt="" class="w-[1525px] h-[450px] object-cover" />
            </div>
          </div>

          <div class="hidden pc:block">
            <div ref="sysCon" class="absolute top-[59px] left-1/2 -translate-x-1/2 w-[800px] rounded-3xl overflow-hidden">
              <img src="@/assets/img/main/con04/bg-system-p.png" alt="" class="w-[1952px] h-[577px] object-cover" />
            </div>
          </div>

          <div class="tablet:hidden">
            <img
              src="@/assets/img/main/con04/img-system-m.png"
              alt=""
              class="relative -top-10 max-w-[324px] mx-auto rounded-[30px] shadow-[20px_30px_28px_rgba(0,0,0,0.22)] overflow-hidden"
            />
          </div>

          <div class="hidden tablet:block pc:hidden relative z-[1]">
            <img
              src="@/assets/img/main/con04/img-system-t.png"
              alt=""
              class="max-w-[452px] mx-auto rounded-[40px] shadow-[20px_30px_28px_rgba(0,0,0,0.22)] overflow-hidden"
            />
          </div>

          <div class="hidden pc:block relative z-[1]">
            <img
              src="@/assets/img/main/con04/img-system-p.png"
              alt=""
              class="max-w-[578px] mx-auto rounded-[40px] shadow-[20px_30px_28px_rgba(0,0,0,0.22)] overflow-hidden"
            />
          </div>
        </div>

        <div class="px-[18px] pc:px-0">
          <ul
            class="flex flex-col gap-[22px] tablet:grid tablet:grid-cols-2 tablet:gap-4 tablet:max-w-[840px] tablet:mx-auto pc:grid-cols-4 pc:gap-3.5 pc:max-w-[1200px]"
          >
            <li
              class="py-9 px-6 bg-white rounded-2xl shadow-[0_0_39px_rgba(0,0,0,0.05)] tablet:p-[30px] tablet:col-span-2 pc:pt-10 pc:pb-[30px] pc:px-[30px] pc:rounded-3xl"
            >
              <p class="text-2xl font-bold leading-tight mb-1.5 tablet:mb-3.5 pc:text-[26px] pc:mb-3.5">SPAC^ Jr.</p>

              <p class="mb-6 tablet:text-xl tablet:text-[#424242] tablet:mb-[30px]">초중등 학생 전문 어학 진단 시스템</p>

              <ul class="grid grid-cols-1 gap-2.5 tablet:grid-cols-3 tablet:gap-3">
                <li
                  class="relative flex justify-center items-center h-20 bg-[#FEDD64] rounded-2xl overflow-hidden tablet:h-[119px] pc:h-[144px]"
                >
                  <p class="text-center font-semibold tablet:text-lg tablet:leading-tight tablet:pt-1.5">
                    IBT 기반의<br class="hidden pc:block" />
                    실용 영어<br />
                    통합 역량 분석
                  </p>
                  <img
                    src="@/assets/img/main/con04/spac-num1.png"
                    alt=""
                    class="absolute top-0 left-0 w-[54px] tablet:w-[60px]"
                  />
                </li>

                <li
                  class="relative flex justify-center items-center h-20 bg-[#FFB649] rounded-2xl overflow-hidden tablet:h-[119px] pc:h-[144px]"
                >
                  <p class="text-center font-semibold tablet:text-lg tablet:leading-tight tablet:pt-1.5">
                    CEFR, AR,<br class="hidden pc:block" />
                    Lexile,<br class="pc:hidden" />
                    미국학년까지<br class="hidden pc:block" />
                    비교 분석
                  </p>
                  <img
                    src="@/assets/img/main/con04/spac-num2.png"
                    alt=""
                    class="absolute top-0 left-0 w-[54px] tablet:w-[60px]"
                  />
                </li>

                <li
                  class="relative flex justify-center items-center h-20 bg-[#D1D4D8] rounded-2xl overflow-hidden tablet:h-[119px] pc:h-[144px]"
                >
                  <p class="text-center font-semibold tablet:text-lg tablet:leading-tight tablet:pt-1.5">4대 영역 평가</p>
                  <img
                    src="@/assets/img/main/con04/spac-num3.png"
                    alt=""
                    class="absolute top-0 left-0 w-[54px] tablet:w-[60px]"
                  />
                </li>
              </ul>
            </li>

            <li
              class="p-[26px] bg-white rounded-2xl shadow-[0_0_39px_rgba(0,0,0,0.05)] tablet:p-[30px] tablet:pb-5 pc:pt-10 pc:pb-[30px] pc:px-6 pc:rounded-3xl"
            >
              <div class="flex items-center gap-3.5 mb-3.5 tab tablet:items-start tablet:mb-0 pc:flex-col pc:gap-10 pc:mb-3.5">
                <img src="@/assets/img/main/con04/roadmap.png" alt="" class="w-14 tablet:w-[52px] pc:w-[58px]" />
                <p class="text-2xl font-bold leading-tight tablet:pt-1 pc:text-[26px] pc:pt-0">영어학습 로드맵</p>
              </div>

              <p
                class="leading-6 tablet:relative tablet:text-lg tablet:pl-[66px] tablet:-top-2.5 pc:text-xl pc:text-[#424242] pc:leading-[26px] pc:pl-0 pc:top-0"
              >
                첫번째 수업 결과를 바탕으로<br class="hidden pc:block" />
                학습 방향, 추천 학습 방법,<br class="hidden pc:block" />
                추천 Book List 등<br class="hidden pc:block" />
                학습 가이드 안내
              </p>
            </li>

            <li
              class="p-[26px] bg-white rounded-2xl shadow-[0_0_39px_rgba(0,0,0,0.05)] tablet:p-[30px] tablet:pb-5 pc:pt-10 pc:pb-[30px] pc:px-6 pc:rounded-3xl"
            >
              <div class="flex items-center gap-3.5 mb-3.5 tab tablet:items-start tablet:mb-0 pc:flex-col pc:gap-10 pc:mb-3.5">
                <img src="@/assets/img/main/con04/feedback.png" alt="" class="w-14 tablet:w-[52px] pc:w-[58px]" />
                <p class="text-2xl font-bold leading-tight tablet:pt-1 pc:text-[26px] pc:pt-0">체계적 피드백 시스템</p>
              </div>

              <p
                class="leading-6 tablet:relative tablet:text-lg tablet:pl-[66px] tablet:-top-2.5 pc:text-xl pc:text-[#424242] pc:leading-[26px] pc:pl-0 pc:top-0"
              >
                수업 녹화(녹음) 파일,<br class="hidden pc:block" />
                발음 교정 피드백,<br class="hidden pc:block" />
                영어 표현 교정 피드백 제공
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
:deep(.title-slide) {
  .swiper-wrapper {
    @media screen and (min-width: 768px) {
      justify-content: center;
      gap: 46px;
    }

    @media screen and (min-width: 1200px) {
      justify-content: center;
      gap: 60px;
    }

    .swiper-slide {
      @media screen and (min-width: 768px) {
        width: auto !important;
      }

      &.swiper-slide-thumb-active {
        p {
          color: #111111;
          font-weight: bold;
        }
      }

      &:nth-of-type(1) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title1-on.png");
          }
        }
      }
      &:nth-of-type(2) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title2-on.png");
          }
        }
      }
      &:nth-of-type(3) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title3-on.png");
          }
        }
      }
      &:nth-of-type(4) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title4-on.png");
          }
        }
      }
    }
  }
}
</style>
