<template>
  <div class="listBook">
    <div class="bookItem" v-for="item in listBooks" :key="item.id">
      <div class="orderNumber">#1</div>
      <img src="https://via.placeholder.com/100" alt="placeholder" />
      <div v-if="!statusOpenEdit[item.id]" class="bookInfo">
        <h3>{{ item.title }}</h3>
        <div class="author">{{ item.author }}</div>
        <p class="description">
          {{ item.decription }}
        </p>
      </div>
      <div class="deleteBook">
        <button @click="editBook(item)">
          <span v-if="isShowDetails">
            Edit
          </span>
        </button>
        <button @click="deleteBook(item.id)">X</button>
      </div>
      <form v-if="statusOpenEdit[item.id]" @submit.prevent="submitData">
        <div class="formBook">
          <label>Name: </label>
          <input v-model="updateBook.title" type="text" />
        </div>
        <div class="formBook">
          <label>Book Name: </label>
          <input v-model="updateBook.author" type="text" />
        </div>
        <div class="formBook">
          <label>Description: </label>
          <input v-model="updateBook.decription" type="textarea" />
        </div>
        <button type="submit" @click="submitUpdateBook">Submit</button>
      </form>
    </div>
    <book-form />
    <book-item />
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import BookService from "@services/BookService";
import BookForm from "@components/books/BookForm.vue";
import BookItem from "@components/books/BookItem.vue";
import useEmitter from "@/composables/useEmitter";

export default defineComponent({
  name: "Book",
  components: {
    "book-form": BookForm,
    "book-item": BookItem,
  },
  setup() {
    const bus = useEmitter();
    const data = reactive({
      listBooks: [],
      statusOpenEdit: {},
      updateBook: {},
    });

    onMounted(() => {
      getListBook();
    });

    const getListBook = () => {
      BookService.getBooks()
        .then(function(response) {
          // handle success
          data.listBooks = response.data;
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    const deleteBook = (id) => {
      BookService.deleteBook(id)
        .then(function(response) {
          // handle success
          console.log(response);
          data.listBooks = data.listBooks.filter((item) => item.id !== id);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

    const editBook = (item) => {
      data.statusOpenEdit[item.id] = !data.statusOpenEdit[item.id]
      data.updateBook = Object.assign({}, item)
    };

    const submitUpdateBook = () => {
      BookService.editBook(data.updateBook.id, data.updateBook)
        .then(function(response) {
          // handle success
          const updateItem = data.listBooks.find((item) => item.id === data.updateBook.id);
          if (updateItem) {
            updateItem.title = data.updateBook.title
            updateItem.author = data.updateBook.author
            updateItem.decription = data.updateBook.decription
          }
          data.statusOpenEdit[data.updateBook.id] = false

          // data.isShowDetails = !data.isShowDetails
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    }

    onMounted(() => {
      bus.on("add-book", addBook);
    });

    const addBook = (book) => {
      data.listBooks.push(book);
    };

    return {
      ...toRefs(data),
      getListBook,
      deleteBook,
      editBook,
      submitUpdateBook,
    };
  },
});
</script>

<style lang="scss">
.listBook {
  .bookItem {
    display: flex;
    padding-bottom: 20px;
    position: relative;
    .orderNumber {
      align-self: center;
      margin-right: 10px;
      font-weight: 600;
    }
    .deleteBook {
      position: absolute;
      right: 0;
      color: white;
      padding: 5px;
      button {
        margin-left: 10px;
        padding: 10px;
        background-color: red;
      }
    }
    .editBook {
      margin-right: 10px;
    }
    .bookInfo {
      padding-left: 20px;
      h3 {
        margin: 0 0 10px 0;
      }
      .author {
        margin-bottom: 5px;
      }
      .description {
        margin: 0;
        font-size: 15px;
        color: #8b8b8b;
        font-weight: 400;
      }
    }
  }
}
</style>
