<script setup>
import { useHead } from "@vueuse/head";
import { reactive, ref } from "vue";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";

useHead({
  title: "당근영어 주니어",
  meta: [
    { name: "title", content: "당근영어 주니어 | FAQ" },
    { name: "description", content: "당근영어 주니어를 자주 이용하신다면 관련 도움말을 확인해보세요." },
    { name: "keywords", content: "화상영어, 전화영어, 영어회화, 원어민영어, 주니어영어, 어린이영어, 당근영어, 당근영어 주니어" },
    { name: "robots", content: "noindex, nofollow" },
    { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "당근영어 주니어 | FAQ" },
    { property: "og:description", content: "당근영어 주니어를 자주 이용하신다면 관련 도움말을 확인해보세요." },
    { property: "og:url", content: "https://carrotjunior.kr/faq" },
  ],
});

const tabs = ["신규관련", "수업관련"];
const isTabOpen = ref([true, false, false]);
const toggleTabOpen = (index) => {
  isTabOpen.value = isTabOpen.value.map((open, i) => i === index);
};

const list0 = reactive([
  {
    question: `▶ 무료수업은 어떻게 진행되나요? `,
    answer: `무료수업은 신청하신 시간에 맞춰 정시에 진행됩니다.
•	화상수업: 수업 링크가 카카오 알림톡으로 발송됩니다.
•	전화수업: 등록된 유선 번호로 전화를 드리며, 약 10분간 진행됩니다.
수업 종료 후에는 결과지가 카카오톡 및 이메일로 발송되며,
상담 매니저가 순차적으로 연락을 드릴 예정입니다.`,
  },
  {
    question: `▶ 수강료가 궁금해요!`,
    answer: `수업 횟수와 수업 시간(분)에 따라 수강료가 달라집니다.
자세한 안내는 아래 페이지를 참고해주세요.
👉 수강료 안내 -> <a href="https://carrotjunior.kr/courseRegister" target="_blank" style="display: inline-block; width: auto; text-decoration: underline;">https://carrotjunior.kr/courseRegister</a>`,
  },
  {
    question: `▶ 결제 방법은 어떤 것이 있나요?`,
    answer: `다음과 같은 방식으로 결제가 가능합니다:
•	무통장 입금
•	카드 결제
•	네이버페이 / 카카오페이
•	전화 결제 (대표번호 또는 매니저 상담 시)
📞 당근영어주니어 대표번호: 02-518-0036`,
  },
  {
    question: `▶ 교재를 보내주시나요?`,
    answer: `당근영어 수업은 온라인 교재 및 e-Book이 기본으로 제공되며 나의 강의실 -> 수업스케줄 -> ‘수업하기’ 를 통해 확인하실 수 있습니다. 일부 교재는 구매가 필요하며 담당 매니저가 별도 안내 드립니다.`,
  },
  {
    question: `▶ 출석확인증 및 결제내역서가 필요해요.`,
    answer: `나의 강의실에서 인쇄 및 다운로드가 가능합니다.
•	출석확인증 및 수료증: 홈페이지/앱 > 매뉴얼 > 수강관련
•	결제내역서: 홈페이지/앱 > 매뉴얼 > 결제내역
※ 수업기간 설정 기능도 제공됩니다.`,
  },
  {
    question: `▶ 일시정지(휴강신청)하고 싶습니다.`,
    answer: `홈페이지 오른쪽 하단 문의하기를 통해 신청해주시기 바랍니다.
최대 1년까지 홀딩 가능하며, 추후 스케줄링 시 수업 시간 및 강사변경 될 수 있는 점 참고해주세요.`,
  },
]);
const isOpen0 = ref([]);
const toggleOpen0 = (index) => {
  isOpen0.value[index] = !isOpen0.value[index];
};

const list1 = reactive([
  {
    question: `▶ 수업은 어떻게 진행되나요?`,
    answer: `모든 수업은 전화수업 또는 화상수업(Zoom) 중 선택하실 수 있으며,
신청하신 수업 시간에 맞춰 강사님이 수업을 진행해 주십니다.
•	화상수업은 PC와 모바일 모두 가능하며, 수업 전 Zoom 앱과 당근농장 앱 설치가 필수입니다.
수업 시작 20분 전 카카오 알림톡 또는 앱 푸시 알림을 통해 수업방 링크가 발송되며, 클릭 한 번으로 입장하실 수 있습니다.
•	전화수업은 아래 번호 중 한 곳에서 정시에 전화드리며, 수신 후 바로 수업이 진행됩니다.
☎ 02-518-0304 / 02-518-0508 / 02-518-0307

수업은 학습자의 연령과 레벨에 맞는 교재를 바탕으로, 강사님과 자연스럽게 영어로 대화하며 진행됩니다.
수업 종료 후에는 강사님의 피드백 리포트가 제공되어, 잘못 사용한 표현이나 올바른 문장을 확인하며 회화 실력을 높일 수 있습니다.

※ 화상수업 준비물 안내
•	카메라와 마이크가 있는 PC 또는 스마트폰
•	이어폰 또는 헤드셋 (권장)
•	Zoom 앱 설치 (필수)
•	당근농장 앱 설치 및 알림 설정 (푸시 알림 수신용)`,
  },
  {
    question: `▶ 교재는 어디에서 볼 수 있나요?`,
    answer: `나의 강의실 > 수업스케줄 > 수업하기 메뉴에서 확인 및 다운로드 가능합니다.
수업 20분 전, 앱 푸시 알림으로 수업 알림과 함께 교재를 미리 예습하실 수 있습니다.
※ 일부 교재는 저작권 보호로 인해 열람/인쇄가 제한될 수 있습니다. 
※ 실물 교재 관련 문의는 1:1 채팅을 통해 안내드립니다.

📩 1:1 문의하기=> pp7lz.channel.io`,
  },
  {
    question: `▶ 현재 진행 중인 교재가 끝나갑니다. 다음 교재는 어떻게 확인하나요?`,
    answer: `교재가 마무리되면 강사님께서 다음 교재를 추천해드립니다.
원하시는 교재가 있다면 강사님께 직접 요청하거나, 1:1 문의하기로 문의해 주세요. 
📩 1:1 문의하기=> pp7lz.channel.io`,
  },
  {
    question: `▶ 수업시간 변경 가능한가요?`,
    answer: `네, 가능합니다.
전체일정 변경은 1:1 문의하기로 문의해 주세요.

📩 1:1 문의하기=>  pp7lz.channel.io

변경을 원하시는 요일 및 시간대(ex. 월수금 19~20시)를 구체적으로 작성해 주시고, 수업 가능 시간은 1시간 범위로 알려주세요.`,
  },
  {
    question: `▶ 일정이 생겨 수업을 못할 것 같습니다. 수업변경 및 보강 가능할까요?`,
    answer: `네, 수업 시작 1시간 전까지는 자유롭게 변경 가능합니다.
나의 강의실 > 수업예약/변경 메뉴에서 직접 수정하거나 📩 1:1 문의하기로 문의해주세요.

※ 변경은 오늘 포함 7일 이내의 날짜로만 가능합니다.
📩 1:1 문의하기=>  pp7lz.channel.io`,
  },
  {
    question: `▶ 다른 강사님과도 수업하고 싶어요. 가능할까요?`,
    answer: `네, 가능합니다. 📩 1:1 문의하기로 요청해 주세요.
강사 변경을 원하시는 이유를 함께 알려주시면 참고하여 적합한 강사님을 추천해드립니다.
📩 1:1 문의하기=>  pp7lz.channel.io`,
  },
  {
    question: `▶ 화상수업 중 연결문제로 수업이 중단되면 어떡하나요?`,
    answer: `일시적으로 화상 연결이 어려울 경우, 강사님이 등록된 번호로 전화를 드립니다. (해외 거주자 제외) 전화 수업 후 📩 1:1 문의하기로 문제 상황을 알려주시면, 기기 환경 확인 및 화상 연결 테스트를 도와드립니다.
※ 안정적인 인터넷 환경에서 수업해 주세요.
📩 1:1 문의하기=>  pp7lz.channel.io`,
  },
  {
    question: `▶ 수업을 못 들었어요. 어떡하죠?`,
    answer: `수업 시작 1시간 전까지는 나의 강의실 > 수업예약/변경 메뉴에서 변경이 가능합니다.
1시간이 지난 후에는 스케줄 변경 및 보강이 어렵습니다.`,
  },
  {
    question: `▶ 강사님께 받은 피드백을 확인하고 싶어요.`,
    answer: `수업 종료 후, 강사님이 남긴 피드백은
나의 강의실 > 수업스케줄 > 복습하기 메뉴에서 확인 가능합니다.
📌 ‘피드백 모아보기’에서는 최대 6개월치 피드백을 한눈에 확인할 수 있어요.`,
  },
  {
    question: `▶ 수업 녹화/녹음 파일은 어디서 확인하나요?`,
    answer: `나의 강의실 > 수업스케줄 > 복습하기 메뉴에서 확인할 수 있으며, 다운로드 가능 기간은 2주입니다.
2주 이후에는 다운로드가 불가능하니 미리 저장해 주세요.`,
  },
  {
    question: `▶ 수업시간인데 강사님의 전화가 오지 않아요.`,
    answer: `아래 당근영어주니어 전화번호가 수신차단 또는 수신거부 설정되어 있는지 확인해 주세요.
•	☎ 02-518-0304 / 02-518-0508 / 02-518-0307
•	후후 어플 등 차단 앱, 또는 휴대폰 설정을 확인 부탁드립니다.`,
  },
  {
    question: `▶ 강사님이 수업을 휴강했어요.`,
    answer: `당근영어에서는 강사님의 휴강 일정을 사전에 파악하여, 홈페이지 공지 또는 메시지를 통해 미리 안내 드리고 있습니다.
예정된 휴강일에는 사전 안내 후 대표 강사님이 대신 수업을 진행해 드릴 수 있으며, 원하실 경우 강사 변경도 가능합니다.
단, 천재지변·현지 통신 장애 등 긴급 상황일 경우, 수업 종료 후 안내될 수 있으며 해당 수업은 보강 수업으로 제공됩니다.`,
  },
  {
    question: `▶ 로그인 했는데 수강 중인 정보가 없다고 나옵니다.`,
    answer: `수업 시작 전 발송된 문자 또는 이메일의 로그인 계정 정보를 다시 확인해 주세요.`,
  },
  {
    question: `▶ 수업 시작 알림을 받고 싶어요.`,
    answer: `수업 20분 전, 당근농장 앱 푸시 알림으로 수업 안내가 전송됩니다.
🔔 당근농장 앱 다운로드
•	안드로이드: <a href="https://url.kr/uqte2g" target="_blank" style="display: inline-block; width: auto; text-decoration: underline;">https://url.kr/uqte2g</a>
•	iOS: <a href="https://url.kr/y2rkr4" target="_blank" style="display: inline-block; width: auto; text-decoration: underline;">https://url.kr/y2rkr4</a>

🔔 알림 설정 방법
•	안드로이드: 설정 > 어플리케이션 > 당근농장 > 알림 허용
•	iOS: 설정 > 알림 > 당근농장 > 알림 허용`,
  },
]);
const isOpen1 = ref([]);
const toggleOpen1 = (index) => {
  isOpen1.value[index] = !isOpen1.value[index];
};

const list2 = reactive([
  {
    question: `수강신청은 어떻게 하나요?`,
    answer: `수강신청은 사내 공지를 확인하시거나 수강 기간에 문자와 이메일을 통해 담당매니저가 안내드립니다.`,
  },
  {
    question: `전달에 수업 했던 강사와 동일하게 수업하고 싶습니다.`,
    answer: `수강을 연속하여 진행되는 경우 최대한 동일 스케줄을 보장해드리려 노력하고 있습니다.\n수업 종료일 2주전에 미리 고객센터 혹은 담당 매니저에게 연락 주시거나 수강신청 시 '기타요청사항'에 기재해주시면 최대한 반영해드리겠습니다.\n하지만 강사님 스케쥴 변동 등으로 부득이하게 동일 강사님 보장이 안될 수 있는 점 참고 부탁드립니다.`,
  },
  {
    question: `프리스케줄은 무엇인가요?`,
    answer: `정해진 시간이 아닌 학습자가 직접 수업을 예약하여 진행되는 수업 방식이며,\n본인 스케줄에 맞추어 학습자가 직접 스케줄링을 할 수 있습니다.`,
  },
  {
    question: `프리스케줄 예약은 어떻게 하나요?`,
    answer: `당근영어 홈페이지 로그인 후 마이페이지 -> 수업예약/보강 -> 예약하기를 이용하시면 됩니다.\n- 매주 화,목에 수업 예약 알림 톡이 발송되어 모바일로도 간편히 예약할 수 있습니다.\n- 전담강사는 물론, '다른 강사와 보강하기'를 이용하여 원하는 시간에 다양한 강사님과 수업하실 수 있습니다. - 수업시간 1시간 전까지 예약이 가능합니다.`,
  },
  {
    question: `수강 중인 강의가 없다고 나옵니다.`,
    answer: `수업안내문에 안내된 아이디와 비밀번호로 로그인하셨는지 확인 부탁드립니다.\n개별적으로 가입하시거나 SNS를 통한 로그인은 수강내역 확인이 어렵습니다.\n프리스케쥴의 경우 수강기간을 확인해 주세요.\n수강기간이 시작된 후 수업 예약하기가 가능하오니 참고하여 스케줄링 해주시기 바랍니다.`,
  },
  {
    question: `출석률은 어떻게 확인하나요?`,
    answer: `마이페이지 내 '학습현황'을 통해 확인하실 수 있으며 수업 종료 후 피드백 안내에도 출석률이 함께 표기됩니다.\n출석률은 진행된 수업 중 결석을 제외한 수업 회수로 계산되며, 진척도는 전체 수업 중 학습자께서 출석하신 수업으로 계산됩니다.\n수료를 위해 진척도 및 출석률이 모두 중요합니다 :)`,
  },
  {
    question: `아이디와 비밀번호가 맞지 않다고 나옵니다.`,
    answer: `수업진행을 위한 계정은 담당매니저가 세팅 후 수업안내문에 함께 보내드립니다.\n네이버로그인 등 SNS로그인을 하시는 경우 진행 중인 수업이 없다고 나올 수 있으니 꼭 안내 받으신 아이디와 비밀번호로 로그인 부탁드립니다.\n아이디는 이메일주소, 비밀번호는 휴대전화번호 뒤 네자리로 초기설정 되어있으며,\n기존 수강이력이 있는 경우 재설정하신 비밀번호를 이용하시면 됩니다.`,
  },
  {
    question: `수업시간 변경이 가능한가요?`,
    answer: `정해진 시간에 출석이 어려울 경우 수업시간 1시간 전까지 마이페이지를 통해 변경이 가능하며\n변경횟수에 제한은 없습니다.\n전체 수업 스케쥴 변경을 원하시는 경우 담당매니저나 고객센터를 통해 요청 부탁드립니다.`,
  },
  {
    question: `교재는 어디서 확인할 수 있나요?`,
    answer: `마이페이지 -> 수업내역 -> 교재 메뉴에서 보실 수 있으며 수업 20분 전 보내드리는 알림톡의 링크를 통해서도 확인이 가능합니다.\n수업 시에는 모바일로 교재를 보시면서 이어폰을 이용한 수업 진행을 추천 드립니다.`,
  },
  {
    question: `해외에서도 수업이 가능한가요?`,
    answer: `해외에서도 ZOOM을 통해 안정적인 화상수업이 가능하여 주재원 파견, 장기출장 등이 예정되어 있는 경우 담당매니저와의 상담을 통해 현지 시차에 맞게 스케쥴 조정 후 수업참여 부탁드립니다.`,
  },
]);
const isOpen2 = ref([]);
const toggleOpen2 = (index) => {
  isOpen2.value[index] = !isOpen2.value[index];
};
</script>
<template>
  <div>
    <compHeader />

    <main>
      <div class="max-w-[1200px] mx-auto pt-[70px] px-5 pb-[72px] pc:pt-[124px] pc:pb-[160px] pc:px-0">
        <p class="text-[40px] text-[#18181B] font-bold mb-8 pc:text-[50px] pc:mb-[30px]">FAQ</p>

        <ul class="flex gap-1 overflow-x-auto flex-nowrap mb-11 pc:gap-3 pc:mb-[60px]">
          <li
            v-for="(tab, index) in tabs"
            :key="index"
            @click="toggleTabOpen(index)"
            :class="isTabOpen[index] ? 'text-white bg-[#18181B]' : 'text-[#9CA3AF] bg-[#F3F4F6]'"
            class="flex-none text-sm rounded-full px-4 py-2.5 cursor-pointer pc:text-base pc:px-[18px] pc:py-2.5"
          >
            {{ tab }}
          </li>
        </ul>

        <ul class="border-t-2 border-solid border-[#18181B]">
          <li v-if="isTabOpen[0]">
            <ul>
              <li v-for="(item, index) in list0" :key="index" class="border-b border-solid border-[#E5E7EB]">
                <div @click="toggleOpen0(index)" class="flex gap-4 cursor-pointer justify-between items-center py-5 pc:p-[26px]">
                  <p class="text-[#18181B] pc:text-lg pc:font-bold">
                    {{ item.question }}
                  </p>

                  <div class="flex-none w-1.5 mr-2 pc:w-3 pc:mr-0">
                    <img src="@/assets/img/common/arrow.png" alt="icon" :class="isOpen0[index] ? '-rotate-90' : 'rotate-90'" />
                  </div>
                </div>

                <div
                  v-if="isOpen0[index]"
                  v-html="item.answer"
                  class="text-[#18181B] bg-[#F3F4F6] px-5 py-[26px] whitespace-pre-line pc:p-[26px]"
                ></div>
              </li>
            </ul>
          </li>

          <li v-if="isTabOpen[1]">
            <ul>
              <li v-for="(item, index) in list1" :key="index" class="border-b border-solid border-[#E5E7EB]">
                <div @click="toggleOpen1(index)" class="flex gap-4 cursor-pointer justify-between items-center py-5 pc:p-[26px]">
                  <p class="text-[#18181B] pc:text-lg pc:font-bold">
                    {{ item.question }}
                  </p>

                  <div class="flex-none w-1.5 mr-2 pc:w-3 pc:mr-0">
                    <img src="@/assets/img/common/arrow.png" alt="icon" :class="isOpen1[index] ? '-rotate-90' : 'rotate-90'" />
                  </div>
                </div>

                <div
                  v-if="isOpen1[index]"
                  v-html="item.answer"
                  class="text-[#18181B] bg-[#F3F4F6] px-5 py-[26px] whitespace-pre-line pc:p-[26px]"
                ></div>
              </li>
            </ul>
          </li>

          <li v-if="isTabOpen[2]">
            <ul>
              <li v-for="(item, index) in list2" :key="index" class="border-b border-solid border-[#E5E7EB]">
                <div @click="toggleOpen2(index)" class="flex gap-4 cursor-pointer justify-between items-center py-5 pc:p-[26px]">
                  <p class="text-[#18181B] pc:text-lg pc:font-bold">
                    {{ item.question }}
                  </p>

                  <div class="flex-none w-1.5 mr-2 pc:w-3 pc:mr-0">
                    <img src="@/assets/img/common/arrow.png" alt="icon" :class="isOpen2[index] ? '-rotate-90' : 'rotate-90'" />
                  </div>
                </div>

                <div
                  v-if="isOpen2[index]"
                  v-html="item.answer"
                  class="text-[#18181B] bg-[#F3F4F6] px-5 py-[26px] whitespace-pre-line pc:p-[26px]"
                ></div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </main>

    <compFooter />
  </div>
</template>
<style scoped></style>
