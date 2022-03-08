<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AutoComplete from './components/AutoComplete/AutoComplete.vue'

onMounted(() => {
  console.log('app mounted');
})
</script>

<template>
  <div class="center-content flex-col fill-screen">
    <AutoComplete />
  </div>
</template>

<style>
body {
  background-color: #eee;
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
