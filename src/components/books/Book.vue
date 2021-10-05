<template>
  <div class="listBook">
    <div class="bookItem" 
      v-for="item in listBooks"
      :key="item.id"
    >
      <div class="orderNumber">#1</div>
      <img src="https://via.placeholder.com/100" alt="placeholder" />
      <div class="bookInfo">
        <h3>{{ item.title }}</h3>
        <div class="author">{{ item.author }}</div>
        <p class="description">
          {{ item.decription }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, reactive, toRefs } from "vue";
import BookService from '@services/BookService'

export default defineComponent({
  name: "Book",
  setup() {
    const data = reactive ({
     listBooks: []
    })

    onMounted(() => {
      getListBook()
    })

    const getListBook = () => {
      BookService.getBooks()
        .then(function(response) {
          // handle success
          console.log(response);
          data.listBooks = response.data
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        })  
    };
    

    return {
      ...toRefs(data),
      getListBook,
    }
  },
});
</script>

<style lang="scss">
.listBook {
  .bookItem {
    display: flex;
    padding-bottom: 20px;
    .orderNumber {
      align-self: center;
      margin-right: 10px;
      font-weight: 600;
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
