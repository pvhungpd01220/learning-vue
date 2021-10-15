<template>
  <navigation />
  <div class="container">
    <router-view></router-view>
  </div>
</template>


<script>

import Navigation from './components/Navigation.vue'

export default {
  name: 'App',
  components: {
    'navigation' : Navigation,
  },
}
</script>

<style scoped lang="scss">
.container{
  margin: 0 auto;
  width: 700px;
}
</style>
