<template>
    <div class="inner">
        <form @submit.prevent="register" action="/register" class="form card">
            <h2>Register</h2>
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
            <label for="password">Password*</label>
            <input v-model="password" type="password" name="password" required />
            <label for="password-confirm">Confirm Password*</label>
            <input v-model="confirm_password" type="password" name="password-confirm" required />

            <input type="submit" value="Register" name="register" class="button save" />
        </form>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Register',
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            city: '',
            zip: '',
            street: '',
            street_number: '',
            password: '',
            confirm_password: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(['setUser']),
        async register() {
            let response;
            try {
                response = await AuthenticationService.register({
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    city: this.city,
                    zip: this.zip,
                    street: this.street,
                    streetNumber: this.street_number,
                    password: this.password,
                    'password-confirm': this.confirm_password,
                });
                console.log(response.data);
                if (response.status === 200) {
                    this.setUser(response.data.user);
                    this.$router.push({ name: 'Home' });
                } else {
                    // error
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    computed: {
        ...mapState(['user', 'isUserLoggedIn']),
    },
};
</script>

<style></style>
