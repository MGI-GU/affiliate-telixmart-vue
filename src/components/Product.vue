<template>
    <section class="section">
        <div class="columns">
            <router-link class="button is-link is-small" to="/">Back Home</router-link>
            <div class="column is-6 is-offset-3" v-if="product">

                <h1 class="title">
                    {{ product.name }}
                </h1>

                <div class="content">
                    {{ product.description }}
                </div>

                <p class="control" v-for="image in product.images"
                v-bind:key="image.id">
                    <img
                        v-bind:src="image.url"
                        class="gallery-image"
                        alt
                        />
                </p>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'Product',
    computed: {
        ...mapState(['product']),
    },
    mounted() {
        this.fetchProduct(this.$route.params.id);
    },
    methods: {
        ...mapActions(['fetchProduct']),
    }
}
</script>