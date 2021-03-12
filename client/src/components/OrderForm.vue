<template>
    <form @submit.prevent="confirmOrder" class="card form__cart">
        <div class="form__block">
            <label for="name">Name</label>
            <input v-model="name" type="text" name="name" required />
        </div>
        <div class="form__block">
            <label for="surname">Surname</label>
            <input v-model="surname" type="text" name="surname" required />
        </div>
        <div class="form__block">
            <label for="email">Email:</label>
            <input v-model="email" type="email" name="email" required />
        </div>
        <div class="form__block">
            <label for="text">City:</label>
            <input v-model="city" type="text" name="city" required />
        </div>
        <div class="form__block">
            <label for="text">Zip Code:</label>
            <input v-model="zip" type="text" name="zip" required />
        </div>
        <div class="form__block">
            <label for="text">Street:</label>
            <input v-model="street" type="text" name="street" required />
        </div>
        <div class="form__block">
            <label for="text">Street number:</label>
            <input v-model="street_number" type="text" name="street_number" required />
        </div>
        <input type="submit" value="Confirm" class="confirm_order" ref="addBtn" />
    </form>
</template>

<script>
import CartService from '@/services/CartService';
import { mapGetters } from 'vuex';

export default {
    name: 'AddressForm',
    props: {
        userInfo: Object,
        items: Array,
    },
    data() {
        return {
            name: '',
            surname: '',
            email: '',
            city: '',
            zip: '',
            street: '',
            street_number: '',
            total: '',
        };
    },
    methods: {
        ...mapGetters(['cartTotalPrice']),
        async confirmOrder() {
            let response;
            this.total = this.cartTotalPrice();
            try {
                response = await CartService.sendOrder({
                    items: this.items,
                    name: this.name,
                    surname: this.surname,
                    email: this.email,
                    city: this.city,
                    zip: this.zip,
                    street: this.street,
                    streetNumber: this.street_number,
                    total: this.total,
                });
                if (response.status === 200) {
                    this.$store.state.cartItems = [];
                    localStorage.setItem('items', JSON.stringify([]));
                    this.$router.push({ name: 'Books' });
                }
            } catch (error) {
                console.log(error.message);
            }
        },
    },
    mounted() {
        if (this.userInfo !== null) {
            this.name = this.userInfo.name;
            this.surname = this.userInfo.surname;
            this.email = this.userInfo.email;
            this.phone = this.userInfo.phone;
            this.city = this.userInfo.city;
            this.zip = this.userInfo.zip;
            this.street = this.userInfo.street;
            this.street_number = this.userInfo.streetNumber;
        }
    },
};
</script>

<style></style>
