<script setup>
import { useHead } from "@vueuse/head";
import compHeader from "@/components/common/Header.vue";
import compFooter from "@/components/common/Footer.vue";
import compCon01 from "@/components/groupOnSchool/academy/compCon01.vue";
import compCon02 from "@/components/groupOnSchool/academy/compCon02.vue";
import compCon03 from "@/components/groupOnSchool/academy/compCon03.vue";
import compCon04 from "@/components/groupOnSchool/academy/compCon04.vue";

useHead({
  title: "당근영어 주니어 | 온스쿨 아카데미",
  meta: [
    {
      name: "title",
      content: "당근영어 주니어 | 온스쿨 아카데미",
    },
    {
      name: "description",
      content: "소규모 몰입형 그룹 수업, 100% 미국 교과서 & 북미 원어민 강사 수업으로 북미 교육 방식 그대로!",
    },
    {
      name: "keywords",
      content: "화상영어, 전화영어, 영어회화, 일대일영어회화, 직장인영어회화, 성인영어회화, 당근영어",
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
      content: "당근영어 주니어 | 온스쿨 아카데미",
    },
    {
      property: "og:description",
      content: "소규모 몰입형 그룹 수업, 100% 미국 교과서 & 북미 원어민 강사 수업으로 북미 교육 방식 그대로!",
    },
    {
      property: "og:url",
      content: "https://carrotjunior.kr/groupOnSchool/academy",
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
