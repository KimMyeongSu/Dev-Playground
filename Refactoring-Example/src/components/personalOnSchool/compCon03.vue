<script setup>
import { ref, reactive } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { riseLists, edgeLists, summitLists } from "@/components/personalOnSchool/js/bookInfoMeta";
import compCon03BookType1 from "@/components/personalOnSchool/compCon03BookType1.vue";
import compCon03BookType2 from "@/components/personalOnSchool/compCon03BookType2.vue";
import compCon03BookType3 from "@/components/personalOnSchool/compCon03BookType3.vue";
import compCon03BookType4 from "@/components/personalOnSchool/compCon03BookType4.vue";

const swiperModules = [Autoplay, Navigation];

const activePersonalTab = ref(0);
const personalTabs = [
  { title: "RISE", gradeM: "초1~3", gradeP: "초등 1~3학년" },
  { title: "EDGE", gradeM: "초4~5", gradeP: "초등 4~5학년" },
  { title: "SUMMIT", gradeM: "초6~중3", gradeP: "초등 6학년~중등 3학년" },
];
const showDetail = (item) => {
  console.log(item);
};

const bookType = reactive({
  isOpen: false,
  bookInfo: {},
  personalTabs: {},
  popupType: 0,
  popupOpen: (item) => {
    if (item.imageList?.length > 0) {
      console.log("popupOpen", bookType);
      bookType.bookInfo = item;
      bookType.popupType = item.popupType;
      bookType.personalTabs = personalTabs[activePersonalTab.value];
      bookType.isOpen = true;
    }
  },
  popupClose: () => {
    bookType.bookInfo = {};
    bookType.popupType = 0;
    bookType.personalTabs = {};
    bookType.isOpen = false;
  },
});
</script>

<template>
  <article class="con03">
    <div class="py-20 px-[18px] tablet:bg-[#F7F7F7] tablet:pt-[90px] tablet:pb-[120px] pc:pt-[120px] pc:pb-[170px] pc:px-0">
      <p class="text-[34px] text-center font-bold mb-3.5 tablet:text-[42px] tablet:mb-4 pc:text-[54px] pc:mb-[22px]">
        레벨별 구성
      </p>

      <p class="text-center leading-6 mb-10 tablet:text-xl tablet:mb-11 pc:text-2xl pc:leading-[34px] pc:mb-14">
        우리 자녀의 레벨과 학습 목적, 성향에 맞는<br />
        100% 맞춤형 학습 로드맵 설계가 가능합니다!
      </p>

      <ul class="grid grid-cols-3 gap-3.5 mb-6 tablet:gap-[26px] tablet:w-[688px] tablet:mx-auto tablet:mb-[38px] pc:mb-[54px]">
        <li
          v-for="(tab, index) in personalTabs"
          :key="index"
          @click="activePersonalTab = index"
          :class="[activePersonalTab === index ? 'bg-[#FF6714]' : 'bg-[#E4E6EA]']"
          class="relative flex justify-center items-center rounded-2xl aspect-square group cursor-pointer tablet:aspect-auto tablet:py-5 tablet:rounded-3xl"
        >
          <div class="space-y-1 pc:space-y-0">
            <p
              :class="[activePersonalTab === index ? 'text-xl text-white tablet:text-2xl' : 'text-[#424242] tablet:text-[22px]']"
              class="text-lg text-center font-bold leading-tight group-hover:tablet:text-2xl"
            >
              {{ tab.title }}
            </p>

            <div class="tablet:hidden">
              <p
                :class="[activePersonalTab === index ? ' text-white' : 'text-[#6D7076]']"
                class="text-sm text-center font-medium leading-tight"
              >
                {{ tab.gradeM }}
              </p>
            </div>

            <div class="hidden tablet:block">
              <p :class="[activePersonalTab === index ? ' text-white' : 'text-[#6D7076]']" class="text-center leading-tight">
                {{ tab.gradeP }}
              </p>
            </div>
          </div>
        </li>
      </ul>

      <ul class="tablet:max-w-[840px] tablet:mx-auto pc:max-w-[1200px]">
        <li v-show="activePersonalTab === 0">
          <ul class="grid grid-cols-1 gap-3.5 tablet:grid-cols-2 pc:grid-cols-3 pc:gap-x-4 pc:gap-y-[18px]">
            <li
              @click="bookType.popupOpen(item)"
              v-for="(item, index) in riseLists"
              :key="index"
              class="pt-4 pb-[18px] pl-[18px] pr-4 bg-white border border-solid border-[#E4E6EA] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] tablet:pt-5 tablet:pr-[18px] tablet:pb-[26px] tablet:pl-7"
              :class="[item.imageList?.length > 0 ? 'cursor-pointer more' : 'cursor-default']"
            >
              <div class="flex justify-between items-center mb-3.5">
                <ul class="flex flex-wrap gap-2">
                  <li class="text-sm text-[#FF6714] py-1 px-2.5 bg-[#FFE8DC] rounded-full">{{ item.ar }}</li>
                  <li class="text-sm text-[#FF6714] py-1 px-2.5 bg-[#FFE8DC] rounded-full">{{ item.month }}</li>
                </ul>

                <div class="flex-none w-8 cursor-pointer">
                  <img
                    v-if="item.imageList?.length > 0"
                    src="@/assets/img/personal-on-school/con03/more.png"
                    alt=""
                    class="more-icon"
                  />
                  <img v-else src="@/assets/img/personal-on-school/con03/more-no.png" alt="" class="" />
                </div>
              </div>

              <div class="space-y-2.5 pc:pr-2.5">
                <p class="text-xl font-bold whitespace-pre-line">{{ item.title }}</p>

                <p class="text-[#6D7076] leading-6 whitespace-pre-line">{{ item.sub }}</p>
              </div>
            </li>
          </ul>
        </li>

        <li v-show="activePersonalTab === 1">
          <ul class="grid grid-cols-1 gap-3.5 tablet:grid-cols-2 pc:grid-cols-3 pc:gap-x-4 pc:gap-y-[18px]">
            <li
              @click="bookType.popupOpen(item)"
              v-for="(item, index) in edgeLists"
              :key="index"
              class="pt-4 pb-[18px] pl-[18px] pr-4 bg-white border border-solid border-[#E4E6EA] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] tablet:pt-5 tablet:pr-[18px] tablet:pb-[26px] tablet:pl-7"
              :class="[item.imageList?.length > 0 ? 'cursor-pointer more' : 'cursor-default']"
            >
              <div class="flex justify-between items-center mb-3.5">
                <ul class="flex flex-wrap gap-2">
                  <li class="text-sm text-[#FF6714] py-1 px-2.5 bg-[#FFE8DC] rounded-full">{{ item.ar }}</li>
                  <li class="text-sm text-[#FF6714] py-1 px-2.5 bg-[#FFE8DC] rounded-full">{{ item.month }}</li>
                </ul>

                <div class="flex-none w-8">
                  <img
                    v-if="item.imageList?.length > 0"
                    src="@/assets/img/personal-on-school/con03/more.png"
                    alt=""
                    class="more-icon"
                  />
                  <img v-else src="@/assets/img/personal-on-school/con03/more-no.png" alt="" class="" />
                </div>
              </div>

              <div class="space-y-2.5 pc:pr-2.5">
                <p class="text-xl font-bold whitespace-pre-line">{{ item.title }}</p>

                <p class="text-[#6D7076] leading-6 whitespace-pre-line">{{ item.sub }}</p>
              </div>
            </li>
          </ul>
        </li>

        <li v-show="activePersonalTab === 2">
          <ul class="grid grid-cols-1 gap-3.5 tablet:grid-cols-2 pc:grid-cols-3 pc:gap-x-4 pc:gap-y-[18px]">
            <li
              @click="bookType.popupOpen(item)"
              v-for="(item, index) in summitLists"
              :key="index"
              :class="[item.imageList?.length > 0 ? 'cursor-pointer more' : 'cursor-default']"
              class="pt-4 pb-[18px] pl-[18px] pr-4 bg-white border border-solid border-[#E4E6EA] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.03)] tablet:pt-5 tablet:pr-[18px] tablet:pb-[26px] tablet:pl-7"
            >
              <div class="flex justify-between items-center mb-3.5">
                <ul class="flex flex-wrap gap-2">
                  <li
                    :class="[item.ar === '준비중입니다' ? 'text-[#6D7076] bg-[#E4E6EA]' : 'text-[#FF6714] bg-[#FFE8DC]']"
                    class="text-sm py-1 px-2.5 rounded-full"
                  >
                    {{ item.ar }}
                  </li>
                  <li v-if="item.ar !== '준비중입니다'" class="text-sm text-[#FF6714] py-1 px-2.5 bg-[#FFE8DC] rounded-full">
                    {{ item.month }}
                  </li>
                  <li v-if="item.new" class="text-sm text-[#FF1414] font-bold py-1 px-2.5 bg-[#FFE14A] rounded-full">NEW</li>
                </ul>

                <div class="flex-none w-8">
                  <img
                    v-if="item.imageList?.length > 0"
                    src="@/assets/img/personal-on-school/con03/more.png"
                    alt=""
                    class="more-icon"
                  />
                  <img v-else src="@/assets/img/personal-on-school/con03/more-no.png" alt="" class="" />
                </div>
              </div>

              <div class="space-y-2.5 pc:pr-2.5">
                <p :class="[item.ar === '준비중입니다' ? 'text-[#6D7076]' : '']" class="text-xl font-bold whitespace-pre-line">
                  {{ item.title }}
                </p>

                <p class="text-[#6D7076] leading-6 whitespace-pre-line">{{ item.sub }}</p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </article>

  <compCon03BookType1
    v-if="bookType.popupType == 1"
    :isOpen="bookType.isOpen"
    :bookInfo="bookType.bookInfo"
    :personalTabs="bookType.personalTabs"
    :key="bookType.isOpen"
    @update:close="bookType.popupClose"
  />
  <compCon03BookType2
    v-if="bookType.popupType == 2"
    :isOpen="bookType.isOpen"
    :bookInfo="bookType.bookInfo"
    :personalTabs="bookType.personalTabs"
    :key="bookType.isOpen"
    @update:close="bookType.popupClose"
  />
  <compCon03BookType3
    v-if="bookType.popupType == 3"
    :isOpen="bookType.isOpen"
    :bookInfo="bookType.bookInfo"
    :personalTabs="bookType.personalTabs"
    :key="bookType.isOpen"
    @update:close="bookType.popupClose"
  />
  <compCon03BookType4
    v-if="bookType.popupType == 4"
    :isOpen="bookType.isOpen"
    :bookInfo="bookType.bookInfo"
    :personalTabs="bookType.personalTabs"
    :key="bookType.isOpen"
    @update:close="bookType.popupClose"
  />
</template>

<style scoped lang="scss">
@media screen and (min-width: 1200px) {
  .more:hover {
    .more-icon {
      content: url("@/assets/img/personal-on-school/con03/more-active.png");
    }
  }
}
.more-icon {
}
</style>
