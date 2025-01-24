<script setup>
import compA from "remoteA/compA"
import compB from "remoteB/compB"
import compC from "remoteC/compC"
</script>

<template>
  <div>
    <h1 class="host">Host Project</h1>
    <compA />
    <compB />
    <compC />
  </div>
</template>

<style scoped>
.host {
  font-weight: bold;
  font-size: 5em;
  color: #333;
  margin-bottom: 40px;
}

.compA {
  background-color: #f824ca;
  color: white;
  padding: 5px 15px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 10px;
}

.compA {
  background-color: #f824ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.compB {
  background-color: #81fd62;
  color: white;
  padding: 5px 15px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 10px;
}

.compB {
  background-color: #81fd62;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.compC {
  background-color: #2980b9;
  color: white;
  padding: 5px 15px;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin: 10px;
}

.compC {
  background-color: #2980b9;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h1 {
  margin: 0;
  font-size: 1.5em;
}
</style>
