<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const swiperModules = [Autoplay, Navigation];

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  bookInfo: {
    type: Object,
    required: true,
  },
  personalTabs: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:close"]);

const close = () => {
  emit("update:close");
};
</script>
<template>
  <!-- 시안2 -->
  <div v-if="props.isOpen" class="">
    <div class="fixed inset-0 bg-[#18181B]/70 overflow-y-auto z-[11]" @click="close">
      <div class="flex justify-center items-center py-[90px] px-[18px] min-h-full">
        <div class="w-full max-w-[724px] space-y-2.5">
          <div class="flex justify-end">
            <img
              @click="close"
              src="@/assets/img/personal-on-school/con03/close.png"
              alt=""
              class="w-4 tablet:w-5 cursor-pointer"
            />
          </div>

          <div @click.stop class="py-[26px] px-2 bg-white rounded-xl tablet:pt-14 tablet:pb-[52px] tablet:px-[52px]">
            <div class="flex justify-center mb-2 tablet:mb-4">
              <p class="text-white font-medium py-1.5 px-3.5 bg-[#FF6714] rounded-full tablet:py-2.5 tablet:px-[30px]">
                {{ props.personalTabs.title }}
              </p>
            </div>

            <p class="tetx-xl text-center font-bold mb-4 tablet:text-[38px] tablet:mb-8">{{ props.bookInfo.title }}</p>

            <div class="relative">
              <div class="p-2.5 bg-[#E4E6EA] rounded-[14px] mb-2.5 tablet:py-8 tablet:px-[34px] tablet:mb-0">
                <swiper
                  :loop="true"
                  :slidesPerView="1"
                  :centeredSlides="true"
                  :navigation="{
                    prevEl: '.button-prev-custom',
                    nextEl: '.button-next-custom',
                  }"
                  :modules="swiperModules"
                  class="rounded-[14px] shadow-[0_5px_8px_rgba(0,0,0,0.14)]"
                >
                  <swiper-slide v-for="(item, index) in props.bookInfo.imageList" :key="index">
                    <img :src="item.image1" alt="" />
                  </swiper-slide>
                </swiper>
              </div>

              <div
                class="tablet:absolute tablet:top-1/2 tablet:-translate-y-1/2 tablet:left-1/2 tablet:-translate-x-1/2 tablet:z-[1] tablet:w-[672px]"
              >
                <ul class="flex justify-center items-center gap-7 tablet:justify-between">
                  <li class="w-[42px] button-prev-custom tablet:w-[52px]">
                    <img src="@/assets/img/personal-on-school/con03/arrow.png" alt="icon" class="cursor-pointer rotate-180" />
                  </li>

                  <li class="w-[42px] button-next-custom tablet:w-[52px]">
                    <img src="@/assets/img/personal-on-school/con03/arrow.png" alt="icon" class="cursor-pointer" />
                  </li>
                </ul>
              </div>

              <div
                class="absolute -top-6 -right-1 w-[82px] rounded-full shadow-[0_3px_6px_rgba(0,0,0,0.16)] z-[1] tablet:w-[130px] tablet:-right-6"
              >
                <img :src="props.bookInfo.pcImage" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
