<script setup>
import { reactive, onMounted, computed } from "vue";
const props = defineProps({
  applicationInfo: {
    type: Object,
    required: true,
  },
  priceInfo: {
    type: Object,
    required: true,
  },
  isAllFieldsFilled: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["onClickApply", "onClickchkValid"]);

const formatNumber = (number) => {
  if (!number) return;
  const parts = number.toString().split("");
  const result = [];

  for (let i = parts.length - 1, count = 0; i >= 0; i--, count++) {
    if (count > 0 && count % 3 === 0) {
      result.unshift(",");
    }
    result.unshift(parts[i]);
  }
  return result.join("") + "원";
};

const applicationInfo = computed(() => props.applicationInfo);
const priceInfo = computed(() => props.priceInfo);
const isAllFieldsFilled = computed(() => props.isAllFieldsFilled);
</script>

<template>
  <div class="hidden pc:block pc:flex-none pc:w-[370px]">
    <div class="sticky top-[160px]">
      <div class="border border-solid border-[#E4E6EA] border-b-0 rounded-t-2xl pt-[30px] px-[22px] pb-6">
        <p class="text-[22px] text-[#18181B] font-semibold border-b border-solid border-[#D1D5DB] px-1.5 pb-4 mb-[18px]">
          신청 내역
        </p>

        <ul class="flex gap-1.5 mb-4">
          <li
            v-if="applicationInfo.code"
            class="text-[#FF9016] text-base leading-tight px-3.5 py-1.5 bg-[#FFF9F2] border border-solid border-[#FFE8CE] rounded-full"
          >
            {{
              applicationInfo.code === "group_video"
                ? "소그룹 화상"
                : applicationInfo.code === "personal_video"
                ? "퍼스널(1:1) 화상"
                : "퍼스널(1:1) 전화"
            }}
          </li>
          <li
            v-if="applicationInfo.languageCode"
            class="text-[#FF9016] text-base leading-tight px-3.5 py-1.5 bg-[#FFF9F2] border border-solid border-[#FFE8CE] rounded-full"
          >
            {{
              applicationInfo.languageCode === "english_us_canada"
                ? "영어(미국/캐나다)"
                : applicationInfo.languageCode === "english_philippines"
                ? "영어(필리핀)"
                : "중국어"
            }}
          </li>
        </ul>

        <ul class="divide-y divide-solid divide-[#E4E6EA] gap-4 mb-8">
          <li v-if="applicationInfo.code" class="px-1 flex gap-4 mb-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">수업 과정</p>

            <p v-if="applicationInfo.levelName">
              {{ applicationInfo.levelName }}<br />
              {{ applicationInfo.programDetailName }}
            </p>
            <p v-else>선택해 주세요</p>
          </li>

          <li class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">수업 기간</p>

            <p v-if="applicationInfo.durationMonths">{{ applicationInfo.durationMonths }}개월</p>
            <p v-else>선택해 주세요</p>
          </li>

          <li v-if="applicationInfo.groupSchedule" class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">수업 스케쥴</p>
            <p>{{ applicationInfo.groupSchedule }}</p>
          </li>

          <li v-if="applicationInfo.code !== 'group_video'" class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">수업횟수/분수</p>

            <p v-if="applicationInfo.frequencyPerWeek">
              주 {{ applicationInfo.frequencyPerWeek + "회" }} {{ " | " + applicationInfo.sessionMinutes }}분
            </p>
            <p v-else>선택해 주세요</p>
          </li>

          <li v-if="applicationInfo.code !== 'group_video'" class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">수업 스케쥴</p>

            <p v-if="applicationInfo.preferredStartDate">
              {{ applicationInfo.preferredStartDate }}
              <span v-if="applicationInfo.preferredTimeFirst">{{ " | " + applicationInfo.preferredTimeFirst }}</span>
              <span v-if="applicationInfo.preferredTimeSecond">{{ " / " + applicationInfo.preferredTimeSecond }}</span>
            </p>
            <p v-else-if="applicationInfo.groupSchedule">{{ applicationInfo.groupSchedule }}</p>
            <p v-else>선택해 주세요</p>
          </li>

          <li class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">총 할인금액</p>

            <p v-if="priceInfo.discountPrice">{{ formatNumber(priceInfo.discountPrice) }}</p>
            <p v-else>-</p>
          </li>

          <li class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#A1A3A8] flex-none w-[90px]">월 금액</p>

            <p v-if="priceInfo.monthPrice">{{ formatNumber(priceInfo.monthPrice) }}</p>
            <p v-else>-</p>
          </li>

          <li class="px-1 flex gap-4 mb-4 pt-4">
            <p class="text-[#FF4A36] flex-none w-[90px]">총 결제금액</p>

            <p v-if="priceInfo.totalPrice" class="text-xl text-[#FF4A36] font-semibold leading-tight">
              {{ formatNumber(priceInfo.totalPrice) }}
            </p>
            <p v-else class="text-xl text-[#FF4A36] font-semibold leading-tight">-</p>
          </li>
        </ul>

        <p class="text-sm text-[#A1A3A8]">※ 자세한 수업일정은 수강신청 완료 후 담당 매니저가 전화 연락 드리도록 하겠습니다.</p>
      </div>

      <p
        v-if="isAllFieldsFilled"
        @click="emit('onClickApply')"
        class="text-xl text-white text-center font-medium py-5 rounded-b-2xl bg-[#FF9016] cursor-pointer"
      >
        수강 신청하기
      </p>
      <p
        v-else
        @click="emit('onClickchkValid')"
        class="text-xl text-[#A1A3A8] text-center font-medium py-5 rounded-b-2xl bg-[#D1D4D8]"
      >
        수강 신청하기
      </p>
    </div>
  </div>
</template>
