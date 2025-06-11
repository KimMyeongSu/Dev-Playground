<script setup>
import { reactive, ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Pagination, Navigation, Grid } from "swiper/modules";
import { useHead } from "@vueuse/head";

import { getBestTutors, setBestTutorAction } from "@/api/tutorIntroduce";
import { useRouter } from "vue-router";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/grid";
import axios from "@/plugins/axios";

useHead({
  title: "당근영어 주니어",
  meta: [
    {
      name: "title",
      content: "당근영어 주니어 | 강사소개",
    },
    {
      name: "description",
      content: "당근 영어만의 철저한 3단계 검증 프로세스로 퀄리티 높은 수업 보장!",
    },
    {
      name: "keywords",
      content: "화상영어, 전화영어, 영어회화, 원어민영어, 주니어영어, 어린이영어, 당근영어, 당근영어 주니어",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:title",
      content: "당근영어 주니어 | 강사소개",
    },
    {
      property: "og:description",
      content: "당근 영어만의 철저한 3단계 검증 프로세스로 퀄리티 높은 수업 보장!",
    },
    {
      property: "og:url",
      content: "https://carrotjunior.kr/tutorIntroduce",
    },
  ],
});

const router = useRouter();
const swiperModules = [Autoplay, Pagination, Navigation, Grid];
const allExcellentTutors = ref([]);
const excellentTutors = reactive({
  prevInfo: [],
  nextInfo: [],
});

const currentExcellentTutor = ref({});
const currentExcellentTutorOnMobile = ref({});
const bestTutor = reactive({
  contents: "",
  hit1: 0,
  hit2: 0,
  hit3: 0,
  hit4: 0,
  hit5: 0,
  idx: 0,
  intro: "",
  mainImg: "",
  subImg: "",
  title: "",
});

const getExcellentTutor = async () => {
  try {
    const { data } = await axios.get("/junior/home/getExcellentTutor");

    if (data.success) {
      return data.data;
    } else {
      throw new Error(date.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

const getRandomBestTutor = (tutors) => {
  if (!tutors || tutors.length === 0) return [];

  const randomIndex = Math.floor(Math.random() * tutors.length);
  return tutors[randomIndex];
};

const setAction = (type) => {
  try {
    const hitNo = type.slice(-1);
    const payload = { hitNo: Number(hitNo), idx: bestTutor.idx };
    setBestTutorAction(payload);

    bestTutor[type] = bestTutor[type] + 1;
  } catch (err) {
    alert("응원 보내기에 실패하였습니다.");
  }
};

const goToDetail = () => {
  router.push({ path: "tutorIntroduce/detail", query: { idx: bestTutor.idx } });
};

const onSlideChange = (swiper) => {
  const totalTutors = allExcellentTutors.value.length;
  if (totalTutors === 0) return;

  const currentIndex = swiper.realIndex;
  currentExcellentTutor.value = allExcellentTutors.value[currentIndex];

  const getIndex = (index) => (index + totalTutors) % totalTutors;

  excellentTutors.prevInfo = [
    allExcellentTutors.value[getIndex(currentIndex - 2)],
    allExcellentTutors.value[getIndex(currentIndex - 1)],
  ];

  excellentTutors.nextInfo = [
    allExcellentTutors.value[getIndex(currentIndex + 1)],
    allExcellentTutors.value[getIndex(currentIndex + 2)],
  ];
};

const onMobileSlideChange = (swiper) => {
  const totalTutors = allExcellentTutors.value.length;
  if (totalTutors === 0) return;

  const currentIndex = swiper.realIndex;
  currentExcellentTutorOnMobile.value = allExcellentTutors.value[currentIndex];
};

const bestTutorSwiperInstance = ref(null);

const onSwiperInit = (swiper) => {
  bestTutorSwiperInstance.value = swiper;
  if (allExcellentTutors.value.length > 0) {
    currentExcellentTutorOnMobile.value = allExcellentTutors.value[swiper.realIndex];
  }
};

onMounted(async () => {
  allExcellentTutors.value = await getExcellentTutor();

  const bestTutors = await getBestTutors();
  const tutor = await getRandomBestTutor(bestTutors);

  Object.assign(bestTutor, tutor);

  if (allExcellentTutors.value.length > 0) {
    currentExcellentTutorOnMobile.value = allExcellentTutors.value[0];
  }
});
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div
        class="pt-[86px] px-5 bg-[url(@/assets/img/tutor-introduce/bg-m.png)] bg-[length:1920px_326px] bg-no-repeat bg-top mb-[82px] pc:pt-[180px] pc:px-0 pc:bg-[url(@/assets/img/tutor-introduce/bg-p.png)] pc:bg-[length:1920px_572px] pc:mb-[176px]"
      >
        <div class="mx-auto tablet:max-w-[840px] pc:max-w-[1200px]">
          <p
            class="text-2xl text-[#18181B] text-center font-medium mb-[58px] tablet:text-[40px] tablet:leading-[60px] tablet:mb-[60px] pc:text-[50px] pc:leading-[66px] pc:mb-[114px]"
          >
            채용부터 평가까지 당근영어만의 철저한<br />
            <span class="font-bold">3단계 검증 프로세스</span>는 전문 강사진을 통한<br />
            퀄리티 높은 수업을 보장합니다!
          </p>

          <div class="relative">
            <ul class="relative grid grid-cols-1 gap-5 tablet:grid-cols-3 z-[1] tablet:gap-[26px] pc:gap-11">
              <li
                class="relative px-4 py-[42px] bg-white border border-solid border-[#E5E7EB] rounded-2xl overflow-hidden tablet:py-[26px] tablet:px-3.5 pc:py-[42px] pc:px-5"
              >
                <div class="absolute -translate-x-1/2 -top-[70px] left-1/2">
                  <div
                    class="bg-[#FF9016] w-[190px] size-20 blur-[70px] tablet:w-20 tablet:blur-[40px] pc:w-[100px] pc:blur-[70px]"
                  ></div>
                </div>

                <div class="relative flex justify-center mb-5 z-[1] tablet:mb-2">
                  <p
                    class="text-sm text-white font-medium px-[18px] py-2.5 bg-[#FF9016] rounded-full tablet:py-2 tablet:px-3.5 pc:text-base pc:px-6"
                  >
                    STEP 01
                  </p>
                </div>

                <p
                  class="text-[28px] text-[#18181B] text-center font-bold mb-[18px] tablet:text-2xl tablet:leading-tight pc:text-[30px] tablet:mb-3 pc:mb-5"
                >
                  채용
                </p>

                <ul class="space-y-3.5 tablet:space-y-1.5 pc:space-y-3">
                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">100% 4년제 학사 이상의 북미 원어민 강사진</p>
                  </li>

                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">
                      엄격한 채용심사 시스템<br />
                      <span class="text-sm pc:text-base">서류심사 → 시범강의 → 실무 인터뷰 → 최종 평가</span>
                    </p>
                  </li>
                </ul>
              </li>

              <li
                class="relative px-4 py-[42px] bg-white border border-solid border-[#E5E7EB] rounded-2xl overflow-hidden tablet:py-[26px] tablet:px-3.5 pc:py-[42px] pc:px-5"
              >
                <div class="absolute -translate-x-1/2 -top-[70px] left-1/2">
                  <div
                    class="bg-[#58AEF9] w-[190px] size-20 blur-[70px] tablet:w-20 tablet:blur-[40px] pc:w-[100px] pc:blur-[70px]"
                  ></div>
                </div>

                <div class="relative flex justify-center mb-5 z-[1] tablet:mb-2">
                  <p
                    class="text-sm text-white font-medium px-[18px] py-2.5 bg-[#58AEF9] rounded-full tablet:py-2 tablet:px-3.5 pc:text-base pc:px-6"
                  >
                    STEP 02
                  </p>
                </div>

                <p
                  class="text-[28px] text-[#18181B] text-center font-bold mb-[18px] tablet:text-2xl tablet:leading-tight pc:text-[30px] tablet:mb-3 pc:mb-5"
                >
                  교육
                </p>

                <ul class="space-y-3.5 tablet:space-y-1.5 pc:space-y-3">
                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">신규 강사 오리엔테이션 (전문 교육시설 보유)</p>
                  </li>

                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">교육과정 전반 사전 Mind-Set</p>
                  </li>

                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">단계별 교육 시스템에 따른 체계적이고 지속적인 강사 교육</p>
                  </li>
                </ul>
              </li>

              <li
                class="relative px-4 py-[42px] bg-white border border-solid border-[#E5E7EB] rounded-2xl overflow-hidden tablet:py-[26px] tablet:px-3.5 pc:py-[42px] pc:px-5"
              >
                <div class="absolute -translate-x-1/2 -top-[70px] left-1/2">
                  <div
                    class="bg-[#78D701] w-[190px] size-20 blur-[70px] tablet:w-20 tablet:blur-[40px] pc:w-[100px] pc:blur-[70px]"
                  ></div>
                </div>

                <div class="relative flex justify-center mb-5 z-[1] tablet:mb-2">
                  <p
                    class="text-sm text-white font-medium px-[18px] py-2.5 bg-[#78D701] rounded-full tablet:py-2 tablet:px-3.5 pc:text-base pc:px-6"
                  >
                    STEP 03
                  </p>
                </div>

                <p
                  class="text-[28px] text-[#18181B] text-center font-bold mb-[18px] tablet:text-2xl tablet:leading-tight pc:text-[30px] tablet:mb-3 pc:mb-5"
                >
                  평가
                </p>

                <ul class="space-y-3.5 tablet:space-y-1.5 pc:space-y-3">
                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">매 수업마다 강사 만족도 평가</p>
                  </li>

                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">수업 모니터링을 통한 교수법, 수업 역량 상시 평가</p>
                  </li>

                  <li class="flex gap-1">
                    <div class="flex-none size-1.5 bg-[#18181B] rounded-full mt-2 tablet:size-1 pc:size-1.5 pc:mt-2.5"></div>
                    <p class="text-[#18181B] pc:text-lg">수업시수, 근속년수</p>
                  </li>
                </ul>
              </li>
            </ul>

            <div class="hidden tablet:block">
              <div class="absolute top-1/2 left-0 -translate-y-1/2 w-full border border-dashed border-[#E5E7EB]"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-5 pc:px-0">
        <div class="mx-auto tablet:max-w-[840px] pc:max-w-[1200px]">
          <p
            class="text-4xl text-[#18181B] text-center font-bold mb-3.5 tablet:text-[42px] tablet:mb-4 pc:text-[46px] pc:mb-[22px]"
          >
            이달의 우수강사
          </p>

          <p class="text-sm text-[#7C7C8A] text-center mb-10 tablet:text-xl tablet: pc:text-2xl pc:mb-20">
            우수 강사로 선정된 강사님을 소개해 드립니다!
          </p>

          <div class="relative space-y-6 mb-[58px] tablet:hidden">
            <div class="relative overflow-hidden rounded-2xl rounded-bl-none">
              <Swiper
                ref="bestTutorSwiper"
                :pagination="{
                  el: '.slide-m-pagination',
                  clickable: true,
                }"
                :autoplay="{
                  delay: 4000,
                  disableOnInteraction: false,
                }"
                :speed="1000"
                :spaceBetween="18"
                :modules="swiperModules"
                @slideChange="onMobileSlideChange"
                @swiper="onSwiperInit"
              >
                <SwiperSlide v-for="(tutor, index) in allExcellentTutors" :key="index">
                  <img :src="tutor.subImg" alt="img" />
                </SwiperSlide>
              </Swiper>

              <div
                v-if="currentExcellentTutorOnMobile?.tutorName"
                class="absolute bottom-0 left-0 px-4 py-5 bg-white rounded-tr-2xl z-[2]"
              >
                <div class="flex items-center gap-2 mb-2.5">
                  <img src="@/assets/img/tutor-introduce/img-usa.png" alt="icon" class="w-[18px]" />
                  <p class="text-xl text-[#18181B] font-bold">{{ currentExcellentTutorOnMobile.tutorName }}</p>
                </div>

                <p class="text-[#374151]">
                  만족도 : {{ currentExcellentTutorOnMobile.score }}<br />
                  월간 피드백 수 : {{ currentExcellentTutorOnMobile.monthlyFeedback }}건
                </p>
              </div>
            </div>

            <div class="slide-m-pagination"></div>
          </div>

          <div class="hidden tablet:block mb-[90px] pc:mb-[184px]">
            <div class="flex items-start gap-[34px] tablet:justify-center tablet:gap-8">
              <div class="hidden tablet:block pc:hidden">
                <ul class="flex items-center gap-7">
                  <li v-if="excellentTutors.prevInfo[1]" class="relative w-[162px] h-[416px] rounded-2xl overflow-hidden top-11">
                    <img
                      :src="excellentTutors.prevInfo[1].subImg"
                      alt="Previous Slide"
                      class="relative w-[334px] h-full object-cover"
                    />

                    <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"></div>

                    <p class="text-lg font-bold text-white absolute left-[18px] bottom-[26px]">
                      {{ excellentTutors.prevInfo[1].tutorName }}
                    </p>
                  </li>
                </ul>
              </div>

              <div class="hidden pc:block">
                <ul class="flex items-center gap-7">
                  <li
                    v-for="(tutor, index) in excellentTutors.prevInfo"
                    :key="index"
                    class="relative w-[176px] h-[450px] rounded-2xl overflow-hidden odd:bg-[#e6d5be] even:bg-[#d1d5db] even:top-11"
                  >
                    <img :src="tutor.subImg" alt="Previous Slide" class="relative w-[334px] h-full object-cover" />

                    <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"></div>

                    <p class="text-lg font-bold text-white absolute left-[18px] bottom-[26px]">{{ tutor.tutorName }}</p>
                  </li>
                </ul>
              </div>

              <div class="space-y-8">
                <div class="relative w-[342px] h-[416px] rounded-2xl rounded-bl-none overflow-hidden pc:w-[370px] pc:h-[450px]">
                  <Swiper
                    :pagination="{ el: '.slide-pc-pagination', clickable: true }"
                    :autoplay="{ delay: 4000, disableOnInteraction: false }"
                    :speed="1000"
                    :loop="true"
                    :modules="swiperModules"
                    @slideChange="onSlideChange"
                    class="size-full"
                  >
                    <SwiperSlide
                      v-for="(tutor, index) in allExcellentTutors"
                      :key="index"
                      class="bg-no-repeat bg-bottom bg-[length:370px_450px]"
                    >
                      <img :src="tutor.subImg" alt="" class="object-cover w-full h-full" />
                    </SwiperSlide>
                    <div class="absolute bottom-0 left-0 p-[26px] bg-white rounded-tr-2xl z-[2]">
                      <div class="flex items-center gap-2 mb-2.5">
                        <img
                          v-if="currentExcellentTutor.country === 'AU'"
                          src="@/assets/img/country/AU.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'CA'"
                          src="@/assets/img/country/CA.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'CN'"
                          src="@/assets/img/country/CN.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'DE'"
                          src="@/assets/img/country/DE.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'ES'"
                          src="@/assets/img/country/ES.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'FR'"
                          src="@/assets/img/country/FR.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'ID'"
                          src="@/assets/img/country/ID.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'JP'"
                          src="@/assets/img/country/JP.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'KR'"
                          src="@/assets/img/country/KR.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'NZ'"
                          src="@/assets/img/country/NZ.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'PH'"
                          src="@/assets/img/country/PH.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'PT'"
                          src="@/assets/img/country/PT.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'RU'"
                          src="@/assets/img/country/RU.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'TH'"
                          src="@/assets/img/country/TH.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'UK'"
                          src="@/assets/img/country/UK.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'US'"
                          src="@/assets/img/country/US.png"
                          alt="icon"
                          class="w-6"
                        />
                        <img
                          v-if="currentExcellentTutor.country === 'VN'"
                          src="@/assets/img/country/VN.png"
                          alt="icon"
                          class="w-6"
                        />

                        <p class="text-[30px] text-[#18181B] font-bold">{{ currentExcellentTutor.tutorName }}</p>
                      </div>

                      <p class="text-lg text-[#374151]">
                        만족도 :
                        {{ currentExcellentTutor.score }}<br />
                        월간 피드백 수 :
                        {{ currentExcellentTutor.monthlyFeedback }}건
                      </p>
                    </div>
                  </Swiper>
                </div>

                <div class="slide-pc-pagination"></div>
              </div>

              <div class="hidden tablet:block pc:hidden">
                <ul class="flex items-center gap-7">
                  <li v-if="excellentTutors.nextInfo[0]" class="relative w-[162px] h-[416px] rounded-2xl overflow-hidden top-11">
                    <img
                      :src="excellentTutors.nextInfo[0].subImg"
                      alt="Next Slide"
                      class="relative w-[334px] h-full object-cover"
                    />

                    <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"></div>

                    <p class="text-lg font-bold text-white absolute left-[18px] bottom-[26px]">
                      {{ excellentTutors.nextInfo[0].tutorName }}
                    </p>
                  </li>
                </ul>
              </div>

              <div class="hidden pc:block">
                <ul class="flex items-center gap-7">
                  <li
                    v-for="(tutor, index) in excellentTutors.nextInfo"
                    :key="index"
                    class="relative w-[176px] h-[450px] rounded-2xl overflow-hidden odd:bg-[#e6d5be] even:bg-[#d1d5db]"
                  >
                    <img :src="tutor.subImg" alt="Next Slide" class="relative w-[334px] h-full object-cover" />

                    <div class="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-black"></div>

                    <p class="text-lg font-bold text-white absolute left-[18px] bottom-[26px]">{{ tutor.tutorName }}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-5 pc:px-0">
        <div class="mx-auto mb-[82px] tablet:max-w-[840px] pc:max-w-[1600px] pc:bg-[#1D1D1F] pc:mb-[186px] pc:rounded-[50px]">
          <div
            class="flex flex-col gap-[50px] max-w-[1200px] mx-auto bg-[#1D1D1F] pt-[60px] px-5 pb-5 rounded-[30px] tablet:py-[54px] tablet:px-6 tablet:flex-row tablet:items-end tablet:gap-8 pc:gap-[80px] pc:bg-transparent pc:px-0 pc:py-[94px] pc:rounded-none"
          >
            <div class="grow">
              <p class="text-4xl font-bold text-white mb-[50px] tablet:text-[42px] tablet:mb-8 pc:text-[46px] pc:mb-12">
                Best 강사
              </p>

              <p class="text-xl font-medium text-white mb-4 tablet:mb-2.5 pc:text-[30px] pc:mb-3.5">
                {{ bestTutor.title }}
              </p>

              <p class="text-lg font-medium text-white mb-[26px] tablet:mb-3.5">
                {{ bestTutor.intro }}
              </p>

              <p class="text-sm text-[#B6BAC3] line-clamp-[12] mb-[30px] tablet:line-clamp-6 pc:text-base">
                {{ bestTutor.contents }}
              </p>

              <ul class="flex flex-wrap gap-x-2 gap-y-3 tablet:grid tablet:grid-cols-5 tablet:gap-2 tablet:max-w-[472px] pc:flex">
                <li
                  @click="setAction('hit1')"
                  class="flex-none w-[82px] flex justify-between items-center gap-1.5 px-1.5 py-1 border border-solid border-[#6B7280] rounded-full cursor-pointer tablet:w-auto pc:w-[88px]"
                >
                  <img src="@/assets/img/tutor-introduce/best1.png" alt="icon" class="w-[22px]" />

                  <p class="text-sm font-medium text-white pc:text-base">
                    {{ bestTutor.hit1 }}
                  </p>
                </li>

                <li
                  @click="setAction('hit2')"
                  class="flex-none w-[82px] flex justify-between items-center gap-1.5 px-1.5 py-1 border border-solid border-[#6B7280] rounded-full cursor-pointer tablet:w-auto pc:w-[88px]"
                >
                  <img src="@/assets/img/tutor-introduce/best2.png" alt="icon" class="w-[22px]" />

                  <p class="text-sm font-medium text-white pc:text-base">
                    {{ bestTutor.hit2 }}
                  </p>
                </li>

                <li
                  @click="setAction('hit3')"
                  class="flex-none w-[82px] flex justify-between items-center gap-1.5 px-1.5 py-1 border border-solid border-[#6B7280] rounded-full cursor-pointer tablet:w-auto pc:w-[88px]"
                >
                  <img src="@/assets/img/tutor-introduce/best3.png" alt="icon" class="w-[22px]" />

                  <p class="text-sm font-medium text-white pc:text-base">
                    {{ bestTutor.hit3 }}
                  </p>
                </li>

                <li
                  @click="setAction('hit4')"
                  class="flex-none w-[82px] flex justify-between items-center gap-1.5 px-1.5 py-1 border border-solid border-[#6B7280] rounded-full cursor-pointer tablet:w-auto pc:w-[88px]"
                >
                  <img src="@/assets/img/tutor-introduce/best4.png" alt="icon" class="w-[22px]" />

                  <p class="text-sm font-medium text-white pc:text-base">
                    {{ bestTutor.hit4 }}
                  </p>
                </li>

                <li
                  @click="setAction('hit5')"
                  class="flex-none w-[82px] flex justify-between items-center gap-1.5 px-1.5 py-1 border border-solid border-[#6B7280] rounded-full cursor-pointer tablet:w-auto pc:w-[88px]"
                >
                  <img src="@/assets/img/tutor-introduce/best5.png" alt="icon" class="w-[22px]" />

                  <p class="text-sm font-medium text-white pc:text-base">
                    {{ bestTutor.hit5 }}
                  </p>
                </li>
              </ul>
            </div>

            <div
              class="relative overflow-hidden rounded-2xl aspect-square tablet:flex-none tablet:max-w-[196px] tablet:max-h-[252px] tablet:aspect-auto pc:size-[434px] pc:max-w-full pc:max-h-full"
            >
              <img :src="bestTutor.mainImg" alt="icon" class="size-full object-cover" />

              <img
                @click="goToDetail"
                src="@/assets/img/tutor-introduce/best-go.png"
                alt="icon"
                class="absolute top-3.5 right-2.5 w-[38px] cursor-pointer pc:w-[50px] pc:top-[18px] pc:right-[18px]"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="max-w-[1200px] mx-auto pb-[104px] px-5 pc:pb-[154px] pc:px-0">
        <p
          class="text-4xl text-[#18181B] text-center font-bold leading-[44px] mb-3.5 tablet:text-[42px] tablet:mb-4 pc:text-[46px] pc:mb-[18px]"
        >
          북미 원어민 강사진? <br class="tablet:hidden" />
          당근 실력 있지!
        </p>

        <p class="text-sm text-[#7C7C8A] text-center mb-10 tablet:text-xl tablet:mb-[60px] pc:text-2xl pc:mb-[68px]">
          수업만족도를 높여주는 전문적인 경험과 <br class="tablet:hidden" />
          영어권 문화까지 한번에!
        </p>

        <!-- 강사진 mobile 슬라이드 -->
        <div class="-mx-5 pc:hidden">
          <Swiper
            :slidesPerView="'auto'"
            :centeredSlides="true"
            :spaceBetween="54"
            :navigation="{
              prevEl: '.slide-m-navigation-prev',
              nextEl: '.slide-m-navigation-next',
            }"
            :speed="1000"
            :autoplay="{
              delay: 4000,
              disableOnInteraction: false,
            }"
            :modules="swiperModules"
            class="mb-3.5"
          >
            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t1.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jenna Co</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#고전문학석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Master of Arts in Classics, Western University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t2.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alex C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#McMasterUniversity석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                McMaster University - Hamilton, ON<br />
                London Language Institute - London, ON
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t3.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kayle T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">EARLY CHILDHOOD EDUCATION - DURHAM COLLEGE</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t4.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jesse B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Biology/Science</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in French - University of Regina</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t5.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Joel T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Linguistics</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">UNIVERSITY OF WINNIPEG- BACHELORS ARTS / LINGUISTICS</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t6.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kristen M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Nursing/Medical</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Science in Nursing, Cape Breton University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t7.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Allison G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Honours Bachelor of Arts Degree Gerontology, McMaster University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t8.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Aaron T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ComputerScience</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Psychology</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of toronto - Computer Science and Psychology</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t9.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jo-Anne S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#BusinessAdministration</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Science in Business Administration, California State University
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t10.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Veronica T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL/TESL/TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Doctor of Philosophy, University of Calgary</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t11.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Stephanie M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <p class="text-sm text-[#6B7280] text-center">Ryerson University Innovation & Technology석사</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t12.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Donald S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 18년이상</p>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of History and Multimedia, McMaster University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t13.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">John P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL/TESL/TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bsc Occupational and Public Health & Safety, Ryerson University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t14.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Chris M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL보유</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#철학 박사학위 보유</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">DOCTOR OF PHILOSOPHY (PH.D), UNIVERSITY OF SASKATCHEWAN</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t15.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Hamida R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, major in Law, Carleton University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t16.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alison S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <p class="text-sm text-[#6B7280] text-center">PhD English, Arizona State University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t17.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Christine G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#성인교육학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#21년 4월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Walden University, Master of Science in Adult Education</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t18.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Richard E</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#2017년 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Calgary - Bachelor of Arts, Psychology</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t19.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kena F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 5월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BS, Industrial Engineering, University of Texas</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t20.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Daniel G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 5월 우수수업 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Education & Psychology - Arkansas State University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t21.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Liz M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 4월 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 8월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Anthropology University of Guadalajara - Business Administration</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t22.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Aimee P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 6월 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 10월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Science Elementary Education - Troy University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t23.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Wendell A</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 12월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BS Psychology, Skyline College/University of San Francisco</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t24.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Emily H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 2년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#신문방송학 석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Swansea University, Master's Degree: Communication, Media Practise & PR
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t25.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kate S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 7월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Temple University, Bachelor of Arts in Religion, Minor in Art History
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t26.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Mathew K</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 17년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS 시험 감독관</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in English Writing, The University of South Carolina
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t27.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Greg B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 25년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, European Administration with French & German</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t28.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Stina M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in Education- English, Northeastern State University
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t29.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Edward K</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 5월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                BA Communication Science, University of Connecticut 120 hour TESOL Certificate
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t30.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nicholas R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 12월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Waterloo_Bachelor of Arts, Political Science Mohawk College_Business Analysis
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t31.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nathan B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 20년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#응용언어학석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 12월 우수수업 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">MA, Applied Linguistics, Arizona State University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t32.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">George Br</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#영어학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in English Language, Manchester University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t33.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Bianca S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 3월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in International Studeis, Colorado State University
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t34.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Breana B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 7월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor's in Japanese Language and Literature, UMass Amherst</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t35.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Vicki R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 21년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 2월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Victoria (British Columbia) - B.A in Writing, specialization poetry/playwriting
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t36.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Shea S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 6월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BC, Technology Management, Thompson Rivers University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t37.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Bernie D</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BA, Psychology, University of Regina (Regina, Canada)</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t38.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nikki P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년7월우수강사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#LAW전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Technology_Bachelor's Degree in Law</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t39.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Andy P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Teaching자격증</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년7월루키강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Toronto - Bachelor of Arts,Commerce</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t40.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Daineal M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#방송학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Mount Royal University, Broadcast Media Studies</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t41.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Katherine L</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of South Florida, Bachelor of Science in Music Education
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t42.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">David S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, Sociology, Florida Atlantic University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t43.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Christopher C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Ormskirk and Skelmersdale College, BTEC National Diploma Computer Studies
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t44.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Rochelle K</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of South Africa, Law</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t45.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Joseph P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 20년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Cornell College - Bachelor of Arts in Psychology</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t46.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Luke S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Dundee Institute of Technology, Dundee, Tayside, Scotland- Bachelor of Arts, Psycholoy
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t47.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Eric B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 2년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University College Cork, Master of Arts, Positive Psychology & Coaching
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t48.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jenna T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Varsity College Westville, Bachelor of Commerce majoring in Business and Marketing
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t49.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Lucky H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Anglia Ruskin University, Honors Bachelor of Arts in International Business Strategy
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t50.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nataly M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">
                  #Digital Media and Journalism
                </li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Honours Bachelor of Arts in Digital Media and Journalism, Wilfrid Laurier University
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t51.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alec V</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 1월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in History, University of Canterbury</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t52.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alex S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 9월 우수수업 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">2:1 BA History- University of Leicester</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t53.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Brady M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#그래픽디자인전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Science, Graphic Design, Troy University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t54.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Cassandra R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 11월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts: Multi Disciplined, University of Guelph</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t55.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Chris DM</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 5월 우수수업 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Honors Bachelor of Arts&Communication, University of Toronto</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t56.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Chris W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Science : Elementary education, Appalachian State University
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t57.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Colin G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 7월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">MA in Early Childhood Education, Roehampton University London UK</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t58.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Cyneitha M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#전기공학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Electrical Engineering, Minor: English, SOUTHERN UNIVERSITY A & M</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t59.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">David E</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 8월 루키강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">MA in Latin and Spanish (Honours), University of St Andrews</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t60.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Diego C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#컴퓨터공학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Computer Science, University of Texas(Austin, Texas)</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t61.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Dixon W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 10월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Kent State University _ Bachelor of Arts Degree in English Literature
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t62.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Elaine V</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#박사학위</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts, History and Education, Southern Wesleyan University
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t63.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Francessca C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#생물학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Oklahoma Wesleyan University (Aug 2013 to May 2015) - Bachelor of Science
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t64.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Ian M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Western University_MA English</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t65.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Joel D</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 4월 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Oregon_B.A. in Humanities</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t66.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Laura B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#법학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#박사학위</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Georgia State University, College of Law, Juris Doctor</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t67.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Maria R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TE니</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                BA Classical and Oriental Studies, Hunter College of the City University of New York
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t68.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Michael M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 3월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Graduate of Queens College, the City University of New York, Master of Science in Education
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t69.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Paul D</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#고대역사전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사학위</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, Major in Ancient History_Macquarie University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t70.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Sibel E</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 1월 루키강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Political Science and Russian Double Major, University of Victoria</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t71.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Trenton T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#컴퓨터공학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Troy University Bachelor's Degree in Computer Science</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t72.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Dallen L</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Portland Community College (PCC), Oregon, USA</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t73.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Samuel G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#글로벌경영전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BA honours degree, Global Business</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t74.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Carolina H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Art Center College of Design_B.S in Product Design</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t75.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jeff R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Centennial College_Biotechnology College</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t76.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jorge G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of California_Education</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t77.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Andrew H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#정치학과전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 7월 우수강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Wheeling Jesuit University,Political Science</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t78.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">John T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL경력강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Conestoga College_Police Foundation Voiceworks Kitchener Ontario</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t79.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Matthew R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#철학과전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in Philosophy and Religious Studies, Tyndale University College
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t80.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Amanda MA</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#철학과전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Western Michigan University_M.A_Philosophy</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t81.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Leola M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL경력강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Grand Canyon University Master's Degree of Education in TESOL</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t82.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Greg M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of New England_Bachelor of Commerce</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t83.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">LaVeeia W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Westwood College of Technology_Applied Science</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t84.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">James P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#비즈니스영어</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Hawaii Community College-Associates</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t85.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jimi Mc</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#전기전자공학과전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                North Carolina State University, Bachelor of Arts in Electrical Engineering
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t86.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Gordon F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#박사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Edinburgh, Master Scince of Philosophy</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t87.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">John F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 15년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Pittsburgh, Bachelor of Arts and Sciences in Sociology
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t88.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Ben B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#미술사학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Minnesota, Minneapolis- Bachelor of Arts</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t89.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Estelle F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Leeds University, Bachelor of Science, Psychology</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t90.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Philip C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 24년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">M. Ed Curriculum and Instruction UNB Fredericton</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t91.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Paul N</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                BA in Science, Social work and Education, OPEN UNIVERSITY of BRISTOL
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t92.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Monica A</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 14년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                United States Institute of Language and Clerical Studies_ Principles and Methods of language Education
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t93.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Elizabeth T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL경력강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Georgia, Bachelor of Arts in English Language and Literature, and Japanese Language and Literature
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t94.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Carmen C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Toeicspeaking</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Cincinnati- Bachelor of Fine Arts in Electronic Media
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t95.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jess I</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 17년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                AUSTIN COMMUNITY COLLEGE, Bachelor of Secondary Education, Major in Mathematics
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t96.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Ronald G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in Sociology, South Carolina State University</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t97.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Isabella P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Kingston School of Art, Bachelor of Ats in Fashion Design</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t98.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jeff B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 19년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Charter University Online at charter.university Bachelor of Arts in English
              </p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t99.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Lizbeth T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor's Degree in Education, University of California Berkeley</p>
            </SwiperSlide>

            <SwiperSlide class="!w-[200px]">
              <img src="@/assets/img/tutor-introduce/tutor-list/t100.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Noreen W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS시험준비강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of East London, Bachelor of Arts in Commerce</p>
            </SwiperSlide>
          </Swiper>

          <ul class="flex justify-center slide-m-navigation gap-9">
            <li class="slide-m-navigation-prev w-[50px]">
              <img src="@/assets/img/tutor-introduce/arrow-prev.png" alt="icon" />
            </li>

            <li class="slide-m-navigation-next w-[50px]">
              <img src="@/assets/img/tutor-introduce/arrow-next.png" alt="icon" />
            </li>
          </ul>
        </div>

        <!-- 강사진 pc 슬라이드 -->
        <div
          class="hidden pc:block pc:relative pc:before:content-[''] pc:before:w-10 pc:before:h-full pc:before:bg-gradient-to-r pc:before:from-white pc:before:to-transparent pc:before:absolute pc:before:top-0 pc:before:left-0 pc:before:z-[2] pc:after:content-[''] pc:after:w-10 pc:after:h-full pc:after:bg-gradient-to-l pc:after:from-white pc:after:to-transparent pc:after:absolute pc:after:top-0 pc:after:right-0 pc:after:z-[2]"
        >
          <Swiper
            :slidesPerView="5"
            :slidesPerGroup="5"
            :spaceBetween="62"
            :navigation="{
              prevEl: '.slide-pc-navigation-prev',
              nextEl: '.slide-pc-navigation-next',
            }"
            :grid="{
              rows: 2,
              fill: 'row',
            }"
            :speed="1000"
            :autoplay="{
              delay: 9000,
              disableOnInteraction: false,
            }"
            :loop="false"
            :rewind="true"
            :modules="swiperModules"
            class="mb-[74px]"
          >
            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t1.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jenna Co</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#고전문학석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Master of Arts in Classics, Western University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t2.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alex C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#McMasterUniversity석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                McMaster University - Hamilton, ON<br />
                London Language Institute - London, ON
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t3.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kayle T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">EARLY CHILDHOOD EDUCATION - DURHAM COLLEGE</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t4.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jesse B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Biology/Science</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in French - University of Regina</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t5.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Joel T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Linguistics</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">UNIVERSITY OF WINNIPEG- BACHELORS ARTS / LINGUISTICS</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t6.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kristen M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Nursing/Medical</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Science in Nursing, Cape Breton University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t7.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Allison G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Honours Bachelor of Arts Degree Gerontology, McMaster University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t8.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Aaron T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ComputerScience</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Psychology</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of toronto - Computer Science and Psychology</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t9.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jo-Anne S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#BusinessAdministration</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Science in Business Administration, California State University
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t10.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Veronica T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL/TESL/TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Doctor of Philosophy, University of Calgary</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t11.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Stephanie M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <p class="text-sm text-[#6B7280] text-center">Ryerson University Innovation & Technology석사</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t12.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Donald S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 18년이상</p>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of History and Multimedia, McMaster University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t13.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">John P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL/TESL/TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bsc Occupational and Public Health & Safety, Ryerson University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t14.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Chris M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL보유</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#철학 박사학위 보유</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">DOCTOR OF PHILOSOPHY (PH.D), UNIVERSITY OF SASKATCHEWAN</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t15.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Hamida R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, major in Law, Carleton University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t16.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alison S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <p class="text-sm text-[#6B7280] text-center">PhD English, Arizona State University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t17.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Christine G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#성인교육학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#21년 4월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Walden University, Master of Science in Adult Education</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t18.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Richard E</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#2017년 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Calgary - Bachelor of Arts, Psychology</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t19.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kena F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 5월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BS, Industrial Engineering, University of Texas</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t20.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Daniel G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 5월 우수수업 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Education & Psychology - Arkansas State University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t21.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Liz M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 4월 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 8월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Anthropology University of Guadalajara - Business Administration</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t22.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Aimee P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 6월 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 10월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Science Elementary Education - Troy University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t23.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Wendell A</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 12월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BS Psychology, Skyline College/University of San Francisco</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t24.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Emily H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 2년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#신문방송학 석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Swansea University, Master's Degree: Communication, Media Practise & PR
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t25.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Kate S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 7월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Temple University, Bachelor of Arts in Religion, Minor in Art History
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t26.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Mathew K</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 17년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS 시험 감독관</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in English Writing, The University of South Carolina
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t27.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Greg B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 25년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, European Administration with French & German</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t28.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Stina M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in Education- English, Northeastern State University
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t29.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Edward K</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 5월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                BA Communication Science, University of Connecticut 120 hour TESOL Certificate
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t30.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nicholas R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 12월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Waterloo_Bachelor of Arts, Political Science Mohawk College_Business Analysis
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t31.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nathan B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 20년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#응용언어학석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 12월 우수수업 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">MA, Applied Linguistics, Arizona State University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t32.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">George Br</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#영어학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in English Language, Manchester University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t33.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Bianca S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 3월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in International Studeis, Colorado State University
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t34.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Breana B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 7월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor's in Japanese Language and Literature, UMass Amherst</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t35.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Vicki R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 21년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 2월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Victoria (British Columbia) - B.A in Writing, specialization poetry/playwriting
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t36.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Shea S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 6월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BC, Technology Management, Thompson Rivers University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t37.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Bernie D</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BA, Psychology, University of Regina (Regina, Canada)</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t38.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nikki P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년7월우수강사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#LAW전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Technology_Bachelor's Degree in Law</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t39.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Andy P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Teaching자격증</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년7월루키강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Toronto - Bachelor of Arts,Commerce</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t40.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Daineal M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#방송학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Mount Royal University, Broadcast Media Studies</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t41.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Katherine L</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of South Florida, Bachelor of Science in Music Education
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t42.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">David S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, Sociology, Florida Atlantic University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t43.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Christopher C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Ormskirk and Skelmersdale College, BTEC National Diploma Computer Studies
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t44.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Rochelle K</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of South Africa, Law</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t45.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Joseph P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 20년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Cornell College - Bachelor of Arts in Psychology</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t46.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Luke S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Dundee Institute of Technology, Dundee, Tayside, Scotland- Bachelor of Arts, Psycholoy
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t47.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Eric B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 2년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University College Cork, Master of Arts, Positive Psychology & Coaching
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t48.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jenna T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Varsity College Westville, Bachelor of Commerce majoring in Business and Marketing
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t49.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Lucky H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Anglia Ruskin University, Honors Bachelor of Arts in International Business Strategy
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t50.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Nataly M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">
                  #Digital Media and Journalism
                </li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Honours Bachelor of Arts in Digital Media and Journalism, Wilfrid Laurier University
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t51.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alec V</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 1월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in History, University of Canterbury</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t52.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Alex S</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 9월 우수수업 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">2:1 BA History- University of Leicester</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t53.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Brady M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#그래픽디자인전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Science, Graphic Design, Troy University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t54.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Cassandra R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 11월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts: Multi Disciplined, University of Guelph</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t55.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Chris DM</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 5월 우수수업 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Honors Bachelor of Arts&Communication, University of Toronto</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t56.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Chris W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Science : Elementary education, Appalachian State University
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t57.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Colin G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 7월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">MA in Early Childhood Education, Roehampton University London UK</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t58.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Cyneitha M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#전기공학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Electrical Engineering, Minor: English, SOUTHERN UNIVERSITY A & M</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t59.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">David E</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 8월 루키강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">MA in Latin and Spanish (Honours), University of St Andrews</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t60.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Diego C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#컴퓨터공학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Computer Science, University of Texas(Austin, Texas)</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t61.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Dixon W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 10월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Kent State University _ Bachelor of Arts Degree in English Literature
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t62.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Elaine V</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 13년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#박사학위</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts, History and Education, Southern Wesleyan University
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t63.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Francessca C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#생물학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Oklahoma Wesleyan University (Aug 2013 to May 2015) - Bachelor of Science
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t64.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Ian M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Western University_MA English</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t65.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Joel D</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#23년 4월 우수강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Oregon_B.A. in Humanities</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t66.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Laura B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#법학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#박사학위</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Georgia State University, College of Law, Juris Doctor</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t67.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Maria R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TE니</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                BA Classical and Oriental Studies, Hunter College of the City University of New York
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t68.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Michael M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 3월 우수강사 선정</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Graduate of Queens College, the City University of New York, Master of Science in Education
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t69.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Paul D</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#고대역사전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사학위</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts, Major in Ancient History_Macquarie University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t70.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Sibel E</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#22년 1월 루키강사 선정</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Political Science and Russian Double Major, University of Victoria</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t71.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Trenton T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#컴퓨터공학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Troy University Bachelor's Degree in Computer Science</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t72.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Dallen L</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Portland Community College (PCC), Oregon, USA</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t73.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Samuel G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 3년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#글로벌경영전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">BA honours degree, Global Business</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t74.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Carolina H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Art Center College of Design_B.S in Product Design</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t75.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jeff R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Centennial College_Biotechnology College</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t76.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jorge G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of California_Education</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t77.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Andrew H</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#정치학과전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#24년 7월 우수강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Wheeling Jesuit University,Political Science</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t78.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">John T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL경력강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Conestoga College_Police Foundation Voiceworks Kitchener Ontario</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t79.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Matthew R</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#철학과전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Bachelor of Arts in Philosophy and Religious Studies, Tyndale University College
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t80.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Amanda MA</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#철학과전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Western Michigan University_M.A_Philosophy</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t81.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Leola M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL경력강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Grand Canyon University Master's Degree of Education in TESOL</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t82.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Greg M</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 8년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of New England_Bachelor of Commerce</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t83.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">LaVeeia W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Westwood College of Technology_Applied Science</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t84.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">James P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 7년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#비즈니스영어</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Hawaii Community College-Associates</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t85.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jimi Mc</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#전기전자공학과전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                North Carolina State University, Bachelor of Arts in Electrical Engineering
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t86.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Gordon F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 9년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#CELTA</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#박사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Edinburgh, Master Scince of Philosophy</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t87.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">John F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 15년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Pittsburgh, Bachelor of Arts and Sciences in Sociology
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t88.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Ben B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 5년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#미술사학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of Minnesota, Minneapolis- Bachelor of Arts</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t89.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Estelle F</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#심리학전공</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Leeds University, Bachelor of Science, Psychology</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t90.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Philip C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 24년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#석사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">M. Ed Curriculum and Instruction UNB Fredericton</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t91.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Paul N</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                BA in Science, Social work and Education, OPEN UNIVERSITY of BRISTOL
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t92.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Monica A</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 14년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                United States Institute of Language and Clerical Studies_ Principles and Methods of language Education
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t93.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Elizabeth T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 11년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL경력강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Georgia, Bachelor of Arts in English Language and Literature, and Japanese Language and Literature
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t94.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Carmen C</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 10년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#Toeicspeaking</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                University of Cincinnati- Bachelor of Fine Arts in Electronic Media
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t95.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jess I</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 17년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                AUSTIN COMMUNITY COLLEGE, Bachelor of Secondary Education, Major in Mathematics
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t96.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Ronald G</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 12년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor of Arts in Sociology, South Carolina State University</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t97.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Isabella P</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 1년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Kingston School of Art, Bachelor of Ats in Fashion Design</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t98.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Jeff B</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 19년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#ESL강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">
                Charter University Online at charter.university Bachelor of Arts in English
              </p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t99.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Lizbeth T</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 4년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#교육학전공</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TEFL</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">Bachelor's Degree in Education, University of California Berkeley</p>
            </SwiperSlide>

            <SwiperSlide>
              <img src="@/assets/img/tutor-introduce/tutor-list/t100.png" alt="img" class="mb-5" />

              <p class="text-xl text-[#18181B] text-center font-bold mb-1">Noreen W</p>

              <p class="text-[#FF9016] text-center font-medium mb-2">경력 6년이상</p>

              <ul class="flex justify-center gap-1.5 flex-wrap mb-3">
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#TESOL</li>
                <li class="text-sm text-[#374151] font-medium px-2 py-1.5 bg-[#F3F4F6] rounded-full">#IELTS시험준비강사경력</li>
              </ul>

              <p class="text-sm text-[#6B7280] text-center">University of East London, Bachelor of Arts in Commerce</p>
            </SwiperSlide>
          </Swiper>

          <ul class="flex justify-center gap-10 slide-pc-navigation">
            <li class="slide-pc-navigation-prev w-[58px] cursor-pointer">
              <img src="@/assets/img/tutor-introduce/arrow-prev.png" alt="icon" />
            </li>

            <li class="slide-pc-navigation-next w-[58px] cursor-pointer">
              <img src="@/assets/img/tutor-introduce/arrow-next.png" alt="icon" />
            </li>
          </ul>
        </div>
      </div>
    </main>

    <compFooter />
  </div>
</template>
<style scoped lang="scss">
:deep(.slide-m-pagination) {
  position: relative;
  inset: unset;
  display: flex;
  justify-content: center;
  gap: 6px;

  .swiper-pagination-bullet {
    width: 6px;
    height: 6px;
    background-color: #d8d8e1;
    opacity: 1;
    margin: 0;

    &.swiper-pagination-bullet-active {
      background-color: #7c7c8a;
    }
  }
}

:deep(.slide-pc-pagination) {
  position: relative;
  inset: unset;
  display: flex;
  justify-content: center;
  gap: 8px;

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
    background-color: #d8d8e1;
    opacity: 1;
    margin: 0;

    &.swiper-pagination-bullet-active {
      background-color: #7c7c8a;
    }
  }
}
</style>
