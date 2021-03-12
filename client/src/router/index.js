import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Register from '../views/Register.vue';
import Login from '../views/Login.vue';
import AddBook from '../views/AddBook.vue';
import Books from '../views/Books.vue';
import Book from '../views/Book.vue';
import ShoppingCart from '../views/ShoppingCart.vue';
import Account from '../views/Account.vue';
import EditBook from '../views/EditBook.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/account',
        name: 'Account',
        beforeEnter: checkIfAuthenticated,
        component: Account,
    },

    {
        path: '/books',
        name: 'Books',
        component: Books,
    },
    {
        path: '/books/:id',
        name: 'Book',
        component: Book,
    },
    {
        path: '/addbook',
        name: 'AddBook',
        beforeEnter: checkIfAdmin,
        component: AddBook,
    },
    {
        path: '/books/:id/edit',
        name: 'EditBook',
        beforeEnter: checkIfAdmin,
        component: EditBook,
    },
    {
        path: '/shoppingcart',
        name: 'ShoppingCart',
        component: ShoppingCart,
    },
];
import store from '../store/index';

function checkIfAuthenticated(to, from, next) {
    if (store.state.isUserLoggedIn) {
        next();
    } else {
        next({ path: '/login' });
    }
}

function checkIfAdmin(to, from, next) {
    if (store.state.isAdmin) {
        next();
    } else {
        next({ path: '/' });
    }
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
