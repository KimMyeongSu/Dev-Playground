<script setup>
import { ref, onMounted } from "vue";

const scrollBox = ref(null);

const isModal = ref(false);
const toggleModal = () => {
  isModal.value = !isModal.value;
};

onMounted(() => {
  setTimeout(() => {
    if (scrollBox.value) {
      scrollBox.value.scrollLeft = 180;
    }
  }, 100);
});
</script>

<template>
  <article class="con02">
    <div class="pt-[86px] px-[18px] tablet:pt-[124px] tablet:pb-[90px] pc:pt-[150px] pc:pb-[120px] pc:px-0">
      <p class="text-[34px] text-center font-bold mb-3.5 tablet:text-[42px] tablet:mb-[18px] pc:text-[54px] pc:mb-[22px]">
        영역별 학습 로드맵
      </p>

      <div class="flex justify-center mb-10 tablet:mb-[46px] pc:mb-[54px]">
        <div @click="toggleModal" class="flex items-center gap-1 pb-0.5 border-b border-solid border-[#424242] cursor-pointer">
          <p class="text-[#424242] font-medium">당근영어 주니어 레벨보기</p>
          <img src="@/assets/img/personal-on-school/con02/go2.png" alt="" class="w-1.5" />
        </div>
      </div>

      <div class="-mx-[18px] pc:-mx-0">
        <div class="tablet:hidden">
          <div class="py-3.5 px-[18px] bg-[#F7F7F7] overflow-hidden">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.05)]">
                <img src="@/assets/img/personal-on-school/con02/title-m.png" alt="" class="w-[86px]" />
              </div>

              <div ref="scrollBox" class="pl-[94px] overflow-x-auto">
                <img src="@/assets/img/personal-on-school/con02/con-m.png" alt="" class="min-w-[910px] w-[910px]" />
              </div>
            </div>
          </div>
        </div>

        <div class="hidden tablet:block pc:hidden">
          <div class="max-w-[840px] mx-auto py-3.5 px-[18px] bg-[#F7F7F7] rounded-[20px] overflow-hidden">
            <div class="relative rounded-2xl overflow-hidden">
              <div class="absolute rounded-2xl shadow-[0_6px_30px_rgba(0,0,0,0.05)]">
                <img src="@/assets/img/personal-on-school/con02/title-t.png" alt="" class="w-[180px]" />
              </div>

              <div ref="scrollBox" class="pl-[200px] overflow-x-auto">
                <img src="@/assets/img/personal-on-school/con02/con-t.png" alt="" class="min-w-[972px] w-[972px]" />
              </div>
            </div>
          </div>
        </div>

        <div class="hidden pc:block pc:w-[1200px] pc:mx-auto">
          <img src="@/assets/img/personal-on-school/con02/con-p.png" alt="" />
        </div>
      </div>
    </div>
  </article>

  <div v-if="isModal">
    <div class="fixed inset-0 bg-[#18181B]/70 overflow-y-auto z-[11]">
      <div class="flex justify-center items-center py-[90px] px-[18px] min-h-full">
        <div class="w-full max-w-[500px] space-y-2.5 tablet:max-w-[820px]">
          <div class="flex justify-end">
            <img @click="toggleModal" src="@/assets/img/personal-on-school/con02/close.png" alt="" class="w-5 cursor-pointer" />
          </div>

          <div class="py-9 px-2 bg-white rounded-[20px] tablet:pt-[60px] tablet:pb-[50px] tablet:px-[26px]">
            <p class="text-[26px] text-center font-bold mb-2 tablet:text-[38px] tablet:mb-4">
              당근영어 주니어만의<br />
              <span class="text-[#FF6714]">레벨 체계</span>
            </p>

            <p class="text-center mb-[18px] tablet:mb-[38px]">
              명확한 학습 레벨을 바탕으로 최적화된<br class="tablet:hidden" />
              학습 목표 설정이 가능합니다.
            </p>

            <div class="tablet:hidden">
              <ul class="space-y-[38px]">
                <li>
                  <p class="text-white text-center font-bold py-3 bg-[#FFAF10] rounded-t-[14px]">RISE</p>
                  <table>
                    <tbody>
                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFF4DD]">
                          <p class="text-sm text-center font-medium mb-1">Level 1</p>
                          <p class="text-xs text-[#2F2E30] text-center">Novice Low</p>
                        </td>

                        <td class="py-4 px-3 bg-[#F4F5F6]">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">~99L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">0.0~0.9</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">Pre A1</p>
                            </li>
                          </ul>

                          <p class="text-sm">알파벳과 파닉스를 배우며 자연스럽게 영어에 친숙해지는 단계</p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFF4DD]">
                          <p class="text-sm text-center font-medium mb-1">Level 2</p>
                          <p class="text-xs text-[#2F2E30] text-center">Novice Mid</p>
                        </td>

                        <td class="py-4 px-3">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">100L~200L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">1.0~1.5</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">A1-</p>
                            </li>
                          </ul>

                          <p class="text-sm">인사, 날씨 등 기본적인 일상 표현을 활용할 수 있는 단계</p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFF4DD]">
                          <p class="text-sm text-center font-medium mb-1">Level 3</p>
                          <p class="text-xs text-[#2F2E30] text-center">Novice High</p>
                        </td>

                        <td class="py-4 px-3 bg-[#F4F5F6]">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">201L~300L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">1.6~1.9</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">A1</p>
                            </li>
                          </ul>

                          <p class="text-sm">일상적인 주제에 관해 기본적인 의사소통이 가능한 단계</p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFF4DD]">
                          <p class="text-sm text-center font-medium mb-1">Level 4</p>
                          <p class="text-xs text-[#2F2E30] text-center">Intermediate Low</p>
                        </td>

                        <td class="py-4 px-3">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">301L~420L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">2.0~2.5</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">A1+</p>
                            </li>
                          </ul>

                          <p class="text-sm">간단한 글을 읽고 본인의 의견은 복합문으로 표현할 수 있는 단계</p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#CBCBCB]">
                        <td class="w-[90px] bg-[#FFF4DD]">
                          <p class="text-sm text-center font-medium mb-1">Level 5</p>
                          <p class="text-xs text-[#2F2E30] text-center">Intermediate Mid</p>
                        </td>

                        <td class="py-4 px-3 bg-[#F4F5F6]">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">421L~550L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">2.6~2.9</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">A2-</p>
                            </li>
                          </ul>

                          <p class="text-sm">일상 대화에서 자신의 생각을 비교적 명확히 전달할 수 있는 단계</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>

                <li>
                  <p class="text-white text-center font-bold py-3 bg-[#FF871E] rounded-t-[14px]">EDGE</p>
                  <table>
                    <tbody>
                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFEEDF]">
                          <p class="text-sm text-center font-medium mb-1">Level 6</p>
                          <p class="text-xs text-[#2F2E30] text-center">Intermediate High</p>
                        </td>

                        <td class="py-4 px-3 bg-[#F4F5F6]">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">551L~615L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">3.0~3.5</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">A2</p>
                            </li>
                          </ul>

                          <p class="text-sm">일상 생활 속 상황에 대한 추측이나 계획을 설명할 수 있는 단계</p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFEEDF]">
                          <p class="text-sm text-center font-medium mb-1">Level 7</p>
                          <p class="text-xs text-[#2F2E30] text-center">Novice Mid</p>
                        </td>

                        <td class="py-4 px-3">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">616L~715L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">3.6~3.9</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">A2+</p>
                            </li>
                          </ul>

                          <p class="text-sm">
                            이메일이나 편지 작성이 가능하며 복잡한 대화에서도 자신의 생각을 비교적 잘 전달할 수 있는 단계
                          </p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#CBCBCB]">
                        <td class="w-[90px] bg-[#FFEEDF]">
                          <p class="text-sm text-center font-medium mb-1">Level 8</p>
                          <p class="text-xs text-[#2F2E30] text-center">Novice High</p>
                        </td>

                        <td class="py-4 px-3 bg-[#F4F5F6]">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">716L~780L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">4.0~4.5</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">B1-</p>
                            </li>
                          </ul>

                          <p class="text-sm">
                            비교적 논리적이고 체계적인 대화가 가능하며 추상적인 개념을 이해하고 표현할 수 있는 단계
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>

                <li>
                  <p class="text-white text-center font-bold py-3 bg-[#FF6714] rounded-t-[14px]">SUMMIT</p>
                  <table>
                    <tbody>
                      <tr class="border-b border-solid border-[#ECECEC]">
                        <td class="w-[90px] bg-[#FFE2D2]">
                          <p class="text-sm text-center font-medium mb-1">Level 9</p>
                          <p class="text-xs text-[#2F2E30] text-center">
                            Advanced<br />
                            High
                          </p>
                        </td>

                        <td class="py-4 px-3 bg-[#F4F5F6]">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">781L~800L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">4.6~4.9</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">B1</p>
                            </li>
                          </ul>

                          <p class="text-sm">
                            복문을 활용한 의사소통이 활발하며 다양한 주제에 대해 깊이 있는 대화를 나눌 수 있는 단계
                          </p>
                        </td>
                      </tr>

                      <tr class="border-b border-solid border-[#CBCBCB]">
                        <td class="w-[90px] bg-[#FFE2D2]">
                          <p class="text-sm text-center font-medium mb-1">Level 10</p>
                          <p class="text-xs text-[#2F2E30] text-center">Advanced Expert</p>
                        </td>

                        <td class="py-4 px-3">
                          <ul class="flex flex-wrap gap-y-1 gap-x-2.5 mb-2.5">
                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                Lexile
                              </p>
                              <p class="text-sm font-medium">801L~860L</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                AR
                              </p>
                              <p class="text-sm font-medium">5.0~5.5</p>
                            </li>

                            <li class="flex items-center gap-1">
                              <p
                                class="w-11 text-xs text-[#2F2E30] text-center font-medium py-0.5 px-1.5 bg-[#D1D4D8] rounded-full"
                              >
                                CEFR
                              </p>
                              <p class="text-sm font-medium">B1+</p>
                            </li>
                          </ul>

                          <p class="text-sm">비교적 유창한 영어를 구사하며 논리적인 말하기가 가능한 단계</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </li>
              </ul>
            </div>

            <div class="hidden tablet:block">
              <img src="@/assets/img/personal-on-school/con02/level-p.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
