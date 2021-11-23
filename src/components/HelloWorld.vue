<template>
  <div class="text-center">
    <h1 class="text-2xl font-bold">{{ msg }}</h1>
    <p>
      For correct implementation please reffer to the readme file
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',

  props: {
    msg: String
  }
}
</script>
