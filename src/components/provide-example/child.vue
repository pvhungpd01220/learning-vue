<template>
  <div>
    <h1>Time in JST</h1>
    <p>data: {{ timeFormat }}</p>
  </div>
</template>

<script>
import { defineComponent, toRefs, inject, reactive, computed } from 'vue'

export default defineComponent({
  name: '',
  setup() {
    const data = reactive({
      time:'',
      
      timeFormat: computed(() => data.time.toLocaleString('hn-VN', { timeZone: "Asia/Tokyo" })),
    })

    data.time = inject('time', '')

    return {
      ...toRefs(data),
    }
  },
})
</script>

<style lang="scss" module>
</style>
