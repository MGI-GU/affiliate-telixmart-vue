<template>
    <section class="section">
        <h1 class="title">Latest Posts</h1>
        <div class="columns">
            <product-card v-for="product in productList" :key="product.id" :product="product" />
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProductCard from '@/components/Partial/ProductCard'

export default {
    name: 'Home',
    components:{
        ProductCard
    },
    data () {
        return {
            subdomain: this.$route.params.subdomain
        }
    },
    methods: {
        ...mapActions(['fetchShop', 'fetchProductList']),
    },
    mounted() {
        this.fetchShop(this.subdomain).then((response) => {
            this.fetchProductList();
        });
    },
    computed: {
        ...mapState(['shop','productList']),
    }
    
    
    
}
</script>