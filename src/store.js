import Vue from "vue";
import Vuex from "vuex";
import { LOGIN, PRODUCT_D_QUERY, PRODUCT_QUERY, ALL_PRODUCT_QUERY, ACCOUNT_D_QUERY, PROVINCE_QUERY, CITY_QUERY, STATE_QUERY, PAYMENT_QUERY, ORDER_CREATED, PRODUCT_ORDER_CREATED, PRODUCT_UPDATED } from '@/graphql'
import apollo from './utils/graphql'
import axios from "axios"
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const actions = {
    async fetchShop({ commit }, subdomain) {
        // Here is query
        const response = await apollo.query({
            query: ACCOUNT_D_QUERY,
            variables: { subdomain: subdomain }
        });

        // Trigger the `setProduct` mutation
        commit('setAccount', response.data.accounts[0]);
    },
    async fetchProduct({ commit }, id) {
        const response = await apollo.query({
            query: PRODUCT_D_QUERY,
            variables: { id: id },
        });
        commit('setProduct', response.data.products_by_pk);
    },
    async fetchProductBySlug({ commit }, slug) {
        const response = await apollo.query({
            query: PRODUCT_QUERY,
            variables: { slug: slug },
        });
        commit('setProductSlug', response.data.products[0]);
    },
    async fetchProductList({ commit, state }) {
        const response = await apollo.query({
            query: ALL_PRODUCT_QUERY,
            variables: { account_id: state.shop.id }
        });
        commit('setProductList', response.data.products);
    },
    async addProductToCart({ commit }, selected_product, quantity) {
        //must validate stock here
        commit('addToCart', { selected_product: selected_product, quantity: quantity });
    },
    async removeProductFromCart({ commit }, selected_product) {
        commit('removeToCart', { selected_product: selected_product });
    },
    async fetchUser({ commit }, email) {
        // const response = await apollo.query({
        //     query: LOGIN,
        //     variables: { email: email.email },
        // });
        // commit('setUser', response.data.users[0]);
        //'EViyrEHc2mflgfOUEINTBnWAIt24YBvaOIFWMdTtFzY1maj55fReGFDIxOma'
        axios.get('http://telixmart.com/api/affiliate/check', {
          params: {
            api_token: email.email,
          }
        },{
          headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'application/json'
          }
        }).then(response => {
            commit('setUser', response.data.user);
        });
    },
    async addBuyerData({ commit }, data) {
        //must validate stock here
        commit('addBuyer', { data: data });
    },
    async fetchProvince({ commit }, id) {
        const response = await apollo.query({
            query: PROVINCE_QUERY,
            variables: { country_id: id.id },
        });
        commit('setProvince', response.data.province);
    },
    async fetchCity({ commit }, id) {
        const response = await apollo.query({
            query: CITY_QUERY,
            variables: { province_id: id.id },
        });
        commit('setCity', response.data.city);
    },
    async fetchState({ commit }, id) {
        const response = await apollo.query({
            query: STATE_QUERY,
            variables: { city_id: id.id },
        });
        commit('setState', response.data.districts);
    },
    async apiOngkir({ commit }, data) {
        axios.post('https://telixmart.com/api/shipping-cost', {
            origin: data[0],
            destination: data[1],
            weight: data[2]
        }).then(response => {
            commit('setListOngkir', response.data);
        });
    },
    async addOngkir({ commit }, data) {
        //must validate stock here
        commit('setOngkir', { data: data });
    },
    async apiOrder({ commit, state, getters }, data) {
        // axios.post('https://telixmart.com/api/create-order').then(response => {
        //     commit('addBuyer', response.data);
        // });
        console.log(data.order.data);
        const orderResponse = await apollo.mutate({
            mutation: ORDER_CREATED,
            variables: {
                account_id: data.order.data.account_id,
                address: data.order.data.address,
                city: data.order.data.city,
                customer_id: state.user.id,
                discount: 0,
                email: data.order.data.email,
                name: data.order.data.name,
                notes: data.order.data.notes,
                order_code: 'INV001',
                order_date: '2020-07-17',
                phone: data.order.data.phone,
                receipt_number: '',
                shipment: state.ongkir.data.data[0].name,
                shipping_charges: getters.getShippingFee,
                status: 0,
                tax: 0,
                total: getters.getTotal,
            }
        });
        commit('setOrder', orderResponse.data);

        // cart.forEach((data) => {
        //     apollo.mutate({
        //         mutation: PRODUCT_ORDER_CREATED,
        //         variables: {
        //             order_id: cart.order_id,
        //             product_id: cart.product_id,
        //             product_variants_id: cart.product_variants_id,
        //             quantity: cart.quantity,
        //             unit_price: cart.unit_price
        //         }
        //     }).then((data) => {
        //         apollo.mutate({
        //             mutation: PRODUCT_UPDATED,
        //             variables: { id: id, stock: stock }
        //         });
        //     });
        // });
    },
    async getPaymentMethod({ commit }, id) {
        const response = await apollo.query({
            query: PAYMENT_QUERY,
            variables: { account_id: id }
        });
        commit('setPaymentList', response.data);
    },
    async addPayment({ commit }, data) {
        //must validate stock here
        commit('setPayment', { data: data });
    },
    async resetState({ commit }) {
        commit('resetState');
    },
};

const getDefaultState = () => {
    return {
        shop: null,
        user: null,
        product: null,
        productSlug: null,
        productList: [],
        cart: [],
        order: null,
        provinceList:[],
        cityList:[],
        stateList:[],
        ongkirList:[],
        ongkir:null,
        paymentList:[],
        payment:null,
    }
}
export const state = getDefaultState();

export const mutations = {
    setAccount(state, shop) {
        state.shop = shop;
    },
    setProduct(state, product) {
        state.product = product;
    },
    setProductSlug(state, productSlug) {
        state.productSlug = productSlug;
    },
    setProductList(state, productList) {
        state.productList = productList;
    },
    addToCart(state, selected_product) {
        let product = selected_product.selected_product.selected_product;
        let qty = selected_product.selected_product.quantity;
        let productInCart = state.cart.find(item => {
            return item.product.id === product.id
        });

        if(productInCart){
            productInCart.qty += qty;
            return;
        }

        state.cart.push({
            product,
            qty
        })
    },
    removeToCart(state, selected_product) {
        state.cart = state.cart.filter(item => {
            return item.product.id !== selected_product.selected_product.id;
        });
    },
    setUser(state, user) {
        state.user = user;
    },
    addBuyer(state, data){
        state.order = data;
    },
    setProvince(state, data) {
        state.provinceList = data;
    },
    setCity(state, data) {
        state.cityList = data;
    },
    setState(state, data) {
        state.stateList = data;
    },
    setListOngkir(state, data) {
        state.ongkirList = data;
    },
    setOngkir(state, data) {
        state.ongkir = data;
    },
    setPaymentList(state, data) {
        state.paymentList = data;
    },
    setPayment(state, data) {
        state.payment = data;
    },
    setOrder(state, data) {
        state.order = data;
    },
    setCart(state, data) {
        state.cart = [];
        state.cart = data;
    },
    resetState (state) {
        Object.assign(state, getDefaultState());
    }
};

export const getters = {
    getCartCount(state) {
        return state.cart.length;
    },
    getShippingFee(state){
        let total = 0;
        if(state.ongkir !== null){
            total += state.ongkir.data.data[2].value;
        }
        return total;
    },
    getCartTotal(state) {
        let total = 0;
        state.cart.forEach(item => {
            total += item.product.price * item.qty;
        });
        return total;
    },
    getTotal(state){
        let total = 0;
        if(state.ongkir !== null){
            total += state.ongkir.data.data[2].value;
        }
        state.cart.forEach(item => {
            total += item.product.price * item.qty;
        });
        return total;
    },
    getWeightTotal(state){
        let total = 0;
        state.cart.forEach(item => {
            total += item.product.weight * item.qty;
        });
        return total;
    }
};

export default new Vuex.Store({
    mutations,
    actions,
    state,
    getters,
    plugins: [createPersistedState()]
});
