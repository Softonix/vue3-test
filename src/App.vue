<template>
  <div>
    <img class="mx-auto" alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js Task" />

    <div class="my-10 border-b border-cloudy-blue border-dashed" />

    <div class="max-w-lg mx-auto mt-4">
      <JobOpenings />
    </div>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import JobOpenings from '@/components/JobOpenings.vue'

export default {
  name: 'App',

  components: {
    HelloWorld,
    JobOpenings
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
