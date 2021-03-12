<template>
    <div class="inner">
        <h1 class="title">Books</h1>

        <div class="books">
            <Card v-for="book in books" :key="book._id" :book="book" class="book" />
        </div>
    </div>
</template>

<script>
import BookService from '@/services/BookService';
import Card from '@/components/Card';
export default {
    name: 'Books',
    components: {
        Card,
    },
    data() {
        return {
            books: [],
        };
    },
    methods: {},
    async created() {
        const response = await BookService.getBooks();
        this.books = response.data;
        console.log(this.books);
    },
};
</script>

<style></style>
