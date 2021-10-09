<template>
  <div class="header">
    <form @submit.prevent="submitData">
      <div class="formBook">
        <label>Name: </label>
        <input v-model="title" type="text" />
      </div>
      <div class="formBook">
        <label>Book Name: </label>
        <input v-model="author" type="text" />
      </div>
      <div class="formBook">
        <label>Description: </label>
        <input v-model="decription" type="textarea" />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import { defineComponent, toRefs, reactive, computed } from "vue";
import useEmitter from "@/composables/useEmitter";
import BookService from '@services/BookService'

export default defineComponent({
  name: "BookForm",
  setup() {
    const bus = useEmitter();
    const data = reactive({
      title: "",
      author: "",
      decription: "",
      bookData: computed(() => {
        return {
          title: data.title,
          author: data.author,
          decription: data.decription,
        }
      })
    });

    const submitData = () => {
      BookService.createBook(data.bookData)
        .then(function(response) {
          if (response.status === 201) {
            bus.emit("add-book", response.data);
            data.title = "";
            data.author = "";
            data.decription = "";
          }
        })
         .catch(function(error) {
          // handle error
          console.log(error);
        })
    
    };

    return {
      submitData,
      ...toRefs(data),
    };
  },
});
</script>

<style scoped lang="scss">
.header {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  padding: 30px;
  right: 0;
  form {
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
