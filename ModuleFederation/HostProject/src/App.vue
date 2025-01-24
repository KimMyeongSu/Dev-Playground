<script setup>
import compA from "remoteA/compA"
import compB from "remoteB/compB"
import compC from "remoteC/compC"
</script>

<template>
  <div>
    <h1>Host Project</h1>
    <compA />
    <compB />
    <compC />
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
