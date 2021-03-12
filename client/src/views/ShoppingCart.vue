<template>
    <div class="inner">
        <div class="shopping_cart">
            <div class="title">Your cart</div>
            <div v-if="items.length === 0" class="emptyCart">
                <span>Cart is empty</span>
            </div>
            <div v-if="items.length === 0" @click="backToStore" class="backToShop">
                Back to shop
            </div>

            <div v-for="(item, index) in items" :key="index" class="cart_item">
                <div class="cart_item__img">
                    <img :src="`/uploads/${item.photo || 'book.png'}`" alt="book photo" />
                </div>

                <div class="cart_item__price">
                    <div>{{ item.price }} RSD</div>
                </div>

                <div class="cart_item__remove">
                    <div @click="removeItem(index)" class="removeBtn">Remove</div>
                </div>
            </div>
            <div v-if="items.length !== 0" class="total">
                <span>Total:</span>
                <span class="total__price">{{ cartTotalPrice() }} RSD</span>
            </div>
            <div v-if="items.length !== 0" class="title">
                Shipping Address
            </div>
            <OrderForm
                :key="componentKey"
                v-if="items.length !== 0"
                :userInfo="user"
                :items="items"
            />
        </div>
    </div>
</template>

<script>
import OrderForm from '@/components/OrderForm';

import { mapActions, mapGetters, mapState } from 'vuex';
export default {
    name: 'ShoppingCart',
    components: {
        OrderForm,
    },
    data() {
        return {
            items: [],
            componentKey: 0,
        };
    },
    computed: {
        ...mapState(['user']),
    },
    methods: {
        ...mapGetters(['cartTotalPrice']),
        ...mapActions(['removeBook']),
        backToStore() {
            this.$router.push({ name: 'Home' });
        },
        removeItem(index) {
            this.removeBook(index);
        },
    },
    created() {
        this.$store.state.cartItems = [...JSON.parse(localStorage.getItem('items'))];
        this.items = this.$store.state.cartItems;

        setTimeout(() => {
            this.componentKey += 1;
        }, 500);
    },
    mounted() {
        this.items = this.$store.state.cartItems;
    },
};
</script>

<style></style>
