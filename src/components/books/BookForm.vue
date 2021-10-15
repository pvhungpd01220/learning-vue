<template>
  <div class="header">
    <form @submit.prevent="submitData">
      <div class="formBook">
        <label>Name: </label>
        <input v-model="book.title" type="text" />
      </div>
      <div class="formBook">
        <label>Book Name: </label>
        <input v-model="book.author" type="text" />
      </div>
      <div class="formBook">
        <label>Description: </label>
        <input v-model="book.decription" type="textarea" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, watch } from "vue";
// import useEmitter from "@/composables/useEmitter";
// import BookService from '@services/BookService'

export default defineComponent({
  name: "BookForm",
  props: {
    bookData: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    // const bus = useEmitter();
    const data = reactive({
      book: {},
    });

    const submitData = () => {
      emit('updateBook', data.book)
    }

    // const submitData = () => {
    //   BookService.createBook(data.bookData)
    //     .then(function(response) {
    //       if (response.status === 201) {
    //         bus.emit("add-book", response.data);
    //         data.title = "";
    //         data.author = "";
    //         data.decription = "";
    //       }
    //     })
    //      .catch(function(error) {
    //       // handle error
    //       console.log(error);
    //     })
    
    // };

    watch(
      () => props.bookData,
      (newValue) => {
        data.book = Object.assign({}, newValue)
      },
      { immediate: true }
      // khi watch 1 array hay object thi dung immediate: true
    )

    return {
      ...toRefs(data),
      submitData,
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 30px;
  right: 0;
  form {
    margin: -30px;
    .formBook {
      margin: 10px;
      input {
        width: 100%;
      }
    }
    button {
      padding: 10px;
      background-color: blueviolet;
      color: white;
    }
  }
}
</style>
