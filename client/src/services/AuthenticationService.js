import ApiService from '@/services/ApiService';

export default {
    register(credentials) {
        return ApiService().post('/register', credentials);
    },
    login(credentials) {
        return ApiService().post('/login', credentials);
    },
    isLoggedIn() {
        return ApiService().get('/user');
    },
    logout() {
        return ApiService().get('/logout');
    },
    updateAccount(credentials) {
        return ApiService().post('/account', credentials);
    },
};
