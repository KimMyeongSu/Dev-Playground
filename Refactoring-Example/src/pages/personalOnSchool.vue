<script setup>
import { useHead } from "@vueuse/head";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import compCon01 from "@/components/personalOnSchool/compCon01.vue";
import compCon02 from "@/components/personalOnSchool/compCon02.vue";
import compCon03 from "@/components/personalOnSchool/compCon03.vue";

useHead({
  title: "당근영어 주니어",
  meta: [
    {
      name: "title",
      content: "당근영어 주니어 | 퍼스널 온스쿨",
    },
    {
      name: "description",
      content:
        "영어로 이해하고 생각하며 경험으로 완성하는 퍼스널 온스쿨! 우리 자녀의 레벨과 학습 목정, 성향에 맞게 1:1 맞춤 설계!",
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
      content: "당근영어 주니어 | 퍼스널 온스쿨",
    },
    {
      property: "og:description",
      content:
        "영어로 이해하고 생각하며 경험으로 완성하는 퍼스널 온스쿨! 우리 자녀의 레벨과 학습 목정, 성향에 맞게 1:1 맞춤 설계!",
    },
    {
      property: "og:url",
      content: "https://carrotjunior.kr/personalOnSchool",
    },
  ],
});
</script>

<template>
  <div>
    <compHeader />

    <main>
      <compCon01 />
      <compCon02 />
      <compCon03 />
    </main>

    <compFooter />
  </div>
</template>

<style scoped lang="scss"></style>
