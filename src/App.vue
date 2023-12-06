<script setup lang="ts">
import { ref } from 'vue';
const a = ref(0);
console.log(a);
// import HelloWorld from './components/HelloWorld.vue'
const showMsg = () => {
  ElMessage.error('你好');
};
</script>

<template>
  <div>
    <el-button type="primary" @click="showMsg">测试按钮</el-button>
    <div class="text-red">测试unocss</div>
    <span>{{ a }}</span>
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
