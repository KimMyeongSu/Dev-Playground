<script setup>
import { useHead } from "@vueuse/head";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import compCon01 from "@/components/groupOnSchool/bridge/compCon01.vue";
import compCon02 from "@/components/groupOnSchool/bridge/compCon02.vue";
import compCon03 from "@/components/groupOnSchool/bridge/compCon03.vue";
import compCon04 from "@/components/groupOnSchool/bridge/compCon04.vue";

useHead({
  title: "당근영어 주니어",
  meta: [
    {
      name: "title",
      content: "당근영어 주니어 | 온스쿨 브릿지",
    },
    {
      name: "description",
      content: "학교 교과 과정 대비부터 영어 스피킹까지 한번에! 영어 1등급 완성!",
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
      content: "당근영어 주니어 | 온스쿨 브릿지",
    },
    {
      property: "og:description",
      content: "학교 교과 과정 대비부터 영어 스피킹까지 한번에! 영어 1등급 완성!",
    },
    {
      property: "og:url",
      content: "https://carrotjunior.kr/groupOnSchool/bridge",
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
      <compCon04 />
    </main>

    <compFooter />
  </div>
</template>

<style scoped lang="scss"></style>
