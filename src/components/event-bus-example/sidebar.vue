<template>
  <div>
    <header-component />
    <aside class="sidebar">
      {{ isOpen }}
    </aside>
  </div>
</template>
<script>
import { defineComponent, onMounted, reactive, toRefs, onUnmounted } from 'vue'
import useEmitter from '@/composables/useEmitter'
import HeaderComponent from '@components/event-bus-example/header.vue'

export default defineComponent({
  name: 'Sidebar',
  components: {
    'header-component': HeaderComponent,
  },
  setup() {
    const bus = useEmitter()
    const data = reactive({
      isOpen: true,
    })
    onMounted(() => {
      // lắng nghe sự kiện event
      bus.on("toggle-sidebar", onToggle)
    })

    onUnmounted(() => {
      // huỷ lắng nghe event
      bus.off("toggle-sidebar", onToggle)
    })

    const onToggle = (value) => {  // onToggle la ham callback, nhan vao data của event bus
      data.isOpen = value
    }

    return {
      ...toRefs(data),
      onToggle,
    }
  }
})
</script>