<script setup="setup">
defineProps({
  closeModal: {
    type: Function,
    required: true,
  },
});
</script>

<template>
  <div class="fixed inset-0 z-20 overflow-y-auto bg-zinc-900/70" @click="closeModal('isTip')">
    <div class="px-5 pt-[90px] pb-[60px] max-w-[504px] mx-auto pc:pt-[114px]" @click.stop>
      <div class="flex justify-end mb-2.5">
        <img @click="closeModal('isTip')" src="@/assets/img/common/close-white.png" alt="icon" class="w-3.5 cursor-pointer" />
      </div>

      <div
        class="pt-[60px] overflow-hidden bg-white bg-[url(@/assets/img/free-class/free-bg.png)] bg-no-repeat bg-top bg-[length:100%_200px] rounded-2xl"
      >
        <div class="w-[88px] mx-auto rounded-[28px] overflow-hidden shadow-[2px_9px_11px_rgba(169,80,0,0.15)] mb-[18px]">
          <img src="@/assets/img/free-class/icon.png" alt="icon" />
        </div>

        <p class="text-xl font-bold text-center mb-3 pc:text-[26px] pc:mb-2.5">무료수업 꿀팁!</p>

        <p class="text-sm text-center text-gray-500 mb-[30px] pc:text-base pc:mb-6">원어민 강사님을 만나기 전에 준비해 보아요!</p>

        <div class="px-4 pb-8">
          <ul class="border-t border-gray-100 border-solid">
            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">다시 말씀해 주시겠어요?</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">Could you please say that again?</p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">천천히 말씀해 주시겠어요?</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">Please speak slowly for me. I can't catch you.</p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">크게 말씀해 주시겠어요?</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">
                  I can't hear you well, please speak a little bit louder question.
                </p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">다른 질문을 해주세요.</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">please give me another question.</p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">쉬운 문장으로 말씀해주세요.</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">Could you please use simple words for me?</p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">제 대답이 맞나요? 맞는 표현을 알려주세요!</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">Is my sentence right? please tell me right answer.</p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">그 단어 뜻이 뭐죠?</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">What is the meaning of ________ ?</p>
              </div>
            </li>

            <li class="px-2 py-3.5 border-b border-gray-100 border-solid space-y-1.5 pc:space-y-2">
              <div class="flex items-center gap-1.5 pc:gap-2">
                <img src="@/assets/img/free-class/bubble.png" alt="icon" class="w-4 pc:w-5" />

                <p class="text-sm text-[#FF9016] font-medium pc:text-base">영어로 어떻게 표현해야 할지 모르겠습니다.</p>
              </div>

              <div class="flex items-center gap-1.5 pc:gap-2">
                <div class="w-4 pc:w-5"></div>

                <p class="text-sm text-gray-700 pc:text-base">I can't express in English.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped="scoped"></style>
