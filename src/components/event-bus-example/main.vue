<template>
  <div>
    <sidebar />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Sidebar from '@components/event-bus-example/sidebar.vue'

export default defineComponent({
  name: 'Main',
  components: {
    'sidebar': Sidebar,
  }
})
</script>

<style lang="scss" module>
</style>
