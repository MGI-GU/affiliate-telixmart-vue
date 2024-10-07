<template>
    <div>
        <table class="table">
            <tfoot>
                <tr>
                    <th colspan="2">Ongkir</th>
                    <th v-if="ongkir">{{ongkir.data.data[0].costs[0].cost[0].value}}</th>
                    <th v-else>0</th>
                </tr>
                <tr>
                    <th colspan="2">Total</th>
                    <th>{{getTotal}}</th>
                </tr>
            </tfoot>
            <tbody>
                <tr v-for="item in cart" :key="item.id">
                    <td><img v-bind:src="item.product.images[0].url" class="gallery-image" alt /></td>
                    <td>{{ item.product.name }}</td>
                    <td>{{item.qty}} @ {{item.product.price}} </td>
                    <td v-if="current_url=='Checkout'"> 
                        <button @click.prevent="removeProductFromCart(item.product)" class="delete is-small"></button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'Cart',
    data(){
        return {
            current_url: this.$route.name
        }
    },
    computed: {
        ...mapState(['cart', 'ongkir']),
        ...mapGetters(['getCartCount', 'getCartTotal', 'getTotal'])
    },
    methods: {
        ...mapActions(['removeProductFromCart'])
    }
}
</script>

<style>
.dropdown-menu {
    right: 0 !important;
    left: auto;
}
</style>