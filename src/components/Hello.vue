<template>
  <div>{{ message }}</div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      message: 'Hello World'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div {
  text-align: center;
}
</style>
