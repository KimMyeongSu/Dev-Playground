<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiperModules = [Autoplay, Navigation];
</script>

<template>
  <article class="con02">
    <div class="py-[50px] px-[18px] bg-[#F4F5F6] overflow-hidden tablet:py-[70px] pc:py-[140px] tablet:px-0">
      <p class="text-[34px] text-center font-bold leading-[46px] mb-4 tablet:text-4xl tablet:mb-5 pc:text-[54px] pc:mb-7">
        온스쿨 아카데미 <br class="tablet:hidden" />

        <span
          class="relative text-[#3182F6] pc:after:content-[''] pc:after:size-2.5 pc:after:bg-[#3182F6] pc:after:rounded-full pc:after:absolute pc:after:-top-4 pc:after:right-1/2 pc:after:translate-x-1/2"
          >학</span
        >
        <span
          class="relative text-[#3182F6] pc:after:content-[''] pc:after:size-2.5 pc:after:bg-[#3182F6] pc:after:rounded-full pc:after:absolute pc:after:-top-4 pc:after:right-1/2 pc:after:translate-x-1/2"
          >습</span
        >
        <span>&nbsp;</span>
        <span
          class="relative text-[#3182F6] pc:after:content-[''] pc:after:size-2.5 pc:after:bg-[#3182F6] pc:after:rounded-full pc:after:absolute pc:after:-top-4 pc:after:right-1/2 pc:after:translate-x-1/2"
          >구</span
        >
        <span
          class="relative text-[#3182F6] pc:after:content-[''] pc:after:size-2.5 pc:after:bg-[#3182F6] pc:after:rounded-full pc:after:absolute pc:after:-top-4 pc:after:right-1/2 pc:after:translate-x-1/2"
          >성</span
        >
      </p>

      <p class="text-center mb-[34px] tablet:leading-6 tablet:mb-10 pc:text-[22px] pc:leading-[34px] pc:mb-[70px]">
        미국 교과서 중심의 레벨, 학습 영역,<br class="tablet:hidden" />
        학습 목표를 통해<br />
        북미 학생들과<br class="tablet:hidden" />
        동일한 영어 실력을 키워 나갑니다.
      </p>

      <div class="relative">
        <div class="-mx-[18px] mb-[22px] pc:-mx-0 pc:mb-0">
          <swiper
            :autoplay="{
              delay: 4000,
              disableOnInteraction: false,
            }"
            :loop="true"
            :slidesPerView="'auto'"
            :centeredSlides="true"
            :navigation="{
              prevEl: '.button-prev-custom',
              nextEl: '.button-next-custom',
            }"
            :modules="swiperModules"
          >
            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[695px] pc:!w-[938px]">
              <div class="tablet:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-m1.png" alt="" />
              </div>

              <div class="hidden tablet:block pc:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-t1.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/group-on-school/academy/con02/slide-p1.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[695px] pc:!w-[938px]">
              <div class="tablet:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-m2.png" alt="" />
              </div>

              <div class="hidden tablet:block pc:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-t2.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/group-on-school/academy/con02/slide-p2.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[695px] pc:!w-[938px]">
              <div class="tablet:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-m3.png" alt="" />
              </div>

              <div class="hidden tablet:block pc:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-t3.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/group-on-school/academy/con02/slide-p3.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[695px] pc:!w-[938px]">
              <div class="tablet:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-m1.png" alt="" />
              </div>

              <div class="hidden tablet:block pc:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-t1.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/group-on-school/academy/con02/slide-p1.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[695px] pc:!w-[938px]">
              <div class="tablet:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-m2.png" alt="" />
              </div>

              <div class="hidden tablet:block pc:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-t2.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/group-on-school/academy/con02/slide-p2.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[695px] pc:!w-[938px]">
              <div class="tablet:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-m3.png" alt="" />
              </div>

              <div class="hidden tablet:block pc:hidden">
                <img src="@/assets/img/group-on-school/academy/con02/slide-t3.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/group-on-school/academy/con02/slide-p3.png" alt="" />
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <ul
          class="flex justify-center gap-8 pc:justify-between pc:gap-[42px] pc:w-[990px] pc:absolute pc:top-1/2 pc:left-1/2 pc:-translate-y-1/2 pc:-translate-x-1/2 pc:z-[1]"
        >
          <li
            class="size-[42px] rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] pc:size-[50px] button-prev-custom"
          >
            <img src="@/assets/img/group-on-school/academy/con02/arrow-prev.png" alt="icon" class="cursor-pointer" />
          </li>

          <li
            class="size-[42px] rounded-full overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.05)] pc:size-[50px] button-next-custom"
          >
            <img src="@/assets/img/group-on-school/academy/con02/arrow-next.png" alt="icon" class="cursor-pointer" />
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
:deep(.swiper) {
  .swiper-wrapper {
    align-items: stretch;
    height: auto;

    .swiper-slide {
      &:not(.swiper-slide-active) {
        transform: scale(0.9);
      }
    }
  }
}
</style>
