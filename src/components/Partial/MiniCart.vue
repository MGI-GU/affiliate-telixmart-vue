<template>
    <div class="navbar-end">
        <div class="navbar-item">
            <div class="dropdown is-hoverable">
                <div class="dropdown-trigger">
                    <button class="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                    <span>{{getCartCount}} cart</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                    </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div class="dropdown-content">
                        <div class="dropdown-item" v-if="getCartCount > 0">
                            <ul>
                                <li v-for="item in cart" :key="item.id">
                                    <button @click.prevent="removeProductFromCart(item.product)" class="delete is-small"></button>
                                    <strong>{{ item.product.name }}</strong> 
                                    {{item.qty}} x {{item.product.price}} 
                                </li>
                                <hr>
                            </ul>
                            <div class="text-center">
                                <span>Total: {{getCartTotal}}</span>
                                <router-link class="button is-small is-success" :to="{ name: 'Checkout'}">Checkout</router-link>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'MiniCart',
    data () {
        return {
            url: this.$route.name
        }
    },
    computed: {
        ...mapState(['cart']),
        ...mapGetters(['getCartCount', 'getCartTotal'])
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