<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
  bannerData: {
    type: Object,
  },
});

const bannerData = ref(props.bannerData);
const swiperModules = [Autoplay, Pagination];

const getCurrentMonth = (withPadding = false) => {
  const month = new Date().getMonth() + 2;
  return withPadding ? month.toString().padStart(2, "0") : month;
};

const openNewWindow = (url) => {
  if (chkDomain(url)) {
    window.location.href = url;
  } else {
    window.open(url, "_blank");
  }
};

const chkDomain = (url) => {
  const allowedDomains = [
    "carrotjunior.kr",
    "www.carrotjunior.kr",
    "carrotjunior.co.kr",
    "www.carrotjunior.co.kr",
    "carrotjr.com",
    "www.carrotjr.com",
    "testpage.carrotjunior.kr",
  ];

  return allowedDomains.some((domain) => url.includes(domain));
};

const mobileImages = [
  new URL("@/assets/img/main/con01/bg-m1.png", import.meta.url).href,
  new URL("@/assets/img/main/con01/bg-m2.png", import.meta.url).href,
];

const tabletImages = [
  new URL("@/assets/img/main/con01/bg-p1.png", import.meta.url).href,
  new URL("@/assets/img/main/con01/bg-p2.png", import.meta.url).href,
];

const pcImages = [
  new URL("@/assets/img/main/con01/bg-p1.png", import.meta.url).href,
  new URL("@/assets/img/main/con01/bg-p2.png", import.meta.url).href,
];

const bgImage = ref("");

function setBgImage() {
  const width = window.innerWidth;
  let imageList;

  if (width >= 1200) {
    imageList = pcImages;
  } else if (width >= 768) {
    imageList = tabletImages;
  } else {
    imageList = mobileImages;
  }

  const currentImage = bgImage.value;

  if (!imageList.includes(currentImage)) {
    const newImage = imageList[Math.floor(Math.random() * imageList.length)];
    bgImage.value = newImage;
  }
}

onMounted(() => {
  setBgImage();
  window.addEventListener("resize", setBgImage);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setBgImage);
});
</script>

<template>
  <article class="con01">
    <div class="px-[18px] max-w-[1720px] mx-auto overflow-hidden pc:px-0">
      <div class="space-y-7 pc:space-y-[58px]">
        <div class="flex flex-col gap-[42px] tablet:flex-row tablet:items-stretch tablet:gap-3 pc:gap-4">
          <div class="space-y-5 tablet:grow">
            <div
              class="relative h-[238px] bg-no-repeat bg-center bg-[length:1199px_100%] rounded-2xl tablet:h-full tablet:bg-cover pc:rounded-tl-[36px] pc:rounded-bl-[42px] pc:rounded-tr-[42px] pc:rounded-br-[36px]"
              :style="{ backgroundImage: `url('${bgImage}')` }"
            >
              <div class="absolute left-0 -bottom-px pc:-bottom-0">
                <div
                  class="w-[178px] h-[75px] bg-[url(@/assets/img/main/con01/bg-free-m.png)] bg-no-repeat bg-center bg-cover tablet:w-[342px] tablet:h-[190px] tablet:bg-[url(@/assets/img/main/con01/bg-free-t.png)] pc:w-[535px] pc:h-[295px] pc:bg-[url(@/assets/img/main/con01/bg-free-p.png)]"
                >
                  <div class="absolute left-0 bottom-2 tablet:top-9 tablet:bottom-0 pc:top-[62px]">
                    <a
                      href="/freeClass"
                      class="flex items-center gap-1.5 py-2.5 pl-4 pr-2.5 border border-solid border-[#111111] rounded-full pc:gap-3 pc:py-3.5 pc:pl-7 pc:pr-[18px]"
                    >
                      <p class="text-sm font-medium pc:text-lg">무료수업 신청하기</p>
                      <img src="@/assets/img/main/con01/go1.png" alt="" class="flex-none w-5 pc:w-[30px]" />
                    </a>
                  </div>

                  <div class="hidden tablet:block">
                    <div class="absolute top-[94px] space-y-1.5 pc:top-[150px] pc:space-y-3">
                      <p class="text-[26px] font-semibold pc:text-[40px]">영어로 이해하고 생각하는</p>
                      <p class="text-[42px] font-bold pc:text-[64px]">하이엔드 학습 경험</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="hidden pc:block">
                <div class="absolute top-0 right-0">
                  <div class="w-[279px] h-[139px] bg-[url(@/assets/img/main/con01/bg-new-p.png)] bg-no-repeat bg-center bg-cover">
                    <div class="absolute top-[54px] left-[60px]">
                      <p class="text-[22px] font-semibold underline underline-offset-4">{{ getCurrentMonth() }}월 신규 모집</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="tablet:hidden">
              <div class="space-y-1.5">
                <p class="text-[20px] font-semibold">영어로 이해하고 생각하는</p>
                <p class="text-[34px] font-bold">하이엔드 학습 경험</p>
              </div>
            </div>
          </div>

          <div class="tablet:hidden">
            <div class="-mx-[18px]">
              <ul class="px-[18px] flex flex-nowrap gap-3 overflow-x-auto scrollbar-hide">
                <li v-for="banner in props?.bannerData?.mobileRollingBanner" :key="banner.idx">
                  <a :href="banner.isLink === 'Y' ? banner.linkUrl : ''" class="block w-[148px]">
                    <img :src="banner.fileUrl" alt="" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <!-- 태블릿 상단. -->
          <div class="hidden tablet:block pc:hidden">
            <ul class="flex-none w-[174px] space-y-[26px]">
              <li>
                <p class="text-sm mb-1">{{ getCurrentMonth() }}월 신규 모집</p>
                <img src="@/assets/img/main/con01/text-t.png" alt="" class="w-[120px] mb-2" />

                <div class="relative">
                  <Swiper
                    v-if="props?.bannerData?.mobileRollingBanner?.length > 1"
                    :pagination="{
                      el: '.slide-t1-pagination',
                      clickable: true,
                    }"
                    :autoplay="{
                      delay: 4000,
                      disableOnInteraction: false,
                    }"
                    :speed="1000"
                    :spaceBetween="16"
                    :modules="swiperModules"
                  >
                    <SwiperSlide v-for="banner in props?.bannerData?.mobileRollingBanner.slice(0, 3)" :key="banner.idx">
                      <a :href="banner.isLink === 'Y' ? banner.linkUrl : ''">
                        <img :src="banner.fileUrl" alt="" />
                      </a>
                    </SwiperSlide>
                  </Swiper>

                  <div class="slide-t1-pagination"></div>
                </div>
              </li>

              <li>
                <p class="text-lg font-bold mb-2">당근영어 주니어 소식</p>

                <div class="relative">
                  <Swiper
                    v-if="props?.bannerData?.mobileRollingBanner?.length > 1"
                    :pagination="{
                      el: '.slide-t2-pagination',
                      clickable: true,
                    }"
                    :autoplay="{
                      delay: 4000,
                      disableOnInteraction: false,
                    }"
                    :speed="1000"
                    :loop="true"
                    :spaceBetween="16"
                    :modules="swiperModules"
                  >
                    <SwiperSlide v-for="banner in props?.bannerData?.mobileRollingBanner.slice(-2)" :key="banner.idx">
                      <a :href="banner.isLink === 'Y' ? banner.linkUrl : ''">
                        <img :src="banner.fileUrl" alt="" />
                      </a>
                    </SwiperSlide>
                  </Swiper>

                  <div class="slide-t2-pagination"></div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 데스크탑 상단 우측 배너 영역 -->
          <div class="hidden pc:block">
            <div class="pc:-mx-0 pc:flex-none pc:w-[288px]">
              <div class="space-y-10">
                <!-- 데스크탑 상단 우상단측 배너 영역 -->
                <ul class="space-y-4">
                  <li
                    @click="props?.bannerData?.banner1?.isLink === 'Y' && openNewWindow(props?.bannerData?.banner1?.linkUrl)"
                    :class="props?.bannerData?.banner1?.isLink === 'Y' ? 'cursor-pointer' : ''"
                  >
                    <img :src="props?.bannerData?.banner1?.fileUrl" alt="" />
                  </li>
                  <li
                    @click="props?.bannerData?.banner2?.isLink === 'Y' && openNewWindow(props?.bannerData?.banner2?.linkUrl)"
                    :class="props?.bannerData?.banner2?.isLink === 'Y' ? 'cursor-pointer' : ''"
                  >
                    <img :src="props?.bannerData?.banner2?.fileUrl" alt="" />
                  </li>
                  <li
                    @click="props?.bannerData?.banner3?.isLink === 'Y' && openNewWindow(props?.bannerData?.banner3?.linkUrl)"
                    :class="props?.bannerData?.banner3?.isLink === 'Y' ? 'cursor-pointer' : ''"
                  >
                    <img :src="props?.bannerData?.banner3?.fileUrl" alt="" />
                  </li>
                </ul>

                <!-- 데스크탑 상단 우하단 롤링 배너 영역 -->
                <div class="relative">
                  <Swiper
                    :pagination="{
                      el: '.slide-p-pagination',
                      clickable: true,
                    }"
                    :autoplay="{
                      delay: 4000,
                      disableOnInteraction: false,
                    }"
                    :speed="1000"
                    :loop="true"
                    :spaceBetween="16"
                    :modules="swiperModules"
                  >
                    <SwiperSlide v-for="banner in props?.bannerData?.topRollingBanner" :key="banner.idx" class="cursor-pointer">
                      <a @click="banner.isLink === 'Y' && openNewWindow(banner.linkUrl)" class="block">
                        <img :src="banner.fileUrl" alt="" />
                      </a>
                    </SwiperSlide>
                  </Swiper>

                  <div class="slide-p-pagination"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="tablet:hidden">
          <div class="max-w-[653px] mx-auto space-y-3">
            <Swiper
              :pagination="{
                el: '.slide-m-pagination',
                clickable: true,
              }"
              :autoplay="{
                delay: 4000,
                disableOnInteraction: false,
              }"
              :speed="1000"
              :spaceBetween="12"
              :modules="swiperModules"
            >
              <SwiperSlide v-for="banner in props?.bannerData?.mobileMiddleRollingBanner" :key="banner.idx">
                <img @click="banner.isLink === 'Y' && openNewWindow(banner.linkUrl)" :src="banner.fileUrl" alt="" />
              </SwiperSlide>
            </Swiper>

            <div class="swiper-pagination slide-m-pagination"></div>
          </div>
        </div>
        <!-- 태블릿 상단의 와이드 이벤트 배너 영역 -->
        <div class="hidden tablet:block pc:hidden">
          <ul class="grid grid-cols-2 gap-3">
            <li
              v-if="props?.bannerData?.mobileMiddleRollingBanner?.length"
              @click="
                props?.bannerData?.mobileMiddleRollingBanner[0]?.isLink === 'Y' &&
                  openNewWindow(props?.bannerData?.mobileMiddleRollingBanner[0]?.linkUrl)
              "
              :class="props?.bannerData?.mobileMiddleRollingBanner[0]?.isLink === 'Y' ? 'cursor-pointer' : ''"
            >
              <img :src="props?.bannerData?.mobileMiddleRollingBanner[0]?.fileUrl" alt="" />
            </li>
            <li
              v-if="props?.bannerData?.mobileMiddleRollingBanner?.length"
              @click="
                props?.bannerData?.mobileMiddleRollingBanner[1]?.isLink === 'Y' &&
                  openNewWindow(props?.bannerData?.mobileMiddleRollingBanner[1]?.linkUrl)
              "
              :class="props?.bannerData?.mobileMiddleRollingBanner[1]?.isLink === 'Y' ? 'cursor-pointer' : ''"
            >
              <img :src="props?.bannerData?.mobileMiddleRollingBanner[1]?.fileUrl" alt="" />
            </li>
          </ul>
        </div>

        <!-- 데스크탑 상단의 와이드 이벤트 배너 영역 -->
        <div class="hidden pc:block">
          <ul class="grid grid-cols-2 gap-4">
            <li
              v-if="props?.bannerData?.middleRollingBanner?.length"
              @click="
                props?.bannerData?.middleRollingBanner[0]?.isLink === 'Y' &&
                  openNewWindow(props?.bannerData?.middleRollingBanner[0]?.linkUrl)
              "
              :class="props?.bannerData?.middleRollingBanner[0]?.isLink === 'Y' ? 'cursor-pointer' : ''"
            >
              <img :src="props?.bannerData?.middleRollingBanner[0]?.fileUrl" alt="" />
            </li>
            <li
              v-if="props?.bannerData?.middleRollingBanner?.length"
              @click="
                props?.bannerData?.middleRollingBanner[1]?.isLink === 'Y' &&
                  openNewWindow(props?.bannerData?.middleRollingBanner[1]?.linkUrl)
              "
              :class="props?.bannerData?.middleRollingBanner[1]?.isLink === 'Y' ? 'cursor-pointer' : ''"
            >
              <img :src="props?.bannerData?.middleRollingBanner[1]?.fileUrl" alt="" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
:deep(.slide-m-pagination) {
  position: relative;
  inset: unset;
  display: flex;
  justify-content: center;
  gap: 12px;

  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background-color: #d1d4d8;
    opacity: 1;
    margin: 0;

    &.swiper-pagination-bullet-active {
      width: 24px;
      background-color: #2f2e30;
      border-radius: 4px;
    }
  }
}

:deep(.slide-t1-pagination),
:deep(.slide-t2-pagination) {
  position: absolute;
  top: unset;
  bottom: 22px;
  left: 22px;
  display: flex;
  justify-content: center;
  gap: 4px;
  width: auto;
  z-index: 1;

  .swiper-pagination-bullet {
    width: 5px;
    height: 5px;
    background-color: rgba(0, 0, 0, 0.35);
    opacity: 1;
    margin: 0;

    &.swiper-pagination-bullet-active {
      width: 12px;
      background-color: #2f2e30;
      border-radius: 4px;
    }
  }
}

:deep(.slide-p-pagination) {
  position: absolute;
  inset: unset;
  bottom: 18px;
  display: flex;
  justify-content: center;
  gap: 4px;
  z-index: 1;

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: rgba(0, 0, 0, 0.35);
    opacity: 1;
    margin: 0;

    &.swiper-pagination-bullet-active {
      width: 16px;
      background-color: #2f2e30;
      border-radius: 10px;
    }
  }
}
</style>
