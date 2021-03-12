<template>
    <div>
        <div class="book__hero">
            <router-link :to="`/books/${book._id}`">
                <img :src="`./uploads/${book.photo || 'book.png'} `" alt="book photo" />
                <!-- <img src="@/assets/images/book.png" alt="book photo" /> -->
            </router-link>
        </div>
        <div class="book__details">
            <div class="book__name">
                <router-link :to="`/books/${book._id}`">
                    <span>{{ book.name }}</span>
                </router-link>
            </div>
            <div class="book__author">
                <span>{{ book.author }}</span>
            </div>
            <div class="book__price">
                <span>{{ book.price }} RSD</span>
            </div>
            <div v-if="$store.state.isAdmin" class="edit">
                <router-link :to="`/books/${book._id}/edit`">
                    <img src="@/assets/images/pencil.png" alt="" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Card',
    props: {
        book: Object,
    },
};
</script>

<style></style>
