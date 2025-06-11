<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const flipStates = ref([false, false, false]);

let currentIndex = 0;
let intervalId = null;

const flipNext = () => {
  flipStates.value = flipStates.value.map((_, idx) => idx === currentIndex);
  currentIndex = (currentIndex + 1) % flipStates.value.length;
};

onMounted(() => {
  flipNext();
  intervalId = setInterval(flipNext, 4000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<template>
  <article class="con01">
    <div
      class="pt-[68px] pb-[60px] px-[18px] overflow-hidden tablet:pt-[63px] tablet:pb-[70px] pc:pt-[124px] pc:pb-[140px] tablet:px-0"
    >
      <div class="tablet:hidden">
        <img src="@/assets/img/group-on-school/academy/con01/text-m.png" alt="" class="max-w-[296px] mx-auto mb-4" />
      </div>

      <div class="hidden tablet:block pc:hidden">
        <img src="@/assets/img/group-on-school/academy/con01/text-t.png" alt="" class="w-[614px] mx-auto mb-[50px]" />
      </div>

      <div class="hidden pc:block">
        <img src="@/assets/img/group-on-school/academy/con01/text-p.png" alt="" class="w-[808px] mx-auto mb-[66px]" />
      </div>

      <div class="tablet:hidden">
        <div class="flex justify-center mb-[18px]">
          <div class="relative min-w-[348px] w-[348px] h-[326px] mx-auto overflow-hidden">
            <img src="@/assets/img/group-on-school/academy/con01/con-bg-m.png" alt="" class="" />

            <div
              class="absolute bottom-[30px] right-[30px] size-[148px] bg-white rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.05)] flip-wrapper"
            >
              <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[2] }">
                <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                  <p class="text-lg text-center font-bold pt-3 pl-1">
                    100% 북미<br />
                    원어민 강사<br />
                    진행
                  </p>
                </div>

                <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                  <div class="flex flex-col items-center gap-2.5">
                    <img src="@/assets/img/group-on-school/academy/con01/con3-quat.png" alt="" class="w-3.5" />
                    <p class="text-sm text-center">
                      학문적 어휘, 실생활<br />
                      표현과 함께 문화를<br />
                      이해하며 글로벌 커뮤니<br />
                      케이션 역량 강화
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="absolute bottom-[30px] left-[30px] size-[148px] bg-white rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.05)] flip-wrapper"
            >
              <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[1] }">
                <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                  <p class="text-lg text-center font-bold">
                    100% 미국<br />
                    교과서 활용
                  </p>
                </div>

                <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                  <div class="flex flex-col items-center gap-2.5">
                    <img src="@/assets/img/group-on-school/academy/con01/con2-quat.png" alt="" class="w-3.5" />
                    <p class="text-sm text-center">
                      Wonders,<br />
                      Spectrum 등 북미<br />
                      교육 방식에 맞춘<br />
                      학습 구성
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="absolute top-[30px] left-[102px] size-[148px] bg-white rounded-full overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.05)] flip-wrapper"
            >
              <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[0] }">
                <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                  <p class="text-lg text-center font-bold">
                    소규모 몰입형<br />
                    그룹 수업
                  </p>
                </div>

                <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                  <div class="flex flex-col items-center gap-2.5">
                    <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-3.5" />
                    <p class="text-sm text-center">
                      영어를 몰입할 수<br />
                      있는 환경 제공
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden tablet:block pc:hidden">
        <div class="relative w-[716px] h-[336px] mx-auto mb-[50px]">
          <img src="@/assets/img/group-on-school/academy/con01/con-bg-p.png" alt="" />

          <div class="absolute top-[72px] left-[96px]">
            <ul class="flex -space-x-2.5">
              <li class="size-[190px] bg-white flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[0] }">
                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                    <div class="flex flex-col items-center gap-2.5">
                      <img src="@/assets/img/group-on-school/academy/con01/icon-p1.png" alt="" class="w-[65px]" />
                      <p class="text-lg text-center font-bold">
                        소규모 몰입형<br />
                        그룹 수업
                      </p>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                    <div class="flex flex-col items-center gap-2.5">
                      <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-[18px]" />
                      <p class="text-[15px] text-center leading-[21px">
                        영어를 몰입할 수 있는<br />
                        환경 제공
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="size-[190px] bg-white flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)] z-[1]"
              >
                <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[1] }">
                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                    <div class="flex flex-col items-center gap-2.5">
                      <img src="@/assets/img/group-on-school/academy/con01/icon-p2.png" alt="" class="w-[65px]" />
                      <p class="text-lg text-center font-bold">
                        100% 미국<br />
                        교과서 활용
                      </p>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                    <div class="flex flex-col items-center gap-2.5">
                      <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-[18px]" />
                      <p class="text-[15px] text-center leading-[21px">
                        Wonders, Spectrum<br />
                        등 북미 교육 방식에<br />
                        맞춘 학습 구성
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li class="size-[190px] bg-white flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[2] }">
                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                    <div class="flex flex-col items-center gap-2.5">
                      <img src="@/assets/img/group-on-school/academy/con01/icon-p3.png" alt="" class="w-[65px]" />
                      <p class="text-lg text-center font-bold">
                        100% 북미 원어민<br />
                        강사 진행
                      </p>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                    <div class="flex flex-col items-center gap-2.5">
                      <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-[18px]" />
                      <p class="text-[15px] text-center leading-[21px]">
                        학문적 어휘, 실생활<br />
                        표현과 함께 문화를 이해<br />
                        하며 글로벌 커뮤니케이션<br />
                        역량 강화
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="hidden pc:block">
        <div class="relative w-[1004px] h-[470px] mx-auto mb-[92px]">
          <img src="@/assets/img/group-on-school/academy/con01/con-bg-p.png" alt="" />

          <div class="absolute top-[103px] left-[136px]">
            <ul class="flex -space-x-2.5">
              <li class="size-[260px] bg-white flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[0] }">
                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                    <div class="flex flex-col items-center gap-3.5">
                      <img src="@/assets/img/group-on-school/academy/con01/icon-p1.png" alt="" class="w-[86px]" />
                      <p class="text-[22px] text-center font-bold">
                        소규모 몰입형<br />
                        그룹 수업
                      </p>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                    <div class="flex flex-col items-center gap-5">
                      <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-6" />
                      <p class="text-lg text-center">
                        영어를 몰입할 수 있는<br />
                        환경 제공
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li
                class="size-[260px] bg-white flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)] z-[1]"
              >
                <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[1] }">
                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                    <div class="flex flex-col items-center gap-3.5">
                      <img src="@/assets/img/group-on-school/academy/con01/icon-p2.png" alt="" class="w-[86px]" />
                      <p class="text-[22px] text-center font-bold">
                        100% 미국<br />
                        교과서 활용
                      </p>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                    <div class="flex flex-col items-center gap-5">
                      <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-6" />
                      <p class="text-lg text-center">
                        Wonders, Spectrum 등<br />
                        북미 교육 방식에 맞춘<br />
                        학습 구성
                      </p>
                    </div>
                  </div>
                </div>
              </li>

              <li class="size-[260px] bg-white flex justify-center items-center rounded-full shadow-[0_0_30px_rgba(0,0,0,0.05)]">
                <div class="flip-card size-full will-change-transform" :class="{ flipped: flipStates[2] }">
                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-f">
                    <div class="flex flex-col items-center gap-3.5">
                      <img src="@/assets/img/group-on-school/academy/con01/icon-p3.png" alt="" class="w-[86px]" />
                      <p class="text-[22px] text-center font-bold">
                        100% 북미 원어민<br />
                        강사 진행
                      </p>
                    </div>
                  </div>

                  <div class="absolute top-0 left-0 size-full flex justify-center items-center con-b">
                    <div class="flex flex-col items-center gap-5">
                      <img src="@/assets/img/group-on-school/academy/con01/con1-quat.png" alt="" class="w-6" />
                      <p class="text-lg text-center">
                        학문적 어휘, 실생활<br />
                        표현과 함께 문화를 이해하며<br />
                        글로벌 커뮤니케이션<br />
                        역량 강화
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex justify-center">
        <ul class="flex flex-col gap-2.5 tablet:flex-row tablet:gap-[26px] pc:gap-10">
          <li>
            <a
              href="/courseRegister?type=academy"
              class="flex items-center gap-7 p-3.5 pl-14 border border-solid border-[#cccccc] rounded-full pc:gap-9 pc:p-4 pc:pl-[60px]"
            >
              <p class="font-bold pc:text-xl pc:leading-tight">수강 신청하기</p>
              <img src="@/assets/img/group-on-school/debate/con01/go1.png" alt="" class="w-[26px] pc:w-[34px]" />
            </a>
          </li>

          <li>
            <a
              href="https://forms.gle/Kag4CK1iU5ZVBQVx7"
              target="_blank"
              class="flex items-center gap-7 p-3.5 pl-14 border border-solid border-[#cccccc] rounded-full pc:gap-9 pc:p-4 pc:pl-[60px]"
            >
              <p class="font-bold pc:text-xl pc:leading-tight">1:1 문의 상담</p>
              <img src="@/assets/img/group-on-school/debate/con01/go2.png" alt="" class="w-[26px] pc:w-[34px]" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.flip-wrapper {
  perspective: 1000px;
}

.flip-card {
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.con-f,
.con-b {
  backface-visibility: hidden;
}

.con-b {
  transform: rotateY(180deg);
}

.flipped {
  transform: rotateY(180deg);
}
</style>
