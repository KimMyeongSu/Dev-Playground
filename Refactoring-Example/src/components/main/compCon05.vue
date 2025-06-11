<script setup>
import { ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation } from "swiper/modules";
import axios from "@/plugins/axios";
import "swiper/css";
import "swiper/css/navigation";

const router = useRouter();
const route = useRoute();
const props = defineProps({
  bestStudent: {
    type: Object,
    required: true,
  },
});

const reviews = [
  {
    id: 1,
    name: "정**(초5) 학생",
    text: `"당근영어 주니어의 On-School 프로그램 덕분에 체계적으로 공부할 수 있었어요. 영어로 생각하는 법을 배우다 보니 영어 문장의 논리력도 좋아지고, 영어 성적도 눈에 띄게 올랐어요! 영어로 말하는 자신감이 붙어서 정말 뿌듯합니다."`,
    icon: "",
  },
  {
    id: 2,
    name: "남** 학부모님",
    text: `"미국 유학을 앞두고 당근영어를 시작했어요. 미국 원어민 강사님이 현지 문화와 학교 생활을 생생하게 알려주셔서 아이가 유학을 더욱 기대하고 있어요. 덕분에 영어 자신감도 많이 늘었답니다."`,
    icon: "",
  },
  {
    id: 3,
    name: "전**(초3) 학생",
    text: `"당근영어 덕분에 영어가 너무 재밌어요! 게임도 하고 이야기도 하면서 자연스럽게 영어를 배워요. 특히, 원어민 강사님이랑 영어로 농담도 하고 웃기도 해서 더 좋아요!"`,
    icon: "",
  },
  {
    id: 4,
    name: "도**(초5) 학생",
    text: `"학원에서 외우기만 했는데, 당근영어는 원어민 선생님과 대화하면서 실제 영어를 사용해 보니까 너무 재밌어요! 자신감도 생기고, 몰랐던 표현도 많이 배웠어요!"`,
    icon: "",
  },
  {
    id: 5,
    name: "이** 학부모님",
    text: `"아이가 영어 자신감이 많이 생겼어요. 북미 원어민 강사님들 덕분에 발음도 많이 좋아지고, AI 학습 분석 리포트를 통해 아이의 부족한 부분을 파악하고 보완할 수 있어서 좋아요."`,
    icon: "",
  },
  {
    id: 6,
    name: "박**(초5) 학생",
    text: `"학원보다 원어민 강사님이랑 수업하는 게 더 재미있어요! 틀린 문장이나 발음을 바로바로 체크해 주시고, 제가 하고 싶은 말을 끝까지 스스로 할 수 있도록 도와 주셔서 좋아요!"`,
    icon: "",
  },
  {
    id: 7,
    name: "양** 학부모님",
    text: `"아이가 방에서 혼자 수업해서 잘하고 있나 걱정했는데, 학습 코칭 매니저님이 먼저 연락 주셔서 수업 잘하고 있는지 체크해 주시고 다음 커리큘럼에 대해 추천해주니 안심이 되네요."`,
    icon: "",
  },
  {
    id: 8,
    name: "권**(초4) 학생",
    text: `"화상영어 처음이라 어색했는데, 원어민 강사님이 분위기도 풀어주고 제가 말을 더 많이 할 수 있도록 유도해 주니까 자연스럽게 영어회화에 자신감이 생기고 있어요!"`,
    icon: "",
  },
  {
    id: 9,
    name: "김**(중1) 학생",
    text: `"미국 고등학교 준비를 위해 학원과 병행하며 인터뷰 과정 수업하고 있어요. 학원만 다닐 때는 부자연스러웠는데, 당근영어 수업 이후 말이 늘고 자연스럽게 표현할 수 있게 되어 너무 좋습니다."`,
    icon: "",
  },
  {
    id: 10,
    name: "방**(초6) 학생",
    text: `"영어가 어려웠는데, 현지 원어민 선생님의 발음을 따라하면서 제 발음도 많이 좋아졌어요 점점 자신감이 생기고 외국인하고 영어로 대화도 많이 해보고 싶어졌어요."`,
    icon: "",
  },
  {
    id: 11,
    name: "고**(초4) 학생",
    text: `"학교 수업 후에도 영어 공부를 계속할 수 있어서 좋아요. 당근영어 선생님들은 항상 친절하고, 수업이 재미있어서 영어 공부가 재미있어졌어요!"`,
    icon: "",
  },
  {
    id: 12,
    name: "원**(중1) 학생",
    text: `"당근영어로 영어 말하기 대회 준비를  틈틈히 했었어요. 선생님들의 친절하고 꼼꼼한 지도 덕분에 대회에서 상까지 받을 수 있었습니다.”`,
    icon: "",
  },
  {
    id: 13,
    name: "한** 학부모님",
    text: `"원어민 강사님이 아이의 성향을 파악하고 대화를 이어가니 아이가 수업을 엄청 재미있어 해요. 스피킹 발음도 정확해지고, 단어가 느는 것이 보여 매우 만족하고 있어요."`,
    icon: "",
  },
  {
    id: 14,
    name: "황**(초6) 학생",
    text: `"처음에는 영어 말하기가 부담이었는데, 당근영어로 시작한 뒤로 영어가 좋아졌어요. 선생님이랑 대화하는 것도 재밌고, 매일 하는 영어 일기 쓰기도 이제는 제 취미에요. 영어로 꿈꾸는 것들도 많아졌어요!"`,
    icon: "",
  },
  {
    id: 15,
    name: "서** 학부모님",
    text: `"선생님과 얼굴을 마주하고 수업하다 보니 표정과 제스처까지 금방 배우더라고요. 어릴 때 발음 잡아주는 게 중요한데, 당근영어는 진짜 북미 선생님들이라 기초부터 탄탄히 잡을 수 있었어요. 만족합니다."`,
    icon: "",
  },
  {
    id: 16,
    name: "오**(초3) 학생",
    text: `"항상 얘기하느라 시간 가는줄 몰라요 학원에서 책으로만 공부하다가, 수다 떨듯이 재미있게 영어 공부하니까 너무 좋고 재미있어요."`,
    icon: "",
  },
  {
    id: 17,
    name: "구**(중1) 학생",
    text: `"북미 선생님과 화상영어수업을 하고 난 후부터 말하기, 듣기가 제 강점이 됐어요. 듣기가 되니까 문법을 따로 공부하지 않아도 어색한 문장을 고를 수 있는 스킬이 생겼습니다."`,
    icon: "",
  },
  {
    id: 18,
    name: "노** 학부모님",
    text: `"여기는 수업을 시작하고 나서부터가 진짜인 것 같아요. 일단 1:1전담 학습 매니저분께서 불편한 점은 없는지, 아이에게 어떤 과정이 더 효과적일지 체크해 주셔서 마음이 놓입니다."`,
    icon: "",
  },
  {
    id: 19,
    name: "민**(초5) 학생",
    text: `"학원보다 원어민 선생님이 수업을 재밌게 해주시고 몰랐던 표현이나 단어를 알게 되어서 좋아요. 특히, NE times 수업은 다양한 주제를 가지고 수업해서 재미있어요!"`,
    icon: "",
  },
  {
    id: 20,
    name: "채** 학부모님",
    text: `"아이의 조기 유학을 준비하기 위해 영어 인터뷰 및 영작과정 알아보다가 당근영어 주니어를 알게 되었습니다. 수업 말고도 학습과정이 많아서 좋았고, 무엇보다 아이가 너무 재미있어 하네요!"`,
    icon: "",
  },
  {
    id: 21,
    name: "배** 학부모님",
    text: `"아이 실력 올릴 수 있는 영어 학습법 찾고 있었는데 주변 학부모님이 추천해줘서 등록했어요. 스피킹, 리스링 두 마리 토끼 다 잡을 계획입니다!"`,
    icon: "",
  },
  {
    id: 22,
    name: "류**(초4) 학생",
    text: `"어릴 때 미국에서 살았는데, 한국에 와서 영어를 자꾸 까먹는 것 같았거든요. 그런데 당근영어 주니어 원어민 선생님이랑 얘기하다 보니 영어도 잘 나오고, 새로운 단어도 배우게 되어서 좋아요."`,
    icon: "",
  },
  {
    id: 23,
    name: "안**(초6) 학생",
    text: `"일대일 수업이라 학원에서보다 발화량이 훨씬 많아요. 그만큼 자신감이 많이 커졌어요!"`,
    icon: "",
  },
];
/* const getStudentReviews = async () => {
  try {
    const { data } = await axios.get("app/home/getStudentReviewList");

    if (data.success) {
      reviews.value = data.data;
    } else {
      throw new Error(date.message);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}; */

const swiperModules = [Autoplay, Navigation];

onMounted(() => {
  /* getStudentReviews(); */
});
</script>

<template>
  <article class="con05">
    <div class="pt-[50px] pb-20 px-[18px] overflow-hidden tablet:pt-[90px] tablet:pb-[84px] pc:py-[140px] pc:px-0">
      <p
        class="text-lg text-[#6D7076] text-center font-medium leading-tight mb-[18px] tablet:text-2xl tablet:mb-[18px] pc:text-[26px] pc:mb-7"
      >
        정답만 맞추는 영어는 그만!
      </p>

      <p
        class="text-[34px] text-center font-bold mb-7 tablet:text-[42px] tablet:leading-[54px] tablet:mb-[54px] pc:text-[60px] pc:mb-[90px] pc:leading-[76px]"
      >
        영어로 생각하며<br class="tablet:hidden" />
        말할 수 있는<br />
        <span class="text-[#FF6714]">4단계</span> 완전학습의 효과
      </p>

      <div class="mb-20 tablet:mb-[90px] pc:mb-[160px]">
        <div class="-mx-[18px] mb-[22px] tablet:mb-7 pc:-mx-0 pc:mb-[60px]">
          <swiper
            :autoplay="{
              delay: 4000,
              disableOnInteraction: false,
            }"
            :loop="true"
            :slidesPerView="'auto'"
            :centeredSlides="true"
            :navigation="{
              prevEl: '.step-button-prev-custom',
              nextEl: '.step-button-next-custom',
            }"
            :modules="swiperModules"
            class="step-swiper"
          >
            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img1-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img1-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img2-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img2-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img3-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img3-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img4-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img4-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img1-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img1-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img2-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img2-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img3-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img3-p.png" alt="" />
              </div>
            </swiper-slide>

            <swiper-slide class="!w-[285px] !h-auto tablet:!w-[332px] pc:!w-[972px]">
              <div class="pc:hidden">
                <img src="@/assets/img/main/con05/img4-m.png" alt="" />
              </div>

              <div class="hidden pc:block">
                <img src="@/assets/img/main/con05/img4-p.png" alt="" />
              </div>
            </swiper-slide>
          </swiper>
        </div>

        <ul class="flex justify-center gap-8 tablet:gap-[38px] pc:gap-[42px]">
          <li class="size-11 step-button-prev-custom tablet:size-[52px]">
            <img src="@/assets/img/main/con04/arrow-prev.png" alt="icon" class="cursor-pointer" />
          </li>

          <li class="size-11 step-button-next-custom tablet:size-[52px]">
            <img src="@/assets/img/main/con04/arrow-next.png" alt="icon" class="cursor-pointer" />
          </li>
        </ul>
      </div>

      <div>
        <p
          class="text-[34px] text-center font-bold mb-[70px] tablet:text-[42px] tablet:leading-[54px] tablet:mb-[98px] pc:text-[60px] pc:leading-[76px] pc:mb-[102px]"
        >
          글로벌 리더로 성장하는<br />
          당근영어 주니어
        </p>

        <div class="relative flex justify-center items-center mb-3 tablet:mb-4">
          <div class="relative">
            <div class="size-[126px] bg-[#FEDD64] rounded-full overflow-hidden tablet:size-[156px]">
              <img :src="props?.bestStudent?.fileUrl" alt="" class="object-cover" />
            </div>

            <img
              src="@/assets/img/main/con05/crown.png"
              alt=""
              class="absolute -top-10 right-[7px] w-[68px] tablet:-top-[50px] tablet:w-[85px]"
            />
          </div>

          <div class="tablet:hidden">
            <img
              src="@/assets/img/main/con05/paper-m.png"
              alt=""
              class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[250px]"
            />
          </div>

          <div class="hidden tablet:block">
            <img
              src="@/assets/img/main/con05/paper-p.png"
              alt=""
              class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-[311px]"
            />
          </div>
        </div>

        <p class="text-xl text-center font-semibold leading-tight mb-1 tablet:text-2xl tablet:mb-1.5">Best Student</p>

        <p class="text-xs text-center leading-tight mb-5 whitespace-pre-line tablet:text-base">{{ props?.bestStudent?.title }}</p>

        <div class="mb-10 tablet:flex justify-center gap-3.5 tablet:mb-30">
          <div class="hidden tablet:block">
            <img src="@/assets/img/main/con05/quat-left.png" alt="" class="w-9" />
          </div>

          <p class="text-center font-medium leading-6 whitespace-pre-line tablet:text-[22px] tablet:leading-[30px]">
            {{ props?.bestStudent?.contents }}
          </p>

          <div class="hidden tablet:block">
            <img src="@/assets/img/main/con05/quat-right.png" alt="" class="w-9" />
          </div>
        </div>

        <div class="-mx-[18px] relative overflow-hidden pc:-mx-0">
          <div class="pt-10">
            <ul class="flex gap-[18px] review-swiper pc:gap-10">
              <li
                v-for="(review, i) in reviews"
                :key="i"
                class="flex-none !w-[259px] py-6 px-4 rounded-3xl bg-[#F4F5F6] pc:!w-[366px] pc:py-8 pc:px-7 pc:rounded-[36px]"
              >
                <img :src="review.icon" alt="" class="w-8 mb-3 pc:w-[46px] pc:mb-4" />

                <p
                  class="text-[#1D1D1F] font-medium leading-6 whitespace-pre-line h-[164px] mb-8 line-clamp-6 pc:text-xl pc:mb-6"
                >
                  {{ review.text }}
                </p>

                <p class="text-sm text-[#6D7076] font-medium pc:text-base">{{ review.name }}</p>
              </li>

              <li
                v-for="(review, i) in reviews"
                :key="i"
                class="flex-none !w-[259px] py-6 px-4 rounded-3xl bg-[#F4F5F6] pc:!w-[366px] pc:py-8 pc:px-7 pc:rounded-[36px]"
              >
                <img :src="review.icon" alt="" class="w-8 mb-3 pc:w-[46px] pc:mb-4" />

                <p
                  class="text-[#1D1D1F] font-medium leading-6 whitespace-pre-line h-[164px] mb-8 line-clamp-6 pc:text-xl pc:mb-6"
                >
                  {{ review.text }}
                </p>

                <p class="text-sm text-[#6D7076] font-medium pc:text-base">{{ review.name }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
:deep(.title-slide) {
  .swiper-wrapper {
    .swiper-slide {
      &.swiper-slide-thumb-active {
        p {
          color: #111111;
          font-weight: bold;
        }
      }

      &:nth-of-type(1) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title1-on.png");
          }
        }
      }

      &:nth-of-type(2) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title2-on.png");
          }
        }
      }

      &:nth-of-type(3) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title3-on.png");
          }
        }
      }

      &:nth-of-type(4) {
        &.swiper-slide-thumb-active {
          img {
            content: url("@/assets/img/main/con04/title4-on.png");
          }
        }
      }
    }
  }
}

:deep(.step-swiper) {
  .swiper-wrapper {
    align-items: stretch;
    height: auto;

    .swiper-slide {
      &:not(.swiper-slide-active) {
        transform: scale(0.8);
      }
    }
  }
}

@keyframes floatUpDown {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-40px);
  }
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

:deep(.review-swiper) {
  padding-top: 40px;
  animation: marquee 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  li {
    animation: floatUpDown 4s infinite;
    transition-timing-function: cubic-bezier(0.61, 1, 0.88, 1);

    &:nth-of-type(odd) {
      background-color: #f4f5f6;
      animation-delay: 0s;
    }

    &:nth-of-type(even) {
      background-color: #fffae2;
      animation-delay: 2s;
    }

    &:nth-of-type(4n + 1) {
      img {
        content: url("@/assets/img/main/con05/icon1.png");
      }
    }

    &:nth-of-type(4n + 2) {
      img {
        content: url("@/assets/img/main/con05/icon2.png");
      }
    }

    &:nth-of-type(4n + 3) {
      img {
        content: url("@/assets/img/main/con05/icon3.png");
      }
    }

    &:nth-of-type(4n + 4) {
      img {
        content: url("@/assets/img/main/con05/icon4.png");
      }
    }
  }
}
</style>
