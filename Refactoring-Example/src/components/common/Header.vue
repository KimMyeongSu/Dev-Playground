<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/stores/index";

const store = useStore();
const router = useRouter();
const route = useRoute();

const props = defineProps({
  topBanner: {
    type: [Object, String], // String도 허용
    required: false,
  },
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

// 모바일 메뉴
const isOpenMenu = ref(false);
const toggleOpenMenu = () => {
  isOpenMenu.value = !isOpenMenu.value;
};

// 모바일 그룹 on school 메뉴
const isOpenSubMenu1 = ref(false);
const toggleOpenSubMenu1 = () => {
  isOpenSubMenu1.value = !isOpenSubMenu1.value;
};

// 모바일 당근소식 메뉴
const isOpenSubMenu2 = ref(false);
const toggleOpenSubMenu2 = () => {
  isOpenSubMenu2.value = !isOpenSubMenu2.value;
};

// pc 무료수업 신청 버튼

// pc 그룹 on school 메뉴 활성화
const isGroupActive = ["/groupOnSchool/academy", "/groupOnSchool/bridge", "/groupOnSchool/debate"].includes(route.path);

// pc 당근소식 메뉴 활성화
const isNewsActive = ["/notice", "/faq", "/event"].includes(route.path);

// 배너 표시 여부 상태
const showBanner = ref(true);

// localStorage에서 만료 시간을 체크하는 함수
const checkBannerExpiration = () => {
  const expireTime = localStorage.getItem("bannerExpireTime");
  if (expireTime) {
    // 현재 시간이 만료 시간보다 작으면 배너를 숨김
    if (new Date().getTime() < parseInt(expireTime)) {
      showBanner.value = false;
    } else {
      // 만료되었으면 localStorage 삭제
      localStorage.removeItem("bannerExpireTime");
    }
  }
};

// 오늘 하루 그만보기 클릭 핸들러
const handleHideToday = () => {
  // 현재 시간에서 24시간을 더한 시간을 저장
  const tomorrow = new Date();
  tomorrow.setHours(23, 59, 59, 999); // 오늘 자정까지로 설정
  localStorage.setItem("bannerExpireTime", tomorrow.getTime().toString());
  showBanner.value = false;
};

// 배너 닫기
const closeBanner = () => {
  showBanner.value = false;
};

onMounted(() => {
  checkBannerExpiration();
});
const goHome = () => {
  store.setIsJuniorLogin(false);

  if (route.path === "/" || route.path === "/home") {
    window.location.reload();
  } else {
    router.push("/");
  }
};

const onClickLogin = () => {
  if (store.accessToken) {
    store.setAccessToken("");
    store.clearAccessToken();
    store.clearUserInfo();
    alert("로그아웃 되었습니다.");
    window.location.reload();
  } else {
    //store.setLoginLocation(route.path);

    window.location.href = getTargetUrl() + "/auth/loginJunior";
  }
};
const getUrl = () => {
  const TARGET_URLS = Object.freeze({
    LOCAL: "http://localhost:27080",
    STAGE: "https://stage-carrotfarm.carrotenglish.com",
    PRODUCTION: "https://carrotfarm.carrotenglish.com",
  });

  if (location.origin.includes("local")) {
    return TARGET_URLS.LOCAL;
  } else if (location.origin.includes("stage") || location.origin.includes("192.168.")) {
    return TARGET_URLS.STAGE;
  } else {
    return TARGET_URLS.PRODUCTION;
  }
};

const goToClassroom = () => {
  const encodeToken = encodeURIComponent(store.accessToken);

  if (encodeToken) {
    const url = getUrl();
    window.open(url + "/myClassroom/auth?token=" + encodeToken, "_blank");
  }
};

const openNewWindow = (url) => {
  window.open(url, "_blank");
};
</script>
<template>
  <div class="sticky top-0 left-0 z-[11]">
    <header class="bg-white border-b border-solid border-[#F0F0F0]">
      <!-- 상단 띠배너 -->
      <div v-if="showBanner && props.topBanner" class="bg-[#1D1D1F] px-[18px] py-2.5 z-[3]">
        <div class="flex items-center justify-between gap-1 pc:max-w-[1720px] pc:mx-auto pc:gap-0">
          <div class="flex-none w-3 pc:w-[165px]"></div>

          <div
            @click="openNewWindow(props.topBanner.linkUrl)"
            class="text-xs font-medium text-center text-white tablet:text-sm pc:cursor-pointer"
            v-html="props.topBanner.title"
          ></div>

          <div class="flex-none flex items-center gap-2.5 pc:divide-x divide-solid divide-[#ACADB1]">
            <div class="hidden pc:block">
              <p @click="handleHideToday" class="text-sm text-white cursor-pointer">오늘 하루 그만보기</p>
            </div>

            <div class="pc:pl-2.5">
              <div @click="closeBanner" class="flex items-center gap-1 cursor-pointer">
                <div class="hidden pc:block">
                  <p class="text-sm text-white">닫기</p>
                </div>

                <img src="@/assets/img/banner/close.png" alt="icon" class="w-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative">
        <div class="flex items-center justify-between px-[18px] py-3.5 tablet:py-4 pc:max-w-[1720px] pc:mx-auto pc:py-0 pc:px-0">
          <div class="flex-none pc:w-[214px]">
            <div @click="goHome" class="block w-[100px] tablet:w-[118px] pc:w-[126px] cursor-pointer">
              <img src="@/assets/img/header/logo.png" alt="logo" />
            </div>
          </div>

          <ul class="hidden pc:flex items-center">
            <li>
              <a
                href="/personalOnSchool"
                class="block py-8 px-6 cursor-pointer hover:text-[#111111]"
                :class="route.path === '/personalOnSchool' ? 'text-[#111111] font-bold' : 'text-[#666666] font-medium'"
                >퍼스널 온스쿨</a
              >
            </li>
            <li class="group">
              <p
                class="py-8 px-6 cursor-pointer hover:text-[#111111]"
                :class="isGroupActive ? 'text-[#111111] font-bold' : 'text-[#666666] font-medium'"
              >
                그룹 온스쿨
              </p>

              <div
                class="hidden group-hover:flex absolute top-[83px] w-full left-0 right-0 justify-center py-[26px] bg-white border-t border-solid border-[#F0F0F0] shadow-[0px_5px_6px_rgba(24,24,27,0.04)]"
              >
                <ul class="flex gap-12">
                  <li>
                    <a href="/groupOnSchool/academy" class="text-[#1D1D1F] hover:text-[#FF9016]">온스쿨 아카데미</a>
                  </li>
                  <li>
                    <a href="/groupOnSchool/bridge" class="text-[#1D1D1F] hover:text-[#FF9016]">온스쿨 브릿지</a>
                  </li>
                  <li>
                    <a href="/groupOnSchool/debate" class="text-[#1D1D1F] hover:text-[#FF9016]">온스쿨 디베이트</a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <a
                href="/tutorIntroduce"
                class="block py-8 px-6 cursor-pointer hover:text-[#111111]"
                :class="route.path === '/tutorIntroduce' ? 'text-[#111111] font-bold' : 'text-[#666666] font-medium'"
                >강사 소개
              </a>
            </li>

            <li>
              <a
                href="/courseRegister"
                class="block py-8 px-6 cursor-pointer hover:text-[#111111]"
                :class="route.path === '/courseRegister' ? 'text-[#111111] font-bold' : 'text-[#666666] font-medium'"
                >수강신청</a
              >
            </li>

            <li class="group">
              <div class="relative">
                <p
                  class="py-8 px-6 cursor-pointer hover:text-[#111111]"
                  :class="isNewsActive ? 'text-[#111111] font-bold' : 'text-[#666666] font-medium'"
                >
                  당근소식
                </p>

                <img src="@/assets/img/header/new1.png" alt="" class="w-11 absolute top-2.5 left-1/2 -translate-x-1/2" />
              </div>

              <div
                class="hidden group-hover:flex absolute top-[83px] w-full left-0 right-0 justify-center py-[26px] bg-white border-t border-solid border-[#F0F0F0] shadow-[0px_5px_6px_rgba(24,24,27,0.04)]"
              >
                <ul class="flex gap-12">
                  <li>
                    <div class="flex items-center gap-0.5">
                      <img src="@/assets/img/header/new3.png" alt="" class="w-4" />

                      <a href="/event" class="text-[#1D1D1F] hover:text-[#FF9016]">이벤트</a>
                    </div>
                  </li>
                  <li>
                    <a href="/notice" class="text-[#1D1D1F] hover:text-[#FF9016]">공지사항</a>
                  </li>
                  <li>
                    <a href="/faq" class="text-[#1D1D1F] hover:text-[#FF9016]">FAQ</a>
                  </li>
                </ul>
              </div>
            </li>

            <li>
              <a href="https://pf.kakao.com/_nxhVQG" target="_blank" class="group flex items-center gap-1.5 py-8 px-6">
                <img src="@/assets/img/header/kakao.png" alt="" class="w-[22px]" />
                <p class="text-[#666666] group-hover:text-[#111111]">1:1 상담</p>
              </a>
            </li>
          </ul>

          <div class="flex items-center gap-5 pc:hidden">
            <a href="https://pf.kakao.com/_nxhVQG" target="_blank" class="flex items-center gap-1.5">
              <img src="@/assets/img/header/kakao.png" alt="" class="w-5 tablet:w-[26px]" />
              <p class="flex-none text-sm text-[#666666]">1:1 상담</p>
            </a>

            <!-- mobile menu -->
            <div @click="toggleOpenMenu" class="flex-none w-[15px] cursor-pointer tablet:w-[17px]">
              <img src="@/assets/img/header/menu-open.png" alt="icon" />
            </div>
          </div>

          <div class="hidden pc:flex pc:justify-end pc:items-center pc:gap-3.5 pc:flex-none pc:w-[214px]">
            <div @click="onClickLogin" class="flex-none w-fit flex items-center gap-1 cursor-pointer">
              <img src="@/assets/img/header/login.png" alt="" class="w-4" />
              <p v-if="!store.accessToken" class="font-medium">가입/로그인</p>
              <p v-else class="font-medium">로그아웃</p>
            </div>

            <a
              v-if="!store.accessToken"
              href="/freeClass"
              class="flex-none block w-fit text-sm text-white font-medium leading-tight py-3 px-4 rounded-full bg-ani"
              >무료수업신청</a
            >

            <p
              v-if="store.accessToken"
              @click="goToClassroom"
              class="flex-none block w-fit text-sm text-[#FF6714] font-medium leading-tight py-3 px-4 border border-solid border-[#FF6714] rounded-full cursor-pointer"
            >
              나의 강의실
            </p>
          </div>
        </div>
      </div>
    </header>

    <!-- mobile sub menu -->
    <div v-if="isOpenMenu" class="fixed inset-0 overflow-y-auto bg-white">
      <div class="flex items-center justify-between px-[18px] py-3.5">
        <a href="/" class="block w-[100px]">
          <img src="@/assets/img/header/logo.png" alt="logo" />
        </a>

        <div @click="toggleOpenMenu" class="w-4 cursor-pointer">
          <img src="@/assets/img/header/menu-close.png" alt="icon" />
        </div>
      </div>

      <div class="px-[18px] py-[30px]">
        <div class="grid grid-cols-1 gap-4 mb-10">
          <a href="/freeClass" class="text-sm text-white text-center font-medium py-4 rounded-[10px] bg-ani"> 무료수업신청 </a>

          <p
            v-if="store.accessToken"
            @click="goToClassroom"
            class="text-sm font-medium text-center text-white py-4 rounded-[10px] bg-[#FF6714]"
          >
            나의 강의실
          </p>

          <p
            @click="onClickLogin"
            class="text-sm font-medium text-center text-black py-4 rounded-[10px] border border-solid border-[#7C7C8A]"
          >
            {{ !store.accessToken ? "로그인" : "로그아웃" }}
          </p>
        </div>

        <ul>
          <li class="px-1">
            <a href="/personalOnSchool" class="text-[#1D1D1F] font-bold pb-[18px] border-b border-solid border-[#E2E9EE]">
              퍼스널 온스쿨
            </a>
          </li>
          <li>
            <div
              @click="toggleOpenSubMenu1"
              class="flex items-center justify-between px-1 py-[18px] border-b border-solid border-[#E2E9EE] cursor-pointer"
            >
              <p class="text-[#1D1D1F] font-bold">그룹 온스쿨</p>

              <img
                src="@/assets/img/common/arrow.png"
                alt="icon"
                :class="isOpenSubMenu1 ? '-rotate-90' : 'rotate-90'"
                class="w-1.5"
              />
            </div>

            <div v-if="isOpenSubMenu1" class="bg-[#F3F4F6] -mx-[18px]">
              <ul class="p-5 space-y-[18px]">
                <li>
                  <a href="/groupOnSchool/academy" class="text-sm text-[#1D1D1F] font-medium">온스쿨 아카데미</a>
                </li>

                <li>
                  <a href="/groupOnSchool/bridge" class="text-sm text-[#1D1D1F] font-medium">온스쿨 브릿지</a>
                </li>

                <li>
                  <a href="/groupOnSchool/debate" class="text-sm text-[#1D1D1F] font-medium">온스쿨 디베이트</a>
                </li>
              </ul>
            </div>
          </li>

          <li class="px-1">
            <a
              href="/tutorIntroduce"
              class="block text-[#1D1D1F] font-bold py-[18px] border-b border-solid border-[#E2E9EE] cursor-pointer"
              >강사 소개</a
            >
          </li>

          <li class="px-1">
            <a href="/courseRegister" class="text-[#1D1D1F] font-bold py-[18px] border-b border-solid border-[#E2E9EE]">
              수강신청
            </a>
          </li>

          <li>
            <div
              @click="toggleOpenSubMenu2"
              class="flex items-center justify-between px-1 py-[18px] border-b border-solid border-[#E2E9EE] cursor-pointer"
            >
              <div class="flex items-center gap-2">
                <p class="text-[#1D1D1F] font-bold">당근소식</p>

                <img src="@/assets/img/header/new2.png" alt="" class="w-11" />
              </div>

              <img
                src="@/assets/img/common/arrow.png"
                alt="icon"
                :class="isOpenSubMenu2 ? '-rotate-90' : 'rotate-90'"
                class="w-1.5"
              />
            </div>

            <div v-if="isOpenSubMenu2" class="bg-[#F3F4F6] -mx-[18px]">
              <ul class="p-5 space-y-[18px]">
                <li>
                  <a href="/event" class="flex items-center gap-1">
                    <p class="text-sm text-[#1D1D1F] font-medium">이벤트</p>

                    <img src="@/assets/img/header/new3.png" alt="" class="w-4" />
                  </a>
                </li>

                <li>
                  <a href="/notice" class="text-sm text-[#1D1D1F] font-medium">공지사항</a>
                </li>

                <li>
                  <a href="/faq" class="text-sm text-[#1D1D1F] font-medium">FAQ</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style scoped>
.bg-ani {
  background: linear-gradient(90deg, #ff9016, #fe6a33, #ff9016);
  background-size: 200% 100%;
  animation: gradient-animation 1s linear infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% center;
  }
  100% {
    background-position: -200% center;
  }
}
</style>
