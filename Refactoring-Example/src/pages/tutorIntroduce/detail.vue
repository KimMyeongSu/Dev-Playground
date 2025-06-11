<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import { useBoardStore } from "@/stores/board";
import { useRouter } from "vue-router";
import { getBestTutors } from "@/api/tutorIntroduce";
import "swiper/css";
import "swiper/css/navigation";

const router = useRouter();
const store = useBoardStore();
const bestTutors = ref([]);
const swiperModules = [Navigation];
const tutorIdx = router.currentRoute.value.query.idx;

function naviToggle() {
  const slideNavi = document.querySelector(".slide-navigation");
  const footer = document.querySelector(".footer");

  if (slideNavi && footer) {
    const observer = new IntersectionObserver((entries) => {
      const isVisible = entries[0].isIntersecting;

      if (isVisible) {
        slideNavi.style.display = "none";
      } else {
        slideNavi.style.display = "block";
      }
    });

    observer.observe(footer);

    onUnmounted(() => {
      observer.disconnect();
    });
  }
}

const moveTutorToFront = () => {
  if (!tutorIdx) return;

  const selectedTutorIndex = bestTutors.value.findIndex((tutor) => tutor.idx === parseInt(tutorIdx));
  if (selectedTutorIndex === -1) return;

  const selectedTutor = bestTutors.value[selectedTutorIndex];
  bestTutors.value.splice(selectedTutorIndex, 1);
  bestTutors.value.unshift(selectedTutor);
};

onMounted(async () => {
  bestTutors.value = await getBestTutors();
  bestTutors.value = bestTutors.value.filter((tutor) => tutor !== undefined);
  moveTutorToFront();
  naviToggle();
});
</script>
<template>
  <div>
    <main>
      <div class="pt-[130px] pb-[98px] pc:pt-[190px] pc:pb-[226px]">
        <div class="max-w-[1200px] mx-auto px-5 pc:px-0">
          <p
            class="text-[34px] text-[#18181B] text-center font-bold pb-11 border-b-2 border-solid border-[#09090B] pc:text-[50px]"
          >
            Best 강사
          </p>

          <Swiper
            :autoHeight="true"
            :navigation="{
              prevEl: '.slide-navigation-prev',
              nextEl: '.slide-navigation-next',
            }"
            :speed="1000"
            :loop="true"
            :allowTouchMove="false"
            :modules="swiperModules"
          >
            <SwiperSlide v-for="tutor in bestTutors" :key="tutor?.idx">
              <img :src="tutor?.subImg" alt="img" class="max-w-[960px] mx-auto" />
            </SwiperSlide>
          </Swiper>

          <ul class="flex justify-center gap-10 slide-navigation">
            <li class="cursor-pointer slide-navigation-prev fixed top-1/2 -translate-y-1/2 left-0 z-10 pc:left-[50px]">
              <img src="@/assets/img/tutor-introduce/arrow-prev.png" alt="icon" class="hidden pc:block w-[58px]" />

              <img src="@/assets/img/tutor-introduce/arrow-prev-m.png" alt="icon" class="w-[66px] pc:hidden" />
            </li>

            <li class="cursor-pointer slide-navigation-next fixed top-1/2 -translate-y-1/2 right-0 z-10 pc:right-[50px]">
              <img src="@/assets/img/tutor-introduce/arrow-next.png" alt="icon" class="hidden pc:block w-[58px]" />

              <img src="@/assets/img/tutor-introduce/arrow-next-m.png" alt="icon" class="w-[66px] pc:hidden" />
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
</template>
<style scoped lang="scss"></style>
