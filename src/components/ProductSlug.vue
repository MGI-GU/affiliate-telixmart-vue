<template>
    <section class="section">
        <button class="button is-link is-small" @click="$router.go(-1)">Back</button>
        <hr>
        <div class="columns" v-if="productSlug">
            <div class="column is-3" >
                
                <carousel :perPage="1">
                    <slide v-for="image in productSlug.images" v-bind:key="image.id">
                        <img v-bind:src="image.url" class="gallery-image" alt />
                    </slide>
                </carousel>

                
            </div>
            <div class="column is-9" >

                <h1 class="title">
                    {{ productSlug.name }}
                </h1>

                <div class="content">
                    {{ productSlug.description }}
                </div>
                <div class="field has-addons">
                    <div class="control">
                        <input class="input" type='number' v-model.number="qty" :min='1' :max='productSlug.stock'/>
                    </div>
                    <div class="control">
                        <a class="button is-info" @click="addToCart()">
                            Add to cart
                        </a>
                    </div>
                </div>
                
            </div>
        </div>
    </section>
</template>

<script>
import { PRODUCT_QUERY } from '@/graphql'
import { mapState, mapActions } from 'vuex';
import { Carousel, Slide } from 'vue-carousel'

export default {
    name: 'ProductSlug',
    components:{
        Carousel, Slide
    },
    data () {
        return {
            slug: this.$route.params.slug,
            qty: 1
        }
    },
    computed: {
        ...mapState(['productSlug']),
    },
    mounted() {
        this.fetchProductBySlug(this.$route.params.slug);
    },
    methods:{
        ...mapActions(['fetchProductBySlug', 'addProductToCart']),

        addToCart() {
            this.addProductToCart({
                selected_product: this.productSlug,
                quantity: this.qty
            });
        }
    }
}
</script>