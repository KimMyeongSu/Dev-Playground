<script setup>
import { useHead } from "@vueuse/head";
import { reactive, onMounted, watch, ref, computed } from "vue";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import FreeClassTip from "@/modal/FreeClassTip.vue";
import FreeClassStep from "@/modal/FreeClassStep.vue";
import { useStore } from "@/stores";
import { useRouter } from "vue-router";
import axios from "@/plugins/axios";
import agreeText from "@/assets/ts/agreeText";

useHead({
  title: "당근영어 주니어",
  meta: [
    { name: "title", content: "당근영어 주니어 | 무료수업신청" },
    {
      name: "description",
      content:
        "23년 전통 미국·캐나다 주니어 1:1 화상영어! 체계적이고 전문적인 전문 원어민 강사님과 함께 거니는 영어 회화 자신감!",
    },
    { name: "keywords", content: "화상영어, 전화영어, 영어회화, 원어민영어, 주니어영어, 어린이영어, 당근영어, 당근영어 주니어" },
    { name: "robots", content: "noindex, nofollow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "당근영어 주니어 | 무료수업신청" },
    {
      property: "og:description",
      content:
        "23년 전통 미국·캐나다 주니어 1:1 화상영어! 체계적이고 전문적인 전문 원어민 강사님과 함께 거니는 영어 회화 자신감!",
    },
    { property: "og:url", content: "https://carrotjunior.kr/freeClass" },
  ],
});

const router = useRouter();

const isAgree = ref(false);
const userInfo = ref({});
const store = useStore();
const STATE = Object.freeze({
  NOT_AVAILABLE: "N",
  AVAILABLE: "Y",
  SELECTED: "S",
});

const LEVELS = Object.freeze({
  BEGINNER: {
    KR: "입문",
    DESCRIPTION: "영어로 말하기\n어려워요",
  },
  BASIC: {
    KR: "초급",
    DESCRIPTION: "단어만 사용해서\n말할 수 있어요",
  },
  MEDIUM: {
    KR: "중급",
    DESCRIPTION: "간단한 문장으로\n말할 수 있어요",
  },
  EXPERT: {
    KR: "고급",
    DESCRIPTION: "자유롭게 생각을\n표현할 수 있어요",
  },
});

const toggleAgreeModal = () => {
  isAgree.value = !isAgree.value;
};

const modal = reactive({
  isProceed: false,
  isTip: false,
  toggleModalState: (item) => {
    modal[item] = !modal[item];
  },
});

const textAgree = agreeText;

const isMobile = () => {
  const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent);
  const isSmallScreen = window.innerWidth < 768;

  if (isMobileDevice || isSmallScreen) return "Mobile";

  return "Web";
};

const freeClassForm = reactive({
  lecType: "V",
  mTypeSub: "",
  language: "English",
  level: "초급",
  route: isMobile(),
  route2: "",
  meetingDate: "PM",
  recommender: "",
  setDate: "",
  setTime: "",

  //로그인 로직을 제외 시키면서 추가 된 항목
  email: "",
  kname: "",
  ename: "",
  mobile: "",
  mobileCounsel: "",

  clickLecType: (lecType) => {
    freeClassForm.lecType = lecType;
  },

  clickLanguage: (language) => {
    freeClassForm.language = language;
  },

  clickLevel: (level) => {
    freeClassForm.level = level;
  },

  clickTime: (time) => {
    freeClassForm.meetingDate = time;
  },

  clickRecommend: (recommend) => {
    freeClassForm.route2 = recommend;
  },

  copyMobile: () => {
    freeClassForm.mobileCounsel = JSON.parse(JSON.stringify(freeClassForm.mobile));
  },
});

const levelTestTimes = ref([]);
const getDateStyle = (date) => {
  const selectedDate = freeClassForm.setDate === date;

  return selectedDate
    ? "text-white font-bold bg-[#111111] border-[#D1D5DB] tablet:border-[#E5E7EB]"
    : "text-[#8B95A1] font-medium border-[#D1D5DB] tablet:border-[#E5E7EB]";
};

const getTimeStateStyle = (state) => {
  switch (state) {
    case STATE.NOT_AVAILABLE:
      return `text-[#26292A] border-[#E5E7EB] bg-white tablet:text-[#D1D5DB] tablet:line-through`;
    case STATE.AVAILABLE:
      return `text-[#26292A] border-[#E5E7EB] bg-white tablet:rounded-none`;
    case STATE.SELECTED:
      return `text-[#FF9016] font-medium bg-white border-[#FF9016] tablet:text-white tablet:bg-[#FF9016]`;
  }
};

const getLevelTestAvTime = async (lecType) => {
  const { data } = await axios.get(`/junior/leveltest/getLeveltestAvTime?lecType=${lecType}`);
  return data;
};

const getWeekDay = (dateString) => {
  const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
  const date = new Date(dateString);
  return `(${WEEKDAYS[date.getDay()]})`;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${month}월 ${day}일`;
};

// 시간대 필터링 함수
const filterTimesByType = (times) => {
  if (!times) return [];

  // 전화 상담일 경우 9시부터 표시
  if (freeClassForm.lecType === "P") {
    return times.filter((time) => time.hour >= 9);
  }

  // 화상 상담일 경우 17시부터 표시
  if (freeClassForm.lecType === "V") {
    return times.filter((time) => time.hour >= 17);
  }

  return times;
};

const getSelectedDates = () => {
  const dates = levelTestTimes.value?.dates;
  console.log(levelTestTimes.value?.dates);
  if (!dates) return null;

  // 날짜가 선택되지 않았다면 첫 번째 날짜를 디폴트로 설정
  if (!freeClassForm.setDate && dates.length > 0) {
    freeClassForm.setDate = dates[0].date;
  }

  const selectedDate = dates.find((date) => date.date === freeClassForm.setDate);
  if (!selectedDate) return null;

  return {
    ...selectedDate,
    times: filterTimesByType(selectedDate.times),
  };
};

const initTimeState = () => {
  const [hour] = freeClassForm.setTime.split(":");
  let selectedTime = getSelectedDates().times.find((time) => time.hour == hour);

  selectedTime = selectedTime.minute.map((time) => {
    // NOT_AVAILABLE 상태는 유지
    if (time.state !== STATE.NOT_AVAILABLE) {
      time.state = STATE.AVAILABLE;
    }
    return time;
  });

  freeClassForm.setTime = "";
};

const setDate = (date) => {
  if (freeClassForm.setTime) initTimeState();

  freeClassForm.setDate = date;
};

const setTime = (hour, minute) => {
  if (minute.state === STATE.NOT_AVAILABLE) return;

  if (freeClassForm.setTime) initTimeState();

  freeClassForm.setTime = `${hour}:${minute.min}`;
  minute.state = STATE.SELECTED;
};

const getFreeClassTime = () => {
  const dates = levelTestTimes.value?.dates;

  // dates가 없으면 빈 배열 반환
  if (!dates) {
    return [];
  }
  const index = dates.findIndex((date) => date.date === freeClassForm.setDate);

  if (index === -1) {
    return [];
  }

  const times = dates[index].times;

  return times.flatMap((time) =>
    time.minute
      .filter((minute) => [STATE.AVAILABLE, STATE.SELECTED].includes(minute.state))
      .map((minute) => ({
        hour: time.hour,
        minute: minute,
      }))
  );
};

const isDisabled = computed(() => {
  // 필수 필드 목록 (추천인 제외)
  const requiredFields = [
    "kname", // 한글 이름
    "ename", // 영문 이름
    "mobile", // 무료 수업 받을 연락처
    "mobileCounsel", // 상담 받을 연락처
    "email", // 메일 주소
    "route2", // 당근영어를 알게된 경로
    "isAgree", // 약관 동의
    "lecType", // 수업 유형
    "language", // 수업 언어
    "level", // 수업 레벨
    "meetingDate", // 상담 시간
    "setTime", // 무료수업 시간
  ];
  return requiredFields.some((field) => !freeClassForm[field]);
});

const validateBasicInfo = () => {
  const validationFields = [
    { field: "setTime", label: "무료수업 시간" },
    { field: "kname", label: "한글 이름" },
    { field: "ename", label: "영문 이름" },
    { field: "mobile", label: "무료 수업 받을 연락처" },
    { field: "mobileCounsel", label: "상담 받을 연락처" },
    { field: "email", label: "메일 주소" },
    { field: "route2", label: "당근영어를 알게된 경로" },
    { field: "isAgree", label: "약관 동의" },
  ];

  for (const { field, label } of validationFields) {
    if (!freeClassForm[field]) {
      if (field === "isAgree") {
        alert("약관에 동의해 주세요.");
      } else {
        alert(`${label}을(를) 입력해주세요.`);
      }
      return false;
    }
  }

  // 이메일 형식 검증
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(freeClassForm.email)) {
    alert("올바른 이메일 형식이 아닙니다.");
    return false;
  }

  // 전화번호 형식 검증 (숫자와 하이픈으로 이루어진 10-11자리)
  const phoneRegex = /^\d{3}-\d{3,4}-\d{4}$/;
  if (!phoneRegex.test(freeClassForm.mobile)) {
    alert("올바른 전화번호 형식이 아닙니다. (예: 010-1234-5678)");
    return false;
  }

  if (!phoneRegex.test(freeClassForm.mobileCounsel)) {
    alert("올바른 상담 연락처 형식이 아닙니다. (예: 010-1234-5678)");
    return false;
  }

  return true;
};

const setFreeClassForm = async (params) => {
  if (params.level === "입문") {
    params.level = "왕초보";
  }
  const { data } = await axios.post("/junior/free/leveltest/registerLeveltest", params);
  return data;
};

const onclickFreeClass = async () => {
  if (!validateBasicInfo()) return;

  const result = await setFreeClassForm(freeClassForm);

  if (result.success) {
    alert("무료 수업 신청이 완료되었습니다.");
    router.push({ path: "/home" });
  } else {
    alert(result.message);
  }
};
const formatPhoneNumber = (value) => {
  let formattedValue = value.replace(/[^0-9]/g, "");

  if (formattedValue.length > 3 && formattedValue.length <= 7) {
    formattedValue = formattedValue.slice(0, 3) + "-" + formattedValue.slice(3);
  } else if (formattedValue.length > 7) {
    formattedValue = formattedValue.slice(0, 3) + "-" + formattedValue.slice(3, 7) + "-" + formattedValue.slice(7);
  }

  return formattedValue;
};

const chkDomain = (url) => {
  const allowedDomains = [
    "carrotjunior.kr",
    "www.carrotjunior.kr",
    "carrotjunior.co.kr",
    "www.carrotjunior.co.kr",
    "carrotjr.com",
    "www.carrotjr.com",
    "testpage.carrotjunior.kr",
  ];

  return allowedDomains.some((domain) => url.includes(domain));
};

const openNewWindow = (path) => {
  if (chkDomain(path)) {
    window.location.href = path;
  } else {
    window.open(path, "_blank");
  }
};

watch(
  () => freeClassForm.lecType,
  async () => {
    const result = await getLevelTestAvTime(freeClassForm.lecType);

    if (result.success) {
      levelTestTimes.value = result.data;

      freeClassForm.setTime = "";
      freeClassForm.setDate = "";
    }
  }
);
onMounted(async () => {
  userInfo.value = store.userInfo;
  const result = await getLevelTestAvTime(freeClassForm.lecType);
  if (result.success) {
    levelTestTimes.value = result.data;

    // 첫 번째 날짜 자동 선택
    if (result.data.dates && result.data.dates.length > 0) {
      freeClassForm.setDate = result.data.dates[0].date;
    }
  }
});
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div class="pb-[74px] pc:pb-[156px]">
        <div class="relative">
          <div
            class="py-[52px] bg-[url(@/assets/img/free-class/bg.png)] bg-no-repeat bg-center bg-cover mb-[90px] tablet:py-[50px] tablet:mb-[108px] pc:pt-[60px] pc:pb-[66px] pc:mb-[122px]"
          >
            <p
              class="text-[34px] text-[#18181B] text-center font-bold mb-5 tablet:text-[42px] tablet:mb-[18px] pc:text-[52px] pc:mb-3.5"
            >
              무료수업 신청하기
            </p>

            <div class="flex justify-center">
              <a
                href="/event"
                class="w-fit flex items-center gap-3.5 py-2 pl-4 pr-2.5 border border-solid border-[#757F7F] rounded-full cursor-pointer"
              >
                <p class="flex-none">이벤트 확인하기</p>
                <img src="@/assets/img/free-class/go.png" alt="" class="flex-none w-7" />
              </a>
            </div>
          </div>

          <div class="absolute -bottom-[72px] left-0 w-full flex justify-center">
            <div class="flex justify-center px-[18px] pc:px-0">
              <div class="p-4 w-auto bg-white space-y-3 shadow-[0_3px_15px_rgba(55,65,81,0.13)] rounded-xl pc:space-y-2">
                <div class="flex items-center gap-1 pc:gap-2">
                  <img src="@/assets/img/free-class/fiy.png" alt="icon" class="w-3.5 pc:w-4" />

                  <p class="text-sm text-[#374151] font-medium pc:text-base">잠깐!</p>
                </div>

                <p class="text-sm text-[#6B7280] pc:text-base">
                  <span class="font-bold">공공기관 및 자자체 학습자</span>분들은 안내받은 전용 레벨테스트를 진행해 주세요!
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-center px-[18px] mb-10 pc:hidden">
          <div
            class="grow flex justify-center items-center gap-3.5 border border-solid border-[#E4E6EA] rounded-xl py-3 tablet:max-w-[370px] tablet:py-[18px] tablet:rounded-2xl"
          >
            <div
              @click="modal.toggleModalState('isProceed')"
              class="grow flex justify-center items-center gap-1 tablet:gap-1.5 cursor-pointer tablet:flex-none tablet:w-[168px]"
            >
              <img src="@/assets/img/free-class/icon-method.png" alt="icon" class="w-3.5 tablet:w-5" />

              <p class="text-sm text-[#18181B] font-medium tablet:text-base pc:text-lg">진행방법</p>
            </div>

            <div class="w-px h-5 bg-[#E4E6EA] tablet:h-6"></div>

            <div
              @click="modal.toggleModalState('isTip')"
              class="grow flex justify-center items-center gap-1 tablet:gap-1.5 cursor-pointer tablet:flex-none tablet:w-[168px]"
            >
              <img src="@/assets/img/free-class/icon-tip.png" alt="icon" class="w-2.5 tablet:w-3.5" />

              <p class="text-sm text-[#18181B] font-medium tablet:text-base pc:text-lg">무료수업 꿀팁</p>
            </div>
          </div>
        </div>

        <div class="max-w-[1200px] mx-auto px-[18px] flex pc:gap-[26px] pc:px-0">
          <ul class="w-full pc:border-r pc:border-solid pc:border-[#F3F4F6] space-y-10 tablet:space-y-[50px] pc:pr-[26px]">
            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 유형</p>

              <ul class="grid grid-cols-2 gap-4 pc:gap-[18px]">
                <li
                  @click="freeClassForm.clickLecType('P')"
                  :class="
                    freeClassForm.lecType === 'P'
                      ? 'text-[#FF9016] bg-white border-[#FF9016] font-bold shadow-[0_6px_10px_rgba(24,27,27,0.05)]'
                      : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA] font-medium'
                  "
                  class="text-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  전화
                </li>

                <li
                  @click="freeClassForm.clickLecType('V')"
                  :class="
                    freeClassForm.lecType === 'V'
                      ? 'text-[#FF9016] bg-white border-[#FF9016] font-bold shadow-[0_6px_10px_rgba(24,27,27,0.05)]'
                      : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA] font-medium'
                  "
                  class="text-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  화상
                </li>
              </ul>
            </li>

            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 언어</p>

              <ul class="grid grid-cols-2 gap-4 pc:gap-[18px]">
                <li
                  @click="freeClassForm.clickLanguage('English')"
                  :class="[
                    freeClassForm.language === 'English'
                      ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,27,27,0.05)] font-bold'
                      : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA] font-medium',
                  ]"
                  class="text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  영어 (미국/캐나다)
                </li>

                <li
                  @click="openNewWindow('https://www.carrotchinese.co.kr')"
                  :class="[
                    freeClassForm.language === 'Chinese'
                      ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)] font-bold'
                      : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA] font-medium',
                  ]"
                  class="text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  중국어
                </li>
              </ul>
            </li>

            <li v-if="freeClassForm.lecType" class="space-y-3 tablet:space-y-3.5">
              <div class="space-y-1 tablet:space-y-2">
                <p class="text-[#18181B] font-semibold tablet:text-lg">무료수업 시간 선택</p>

                <p class="text-sm text-[#6D7076] tablet:text-base">
                  ※ 주말 무료수업 신청 가능합니다.<br />
                  ※ 오전 9시부터 밤 12시까지 자유롭게 선택하세요!
                </p>
              </div>
              <div class="border border-solid border-[#E4E6EA] rounded-xl overflow-hidden tablet:rounded-[20px] pc:rounded-2xl">
                <ul
                  class="grid grid-cols-3 divide-x divide-solid divide-[#D1D5DB] bg-[#E5E7EB] tablet:bg-[#F3F4F6] tablet:border-b tablet:border-solid tablet:border-[#E4E6EA]"
                >
                  <li
                    class="text-center [&:not(:last-child)]:border-r-2 border-solid py-4 cursor-pointer tablet:py-6"
                    v-for="date in levelTestTimes.dates"
                    :key="date.date"
                    :class="getDateStyle(date.date)"
                    @click="setDate(date.date)"
                  >
                    {{ formatDate(date.date) + getWeekDay(date.date) }}
                  </li>
                </ul>

                <p
                  v-if="!getSelectedDates() || getSelectedDates()?.times?.length === 0"
                  class="w-full text-sm text-[#B6BAC3] text-center py-5 bg-[#F3F4F6]"
                >
                  신청 가능한 시간이 없습니다.
                </p>

                <!-- mobile -->
                <div class="tablet:hidden">
                  <ul
                    class="px-2.5 py-5 bg-[#F3F4F6] grid w-full grid-cols-5 gap-x-1 gap-y-2.5 tablet:grid-cols-6 tablet:p-0 tablet:bg-white tablet:gap-0"
                  >
                    <li
                      v-for="time in getFreeClassTime()"
                      @click="setTime(time.hour, time.minute)"
                      :class="
                        freeClassForm.setTime === `${time.hour}:${time.minute.min}`
                          ? 'border-[#FF9016] rounded-md text-[#FF9016]'
                          : 'border-gray-200 text-gray-700'
                      "
                      class="text-xs text-center py-2.5 rounded-md cursor-pointer bg-white border border-solid"
                    >
                      {{ time.hour }}:{{ time.minute.min }}
                    </li>
                  </ul>
                </div>

                <!-- pc -->
                <ul class="hidden tablet:block tablet:max-h-[374px] tablet:overflow-y-auto">
                  <li
                    v-for="time in getSelectedDates()?.times"
                    :key="time.hour"
                    class="flex items-stretch [&:not(:last-child)]:border-b border-solid border-[#e5e7eb]"
                  >
                    <div
                      class="hidden tablet:flex justify-center items-center w-[98px] bg-[#FFF9F2] border-r border-solid border-[#E4E6EA]"
                    >
                      <p class="font-bold">{{ time.hour }}시</p>
                    </div>

                    <ul :class="freeClassForm.lecType === 'P' ? 'grid-cols-6' : 'grid-cols-4'" class="w-full grid bg-white">
                      <li
                        @click="setTime(time.hour, minute)"
                        v-for="minute in time.minute"
                        :key="minute.min"
                        class="text-xs text-center py-2.5 border border-solid rounded-md cursor-pointer tablet:text-sm tablet:px-0 tablet:border-0 tablet:py-[18px] tablet:rounded-none pc:text-base"
                        :class="getTimeStateStyle(minute.state)"
                      >
                        {{ time.hour }}:{{ minute.min }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </li>

            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 레벨</p>

              <ul class="grid grid-cols-4 gap-4 pc:gap-[18px]">
                <li
                  v-for="LEVEL in LEVELS"
                  @click="freeClassForm.clickLevel(LEVEL.KR)"
                  :class="[
                    freeClassForm.level === LEVEL.KR
                      ? 'bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                      : 'bg-[#F4F5F6] border-[#E4E6EA]',
                  ]"
                  class="py-4 border border-solid rounded-xl cursor-pointer tablet:pt-[18px] tablet:pb-[22px] tablet:rounded-2xl"
                >
                  <div class="flex flex-col justify-center items-center">
                    <p
                      class="text-center font-medium tablet:hidden"
                      :class="freeClassForm.level === LEVEL.KR ? 'text-[#FF9016]' : 'text-[#A1A3A8]'"
                    >
                      {{ LEVEL.KR }}
                    </p>

                    <div class="hidden tablet:flex tablet:flex-col tablet:items-center tablet:gap-3">
                      <div
                        class="size-[60px] flex justify-center items-center rounded-full"
                        :class="freeClassForm.level === LEVEL.KR ? 'bg-[#FFF3DB]' : 'bg-[#E4E6EA]'"
                      >
                        <p
                          class="text-xl font-bold"
                          :class="freeClassForm.level === LEVEL.KR ? 'text-[#FF9016]' : 'text-[#B5B7B9]'"
                        >
                          {{ LEVEL.KR }}
                        </p>
                      </div>

                      <p
                        class="text-center font-medium leading-[22px] whitespace-pre-line"
                        :class="freeClassForm.level === LEVEL.KR ? 'text-[#18181B]' : 'text-[#A1A3A8]'"
                      >
                        {{ LEVEL.DESCRIPTION }}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </li>

            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">상담 시간 선택</p>

              <ul class="grid grid-cols-2 gap-4 pc:gap-[18px]">
                <li
                  @click="freeClassForm.clickTime('AM')"
                  :class="[
                    freeClassForm.meetingDate === 'AM'
                      ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                      : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                  ]"
                  class="text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                >
                  오전 9:00~11:50
                </li>

                <li
                  @click="freeClassForm.clickTime('PM')"
                  :class="[
                    freeClassForm.meetingDate === 'PM'
                      ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                      : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                  ]"
                  class="text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                >
                  오후 1:30~6:00
                </li>
              </ul>
            </li>

            <li class="space-y-3 tablet:space-y-7">
              <div class="space-y-1 tablet:space-y-2">
                <p class="text-[#18181B] font-semibold tablet:text-lg">기본 정보 입력</p>

                <p class="text-sm text-[#6D7076] tablet:text-base">
                  ※ 무료 수업 진행과 결과 안내 및 상담 진행을 위한 용도입니다.
                </p>
              </div>

              <div class="py-6 px-3.5 bg-[#F7F7F7] rounded-[20px] tablet:py-9 tablet:px-[26px] pc:py-[46px]">
                <ul class="space-y-[30px] tablet:space-y-9">
                  <li class="space-y-2 tablet:space-y-4">
                    <p class="text-[#18181B] font-semibold">이름</p>

                    <ul class="grid grid-cols-2 gap-2.5">
                      <li>
                        <input
                          type="text"
                          v-model="freeClassForm.kname"
                          placeholder="한글 이름"
                          class="p-4 border border-solid border-[#E4E6EA] rounded-xl placeholder:text-[#B5B7B9] tablet:p-5 tablet:rounded-2xl"
                        />
                      </li>

                      <li>
                        <input
                          type="text"
                          v-model="freeClassForm.ename"
                          placeholder="영문 이름"
                          class="p-4 border border-solid border-[#E4E6EA] rounded-xl placeholder:text-[#B5B7B9] tablet:p-5 tablet:rounded-2xl"
                        />
                      </li>
                    </ul>
                  </li>

                  <li class="space-y-3 tablet:space-y-3">
                    <p class="text-[#18181B] font-semibold">연락처</p>

                    <ul class="grid grid-cols-1 gap-5 tablet:grid-cols-2 tablet:gap-2.5">
                      <li class="space-y-3">
                        <p class="text-sm text-[#6D7076] tablet:text-base">무료 수업 받을 연락처</p>

                        <input
                          type="tel"
                          v-model="freeClassForm.mobile"
                          @input="(e) => (freeClassForm.mobile = formatPhoneNumber(e.target.value))"
                          placeholder="연락처를 입력해 주세요."
                          class="p-4 border border-solid border-[#E4E6EA] rounded-xl placeholder:text-[#B5B7B9] tablet:p-5 tablet:rounded-2xl"
                        />
                      </li>

                      <li class="space-y-3">
                        <div
                          class="flex justify-between flex-wrap gap-y-3 gap-x-6 tablet:items-center tablet:gap-3 pc:justify-start"
                        >
                          <p class="flex-none text-sm text-[#6D7076] tablet:text-base">상담 받을 연락처</p>

                          <label
                            @click="freeClassForm.copyMobile"
                            class="flex items-center gap-1 w-auto cursor-pointer check-label-c2"
                          >
                            <input type="checkbox" class="hidden" />
                            <div class="flex-none checkmark size-5 tablet:size-[22px]"></div>
                            <p class="text-sm tablet:text-[15px]">무료 수업 받을 연락처와 동일</p>
                          </label>
                        </div>

                        <input
                          type="tel"
                          v-model="freeClassForm.mobileCounsel"
                          @input="(e) => (freeClassForm.mobileCounsel = formatPhoneNumber(e.target.value))"
                          placeholder="연락처를 입력해 주세요."
                          class="p-4 border border-solid border-[#E4E6EA] rounded-xl placeholder:text-[#B5B7B9] tablet:p-5 tablet:rounded-2xl"
                        />
                      </li>
                    </ul>
                  </li>

                  <li class="space-y-2 tablet:space-y-4">
                    <p class="text-[#18181B] font-semibold">메일 주소</p>

                    <input
                      type="email"
                      v-model="freeClassForm.email"
                      placeholder="이메일을 입력해 주세요."
                      class="p-4 border border-solid border-[#E4E6EA] rounded-xl placeholder:text-[#B5B7B9] tablet:p-5 tablet:rounded-2xl"
                    />
                  </li>

                  <li class="space-y-3 tablet:space-y-4">
                    <p class="text-[#18181B] font-semibold">당근영어를 알게된 경로를 선택 해 주세요.</p>

                    <ul class="grid grid-cols-3 gap-4 tablet:gap-x-3">
                      <li
                        @click="freeClassForm.clickRecommend('소개')"
                        :class="[
                          freeClassForm.route2 === '소개'
                            ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                            : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                        ]"
                        class="flex justify-center items-center text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                      >
                        소개
                      </li>

                      <li
                        @click="freeClassForm.clickRecommend('검색')"
                        :class="[
                          freeClassForm.route2 === '검색'
                            ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                            : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                        ]"
                        class="flex justify-center items-center text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                      >
                        검색
                      </li>

                      <li
                        @click="freeClassForm.clickRecommend('블로그,카페')"
                        :class="[
                          freeClassForm.route2 === '블로그,카페'
                            ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                            : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                        ]"
                        class="flex justify-center items-center text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                      >
                        블로그, 카페
                      </li>

                      <li
                        @click="freeClassForm.clickRecommend('SNS')"
                        :class="[
                          freeClassForm.route2 === 'SNS'
                            ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                            : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                        ]"
                        class="flex justify-center items-center text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                      >
                        SNS
                      </li>

                      <li
                        @click="freeClassForm.clickRecommend('유튜브')"
                        :class="[
                          freeClassForm.route2 === '유튜브'
                            ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                            : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                        ]"
                        class="flex justify-center items-center text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                      >
                        유튜브
                      </li>

                      <li
                        @click="freeClassForm.clickRecommend('기타')"
                        :class="[
                          freeClassForm.route2 === '기타'
                            ? 'text-[#FF9016] bg-white border-[#FF9016] shadow-[0_5px_10px_rgba(0,0,0,0.06)]'
                            : 'text-[#A1A3A8] bg-[#F4F5F6] border-[#E4E6EA]',
                        ]"
                        class="flex justify-center items-center text-center font-medium py-4 border border-solid rounded-xl cursor-pointer tablet:py-5 tablet:rounded-2xl"
                      >
                        기타
                      </li>
                    </ul>
                  </li>

                  <li class="space-y-2 tablet:space-y-4">
                    <p class="text-[#18181B] font-semibold">추천인</p>

                    <input
                      type="text"
                      v-model="freeClassForm.recommender"
                      placeholder="추천인명을 입력해 주세요."
                      class="p-4 border border-solid border-[#E4E6EA] rounded-xl placeholder:text-[#B5B7B9] tablet:p-5 tablet:rounded-2xl"
                    />
                  </li>
                </ul>
              </div>
            </li>

            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">약관 동의</p>

              <label class="flex items-center gap-2 cursor-pointer check-label-c">
                <input type="checkbox" class="hidden" v-model="freeClassForm.isAgree" />
                <div class="flex-none checkmark size-5 tablet:size-6"></div>
                <p class="text-[#18181B] font-medium">
                  <span @click="toggleAgreeModal('isAgree')" class="font-bold underline">개인정보 수집, 이용 및 회원약관</span>에
                  동의합니다.
                </p>
              </label>
            </li>

            <li class="pc:hidden">
              <div class="flex justify-center">
                <p
                  @click="onclickFreeClass"
                  :class="isDisabled ? 'text-[#A1A3A8] bg-[#D1D4D8]' : 'text-white bg-[#FF9016]'"
                  class="text-center py-4 px-[50px] rounded-xl tablet:text-lg tablet:font-medium"
                >
                  무료수업 신청하기
                </p>
              </div>
            </li>
          </ul>

          <div class="hidden pc:block pc:flex-none pc:w-[370px]">
            <div class="sticky top-[160px]">
              <div class="mb-4">
                <div class="border border-solid border-[#E5E7EB] border-b-0 rounded-t-2xl pt-[30px] px-[22px] pb-5">
                  <p
                    class="text-[22px] text-[#18181B] font-semibold border-b border-solid border-[#D1D5DB] px-1.5 pb-4 mb-[18px]"
                  >
                    신청 내역
                  </p>

                  <ul class="flex gap-1.5 mb-4">
                    <li
                      class="text-[#FF9016] text-base leading-tight px-3.5 py-1.5 bg-[#FFF9F2] border border-solid border-[#FFE8CE] rounded-full"
                    >
                      {{ freeClassForm.lecType === "P" ? "전화" : "화상" }}
                    </li>
                    <li
                      v-if="freeClassForm.language"
                      class="text-[#FF9016] text-base leading-tight px-3.5 py-1.5 bg-[#FFF9F2] border border-solid border-[#FFE8CE] rounded-full"
                    >
                      영어
                    </li>
                  </ul>

                  <div class="flex gap-4">
                    <p class="text-[#A1A3A8]">무료수업 시간</p>
                    <p class="">{{ freeClassForm.setDate }} {{ freeClassForm.setTime }}</p>
                  </div>

                  <div
                    v-if="Object.values(userInfo).some((value) => value)"
                    class="mt-9 px-3.5 py-4 bg-[#F4F5F6] rounded-xl space-y-2.5"
                  >
                    <p class="text-[#6D7076]">
                      {{ userInfo.kname }} / {{ userInfo.mobile?.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3") }}
                    </p>
                    <p class="text-sm text-[#A1A3A8]">※ 번호 변경을 원하시면 당근영어 APP > 마이페이지에서 가능합니다.</p>
                  </div>
                </div>
                <!-- pointer-events-none -->
                <p
                  @click="onclickFreeClass"
                  :class="isDisabled ? 'text-[#A1A3A8] bg-[#D1D4D8]' : 'bg-[#FF9016]'"
                  class="text-xl text-center py-5 rounded-b-2xl cursor-pointer"
                >
                  무료수업 신청하기
                </p>
              </div>

              <div class="hidden pc:block">
                <div class="grow flex justify-center items-center py-[18px] border border-solid border-[#E4E6EA] rounded-2xl">
                  <div
                    @click="modal.toggleModalState('isProceed')"
                    class="grow flex justify-center items-center gap-1 cursor-pointer"
                  >
                    <img src="@/assets/img/free-class/icon-method.png" alt="icon" class="w-3.5 pc:w-5" />

                    <p class="font-medium">진행방법</p>
                  </div>

                  <div class="w-px h-5 bg-[#E4E6EA] pc:h-6"></div>

                  <div
                    @click="modal.toggleModalState('isTip')"
                    class="grow flex justify-center items-center gap-1 cursor-pointer"
                  >
                    <img src="@/assets/img/free-class/icon-tip.png" alt="icon" class="w-2.5 pc:w-3.5" />

                    <p class="font-medium">무료수업 꿀팁</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 약관 동의 모달 -->
      <div v-if="isAgree" class="fixed inset-0 z-20 overflow-hidden bg-zinc-900/70">
        <div class="pt-[46px] px-5 pb-[60px] mx-auto max-w-[500px] h-full">
          <div class="flex justify-end mb-2.5">
            <img
              @click="toggleAgreeModal('isAgree')"
              src="@/assets/img/common/close-white.png"
              alt="icon"
              class="w-3.5 cursor-pointer"
            />
          </div>

          <div
            class="h-full px-4 py-[30px] bg-white overflow-y-auto rounded-2xl scrollbar-hide pc:max-h-[600px] pc:pt-[52px] pc:px-[26px] pc:pb-10"
          >
            <p class="text-2xl text-[#18181B] font-bold mb-8">개인정보 수집, 이용 및 회원약관</p>

            <p class="text-sm text-[#374151] whitespace-pre-line">
              {{ textAgree }}
            </p>
          </div>
        </div>
      </div>
    </main>

    <FreeClassStep v-if="modal.isProceed" :closeModal="modal.toggleModalState" />
    <FreeClassTip v-if="modal.isTip" :closeModal="modal.toggleModalState" />

    <compFooter />
  </div>
</template>

<style scoped lang="scss"></style>
