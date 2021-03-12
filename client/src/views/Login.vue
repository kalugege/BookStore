<template>
    <div class="inner">
        <form @submit.prevent="login" class="form card">
            <h2>Login</h2>
            <label for="email">Email*</label>
            <input v-model="email" type="text" name="email" required />
            <label for="password">Password*</label>
            <input v-model="password" type="password" name="password" required />
            <input type="submit" value="Log In" name="login" class="button save" />
        </form>
    </div>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService';
import { mapActions } from 'vuex';
export default {
    name: 'Login',
    data() {
        return {
            email: '',
            password: '',
            error: null,
        };
    },
    methods: {
        ...mapActions(['setUser']),
        async login() {
            try {
                const response = await AuthenticationService.login({
                    email: this.email,
                    password: this.password,
                });
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
};
</script>

<style></style>
