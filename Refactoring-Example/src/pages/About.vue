<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <div>
    <div>
      <h1 class="text-2xl font-bold">홈 페이지</h1>
      <p @click="router.push('Test')" class="text-red-500 hover:text-red-700">Test 페이지로 이동</p>
    </div>
  </div>
</template>
<style lang=""></style>
