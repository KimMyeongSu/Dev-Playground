<script setup></script>

<template>
  <article class="con04">
    <div class="pt-[70px] pb-[50px] px-[18px] overflow-hidden pc:pt-[140px] pc:pb-[118px] pc:px-0">
      <p
        class="text-[34px] text-center font-bold leading-[46px] mb-[34px] tablet:text-4xl tablet:mb-10 pc:text-[54px] pc:mb-[70px]"
      >
        온스쿨 브릿지<br class="tablet:hidden" />
        <span class="text-[#3182F6]"> 수업 스케줄</span>
      </p>

      <div class="pc:hidden">
        <ul class="grid grid-cols-1 gap-6 tablet:grid-cols-2 tablet:gap-3">
          <li class="space-y-2">
            <p class="text-white text-center font-medium py-4 bg-[#18181B] rounded-xl">월수</p>

            <ul class="space-y-3.5 py-[26px] px-[18px] bg-white border border-solid border-[#3182F6] rounded-xl">
              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#3182F6] text-center font-medium w-14 py-1 bg-[#D8EFFE] rounded-full">정원</p>

                <p class="font-medium">최대 6명</p>
              </li>

              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#3182F6] text-center font-medium w-14 py-1 bg-[#D8EFFE] rounded-full">횟수</p>

                <p class="font-medium">주 2회</p>
              </li>

              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#3182F6] text-center font-medium w-14 py-1 bg-[#D8EFFE] rounded-full">시간</p>

                <p class="text-[#3182F6] font-bold">20:00 - 20:50</p>
              </li>

              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#3182F6] text-center font-medium w-14 py-1 bg-[#D8EFFE] rounded-full">mins</p>

                <p class="font-medium">50mins</p>
              </li>
            </ul>
          </li>

          <li class="space-y-2">
            <p class="text-white text-center font-medium py-4 bg-[#18181B] rounded-xl">화목</p>

            <ul class="space-y-3.5 py-[26px] px-[18px] bg-white border border-solid border-[#FF945A] rounded-xl">
              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#FF6714] text-center font-medium w-14 py-1 bg-[#FFFAE2] rounded-full">정원</p>

                <p class="font-medium">최대 6명</p>
              </li>

              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#FF6714] text-center font-medium w-14 py-1 bg-[#FFFAE2] rounded-full">횟수</p>

                <p class="font-medium">주 2회</p>
              </li>

              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#FF6714] text-center font-medium w-14 py-1 bg-[#FFFAE2] rounded-full">시간</p>

                <p class="text-[#FF6714] font-bold">20:00 - 20:50</p>
              </li>

              <li class="flex items-center gap-3 tablet:gap-6">
                <p class="flex-none text-[#FF6714] text-center font-medium w-14 py-1 bg-[#FFFAE2] rounded-full">mins</p>

                <p class="font-medium">50mins</p>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <div class="hidden pc:block">
        <div class="w-[1200px] mx-auto">
          <ul class="grid grid-cols-4 gap-3.5 mb-[26px]">
            <li class="text-lg text-center font-bold leading-tight py-3.5 bg-[#f4f5f6] rounded-full relative">
              월
              <img
                src="@/assets/img/group-on-school/bridge/con04/icon.png"
                alt=""
                class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7"
              />
            </li>
            <li class="text-lg text-center font-bold leading-tight py-3.5 bg-[#f4f5f6] rounded-full relative">
              화
              <img
                src="@/assets/img/group-on-school/bridge/con04/icon.png"
                alt=""
                class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7"
              />
            </li>
            <li class="text-lg text-center font-bold leading-tight py-3.5 bg-[#f4f5f6] rounded-full relative">
              수
              <img
                src="@/assets/img/group-on-school/bridge/con04/icon.png"
                alt=""
                class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7"
              />
            </li>
            <li class="text-lg text-center font-bold leading-tight py-3.5 bg-[#f4f5f6] rounded-full relative">
              목
              <img
                src="@/assets/img/group-on-school/bridge/con04/icon.png"
                alt=""
                class="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-7"
              />
            </li>
          </ul>

          <ul class="grid grid-cols-4 gap-x-3.5 gap-y-4 mb-4">
            <li
              class="flex justify-center items-center py-7 bg-white border border-solid border-[#3182F6] rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)]"
            >
              <div class="flex flex-col items-center gap-3">
                <p class="text-[#3182F6] text-center py-1 px-5 bg-[#D8EFFE] rounded-full">월수</p>
                <p class="text-xl text-center font-semibold leading-[22px]">
                  20:00 ~ 20:50<br />
                  <span class="text-base text-[#A1A3A8] font-light">(50mins)</span>
                </p>
              </div>
            </li>

            <li class="flex justify-center items-center py-7 bg-[#3182F6] rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)]">
              <div class="flex flex-col items-center gap-3">
                <p class="text-[#3182F6] text-center py-1 px-5 bg-white rounded-full">화목</p>
                <p class="text-xl text-white text-center font-semibold leading-[22px]">
                  20:00 - 20:50<br />
                  <span class="text-base text-[#9CC7FF] font-light">(50mins)</span>
                </p>
              </div>
            </li>

            <li
              class="flex justify-center items-center py-7 bg-white border border-solid border-[#3182F6] rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)]"
            >
              <div class="flex flex-col items-center gap-3">
                <p class="text-[#3182F6] text-center py-1 px-5 bg-[#D8EFFE] rounded-full">월수</p>
                <p class="text-xl text-center font-semibold leading-[22px]">
                  20:00 - 20:50<br />
                  <span class="text-base text-[#A1A3A8] font-light">(50mins)</span>
                </p>
              </div>
            </li>

            <li class="flex justify-center items-center py-7 bg-[#3182F6] rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)]">
              <div class="flex flex-col items-center gap-3">
                <p class="text-[#3182F6] text-center py-1 px-5 bg-white rounded-full">화목</p>
                <p class="text-xl text-white text-center font-semibold leading-[22px]">
                  20:00 - 20:50<br />
                  <span class="text-base text-[#9CC7FF] font-light">(50mins)</span>
                </p>
              </div>
            </li>
          </ul>

          <p class="text-[#A1A3A8] text-right">* 각 반의 최대 정원은 6명입니다.</p>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss"></style>
