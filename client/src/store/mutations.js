export default {
    setUser(state, user) {
        state.user = user;
        state.isUserLoggedIn = true;
        console.log();
        state.isAdmin = user.isAdmin;
    },
    logout(state) {
        state.user = null;
        state.isUserLoggedIn = false;
        state.isAdmin = false;
    },
    addToCart(state, item) {
        state.cartItems.push(item);
        localStorage.setItem('items', JSON.stringify(state.cartItems));
    },
    removeFromCart(state, itemIdx) {
        state.cartItems.splice(itemIdx, 1);
        localStorage.setItem('items', JSON.stringify(state.cartItems));
    },
};
