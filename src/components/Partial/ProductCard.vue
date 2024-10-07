<template>
    <div class="column is-3" v-if="product">
        <div class="bd-notification">
            <router-link :to="`/product/${product.slug}`">
                <img
                    v-bind:src="product.images[0].url"
                    class="gallery-image"
                    alt
                /><br>
            </router-link>
            <router-link :to="`/p/${product.id}`">
                <h4>
                    {{ product.name }}    
                </h4>
            </router-link>
            <button class="button" @click="addToCart()">Add to cart</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'ProductCard',
    props:["product"],
    methods:{
        ...mapActions(['addProductToCart']),

        addToCart() {
            this.addProductToCart({
                selected_product: this.product,
                quantity: 1
            });
        }
    }
}
</script>