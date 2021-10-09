<template>
  <div>
    <h1>Time in JST</h1>
    <p>data: {{ timeFormat }}</p>
    <p>date: {{ date }}</p>
  </div>
</template>

<script>
import { defineComponent, toRefs, inject, reactive, computed } from 'vue'

export default defineComponent({
  name: '',
  setup() {
    const data = reactive({
      time:'',
      timeFormat: computed(() => data.time.toLocaleString('JP', { timeZone: "Asia/Tokyo" })),
    })

    data.time = inject('time', '')

    const date = inject('date', null)

    return {
      ...toRefs(data),
      date,
    }
  },
})
</script>

<style lang="scss" module>
</style>
