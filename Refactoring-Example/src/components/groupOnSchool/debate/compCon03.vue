<script setup>
import { onMounted } from "vue";

onMounted(() => {
  const marqueeReview = document.querySelector(".marquee-review");

  let offset = 0;

  const speed = 1;

  function animateMarquee() {
    offset -= speed;
    marqueeReview.style.backgroundPosition = `${offset}px 0`;

    requestAnimationFrame(animateMarquee);
  }

  animateMarquee();
});
</script>

<template>
  <article class="con03">
    <div class="bg-[#F7F7F7]">
      <div
        class="py-[70px] px-[18px] bg-[#202020] bg-[url(@/assets/img/group-on-school/debate/con03/bg-m.png)] bg-no-repeat bg-top bg-[length:1199px_584px] rounded-t-3xl pc:py-[140px] pc:px-0 pc:bg-[url(@/assets/img/group-on-school/debate/con03/bg-p.png)] pc:bg-[length:1920px_832px] pc:rounded-t-[36px]"
      >
        <div class="space-y-1 flex flex-col items-center mb-[54px] tablet:mb-2.5 pc:space-y-1.5 pc:mb-9">
          <p class="text-[34px] text-[#6D7076] text-center font-bold tablet:text-4xl pc:text-[54px]">
            <span class="text-white">학부모</span>와 <span class="text-white">학생</span> 모두
          </p>

          <p
            class="inline-block text-[34px] text-white text-center font-extrabold py-px px-1.5 bg-[#54A7F6] rounded-md tablet:text-4xl tablet:leading-tight pc:text-[54px] pc:px-3 pc:rounded-[10px]"
          >
            높은 수업 만족도!
          </p>
        </div>

        <div class="tablet:hidden">
          <img src="@/assets/img/group-on-school/debate/con03/con-m.png" alt="" class="max-w-[324px] mx-auto mb-[50px]" />
        </div>

        <div class="hidden tablet:block pc:hidden">
          <img src="@/assets/img/group-on-school/debate/con03/con-t.png" alt="" class="max-w-[598px] mx-auto mb-2.5" />
        </div>

        <div class="hidden pc:block">
          <img src="@/assets/img/group-on-school/debate/con03/con-p.png" alt="" class="max-w-[930px] mx-auto mb-[43px]" />
        </div>

        <div class="-mx-[18px] pc:mx-auto pc:max-w-[1200px]">
          <div
            class="marquee-review relative w-full h-[259px] bg-[url(@/assets/img/group-on-school/debate/con03/review-m.png)] bg-repeat-x bg-[length:2216px_259px] overflow-hidden tablet:h-[209px] tablet:bg-[url(@/assets/img/group-on-school/debate/con03/review-t.png)] tablet:bg-[length:2447px_209px] pc:h-[236px] pc:bg-[url(@/assets/img/group-on-school/debate/con03/review-p.png)] pc:bg-[length:3256px_236px]"
          >
            <div class="absolute top-0 left-0 w-[54px] h-full bg-gradient-to-r from-[#202020] to-transparent pc:w-[164px]"></div>

            <div class="absolute top-0 right-0 w-[54px] h-full bg-gradient-to-r from-transparent to-[#202020] pc:w-[164px]"></div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss"></style>
