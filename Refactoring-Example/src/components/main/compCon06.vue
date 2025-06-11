<script setup>
import { onMounted } from "vue";

onMounted(() => {});
</script>

<template>
  <article class="con06">
    <div class="pt-[78px] px-[18px] bg-[#28282D] pc:pt-[90px] pc:px-0">
      <div
        class="flex flex-col gap-16 max-w-[360px] mx-auto tablet:flex-row tablet:justify-between tablet:items-center tablet:max-w-[1200px]"
      >
        <div>
          <p class="text-lg text-[#7A7D82] text-center mb-4 tablet:text-xl tablet:text-left tablet:mb-6 pc:text-[28px]">
            <span
              class="relative text-white after:content-[''] after:size-1 after:bg-white after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-1.5"
              >매</span
            >
            <span
              class="relative text-white after:content-[''] after:size-1 after:bg-white after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-1.5"
              >일</span
            >
            <span
              class="relative text-white after:content-[''] after:size-1 after:bg-white after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-1.5"
            >
              영</span
            >
            <span
              class="relative text-white after:content-[''] after:size-1 after:bg-white after:rounded-full after:absolute after:-top-2 after:right-1/2 after:translate-x-1/2 pc:after:size-1.5"
              >어</span
            >를 하고 싶게 만드는
          </p>

          <p
            class="text-4xl font-bold text-center text-white mb-[30px] tablet:text-[42px] tablet:text-left tablet:leading-[50px] tablet:mb-[46px] pc:text-[62px] pc:leading-[74px]"
          >
            당근농장 APP<br />다운로드
          </p>

          <ul class="flex justify-center gap-3 pc:justify-start pc:gap-3.5">
            <li class="flex-none w-[130px] tablet:w-[164px]">
              <a
                href="https://play.google.com/store/apps/details?id=com.carrotglobal.platform&hl=ko"
                target="_blank"
                class="block"
              >
                <img src="@/assets/img/main/con06/icon-google.png" alt="icon" />
              </a>
            </li>

            <li class="flex-none w-[122px] tablet:w-[150px]">
              <a
                href="https://apps.apple.com/kr/app/%EB%8B%B9%EA%B7%BC%EB%86%8D%EC%9E%A5-%EC%98%81%EC%96%B4%ED%9A%8C%ED%99%94-%EC%8A%A4%ED%94%BC%ED%82%B9-%ED%95%98%EB%A3%A8%EC%98%81%EC%9E%91-%EC%98%81%EB%8B%A8%EC%96%B4/id1531448532"
                target="_blank"
                class="block"
              >
                <img src="@/assets/img/main/con06/icon-apple.png" alt="icon" />
              </a>
            </li>
          </ul>
        </div>

        <div class="max-w-64 mx-auto tablet:mx-0 tablet:mr-5 pc:max-w-[380px] pc:mr-[70px]">
          <img src="@/assets/img/main/con06/phone.png" alt="img" />
        </div>
      </div>
    </div>
  </article>
</template>

<style lang="scss" scoped></style>
