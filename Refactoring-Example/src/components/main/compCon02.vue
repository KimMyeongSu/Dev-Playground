<script setup>
import { ref, onMounted, reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Thumbs, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";
import axios from "@/plugins/axios";

const swiperModules = [Autoplay, Thumbs, EffectFade];
const thumbsCon2Swiper = ref(null);
const setThumbsCon2Swiper = (swiper) => {
  thumbsCon2Swiper.value = swiper;
};

const mainReport = reactive({
  reportData: {},
  getReportData: async () => {
    const {
      data: { data },
    } = await axios.get("/junior/home/getMainReport");
    mainReport.reportData = data;
  },
});
const formatDecimal = (number) => {
  // 문자열로 들어온 숫자를 Number로 변환
  const num = Number(number);

  // 소수점 2자리까지 고정하고 문자열로 변환
  const formattedNumber = num.toFixed(2);

  return formattedNumber;
};
onMounted(() => {
  mainReport.getReportData();
  const marquees = document.querySelectorAll(".marquee");

  let offset = 0;
  const speed = 1;

  function animateMarquee() {
    offset -= speed;
    marquees.forEach((el) => {
      el.style.backgroundPosition = `${offset}px 0`;
    });

    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
});
</script>

<template>
  <article class="con02">
    <div class="pt-[80px] px-[18px] overflow-hidden pc:pt-[146px] pc:px-0">
      <p
        class="text-xl text-[#6D7076] text-center font-semibold leading-tight mb-[38px] tablet:text-2xl tablet:mb-8 pc:text-[34px] pc:mb-12"
      >
        영어를 잘한다는 것!
      </p>

      <p
        class="text-[30px] text-center font-bold leading-[42px] mb-[30px] tablet:text-[38px] tablet:leading-[50px] tablet:mb-[60px] pc:text-[58px] pc:leading-[80px] pc:mb-[76px]"
      >
        <span
          class="relative text-[#FF6714] after:content-[''] after:size-1.5 after:bg-[#FF6714] after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-2"
          >누</span
        >
        <span
          class="relative text-[#FF6714] after:content-[''] after:size-1.5 after:bg-[#FF6714] after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-2"
          >구</span
        >에게
        <span
          class="relative text-[#FF6714] after:content-[''] after:size-1.5 after:bg-[#FF6714] after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-2"
          >어</span
        >
        <span
          class="relative text-[#FF6714] after:content-[''] after:size-1.5 after:bg-[#FF6714] after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-2"
          >떻</span
        >
        <span
          class="relative text-[#FF6714] after:content-[''] after:size-1.5 after:bg-[#FF6714] after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-2"
          >게</span
        ><br class="tablet:hidden" />
        배우느냐에 따라<br />
        영어적 사고의<br />
        깊이와 이해가 달라집니다!
      </p>

      <ul
        class="grid grid-cols-3 justify-between mb-20 tablet:flex tablet:justify-center tablet:gap-[50px] tablet:mx-auto tablet:divide-x tablet:divide-solid tablet:divide-[#D0D0D0] tablet:mb-[90px] pc:w-[780px] pc:gap-[60px] pc:mb-[140px]"
      >
        <li class="space-y-2 pc:space-y-2.5">
          <p class="text-[22px] text-center font-bold pc:text-[40px]">{{ formatDecimal(mainReport.reportData.smile) }}/5.0</p>
          <p class="text-[13px] text-[#6D7076] text-center pc:text-lg">학습만족도</p>
        </li>

        <li class="space-y-2 pc:space-y-2.5 tablet:pl-[50px] pc:pl-[60px]">
          <p class="text-[22px] text-center font-bold pc:text-[40px]">5,000명</p>
          <p class="text-[13px] text-[#6D7076] text-center pc:text-lg">국내 최다 강사진 보유</p>
        </li>

        <li class="space-y-2 pc:space-y-2.5 tablet:pl-[50px] pc:pl-[60px]">
          <p class="text-[22px] text-center font-bold pc:text-[40px]">89%</p>
          <p class="text-[13px] text-[#6D7076] text-center pc:text-lg">재수강률</p>
        </li>
      </ul>

      <div class="-mx-[18px] pc:-mx-0">
        <swiper
          @swiper="setThumbsCon2Swiper"
          :watchSlidesProgress="true"
          :slideToClickedSlide="true"
          :allowTouchMove="false"
          :modules="swiperModules"
          class="slide-title mb-10 tablet:mb-[42px] pc:mb-[68px]"
        >
          <swiper-slide
            class="!w-[100px] text-sm text-center font-medium leading-tight py-3 border border-solid border-[#CCCCCC] rounded-full cursor-pointer text-drag-none tablet:text-base tablet:!w-[116px] pc:text-lg pc:!w-[126px]"
            >Speaking
          </swiper-slide>
          <swiper-slide
            class="!w-[100px] text-sm text-center font-medium leading-tight py-3 border border-solid border-[#CCCCCC] rounded-full cursor-pointer text-drag-none tablet:text-base tablet:!w-[116px] pc:text-lg pc:!w-[126px]"
            >Reading
          </swiper-slide>
          <swiper-slide
            class="!w-[100px] text-sm text-center font-medium leading-tight py-3 border border-solid border-[#CCCCCC] rounded-full cursor-pointer text-drag-none tablet:text-base tablet:!w-[116px] pc:text-lg pc:!w-[126px]"
            >Writing
          </swiper-slide>
          <swiper-slide
            class="!w-[100px] text-sm text-center font-medium leading-tight py-3 border border-solid border-[#CCCCCC] rounded-full cursor-pointer text-drag-none tablet:text-base tablet:!w-[116px] pc:text-lg pc:!w-[126px]"
            >Debating
          </swiper-slide>
          <swiper-slide
            class="!w-[100px] text-sm text-center font-medium leading-tight py-3 border border-solid border-[#CCCCCC] rounded-full cursor-pointer text-drag-none tablet:text-base tablet:!w-[116px] pc:text-lg pc:!w-[126px]"
            >Interview
          </swiper-slide>
        </swiper>

        <swiper
          :thumbs="{ swiper: thumbsCon2Swiper }"
          :loop="true"
          :autoplay="{ delay: 4000, disableOnInteraction: false }"
          :speed="3000"
          :effect="'fade'"
          :allowTouchMove="false"
          :modules="swiperModules"
          class="slide-content"
        >
          <swiper-slide class="bg-white">
            <div
              class="w-full h-[206px] bg-[url(@/assets/img/main/con02/img-speaking.png)] bg-repeat-x bg-[length:3104px_206px] overflow-hidden pc:h-[260px] pc:bg-[length:3920px_260px] marquee"
            ></div>
          </swiper-slide>

          <swiper-slide class="bg-white">
            <div
              class="w-full h-[206px] bg-[url(@/assets/img/main/con02/img-reading.png)] bg-repeat-x bg-[length:2716px_206px] overflow-hidden pc:h-[260px] pc:bg-[length:3428px_260px] marquee"
            ></div>
          </swiper-slide>

          <swiper-slide class="bg-white">
            <div
              class="w-full h-[206px] bg-[url(@/assets/img/main/con02/img-writing.png)] bg-repeat-x bg-[length:2716px_206px] overflow-hidden pc:h-[260px] pc:bg-[length:3428px_260px] marquee"
            ></div>
          </swiper-slide>

          <swiper-slide class="bg-white">
            <div
              class="w-full h-[206px] bg-[url(@/assets/img/main/con02/img-debating.png)] bg-repeat-x bg-[length:2716px_206px] overflow-hidden pc:h-[260px] pc:bg-[length:3428px_260px] marquee"
            ></div>
          </swiper-slide>

          <swiper-slide class="bg-white">
            <div
              class="w-full h-[206px] bg-[url(@/assets/img/main/con02/img-interview.png)] bg-repeat-x bg-[length:2716px_206px] overflow-hidden pc:h-[260px] pc:bg-[length:3428px_260px] marquee"
            ></div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
:deep(.slide-title) {
  .swiper-wrapper {
    display: flex !important;
    justify-content: center;
    gap: 12px;
    flex-wrap: wrap;

    .swiper-slide {
      &.swiper-slide-thumb-active {
        color: #ffffff;
        background-color: #ff6714;
        border-color: #ff6714;
      }
    }
  }
}

:deep(.slide-content) {
  .swiper-wrapper {
    .swiper-slide {
      transition-duration: 1000ms !important;
    }
  }
}
</style>
