<template>
    <div class="inner">
        <form @submit.prevent="editBook" class="form card">
            <h2>Edit Book</h2>
            <label for="name">Name*</label>
            <input v-model="name" type="text" name="name" required />
            <label for="genre">Genre*</label>
            <input v-model="genre" type="text" name="genre" required />
            <label for="photo">Photo</label>
            <input type="file" @change="onFileSelected" name="photo" />
            <label for="author">Author*</label>
            <input v-model="author" type="text" name="author" required />
            <label for="publisher">Publisher</label>
            <input v-model="publisher" type="text" name="publisher" required />
            <label for="description">Description</label>
            <textarea v-model="description" name="description" id="" cols="30" rows="10"></textarea>
            <label for="price">Price</label>
            <input v-model="price" type="number" name="price" required />

            <input type="submit" value="Edit Book" name="add" class="button save" />
            <button @click="deleteBook" class="button save">
                Delete Book
            </button>
        </form>
    </div>
</template>

<script>
import BookService from '@/services/BookService';
import FormData from 'form-data';
export default {
    name: 'EditBook',
    data() {
        return {
            name: '',
            genre: '',
            author: '',
            publisher: '',
            description: '',
            price: '',
            photo: '',
            book: null,
        };
    },
    async created() {
        try {
            const response = await BookService.getBook(this.$route.params.id);
            if (response.status === 200) {
                const book = response.data;
                this.book = book;
                this.name = book.name;
                this.author = book.author;
                this.publisher = book.publisher;
                this.description = book.description;
                this.price = book.price;
                this.genre = book.genre;
                this.photo = book.photo;
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    methods: {
        onFileSelected(event) {
            this.SelectedFile = event.target.files[0];
        },
        async editBook() {
            try {
                const formData = new FormData();
                formData.append('file', this.SelectedFile);
                formData.append('name', this.name);
                formData.append('author', this.author);
                formData.append('publisher', this.publisher);
                formData.append('description', this.description);
                formData.append('price', this.price);
                formData.append('genre', this.genre);
                formData.append('photo', this.photo);

                const payload = { formData, id: this.book._id };
                const response = await BookService.editBook(payload);
                if (response.status === 200) {
                    this.$router.push(`/books/${this.book._id}`);
                }
            } catch (error) {
                console.log(error.message);
            }
        },
        async deleteBook() {
            try {
                const response = await BookService.deleteBook(this.book._id);
                if (response.status === 200) {
                    this.$router.push({ name: 'Home' });
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
};
</script>

<style></style>
