<template>
    <div class="inner">
        <form @submit.prevent="addBook" class="form card">
            <h2>Add Book</h2>
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

            <input type="submit" value="Add Book" name="add" class="button save" />
        </form>
    </div>
</template>

<script>
import BookService from '@/services/BookService';
import FormData from 'form-data';
export default {
    name: 'AddBook',
    data() {
        return {
            name: '',
            genre: '',
            author: '',
            publisher: '',
            description: '',
            price: '',
            SelectedFile: '',
        };
    },
    methods: {
        onFileSelected(event) {
            this.SelectedFile = event.target.files[0];
        },
        async addBook() {
            try {
                const formData = new FormData();
                formData.append('file', this.SelectedFile);
                formData.append('name', this.name);
                formData.append('genre', this.genre);
                formData.append('author', this.author);
                formData.append('publisher', this.publisher);
                formData.append('description', this.description);
                formData.append('price', this.price);

                const response = await BookService.addBook(formData);
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
