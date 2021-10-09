import http from "@services/http"

export default {
  getBooks() {
    return http.get('/books')
  },
  createBook(data) {
    return http.post('/books', data)
  },
  deleteBook(id) {
    return http.delete(`/books/${id}`)
  },
  editBook(id, data) {
    return http.put(`/books/${id}`, data)
  }
}