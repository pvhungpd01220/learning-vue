<template>
  <div>
    <h1>Time in ICT</h1>
    <p>greeting from root: {{ greeting }}</p>
    <p>data: {{ timeFormat }} </p>
    <child />
  </div>
</template>

<script>
import { defineComponent, inject, reactive, toRefs, computed } from 'vue'
import child from '@components/provide-example/child.vue'

export default defineComponent({
  name: '',
  components: {
    'child': child,
  },
  setup() {
    const data = reactive({
      time: '',
      greeting: '',
      timeFormat: computed(() => data.time.toLocaleString('hn-VN', { timeZone: "Asia/Ho_Chi_Minh" })),
    })
    data.greeting = inject('greeting', '')
    // get time tu provide dung inject
    // tao compute value tu time, format theo timezone ho chi minh
    data.time = inject('time', '')

    // timeFormat: computed(() => {
    //   data.time.toLocaleString('en-US', { timeZone: "UTC" })
    // })

    return {
      ...toRefs(data),
    }

  }
})
</script>

<style lang="scss" module>
</style>
