<script setup>
import { useHead } from "@vueuse/head";
import { reactive, onMounted, watch, ref, computed } from "vue";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import ApplicationCard from "@/components/courseRegister/ApplicationCard.vue";
import { useStore } from "@/stores";
import axios from "@/plugins/axios";
import { useRouter, useRoute } from "vue-router";

import englishUsImg from "@/assets/img/course-register/english_us_canada.png";
import englishPhImg from "@/assets/img/course-register/english_philippines.png";
import chineseImg from "@/assets/img/course-register/chinese.png";

import {
  timeZone,
  MONTH_1,
  MONTH_3,
  MONTH_6,
  MONTH_12,
  WEEK2,
  WEEK3,
  WEEK5,
  MINUTE_10,
  MINUTE_15,
  MINUTE_20,
  MINUTE_30,
  GROUP_SCHEDULE,
} from "@/assets/ts/timeZone";
const imageMap = {
  english_us_canada: englishUsImg,
  english_philippines: englishPhImg,
  chinese: chineseImg,
};

useHead({
  title: "당근영어 주니어",
  meta: [
    {
      name: "description",
      content:
        "원하는 무료, 언어, 첫걸음까지! 자녀의 레벨과 목적에 딱 맞는 다양한 영어 회화 커리큘럼, 원하는 수업을 선택해보세요",
    },
    { name: "keywords", content: "화상영어, 전화영어, 영어회화, 원어민영어, 주니어영어, 어린이영어, 당근영어, 당근영어 주니어" },
    { name: "robots", content: "index, follow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "당근영어 주니어 | 수강신청" },
    {
      property: "og:description",
      content:
        "원하는 무료, 언어, 첫걸음까지! 자녀의 레벨과 목적에 딱 맞는 다양한 영어 회화 커리큘럼, 원하는 수업을 선택해보세요",
    },
    { property: "og:url", content: "https://carrotjunior.kr/courseRegister" },
  ],
});

const store = useStore();
const router = useRouter();
const route = useRoute();
const RegisterApp = reactive({
  code: "",
  courseType: "",
  languageCode: "", // 수업언어
  level: "", // 수업과정-레벨
  program: "", // 수업과정-프로그램
  programDetailCourseType: "", // 수업과정-과정유형
  programDetailCode: "", // 수업과정-과정코드
  course: "", // 수업과정-과정
  isCreativeWritingEssay: true, // Essay 첨삭여부
  durationMonths: "", // 수업기간 default 3개월
  preferredStartDate: "", // 수업시작일
  frequencyPerWeek: "", // 수업 횟수
  sessionMinutes: "", // 수업 분수
  schedule: [], // 수업스케쥴
  groupScheduleList: GROUP_SCHEDULE, // 소그룹 스케쥴 초기화 데이터, 과정선택시 유동적으로 변함
  groupSchedule: "",
  /* preferredTime1: "", // 희망 수업 시간 1
  preferredTime2: "", // 희망 수업 시간 2 */
  preferredTimeFirst: "", // 희망 수업 시간 1
  preferredTimeSecond: "", // 희망 수업 시간 2
  referrer: "", // 추천인

  courseName: "",
  languageName: "",
  levelName: "",
  programDetailName: "",

  clickCourseType: (code, courseType, name, idx) => {
    console.log(`clickCourseType`);
    console.log(code, courseType, name, idx);
    if (RegisterApp.code) {
      RegisterApp.changeCode();
    }

    RegisterApp.code = code;
    RegisterApp.courseType = courseType;
    RegisterApp.courseName = name;
    langList.value = RegisterApp.filterLangList(idx);
    if (code === "group_video") {
      RegisterApp.clickLang("english_us_canada", 0);
    }
  },
  clickLang: (code, idx) => {
    RegisterApp.languageCode = code;
    RegisterApp.languageName = langList.value[idx].name;
    programList.value = RegisterApp.filterProgramList(idx);

    RegisterApp.level = "";
    RegisterApp.levelName = "";

    lectureInfo.value = {};
    PriceInfo.info = {};
  },
  clickLevel: (code, name, idx) => {
    selectedProgramDetail.value = "";
    RegisterApp.programDetailName = "";
    RegisterApp.programDetailCode = "";
    RegisterApp.level = code;
    RegisterApp.programCode = code;
    RegisterApp.levelName = name;
    programDetailList.value = RegisterApp.filterProgramDetailList(idx);
    RegisterApp.groupScheduleList = programList.value[idx].groupScheduleList;

    lectureInfo.value = {};
    applicationInfo.groupSchedule = "";
    RegisterApp.groupSchedule = "";
    PriceInfo.info = {};
  },

  clickEssay: (isEssay) => {
    RegisterApp.isCreativeWritingEssay = isEssay;
  },

  clickLectureWeek: (month) => {
    RegisterApp.durationMonths = month;
  },

  clickFrequencyPerWeek: (week) => {
    RegisterApp.frequencyPerWeek = week;
  },

  clickSessionMinutes: (time) => {
    RegisterApp.sessionMinutes = time;
  },

  clickGroupSchedule: (name) => {
    RegisterApp.groupSchedule = name;
  },

  filterLangList: (idx) => {
    return courseList.value[idx].langList;
  },

  filterProgramList: (idx) => {
    return langList.value[idx].programList;
  },

  filterProgramDetailList: (idx) => {
    return programList.value[idx].programDetailList;
  },

  filterInfo: (info, code, courseType) => {
    lectureInfo.value = info;
    RegisterApp.programDetailCode = code;
    RegisterApp.programDetailCourseType = courseType;
  },

  changeCode: () => {
    RegisterApp.languageCode = ""; // 수업언어
    RegisterApp.level = ""; // 수업과정
    RegisterApp.programDetailCode = ""; // 과정
    RegisterApp.durationMonths = ""; // 수업기간
    RegisterApp.frequencyPerWeek = ""; // 수업횟수
    RegisterApp.sessionMinutes = ""; // 수업 분수
    RegisterApp.preferredStartDate = ""; // 수업스케쥴 시작일
    RegisterApp.preferredTimeFirst = ""; // 희망수업시간 1
    RegisterApp.preferredTimeSecond = ""; // 희망수업시간 2

    RegisterApp.levelName = "";
    PriceInfo.info = {};
  },
});

const PriceInfo = reactive({
  info: {},
});

const getPrice = async () => {
  const res = await axios.post(`/junior/sugang/course/price`, {
    courseType: RegisterApp.programDetailCourseType,
    programCode: RegisterApp.programCode,
    programDetailCode: RegisterApp.programDetailCode,
    languageCode: RegisterApp.languageCode,
    isCreativeWritingEssay: RegisterApp.isCreativeWritingEssay,
    durationMonths: RegisterApp.durationMonths,
    frequencyPerWeek: RegisterApp.frequencyPerWeek,
    sessionMinutes: RegisterApp.sessionMinutes,
  });
  return res?.data?.data.price;
};

const courseList = ref([]);
const langList = ref([]);
const programList = ref([]);
const programDetailList = ref([]);
const lectureInfo = ref({});
const isOpenProgramDetail = ref(false);
const toggleProgramDetail = () => {
  isOpenProgramDetail.value = !isOpenProgramDetail.value;
};
const selectedProgramDetail = ref("");

const selectProgramDetail = (name, code, info, courseType) => {
  toggleProgramDetail();
  selectedProgramDetail.value = name;
  RegisterApp.programDetailName = name;
  RegisterApp.filterInfo(info, code, courseType);
};

const getInitData = async () => {
  const res = await axios.get("/junior/sugang/course/init");
  courseList.value = res?.data?.data?.courseList;
};

const getImageUrl = (code) => {
  if (code === "english_us_canada") return englishUsImg;
  if (code === "english_philippines") return englishPhImg;
  if (code === "chinese") return chineseImg;
};

const applicationInfo = computed(() => RegisterApp);
const ApplicationPrice = computed(() => PriceInfo.info);
const chkPrice = ref(false);
const isAllFieldsFilled = computed(() => {
  const values = {
    code: RegisterApp.code,
    programCode: RegisterApp.programCode,
    level: RegisterApp.level,
    programDetailCode: RegisterApp.programDetailCode,
    languageCode: RegisterApp.languageCode,
    isCreativeWritingEssay: RegisterApp.isCreativeWritingEssay,
    durationMonths: RegisterApp.durationMonths,
    frequencyPerWeek: RegisterApp.frequencyPerWeek,
    sessionMinutes: RegisterApp.sessionMinutes,
    preferredStartDate: RegisterApp.preferredStartDate,
    preferredTimeFirst: RegisterApp.preferredTimeFirst,
    preferredTimeSecond: RegisterApp.preferredTimeSecond,
    groupSchedule: RegisterApp.groupSchedule,
  };

  // group_video 타입일 때는 programDetailCode 체크 제외
  if (RegisterApp.code === "group_video") {
    delete values.frequencyPerWeek;
    delete values.sessionMinutes;
    delete values.preferredStartDate;
    delete values.preferredTimeFirst;
    delete values.preferredTimeSecond;
  } else if (RegisterApp.languageCode === "chinese") {
    delete values.level;
    delete values.programDetailCode;
    delete values.programCode;
    delete values.groupSchedule;
  } else {
    delete values.groupSchedule;
  }

  return Object.values(values).every((value) => value !== "" && value !== null && value !== undefined);
});

const getTargetUrl = () => {
  if (location.origin.includes("local")) {
    return "http://localhost:27080";
  } else if (location.origin.includes("testpage") || location.origin.includes("192.168.")) {
    return "https://stage-carrotfarm.carrotenglish.com";
  } else {
    return "https://carrotfarm.carrotenglish.com";
  }
};

const apply = async () => {
  await saveToSessionStorage();
  if (store.accessToken) {
    router.push("/courseRegister/viewHistory");
  } else {
    await store.setIsJuniorLogin(true);
    window.location.href = getTargetUrl() + "/auth/loginJunior";
  }
};

const chkValid = () => {
  if (!RegisterApp.code) {
    alert("수업 유형을 선택해주세요.");
    return;
  }
  if (!RegisterApp.languageCode) {
    alert("수업 언어를 선택해주세요.");
    return;
  }
  if (!RegisterApp.level) {
    if (RegisterApp.code === "group_video") {
      alert("프로그램을 선택해주세요.");
      return;
    } else {
      alert("수업 과정 레벨을 선택해주세요.");
      return;
    }
  }
  if (!RegisterApp.programDetailCode) {
    alert("수업 과정을 선택해주세요.");
    return false;
  }
  if (!RegisterApp.durationMonths) {
    alert("수업 기간을 선택해주세요.");
    return;
  }
  if (RegisterApp.code !== "group_video" && !RegisterApp.frequencyPerWeek) {
    alert("수업 횟수를 선택해주세요.");
    return;
  }
  if (RegisterApp.code !== "group_video" && !RegisterApp.sessionMinutes) {
    alert("수업 분수를 선택해주세요.");
    return;
  }
  if (RegisterApp.code !== "group_video" && !RegisterApp.preferredStartDate) {
    alert("희망 수업 시작일을 선택해주세요.");
    return;
  }
  if (RegisterApp.code !== "group_video" && (!RegisterApp.preferredTimeFirst || !RegisterApp.preferredTimeSecond)) {
    alert("희망 수업 시간을 선택해주세요.");
    return;
  }
  if (RegisterApp.code === "group_video" && !RegisterApp.groupSchedule) {
    alert("수업 스케쥴을 선택해주세요.");
    return;
  }
};

const saveToSessionStorage = async () => {
  const courseData = {
    code: RegisterApp.code,
    courseType: RegisterApp.courseType,
    languageCode: RegisterApp.languageCode,
    level: RegisterApp.level,
    programCode: RegisterApp.programCode,
    programDetailCourseType: RegisterApp.programDetailCourseType,
    programDetailCode: RegisterApp.programDetailCode,
    course: RegisterApp.course,
    isCreativeWritingEssay: RegisterApp.isCreativeWritingEssay,
    durationMonths: RegisterApp.durationMonths,
    preferredStartDate: RegisterApp.preferredStartDate,
    frequencyPerWeek: RegisterApp.frequencyPerWeek,
    sessionMinutes: RegisterApp.sessionMinutes,
    schedule: RegisterApp.schedule,
    preferredTimeFirst: RegisterApp.preferredTimeFirst,
    preferredTimeSecond: RegisterApp.preferredTimeSecond,
    referrer: RegisterApp.referrer,
    levelName: RegisterApp.levelName,
    programDetailName: RegisterApp.programDetailName,
    courseName: RegisterApp.courseName,
    languageName: RegisterApp.languageName,
    groupSchedule: RegisterApp.groupSchedule,
    ...PriceInfo.info,
  };

  sessionStorage.setItem("courseRegistrationData", JSON.stringify(courseData));
};

// 데이터를 불러오는 함수
const loadFromSessionStorage = () => {
  const savedData = sessionStorage.getItem("courseRegistrationData");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    Object.assign(RegisterApp, parsedData);
  }
};

const setFromSessionStorageData = () => {
  // 선택되어있는 값이 존재하면 데이터 Set

  RegisterApp.clickCourseType(
    RegisterApp.courseType,
    RegisterApp.courseType === "personal_video" ? 0 : RegisterApp.courseType === "personal_phone" ? 1 : 2
  );

  RegisterApp.clickLang(
    RegisterApp.language,
    RegisterApp.language === "english_us_canada" ? 0 : RegisterApp.language === "english_philippines" ? 1 : 2
  );

  RegisterApp.clickLevel(
    RegisterApp.level,
    RegisterApp.levelName,
    RegisterApp.levelName === "RISE" ? 0 : RegisterApp.levelName === "EDGE" ? 1 : 2
  );

  selectedProgramDetail.value =
    programDetailList.value[programDetailList.value.findIndex((item) => item.code === RegisterApp.programDetailCode)].name;

  RegisterApp.programDetailName = selectedProgramDetail.value;
};

const formatText = (text) => {
  const match = text.match(/(.+?)(\(.+?\))/);
  if (!match) return text;
  const [, main, details] = match;
  return `${main}<br />${details}`;
};

const handleDateChange = (event) => {
  const selectedDate = new Date(event.target.value);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // 시간 제거하고 날짜만 비교

  if (selectedDate < today) {
    alert("지난 날짜는 선택할 수 없습니다.");
    RegisterApp.preferredStartDate = ""; // 값 초기화
    return;
  }
};

watch(
  () => ({
    code: RegisterApp.code,
    courseType: RegisterApp.programDetailCourseType,
    programCode: RegisterApp.level,
    programDetailCode: RegisterApp.programDetailCode,
    languageCode: RegisterApp.languageCode,
    isCreativeWritingEssay: RegisterApp.isCreativeWritingEssay,
    durationMonths: RegisterApp.durationMonths,
    frequencyPerWeek: RegisterApp.frequencyPerWeek,
    sessionMinutes: RegisterApp.sessionMinutes,
    groupSchedule: RegisterApp.groupSchedule,
  }),
  async (newValues) => {
    chkPrice.value = Object.entries(newValues).every(([key, value]) => {
      console.log(`체크중: ${key}, 값: ${value}`);
      if (
        RegisterApp.code === "group_video" &&
        (key === "programDetailCode" || key === "frequencyPerWeek" || key === "sessionMinutes")
      ) {
        return true;
      } else {
        if (key === "groupSchedule") {
          return true;
        }
      }

      if (
        newValues.languageCode === "chinese" &&
        (key === "programDetailCode" || key === "programCode" || key === "courseType")
      ) {
        RegisterApp.programDetailCourseType = "personal";
        return true;
      }

      return value !== "" && value !== null && value !== undefined;
    });

    if (chkPrice.value) {
      PriceInfo.info = await getPrice();
    }
  },
  { deep: true }
);
const openNewWindow = (path) => {
  window.open(path, "_blank");
};

onMounted(async () => {
  await getInitData();
  RegisterApp.clickCourseType("", "", "", 0);
  if (route.query.type) {
    switch (route.query.type) {
      case "academy":
        RegisterApp.clickCourseType("group_video", "group_video", "소그룹 화상", 2);
        RegisterApp.clickLevel("academy", "온스쿨 아카데미", 0);
        console.log(RegisterApp);
        break;
      case "bridge":
        RegisterApp.clickCourseType("group_video", "group_video", "소그룹 화상", 2);
        RegisterApp.clickLevel("bridge", "온스쿨 브릿지", 1);
        break;
      case "debate":
        RegisterApp.clickCourseType("group_video", "group_video", "소그룹 화상", 2);
        RegisterApp.clickLevel("debate", "온스쿨 디베이트", 2);
        break;
      case "personalOnSchool":
        RegisterApp.clickCourseType("personal_video", "personal_video", "개인 화상", 0);
        RegisterApp.clickLang("english_us_canada", 0);
        break;
    }
  }
});
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div class="pb-[74px] pc:pb-[156px]">
        <div
          class="py-[52px] bg-[url(@/assets/img/course-register/bg.png)] bg-no-repeat bg-center bg-cover mb-[50px] tablet:py-[50px] tablet:mb-[42px] pc:pt-[56px] pc:pb-[46px] pc:mb-[62px]"
        >
          <p class="text-[34px] text-white text-center font-bold mb-5 tablet:mb-[18px] pc:text-[52px] pc:mb-3.5">수강신청하기</p>

          <div class="flex justify-center">
            <a
              href="/event"
              class="w-fit flex items-center gap-3.5 py-2 pl-4 pr-2.5 border border-solid border-[#605E62] rounded-full cursor-pointer"
            >
              <p class="flex-none text-white">이벤트 확인하기</p>
              <img src="@/assets/img/free-class/go.png" alt="" class="flex-none w-7" />
            </a>
          </div>
        </div>

        <div class="max-w-[1200px] mx-auto px-[18px] flex pc:gap-[26px] pc:px-0">
          <ul
            class="w-full pc:border-r pc:border-solid pc:border-[#F3F4F6] space-y-10 pc:pr-[26px] tablet:max-w-[840px] tablet:mx-auto tablet:space-y-[50px] pc:w-full"
          >
            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 유형</p>

              <ul class="grid grid-cols-3 gap-4">
                <li
                  v-for="(item, index) in courseList"
                  @click="RegisterApp.clickCourseType(item.code, item.type, item.name, index)"
                  :key="item.code"
                  :class="
                    RegisterApp.code === item.code
                      ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                      : 'bg-[#F4F5F6] border-[#E4E6EA]'
                  "
                  class="flex justify-center items-center text-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  <p :class="RegisterApp.code === item.code ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'">
                    {{ item.name }}
                  </p>
                </li>
              </ul>
            </li>
            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 언어</p>

              <ul class="grid grid-cols-3 gap-4">
                <li
                  v-for="(item, index) in langList"
                  :key="item.code"
                  @click="RegisterApp.clickLang(item.code, index)"
                  :class="
                    RegisterApp.languageCode === item.code
                      ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                      : 'bg-[#F4F5F6] border-[#E4E6EA]'
                  "
                  class="flex flex-col items-center gap-1 py-4 border border-solid rounded-xl cursor-pointer tablet:flex-row tablet:justify-center tablet:py-[22px] tablet:rounded-2xl"
                >
                  <img
                    :src="getImageUrl(item.code)"
                    alt=""
                    :class="{ 'grayscale opacity-50': RegisterApp.languageCode !== item.code }"
                    class="w-6"
                  />
                  <div class="grow tablet:grow-0">
                    <p
                      :class="RegisterApp.languageCode === item.code ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                      class="hidden tablet:block text-center"
                    >
                      {{ item.name }}
                    </p>
                    <p
                      v-html="formatText(item.name)"
                      :class="RegisterApp.languageCode === item.code ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                      class="block tablet:hidden text-center"
                    ></p>
                  </div>
                </li>
              </ul>
            </li>

            <li v-if="RegisterApp.languageCode !== '' && RegisterApp.languageCode !== 'chinese'" class="space-y-3 pc:space-y-3.5">
              <div class="flex items-center gap-1.5">
                <p class="text-[#18181B] font-semibold tablet:text-lg tablet:flex-none">수업 과정</p>

                <a
                  v-if="RegisterApp.code !== 'group_video'"
                  href="/personalOnSchool"
                  class="w-auto flex items-center gap-1 py-1 px-3 bg-[#FFF3DB] rounded-full cursor-pointer"
                >
                  <p class="text-sm text-[#FF9016] font-medium">미리보기</p>
                  <img src="@/assets/img/course-register/go.png" alt="" class="flex-none w-1" />
                </a>
              </div>

              <div class="space-y-5">
                <div v-if="RegisterApp.code !== 'group_video'" class="space-y-2.5 pc:space-y-3.5">
                  <p class="text-sm text-[#6D7076] tablet:text-base">레벨을 선택해주세요</p>

                  <ul class="grid grid-cols-3 gap-4 pc:gap-7">
                    <li
                      v-for="(item, index) in programList"
                      @click="RegisterApp.clickLevel(item.code, item.name, index)"
                      :key="item.code"
                      :class="
                        RegisterApp.level === item.code
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="RegisterApp.level === item.code ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                        class="text-center"
                      >
                        {{ item.name }}
                      </p>
                    </li>
                  </ul>
                </div>

                <div v-else class="space-y-2.5 tablet:space-y-3.5">
                  <p class="text-sm text-[#6D7076] tablet:text-base">프로그램을 선택해주세요</p>

                  <ul class="grid grid-cols-3 gap-4 pc:gap-7">
                    <li
                      v-for="(item, index) in programList"
                      :key="item.code"
                      @click="RegisterApp.clickLevel(item.code, item.name, index)"
                      :class="
                        RegisterApp.level === item.code
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA] text-[#A1A3A8]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <div class="flex flex-col items-center gap-3 pc:gap-2">
                        <p class="text-center">
                          <!-- 모바일 버전 -->
                          <span
                            :class="RegisterApp.level === item.code ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                            class="block pc:hidden whitespace-pre-line"
                          >
                            {{ item.name.replace("온스쿨 ", "온스쿨\n") }}
                          </span>
                          <!-- PC 버전 -->
                          <span
                            :class="RegisterApp.level === item.code ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                            class="hidden pc:block"
                          >
                            {{ item.name }}
                          </span>
                        </p>

                        <div
                          @click="openNewWindow(`groupOnSchool/${item.code}`)"
                          :class="RegisterApp.level === item.code ? 'bg-[#FFF3DB] ' : 'bg-[#E4E6EA]'"
                          class="flex items-center gap-1 py-1.5 px-3 rounded-full cursor-pointer"
                        >
                          <p
                            :class="RegisterApp.level === item.code ? 'text-[#FF9016] ' : 'text-[#A1A3A8]'"
                            class="text-sm font-medium"
                          >
                            미리보기
                          </p>
                          <img
                            src="@/assets/img/course-register/go.png"
                            alt=""
                            :class="RegisterApp.level === item.code ? 'grayscale-0' : 'grayscale'"
                            class="flex-none w-1"
                          />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div v-if="RegisterApp.level" class="space-y-2.5 tablet:space-y-3.5">
                  <p class="text-sm text-[#6D7076] tablet:text-base">과정을 선택해주세요</p>

                  <div class="relative">
                    <div
                      @click="toggleProgramDetail"
                      class="flex justify-between items-center gap-4 p-4 border border-solid border-[#E4E6EA] rounded-xl cursor-pointer tablet:p-[22px] tablet:rounded-2xl"
                    >
                      <p v-if="!selectedProgramDetail">과정을 선택해주세요</p>
                      <!-- 선택된 과정 이름 -->
                      <p v-else>{{ selectedProgramDetail }}</p>

                      <div class="flex-none w-2.5">
                        <img src="@/assets/img/course-register/down.png" alt="" />
                      </div>
                    </div>

                    <div v-if="isOpenProgramDetail" class="absolute top-16 w-full z-[1]">
                      <div
                        class="p-2 border border-solid border-[#F1F1F2] bg-white rounded-xl overflow-hidden shadow-[0_3px_14px_rgba(19,20,20,0.1)]"
                      >
                        <ul class="max-h-[270px] overflow-y-auto">
                          <li
                            v-for="(item, index) in programDetailList"
                            :key="item.code"
                            @click="selectProgramDetail(item.name, item.code, item.info, item.courseType)"
                            class="py-5 px-3.5 rounded-xl cursor-pointer hover:text-[#FF9016] hover:bg-[#FFF6E3]"
                          >
                            {{ item.name }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li v-if="lectureInfo.isCreativeWriting" class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">Essay 첨삭</p>

              <ul class="grid grid-cols-2 gap-4 pc:gap-7">
                <li
                  @click="RegisterApp.clickEssay(true)"
                  :class="
                    RegisterApp.isCreativeWritingEssay
                      ? 'bg-white border-[#FF9016] shadow-[0_3px_14px_rgba(19,20,20,0.1)]'
                      : 'bg-[#F4F5F6] border-[#E4E6EA]'
                  "
                  class="flex justify-center items-center text-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  <p :class="RegisterApp.isCreativeWritingEssay ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'">
                    월 4회 Essay 첨삭
                  </p>
                </li>

                <li
                  @click="RegisterApp.clickEssay(false)"
                  :class="
                    !RegisterApp.isCreativeWritingEssay
                      ? 'bg-white border-[#FF9016] shadow-[0_3px_14px_rgba(19,20,20,0.1)]'
                      : 'bg-[#F4F5F6] border-[#E4E6EA]'
                  "
                  class="flex justify-center items-center text-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  <p :class="!RegisterApp.isCreativeWritingEssay ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'">
                    첨삭 안함
                  </p>
                </li>
              </ul>
            </li>

            <li class="space-y-3 tablet:space-y-1">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 기간 (1개월=4주)</p>

              <div class="space-y-3 tablet:space-y-5">
                <p
                  v-if="
                    RegisterApp.code === 'group_video' &&
                    (RegisterApp.levelName === '온스쿨 아카데미' ||
                      RegisterApp.levelName === '온스쿨 브릿지' ||
                      RegisterApp.levelName === '온스쿨 디베이트')
                  "
                  class="text-sm text-[#6D7076] tablet:text-base"
                >
                  기간을 클릭하시면 각 수강료를 확인하실 수 있습니다.
                </p>
                <p v-else class="text-sm text-[#6D7076] tablet:text-base">
                  기간, 횟수, 분수를 클릭하시면 각 수강료를 확인하실 수 있습니다.
                </p>
                <ul class="grid grid-cols-2 gap-4 tablet:grid-cols-4 tablet:gap-4 pc:gap-[18px]">
                  <li
                    v-if="lectureInfo.isDurationMonths1 === undefined || lectureInfo.isDurationMonths1"
                    @click="RegisterApp.clickLectureWeek(MONTH_1)"
                    :class="
                      RegisterApp.durationMonths === MONTH_1
                        ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                        : 'bg-[#F4F5F6] border-[#E4E6EA]'
                    "
                    class="py-[22px] border border-solid rounded-xl cursor-pointer pc:py-5 pc:rounded-2xl"
                  >
                    <p
                      :class="RegisterApp.durationMonths === MONTH_1 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                      class="text-center"
                    >
                      1개월
                    </p>
                  </li>

                  <li
                    v-if="lectureInfo.isDurationMonths3 === undefined || lectureInfo.isDurationMonths3"
                    @click="RegisterApp.clickLectureWeek(MONTH_3)"
                    :class="
                      RegisterApp.durationMonths === MONTH_3
                        ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                        : 'bg-[#F4F5F6] border-[#E4E6EA]'
                    "
                    class="relative py-[22px] border border-solid rounded-xl cursor-pointer pc:py-5 pc:rounded-2xl"
                  >
                    <p
                      :class="RegisterApp.durationMonths === MONTH_3 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                      class="text-center"
                    >
                      3개월
                    </p>

                    <div class="absolute top-0 right-0">
                      <p
                        class="text-xs text-white font-medium py-1 px-2.5 bg-gradient-to-r from-[#FF9016] to-[#FF5271] rounded-tr-xl rounded-bl-xl"
                      >
                        10% 할인
                      </p>
                    </div>
                  </li>

                  <li
                    v-if="lectureInfo.isDurationMonths6 === undefined || lectureInfo.isDurationMonths6"
                    @click="RegisterApp.clickLectureWeek(MONTH_6)"
                    :class="
                      RegisterApp.durationMonths === MONTH_6
                        ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                        : 'bg-[#F4F5F6] border-[#E4E6EA]'
                    "
                    class="relative py-[22px] border border-solid rounded-xl cursor-pointer pc:py-5 pc:rounded-2xl"
                  >
                    <p
                      :class="RegisterApp.durationMonths === MONTH_6 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                      class="text-center"
                    >
                      6개월
                    </p>

                    <div class="absolute top-0 right-0">
                      <p
                        class="text-xs text-white font-medium py-1 px-2.5 bg-gradient-to-r from-[#FF9016] to-[#FF5271] rounded-tr-xl rounded-bl-xl"
                      >
                        15% 할인
                      </p>
                    </div>
                  </li>

                  <li
                    v-if="lectureInfo.isDurationMonths12 === undefined || lectureInfo.isDurationMonths12"
                    @click="RegisterApp.clickLectureWeek(MONTH_12)"
                    :class="
                      RegisterApp.durationMonths === MONTH_12
                        ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                        : 'bg-[#F4F5F6] border-[#E4E6EA]'
                    "
                    class="relative py-[22px] border border-solid rounded-xl cursor-pointer pc:py-5 pc:rounded-2xl"
                  >
                    <p
                      :class="RegisterApp.durationMonths === MONTH_12 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                      class="text-center"
                    >
                      12개월
                    </p>

                    <div class="absolute top-0 right-0">
                      <p
                        class="text-xs text-white font-medium py-1 px-2.5 bg-gradient-to-r from-[#FF9016] to-[#FF5271] rounded-tr-xl rounded-bl-xl"
                      >
                        20% 할인
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </li>

            <li v-if="RegisterApp.code !== 'group_video'" class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 횟수/분수</p>

              <div
                class="flex flex-col gap-3 divide-y divide-solid divide-[#E4E6EA] tablet:flex-row tablet:gap-2.5 tablet:divide-y-0 tablet:divide-x"
              >
                <div class="tablet:w-[248px] tablet:flex-none">
                  <ul class="grid grid-cols-3 gap-4 tablet:grid-cols-1 tablet:gap-5">
                    <li
                      v-if="lectureInfo.isFrequencyPerWeek2 === undefined || lectureInfo.isFrequencyPerWeek2"
                      @click="RegisterApp.clickFrequencyPerWeek(WEEK2)"
                      :class="
                        RegisterApp.frequencyPerWeek === WEEK2
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.frequencyPerWeek === WEEK2 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        주 2회
                      </p>
                    </li>

                    <li
                      v-if="lectureInfo.isFrequencyPerWeek3 === undefined || lectureInfo.isFrequencyPerWeek3"
                      @click="RegisterApp.clickFrequencyPerWeek(WEEK3)"
                      :class="
                        RegisterApp.frequencyPerWeek === WEEK3
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.frequencyPerWeek === WEEK3 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        주 3회
                      </p>
                    </li>

                    <li
                      v-if="lectureInfo.isFrequencyPerWeek5 === undefined || lectureInfo.isFrequencyPerWeek5"
                      @click="RegisterApp.clickFrequencyPerWeek(WEEK5)"
                      :class="
                        RegisterApp.frequencyPerWeek === WEEK5
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.frequencyPerWeek === WEEK5 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        주 5회
                      </p>
                    </li>
                  </ul>
                </div>

                <div class="pt-3 tablet:pt-0 tablet:pl-2.5 tablet:grow tablet:flex-none">
                  <ul class="grid grid-cols-4 gap-4 tablet:grid-cols-2">
                    <li
                      @click="RegisterApp.clickSessionMinutes(MINUTE_10)"
                      v-if="lectureInfo.isSessionMinutes10 === undefined || lectureInfo.isSessionMinutes10"
                      :class="
                        RegisterApp.sessionMinutes === MINUTE_10
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.sessionMinutes === MINUTE_10 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        10분
                      </p>
                    </li>

                    <li
                      @click="RegisterApp.clickSessionMinutes(MINUTE_15)"
                      v-if="lectureInfo.isSessionMinutes15 === undefined || lectureInfo.isSessionMinutes15"
                      :class="
                        RegisterApp.sessionMinutes === MINUTE_15
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.sessionMinutes === MINUTE_15 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        15분
                      </p>
                    </li>

                    <li
                      @click="RegisterApp.clickSessionMinutes(MINUTE_20)"
                      v-if="lectureInfo.isSessionMinutes20 === undefined || lectureInfo.isSessionMinutes20"
                      :class="
                        RegisterApp.sessionMinutes === MINUTE_20
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.sessionMinutes === MINUTE_20 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        20분
                      </p>
                    </li>

                    <li
                      @click="RegisterApp.clickSessionMinutes(MINUTE_30)"
                      v-if="lectureInfo.isSessionMinutes30 === undefined || lectureInfo.isSessionMinutes30"
                      :class="
                        RegisterApp.sessionMinutes === MINUTE_30
                          ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                          : 'bg-[#F4F5F6] border-[#E4E6EA]'
                      "
                      class="flex justify-center items-center py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                    >
                      <p
                        :class="
                          RegisterApp.sessionMinutes === MINUTE_30 ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'
                        "
                      >
                        30분
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li v-if="RegisterApp.code !== 'group_video'" class="space-y-3 tablet:space-y-3">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 스케쥴</p>

              <ul class="flex flex-col gap-5 tablet:grid tablet:grid-cols-3 tablet:gap-4">
                <li class="space-y-2.5 tablet:space-y-3.5">
                  <p class="text-sm text-[#6D7076] tablet:text-base">수업 시작일을 선택해주세요</p>

                  <input
                    type="date"
                    v-model="RegisterApp.preferredStartDate"
                    @change="handleDateChange"
                    :min="new Date().toISOString().split('T')[0]"
                    class="p-4 border border-solid border-[#E4E6EA] rounded-xl cursor-pointer tablet:py-5 tablet:px-[22px] tablet:rounded-2xl"
                  />
                </li>

                <li class="space-y-2.5 tablet:space-y-3.5 tablet:col-span-2">
                  <p class="text-sm text-[#6D7076] tablet:text-base">희망 수업 시간 (2개 선택)</p>

                  <ul class="grid grid-cols-2 gap-4">
                    <li>
                      <select
                        v-model="RegisterApp.preferredTimeFirst"
                        class="p-4 border border-solid border-[#E4E6EA] rounded-xl cursor-pointer tablet:py-5 tablet:px-[22px] tablet:rounded-2xl"
                      >
                        <option v-for="item in timeZone" :key="item.value" :value="item.value">
                          {{ item.label }}
                        </option>
                      </select>
                    </li>

                    <li>
                      <select
                        v-model="RegisterApp.preferredTimeSecond"
                        class="p-4 border border-solid border-[#E4E6EA] rounded-xl cursor-pointer tablet:py-5 tablet:px-[22px] tablet:rounded-2xl"
                      >
                        <option v-for="item in timeZone" :key="item.value" :value="item.value">
                          {{ item.label }}
                        </option>
                      </select>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>

            <li v-else class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">수업 스케쥴</p>

              <ul class="flex flex-col gap-5 tablet:grid tablet:grid-cols-2 tablet:gap-4">
                <li
                  v-for="item in RegisterApp.groupScheduleList"
                  :key="item.name"
                  @click="RegisterApp.clickGroupSchedule(item.name)"
                  :class="
                    RegisterApp.groupSchedule === item.name
                      ? 'bg-white border-[#FF9016] shadow-[0_6px_10px_rgba(24,24,27,0.05)]'
                      : 'bg-[#F4F5F6] border-[#E4E6EA]'
                  "
                  class="py-4 border border-solid rounded-xl cursor-pointer tablet:py-[22px] tablet:rounded-2xl"
                >
                  <p
                    :class="RegisterApp.groupSchedule === item.name ? 'text-[#FF9016] font-bold' : 'text-[#A1A3A8] font-medium'"
                    class="text-center"
                  >
                    {{ item.name }}
                  </p>
                </li>
              </ul>
            </li>

            <li class="space-y-3 tablet:space-y-3.5">
              <p class="text-[#18181B] font-semibold tablet:text-lg">추천인</p>

              <input
                type="text"
                placeholder="추천인명을 입력해 주세요."
                v-model="RegisterApp.referrer"
                class="p-4 border border-solid border-[#E5E7EB] rounded-xl tablet:p-5 tablet:rounded-2xl"
              />
            </li>

            <li class="pc:hidden">
              <div class="flex justify-center">
                <p
                  v-if="isAllFieldsFilled"
                  @click="apply"
                  class="text-white text-center py-4 px-[50px] bg-[#FF9016] rounded-xl cursor-pointer tablet:text-lg tablet:font-medium"
                >
                  수강 신청하기
                </p>
                <p
                  v-else
                  @click="chkValid"
                  class="text-[#A1A3A8] text-center py-4 px-[50px] bg-[#D1D4D8] rounded-xl tablet:text-lg tablet:font-medium"
                >
                  수강 신청하기
                </p>
              </div>
            </li>
          </ul>

          <ApplicationCard
            :applicationInfo="applicationInfo"
            :priceInfo="ApplicationPrice"
            :isAllFieldsFilled="isAllFieldsFilled"
            @onClickApply="apply"
            @onClickchkValid="chkValid"
          />
        </div>
      </div>
    </main>

    <compFooter />
  </div>
</template>

<style scoped lang="scss">
select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url(@/assets/img/course-register/time.png), url(@/assets/img/footer/select-arrow.png);
  background-repeat: no-repeat, no-repeat;
  background-position: left 14px center, right 16px center;
  background-size: 18px, 12px;
  padding-inline: 32px;
  text-indent: 5px;

  @media screen and (min-width: 1200px) {
    background-position: left 24px center, right 24px center;
    padding-inline: 44px;
  }

  &::-ms-expand {
    display: none;
  }
}

/* 커스텀 캘린더 아이콘 설정 */
input[type="date"] {
  background-image: url(@/assets/img/course-register/calendar.png), url(@/assets/img/footer/select-arrow.png);
  background-repeat: no-repeat;
  background-position: left 14px center, right 16px center;
  background-size: 18px, 12px;
  padding-inline: 32px;
  text-indent: 2px;

  @media screen and (min-width: 1200px) {
    background-position: left 24px center, right 24px center;
    padding-inline: 44px;
  }
}

select option {
  padding-left: 40px;
}

select option:first-child {
  color: #666;
}

input[type="date"] {
  position: relative;
  cursor: pointer;
}

/* 전체 영역을 클릭 가능하게 만들기 */
input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>
