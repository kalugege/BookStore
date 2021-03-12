import ApiService from '@/services/ApiService';

export default {
    sendOrder(order) {
        return ApiService().post('/order', order);
    },
};
