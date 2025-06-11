<script setup>
import { onMounted, reactive, ref, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import { useStore } from "@/stores/index";

const store = useStore();
const router = useRouter();

const confirmForm = ref({});
const registrationForm = ref({});

const courseData = ref({
  code: "",
  courseType: "",
  languageCode: "",
  level: "",
  program: "",
  programDetailCourseType: "",
  programDetailCode: "",
  course: "",
  isCreativeWritingEssay: false,
  durationMonths: 0,
  preferredStartDate: "",
  frequencyPerWeek: 0,
  sessionMinutes: 0,
  schedule: [],
  preferredTimeFirst: "",
  preferredTimeSecond: "",
  referrer: "",
  levelName: "",
  programDetailName: "",
  courseName: "",
  languageName: "",
  idx: 0,
  discountPrice: 0,
  monthPrice: 0,
  totalPrice: 0,
  bankPayName: "",
  bankPayDate: "",
  merchantUid: "",
  uid: "",
  kname: "",
  mobile: "",
  payName: "",
  payDate: "",
  payType: "",
});

onMounted(() => {
  courseData.value = { ...courseData.value, ...JSON.parse(sessionStorage.getItem("courseRegistrationData")) };
  console.log("courseData.value", courseData.value);
});

onUnmounted(() => {
  //디버깅시 주석처리.
  sessionStorage.removeItem("courseRegistrationData");
});

const pageMove = reactive({
  // 홈
  goToMain() {
    router.push({ path: "/" });
  },
});
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div class="pt-[130px] pb-[122px] pc:pt-[220px] pc:pb-[178px]">
        <div class="w-full px-5 mx-auto pc:max-w-[720px] pc:px-0">
          <p
            class="text-[34px] leading-[40px] text-[#18181B] text-center font-bold mb-8 pc:text-[40px] pc:leading-none pc:mb-[62px]"
          >
            수강신청이 <br class="pc:hidden" /><span class="text-[#FF9016]">완료</span> 되었습니다.
          </p>

          <ul class="flex justify-center gap-1 mb-[42px] pc:gap-3.5 pc:mb-10">
            <li
              v-if="courseData.courseName"
              class="text-sm text-[#374151] font-bold bg-[#F3F4F6] px-4 py-2.5 rounded-full pc:text-lg pc:px-6 pc:py-4 pc:rounded-[20px]"
            >
              {{ courseData.courseName }}
            </li>

            <li
              v-if="courseData.languageName"
              class="text-sm text-[#374151] font-bold bg-[#F3F4F6] px-4 py-2.5 rounded-full pc:text-lg pc:px-6 pc:py-4 pc:rounded-[20px]"
            >
              {{ courseData.languageName }}
            </li>

            <li
              v-if="courseData.levelName"
              class="text-sm text-[#374151] font-bold bg-[#F3F4F6] px-4 py-2.5 rounded-full pc:text-lg pc:px-6 pc:py-4 pc:rounded-[20px]"
            >
              {{ courseData.levelName }}
            </li>
          </ul>

          <ul class="border-t-2 border-solid border-[#18181B] mb-10 pc:mb-14">
            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">수업 과정</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.languageName }} / {{ courseData.courseName }}</p>
            </li>

            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">수업 교재</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.programDetailName || "-" }}</p>
            </li>
            <li
              v-if="courseData.courseType != 'group'"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">희망 수업 시작일</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.preferredStartDate || "-" }}</p>
            </li>
            <li
              v-if="courseData.courseType != 'group'"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">희망 수업 시간</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.preferredTimeFirst }} / {{ courseData.preferredTimeSecond }}</p>
            </li>
            <li
              v-else
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">희망 수업 시간</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.groupSchedule }}</p>
            </li>
          </ul>

          <ul class="border-t-2 border-solid border-[#18181B] mb-10 pc:mb-14" v-if="courseData.payType === '무통장입금'">
            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">입금은행</p>

              <p class="text-[#6B7280] pc:text-lg">우리은행</p>
            </li>

            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">예금주</p>

              <p class="text-[#6B7280] pc:text-lg">(주)캐럿솔루션즈</p>
            </li>

            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">입금계좌</p>

              <p class="text-[#6B7280] pc:text-lg">1005-404-222447</p>
            </li>

            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">신청자명</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.bankPayName }}</p>
            </li>

            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">입금 예정일</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData.bankPayDate }}</p>
            </li>
          </ul>

          <div class="px-4 py-5 bg-[#F3F4F6] mb-10 rounded-xl pc:px-[26px] pc:py-[30px] pc:mb-[70px]">
            <p class="text-sm text-[#374151] mb-5 pc:text-base">
              당근영어를 신청해 주셔서 감사합니다.<br />
              입금 확인 후 담당매니저를 통해 곧 연락 드리겠습니다.<br />
              (월~금 AM9:00~PM6:00)
            </p>

            <p class="text-sm text-[#6B7280] pc:text-base">※ 주말 및 공휴일의 경우 순차적으로 평일 날 연락드리겠습니다.</p>
          </div>

          <div class="flex justify-center">
            <p
              @click="pageMove.goToMain"
              class="w-full text-[#374151] text-center font-medium border border-solid border-[#D1D5DB] py-4 rounded-xl cursor-pointer pc:w-auto pc:text-lg pc:px-11 pc:py-5"
            >
              홈으로 가기
            </p>
          </div>
        </div>
      </div>
    </main>

    <!-- 무통장 모달 -->
    <div class="fixed inset-0 z-20 hidden overflow-y-auto bg-zinc-900/70">
      <div class="pt-[46px] px-5 pb-[60px] max-w-[500px] mx-auto">
        <div class="flex justify-end mb-2.5">
          <img @click="('닫기')" src="@/assets/img/common/close-white.png" alt="icon" class="w-3.5 cursor-pointer" />
        </div>

        <div class="overflow-hidden bg-white pc:pt-[52px] pc:px-[26px] pc:pb-10 pc:rounded-2xl">
          <p class="text-[#18181B] text-center font-bold pc:text-2xl pc:mb-[26px]">무통장 입금 안내</p>

          <p class="text-[#374151] text-center pc:text-base pc:mb-[30px]">
            우리은행 | 예금주: ㈜캐럿솔루션즈<br />
            입금계좌: 1005-404-222447
          </p>

          <ul class="bg-[#F3F4F6] pc:px-8 pc:py-[30px] pc:rounded-xl pc:space-y-[18px] pc:mb-6">
            <li class="pc:space-y-1.5">
              <p class="text-[#374151] pc:text-sm pc:pl-2">입금자명</p>

              <div>
                <input
                  type="text"
                  class="border border-solid border-[#E5E7EB] placeholder:text-[#B6BAC3] pc:p-4 pc:rounded-xl"
                  placeholder="입금자명을 입력해주세요"
                />
              </div>
            </li>

            <li class="pc:space-y-1.5">
              <p class="text-[#374151] pc:text-sm pc:pl-2">입금예정일</p>

              <div>
                <vue-tailwind-datepicker v-model="dateValue" overlay as-single class="custom-picker" />
              </div>
            </li>
          </ul>

          <p
            @click="('결제')"
            class="font-medium text-center text-white bg-[#FF9016] cursor-pointer pc:text-base pc:py-4 pc:rounded-xl"
          >
            결제하기
          </p>
        </div>
      </div>
    </div>

    <compFooter />
  </div>
</template>
<style scoped lang="scss">
:deep(.custom-picker) {
  > label {
    display: flex;
    align-items: center;
    gap: 22px;
    padding: 16px;
    background-color: #fff;

    @media screen and (min-width: 1000px) {
      border-radius: 12px;
    }

    > input {
      width: 100%;
      border: 0;
      padding: 0;
    }

    > div {
      flex: none;
      position: relative;
      inset: unset;

      > button {
        padding: 0;
        margin: 0;
        width: 20px;
        height: 20px;
        background: url(@/assets/img/course-register/calendar.png) no-repeat center / contain;

        svg {
          display: none;
        }
      }
    }
  }

  > div {
    > div {
      top: unset;
      bottom: -34px;
      right: unset;
      left: 4px;
      margin: 0;
      box-shadow: 0 3px 15px rgba($color: #000, $alpha: 0.2);
      overflow: hidden;

      @media screen and (min-width: 1000px) {
        border-radius: 20px;
      }

      > div {
        > div {
          &::before {
            display: none;
          }
        }
      }
    }
  }
}
</style>
