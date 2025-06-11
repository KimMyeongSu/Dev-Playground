<script setup>
import { useHead } from "@vueuse/head";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import compCon01 from "@/components/groupOnSchool/debate/compCon01.vue";
import compCon02 from "@/components/groupOnSchool/debate/compCon02.vue";
import compCon03 from "@/components/groupOnSchool/debate/compCon03.vue";
import compCon04 from "@/components/groupOnSchool/debate/compCon04.vue";

useHead({
  title: "당근영어 주니어",
  meta: [
    {
      name: "title",
      content: "당근영어 주니어 | 온스쿨 디베이트",
    },
    {
      name: "description",
      content: "단순한 영어 실력을 넘어 창의적이고 논리적인 사고력, 문제 해결 능력까지!",
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
      content: "당근영어 주니어 | 온스쿨 디베이트",
    },
    {
      property: "og:description",
      content: "단순한 영어 실력을 넘어 창의적이고 논리적인 사고력, 문제 해결 능력까지!",
    },
    {
      property: "og:url",
      content: "https://carrotjunior.kr/groupOnSchool/debate",
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
