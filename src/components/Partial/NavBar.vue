

<template>
    <div>
        <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" to="/">Home</router-link>

                <a class="navbar-cart">
                    <mini-cart />
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <!-- <router-link class="navbar-item" to="/accounts/login">Login</router-link> -->
                    <router-link class="navbar-item" to="/accounts/signup">Signup</router-link>
                </div>
                <mini-cart v-if="current_url!='Checkout'"/>
            </div>
        </nav>
    </div>
</template>

<script>
import MiniCart from '@/components/Partial/MiniCart'
export default {
    props: ['route'],
    name: 'NavBar',
    components:{
        MiniCart
    },
    data(){
        return {
            current_url: this.route
        }
    },
    mounted() {
        console.log(this.current_url)
    },
}
</script>

<style>
.navbar-cart{
    margin-left: auto !important;
}
@media screen and (min-width: 1024px){
    .navbar-cart {
        display: none;
    }
}
</style>
