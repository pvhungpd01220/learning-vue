import http from "@services/http"

export default {
  getBooks() {
    return http.get('/books')
  },
  // getBook(bookId) {
  //   return apiClient.get('/books/')
  // }
  // createBook
}