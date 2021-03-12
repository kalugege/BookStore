<template>
    <div v-if="book" class="inner">
        <div class="single">
            <div v-show="book.photo" class="single__image">
                <img :src="`/uploads/${book.photo || 'book.png'} `" alt="book photo" />

                <!-- <img src="@/assets/images/book.png" alt="book photo" /> -->
            </div>
            <div class="single__details">
                <div class="single__name">
                    <h1>{{ book.name }}</h1>
                </div>
                <div class="single__info">
                    <p>Author: {{ book.author }}</p>
                </div>
                <div class="single__info">
                    <p>Genres: {{ book.genre }}</p>
                </div>
                <div class="single__info">
                    <p>Publisher: {{ book.publisher }}</p>
                </div>
                <div class="single__description">
                    <p>{{ book.description }}</p>
                </div>
                <div class="single__price">
                    <p>{{ book.price }} RSD</p>
                </div>
                <div class="addBtn" @click="addToCart" ref="addBtn">
                    Add to cart
                </div>
                <div v-if="$store.state.isAdmin" class="edit">
                    <router-link :to="`/books/${book._id}/edit`">
                        <img src="@/assets/images/pencil.png" alt="" />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BookService from '@/services/BookService';
import { mapActions } from 'vuex';
export default {
    name: 'Book',
    data() {
        return {
            book: null,
        };
    },
    methods: {
        ...mapActions(['addBook']),

        addToCart() {
            this.addBook(this.book);
        },
    },
    async mounted() {
        try {
            const response = await BookService.getBook(this.$route.params.id);
            if (response.status === 200) {
                this.book = response.data;
            }
        } catch (error) {
            console.log(error.message);
        }
    },
};
</script>

<style></style>
