<script setup lang="ts">
import { useRoute } from "vue-router";
import HelpDesk from "@/components/common/HelpDesk.vue";
const route = useRoute();
</script>
<template>
  <div translate="no">
    <router-view :key="route.fullPath" />
    <HelpDesk />
  </div>
</template>

<style scoped></style>
