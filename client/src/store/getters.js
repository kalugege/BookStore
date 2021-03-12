export default {
    cartItemsLength(state) {
        return state.cartItems.length;
    },
    cartTotalPrice(state) {
        return state.cartItems.reduce((a, b) => {
            return a + b.price;
        }, 0);
    },
};
