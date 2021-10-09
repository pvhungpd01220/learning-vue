<template>
  <div>
    <el-button @click="updateDate">UPdate date</el-button>
    <h1>Time in UTC</h1>
    <p>greeting: {{ greeting }}</p>
    <p>data: {{ timeFormat }}</p>
    <parent />
  </div>
</template>

<script>
import { defineComponent, provide, computed, ref, onMounted } from 'vue'
import parent from '@components/provide-example/parent.vue'
import { ElButton } from 'element-plus'
import 'element-plus/es/components/button/style/css'


export default defineComponent({
  name: '',
  components: {
    'parent': parent,
    ElButton
  },
  setup() {
    const data = {
      greeting: 'Hello World',
      time: new Date(), 
      // timeZone: "Asia/Ho_Chi_Minh",
      // timeZone: "Asia/Tokyo",
      timeFormat: computed(() => data.time.toLocaleString('en-US', { timeZone: "UTC" })),
    }

    const date = ref(null)

    provide('date', date)
    
    provide('greeting', data.greeting) 
    provide('time', data.time) 
    // provide sử dụng ref ( 1 dạng khác của reactive)

    onMounted(() => {
      // khai báo 1 biến là biến ref thì có nghĩa biến đó đã đc reactive
      // update giá trị biến ref .value = 

      date.value = new Date()
    })

    const updateDate = () => {
      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate()+1)
      date.value = tomorrow
    }

    return {
      ...data,
      updateDate,
    }
  }
})
</script>

<style lang="scss" module>
</style>
