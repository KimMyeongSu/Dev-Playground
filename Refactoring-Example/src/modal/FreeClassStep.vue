<script setup="setup">
defineProps({
  closeModal: {
    type: Function,
    required: true,
  },
});
</script>
<template>
  <div @click="closeModal('isProceed')" class="fixed inset-0 z-20 overflow-y-auto bg-[#18181B]/70">
    <div class="px-5 pt-[90px] pb-[60px] max-w-[504px] mx-auto pc:pt-[114px]" @click.stop>
      <div class="flex justify-end mb-2.5">
        <img @click="closeModal('isProceed')" src="@/assets/img/common/close-white.png" alt="icon" class="w-3.5 cursor-pointer" />
      </div>

      <p class="text-sm font-medium text-center text-white bg-[#FF9016] py-4 rounded-t-2xl pc:text-xl pc:py-[18px]">
        당근영어 One-Step 무료수업
      </p>

      <div class="pt-8 pb-4 px-3.5 bg-white rounded-b-2xl pc:pt-10 pc:pb-[26px] pc:px-[26px]">
        <p class="text-xl font-bold text-center mb-3 pc:text-2xl pc:mb-2.5">무료수업은 어떻게 진행되나요?</p>

        <p class="text-sm text-center text-[#374151] mb-5 pc:text-base pc:mb-7">
          복잡하고 어려운 수강 신청은 NO!<br />
          무료수업으로 오늘부터 시작하세요!
        </p>

        <div class="bg-gray-100 rounded-xl px-4 py-[22px] pc:px-[26px] pc:py-[34px] pc:rounded-[16px]">
          <ul class="space-y-2.5 pc:space-y-3.5">
            <li class="flex gap-4 pc:gap-3.5">
              <div class="flex flex-col space-y-2">
                <div class="flex-none flex justify-center items-center size-[22px] pc:size-6 bg-[#8B95A1] rounded-full">
                  <p class="text-xs font-medium text-white pc:text-base">1</p>
                </div>

                <div class="w-px h-full mx-auto bg-gray-300"></div>
              </div>

              <div class="space-y-1.5 pb-2.5 pc:space-y-2.5 pc:pb-[18px]">
                <p class="font-bold text-[#374151] pc:text-lg">안내 알림톡 확인</p>

                <p class="text-sm text-[#8B95A1]">무료수업 신청 후 발송되는 안내 알림톡을 확인해주세요.</p>
              </div>
            </li>

            <li class="flex gap-4 pc:gap-3.5">
              <div class="flex flex-col space-y-2">
                <div class="flex-none flex justify-center items-center size-[22px] pc:size-6 bg-[#8B95A1] rounded-full">
                  <p class="text-xs font-medium text-white pc:text-base">2</p>
                </div>

                <div class="w-px h-full mx-auto bg-gray-300"></div>
              </div>

              <div class="space-y-1.5 pb-2.5 pc:space-y-2.5 pc:pb-[18px]">
                <p class="font-bold text-[#374151] pc:text-lg">무료 수업 참여</p>

                <p class="text-sm text-[#8B95A1]">원어민 강사님과 함께 하는 10분 무료 수업에 참여해주세요.</p>
              </div>
            </li>

            <li class="flex gap-4 pc:gap-3.5">
              <div class="flex flex-col space-y-2">
                <div class="flex-none flex justify-center items-center size-[22px] pc:size-6 bg-[#8B95A1] rounded-full">
                  <p class="text-xs font-medium text-white pc:text-base">3</p>
                </div>

                <div class="w-px h-full mx-auto bg-gray-300"></div>
              </div>

              <div class="space-y-1.5 pb-2.5 pc:space-y-2.5 pc:pb-[18px]">
                <p class="font-bold text-[#374151] pc:text-lg">1:1 상담</p>

                <p class="text-sm text-[#8B95A1]">체계적인 평가서를 토대로 전담매니저와 1:1 상담을 합니다.</p>
              </div>
            </li>

            <li class="flex gap-4 pc:gap-3.5">
              <div class="flex flex-col space-y-2">
                <div class="flex-none flex justify-center items-center size-[22px] pc:size-6 bg-[#FF9016] rounded-full">
                  <p class="text-xs font-medium text-white pc:text-base">4</p>
                </div>
              </div>

              <div class="space-y-1.5 pc:space-y-2.5">
                <p class="font-bold text-[#374151] pc:text-lg">스피킹 수업 시작!</p>

                <p class="text-sm text-[#8B95A1]">레벨과 관심사에 맞춘 스피킹 수업을 시작합니다.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped="scoped"></style>
