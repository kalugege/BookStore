<template>
    <div class="inner">
        <form @submit.prevent="edit" action="/register" class="form card">
            <h2>Edit Account</h2>
            <label for="name">Name*</label>
            <input v-model="name" type="text" name="name" required />
            <label for="surname">Surname*</label>
            <input v-model="surname" type="text" name="surname" required />
            <label for="email">Email*</label>
            <input v-model="email" type="email" name="email" required />
            <label for="text">City*</label>
            <input v-model="city" type="text" name="city" required />
            <label for="text">Zip Code*</label>
            <input v-model="zip" type="text" name="zip" required />
            <label for="text">Street*</label>
            <input v-model="street" type="text" name="street" required />
            <label for="text">Street number*</label>
            <input v-model="street_number" type="text" name="street_number" required />
            <input type="submit" value="Edit" name="edit" class="button save" />
        </form>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Account',
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            city: '',
            zip: '',
            street: '',
            street_number: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(['setUser']),
        async edit() {
            let response;
            try {
                response = await AuthenticationService.updateAccount({
                    id: this.user._id,
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    city: this.city,
                    zip: this.zip,
                    street: this.street,
                    streetNumber: this.street_number,
                });
                if (response.status === 200) {
                    this.setUser(response.data);
                } else {
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    computed: mapState(['user']),
    mounted() {
        this.name = this.user.name;
        this.surname = this.user.surname;
        this.email = this.user.email;
        this.phone = this.user.phone;
        this.city = this.user.city;
        this.zip = this.user.zip;
        this.street = this.user.street;
        this.street_number = this.user.streetNumber;
    },
};
</script>

<style></style>
