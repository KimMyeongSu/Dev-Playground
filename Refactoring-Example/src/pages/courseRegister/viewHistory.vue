<script setup>
import { reactive, ref, onMounted, computed } from "vue";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";

import { useStore } from "@/stores/index";
import { useRouter } from "vue-router";
import axios, { targetUrl } from "@/plugins/axios";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const url = window.location.origin;
const store = useStore();
const router = useRouter();

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

const PORTONE_INFO = {
  CARD: {
    PG: "카드",
    PARAMS: {
      pg: "kicc.IM000106", // 테스트 : T5102001
      pay_method: "card",
      merchant_uid: "",
      notice_url: `${targetUrl}junior/sugang/course/apply/webhook`,
    },
  },
  NAVERPAY: {
    PG: "네이버페이",
    PARAMS: {
      pg: "naverpay.np_uxyfs546614",
      merchant_uid: "",
      channelKey: "channel-key-a070c07c-8303-4d17-90f6-b7960a7e0e5b",
      m_redirect_url: `${window.location.href}`,
      naverChainId: "MVBYQ0VlQ0liVXo",
      naverProducts: [
        {
          categoryType: "PRODUCT",
          categoryId: "DIGITAL_CONTENT",
          uid: "",
          name: "",
          count: 1,
        },
      ],
    },
  },
  KAKAOPAY: {
    PG: "카카오페이",
    PARAMS: {
      pg: "kakaopay.CABHTHINDW", //CAZDNXNA6K, CABHTHINDW, CABD66VZM5, CT09973764
      pay_method: "card",
      merchant_uid: "",
    },
  },
};
const getParams = (merchantUid) => {
  const payType = courseData.value.payType;
  const selectedParams = Object.values(PORTONE_INFO).find((type) => type.PG === payType);

  const params = {
    name: `${courseData.value.languageName}/${courseData.value.courseName}`,
    tax_free: courseData.value.totalPrice,
    amount: courseData.value.totalPrice,
    /*     tax_free: 1000,
    amount: 1000, */
    buyer_email: courseData.value.uid,
    buyer_name: courseData.value.kname,
    buyer_tel: courseData.value.mobile,
    merchant_uid: courseData.value.merchantUid,
    ...selectedParams.PARAMS,
  };
  if (PORTONE_INFO.NAVERPAY.PG === payType) {
    params.naverProducts[0].uid = courseData.value.merchantUid;
    params.naverProducts[0].name = params.name;
  }

  params.merchant_uid = merchantUid;

  console.log("params", params);

  return params;
};

const isLoading = ref(false);

const executePayment = async (payType) => {
  try {
    //무통장입금이 아닌경우에는 포트원으로 결제를 진행하고,
    //무통장입금으로 진행하는 경우에는 checkPaymentInfo 함수의 결과에 따라 결제를 완료처리한다.
    isLoading.value = true;
    const resultData = await checkPaymentInfo(payType);
    console.log("executePayment.resultData", resultData);

    if (payType !== "무통장입금") {
      courseData.value.merchantUid = resultData.merchantUid;
      courseData.value.uid = resultData.uid;
      courseData.value.kname = resultData.kname;
      courseData.value.mobile = resultData.mobile;

      console.log("executePayment.resultData", resultData);
      const paymentInfo = await requestPayment(resultData.merchantUid);

      if (paymentInfo) {
        await confirmPaymentInfo(resultData.merchantUid, paymentInfo.imp_uid, paymentInfo.status);
      }
    } else {
      router.push({ path: "/courseRegister/registerOk" });
    }
  } catch (err) {
  } finally {
    isLoading.value = false;
  }
};

const checkPaymentInfo = async (payType) => {
  courseData.value.payName = "";
  courseData.value.payDate = "";
  courseData.value.payType = payType;

  const savedData = sessionStorage.getItem("courseRegistrationData");
  if (savedData) {
    const parsedData = { ...JSON.parse(savedData), ...courseData.value };
    sessionStorage.setItem("courseRegistrationData", JSON.stringify(parsedData));
  }

  try {
    try {
      const { data } = await axios.post("/junior/sugang/course/apply/start", courseData.value);

      if (data.success) {
        console.log("checkPaymentInfo", data.data);
        return data.data;
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      throw new Error(err.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const requestPayment = async (merchantUid) => {
  console.log("requestPayment merchantUid : ", merchantUid);
  const IMP = window.IMP;
  if (!IMP || !merchantUid) throw new Error("결제할 수 없습니다.");

  IMP.init("imp28895051");

  try {
    const params = getParams(merchantUid);

    return await new Promise((resolve, reject) => {
      IMP.request_pay(params, (res) => {
        if (res.success) {
          resolve(res);
        } else {
          alert("결제가 취소되었습니다.");
          reject(new Error(res.error_msg));
        }
      });
    });
  } catch (err) {
    throw new Error(err.message);
  }
};

const confirmPaymentInfo = async (merchantUid, impUid, status = "paid") => {
  if (!impUid || !merchantUid) throw new Error("결제 내용 확인에 실패했습니다.");
  const params = {
    imp_uid: impUid,
    merchant_uid: merchantUid,
    status: status,
  };

  try {
    const { data } = await axios.post("/junior/sugang/course/apply/confirm", params);

    if (data.success) {
      router.push({ path: "/courseRegister/registerOk" });
    } else {
      throw new Error(data.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const showBankModal = ref(false);
const toggleBankModal = () => {
  showBankModal.value = !showBankModal.value;
};

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

onMounted(async () => {
  courseData.value = { ...courseData.value, ...JSON.parse(sessionStorage.getItem("courseRegistrationData")) };

  if (router.currentRoute.value.query?.imp_success === "true") {
    const { imp_uid, merchant_uid } = router.currentRoute.value.query;
    if (imp_uid && merchant_uid) {
      try {
        await confirmPaymentInfo(merchant_uid, imp_uid);
      } catch (err) {
        console.error("결제 확인 중 오류 발생:", err);
        alert("결제 확인 중 오류가 발생했습니다. 관리자에게 문의해주세요.");
      }
    } else {
      router.push({ path: "/courseRegister/registerOk" });
    }
  }
});
</script>
<template>
  <div>
    <compHeader />

    <!-- 로딩 오버레이 -->
    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white rounded-lg p-5 flex flex-col items-center">
        <font-awesome-icon :icon="['fas', 'spinner']" class="text-[#FF9016] text-3xl animate-spin" />
        <p class="mt-3 text-gray-700">결제를 진행하고있어요...</p>
      </div>
    </div>

    <main>
      <div class="pt-[60px] pb-[122px] pc:pt-[100px] pc:pb-[178px]">
        <div class="w-full px-5 mx-auto pc:max-w-[720px] pc:px-0">
          <p class="text-[34px] leading-[40px] text-[#18181B] text-center font-bold mb-8 pc:text-[40px] pc:mb-[62px]">
            수강신청 내역보기
          </p>

          <ul class="flex justify-center gap-1 mb-[42px] pc:gap-3.5 pc:mb-10">
            <li
              class="text-sm text-[#FF9016] font-bold bg-[#FFF3DB] px-4 py-2.5 rounded-full pc:text-lg pc:px-6 pc:py-4 pc:rounded-[20px]"
            >
              {{ courseData?.courseName }}
            </li>

            <li
              class="text-sm text-[#FF9016] font-bold bg-[#FFF3DB] px-4 py-2.5 rounded-full pc:text-lg pc:px-6 pc:py-4 pc:rounded-[20px]"
            >
              {{ courseData?.languageName }}
            </li>
          </ul>

          <ul class="border-t-2 border-solid border-[#18181B]">
            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">수업 과정</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData?.levelName }}</p>
            </li>

            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">수업 교재</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData?.programDetailName }}</p>
            </li>

            <li
              v-if="courseData?.durationMonths"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">수업 기간</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData?.durationMonths }}개월</p>
            </li>
            <li
              v-if="courseData?.frequencyPerWeek && courseData?.sessionMinutes"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">수업 횟수/분수</p>

              <p class="text-[#6B7280] pc:text-lg">
                주 {{ courseData?.frequencyPerWeek + "회" }} {{ " | " + courseData?.sessionMinutes }}분
              </p>
            </li>

            <li
              v-if="courseData.courseType != 'group'"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">희망 수업 시작일</p>

              <p class="text-[#6B7280] pc:text-lg">{{ courseData?.preferredStartDate }}</p>
            </li>

            <li
              v-if="courseData.courseType != 'group'"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">희망 수업 시간</p>

              <p class="text-[#6B7280] pc:text-lg">
                {{ courseData?.preferredTimeFirst + " / " + courseData?.preferredTimeSecond }}
              </p>
            </li>
            <li
              v-else
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">희망 수업 시간</p>

              <p class="text-[#6B7280] pc:text-lg">
                {{ courseData?.groupSchedule }}
              </p>
            </li>
          </ul>

          <ul class="border-t-2 border-solid border-[#18181B] mb-10 pc:mb-14">
            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-medium pc:text-lg">월 금액</p>

              <p class="text-[#6B7280] pc:text-lg">{{ formatNumber(courseData?.monthPrice) }}</p>
            </li>
            <li
              v-if="courseData?.discountPrice"
              class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]"
            >
              <p class="text-[#18181B] font-medium pc:text-lg">할인 금액</p>

              <p class="text-[#6B7280] pc:text-lg">{{ formatNumber(courseData?.discountPrice) }}</p>
            </li>
            <li class="flex justify-between items-center border-b border-solid border-[#E5E7EB] px-2.5 py-[18px] pc:py-[22px]">
              <p class="text-[#18181B] font-bold pc:text-lg">총 결제 금액</p>

              <p class="text-[#FB3932] font-bold pc:text-lg">
                {{ formatNumber(courseData?.totalPrice) }}
              </p>
            </li>
          </ul>

          <ul class="grid grid-cols-1 gap-3 pc:grid-cols-2 pc:gap-x-7 pc:gap-y-[22px]">
            <li
              @click="toggleBankModal()"
              class="text-[#374151] text-center font-medium border border-solid border-[#D1D5DB] py-4 rounded-xl cursor-pointer pc:text-[22px] pc:py-6 pc:rounded-[20px]"
            >
              무통장 입금
            </li>

            <li
              @click="executePayment(PORTONE_INFO.CARD.PG)"
              class="text-[#374151] text-center font-medium border border-solid border-[#D1D5DB] py-4 rounded-xl cursor-pointer pc:text-[22px] pc:py-6 pc:rounded-[20px]"
            >
              카드결제
            </li>

            <li
              @click="executePayment(PORTONE_INFO.NAVERPAY.PG)"
              class="flex justify-center items-center bg-[#01DE5A] py-4 rounded-xl cursor-pointer pc:gap-2 pc:py-6 pc:rounded-[20px]"
            >
              <img src="@/assets/img/course-register/pay-n.png" alt="icon" class="w-[54px] pc:w-[74px]" />

              <p class="text-[#374151] font-medium pc:text-[22px]">결제하기</p>
            </li>

            <li
              @click="executePayment(PORTONE_INFO.KAKAOPAY.PG)"
              class="flex justify-center items-center bg-[#FFEB00] py-4 rounded-xl cursor-pointer pc:gap-2 pc:py-6 pc:rounded-[20px]"
            >
              <img src="@/assets/img/course-register/pay-k.png" alt="icon" class="w-12 pc:w-[74px]" />

              <p class="text-[#374151] font-medium pc:text-[22px]">결제하기</p>
            </li>
          </ul>
        </div>
      </div>
    </main>

    <!-- 무통장 입금 모달 -->
    <div v-if="showBankModal" class="fixed inset-0 z-20 overflow-y-auto bg-zinc-900/70">
      <div @click.stop class="pt-[46px] px-5 pb-[60px] mx-auto max-w-[500px]">
        <div class="flex justify-end mb-2.5">
          <img @click="toggleBankModal()" src="@/assets/img/common/close-white.png" alt="icon" class="w-3.5 cursor-pointer" />
        </div>

        <div class="overflow-hidden bg-white pt-12 px-3.5 pb-[26px] rounded-2xl pc:pt-[52px] pc:px-[26px] pc:pb-10">
          <p class="text-xl text-[#18181B] text-center font-bold mb-3 pc:text-2xl pc:mb-[26px]">무통장 입금 안내</p>

          <p class="text-sm text-[#374151] text-center mb-[30px] pc:text-base">
            우리은행 | 예금주: ㈜캐럿솔루션즈<br />
            입금계좌: 1005-404-222447
          </p>

          <ul class="bg-[#F3F4F6] px-4 py-5 rounded-xl mb-8 space-y-[18px] pc:px-8 pc:py-[30px] pc:mb-6">
            <li class="space-y-1.5">
              <p class="text-xs text-[#374151] pl-2 pc:text-sm">입금자명</p>

              <div>
                <input
                  v-model="courseData.bankPayName"
                  type="text"
                  class="border border-solid border-[#E5E7EB] p-4 rounded-xl placeholder:text-[#B6BAC3]"
                  placeholder="입금자명을 입력해주세요"
                />
              </div>
            </li>

            <li class="space-y-1.5">
              <p class="text-xs text-[#374151] pl-2 pc:text-sm">입금예정일</p>

              <div>
                <input
                  type="date"
                  v-model="courseData.bankPayDate"
                  class="p-4 border border-solid border-[#E4E6EA] rounded-xl cursor-pointer"
                />
              </div>
            </li>
          </ul>

          <p
            @click="executePayment('무통장입금')"
            class="text-center font-medium py-4 rounded-xl cursor-pointer"
            :class="true ? 'bg-[#FF9016] text-white ' : 'bg-[#555555] text-[#9A9B9A] pointer-events-none'"
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
    border-radius: 12px;

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
