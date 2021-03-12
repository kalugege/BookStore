import AuthenticationService from '@/services/AuthenticationService';
export default {
    setUser({ commit }, user) {
        commit('setUser', user);
    },
    async removeUser({ commit }) {
        try {
            const response = await AuthenticationService.logout();
        } catch (error) {
            console.log(error.message);
        }
        commit('logout');
    },
    addBook({ commit }, item) {
        commit('addToCart', item);
    },
    removeBook({ commit }, itemIdx) {
        commit('removeFromCart', itemIdx);
    },
};
