import ApiSerivce from '@/services/ApiService';

export default {
    addBook(book) {
        return ApiSerivce().post('/books', book, {
            'Content-Type': 'multipart/form-data',
        });
    },
    editBook({ formData, id }) {
        return ApiSerivce().put(`/book/${id}`, formData, {
            'Content-Type': 'multipart/form-data',
        });
    },
    deleteBook(id) {
        return ApiSerivce().delete(`/books/${id}`);
    },
    getBooks() {
        return ApiSerivce().get('/books');
    },
    getBook(id) {
        return ApiSerivce().get(`/books/${id}`);
    },
};
