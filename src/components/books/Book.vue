<template>
  <div class="listBook">
    <div class="bookItem" v-for="item in listBooks" :key="item.id">
      <div class="orderNumber">#1</div>
      <img  class="imgBook" src="https://via.placeholder.com/100" alt="placeholder" />
      <div v-if="!statusOpenEdit[item.id]" class="bookInfo">
        <h3>{{ item.title }}</h3>
        <div class="author">{{ item.author }}</div>
        <p class="description">
          {{ item.decription }}
        </p>
      </div>
      <div class="deleteBook">
        <button @click="editBook(item)">
          <span v-if="statusOpenEdit">
            Edit
          </span>
        </button>
        <button @click="deleteBook(item.id)">X</button>
      </div>
       <book-form
        v-if="statusOpenEdit[item.id]"
        :book-data="updateBook[item.id]"
        @update-book="submitUpdateBook"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import BookService from "@services/BookService";
import BookForm from "@components/books/BookForm.vue";
import useEmitter from "@/composables/useEmitter";

export default defineComponent({
  name: "Book",
  components: {
    "book-form": BookForm,
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
      data.statusOpenEdit[item.id] = !data.statusOpenEdit[item.id]; // true -> show form edit
      data.updateBook[item.id] = Object.assign({}, item); // copy data cua item sang update book
      console.log(data.updateBook);
    };

    const submitUpdateBook = (bookData) => {
      /* eslint-disable no-debugger */
      // data = ?
      // data = { a: 1, b: 2, c: 2 } phải năm đc data có cấu trúc như thế nào 
      BookService.editBook(bookData.id, bookData)
        .then(function(response) {
          // handle success
          console.log(response);
          // Tìm item book trong list book cần update
          // gan data cho item book do
          const updateItemBook = data.listBooks.find((item) => item.id === bookData.id);
          console.log('aaa', updateItemBook)
          if (updateItemBook && response.status === 200) {
            updateItemBook.title = bookData.title
            updateItemBook.author = bookData.author
            updateItemBook.decription = bookData.decription
          }
          data.statusOpenEdit[bookData.id] = false
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    };

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
    .imgBook {
      width: 100px;
      height: 100px;
    }
    .orderNumber {
      margin-right: 10px;
      margin-top: 10px;
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
form {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    padding: 10px;
    margin-left: 50px;
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
</style>
