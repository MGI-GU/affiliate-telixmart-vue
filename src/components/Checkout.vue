<template>
    <section class="section">
        <h1 class="title">Checkout</h1>
        <form method="POST" @submit.prevent="saveData">
            <div class="columns">
                <div class="column is-6 is-offset-1">
                    <div class="columns">
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Nama</label>
                                <p class="control">
                                    <input type="text" class="input" v-model="name">
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Email</label>
                                <p class="control">
                                    <input type="text" class="input" v-model="email">
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Telepon / HP</label>
                                <p class="control">
                                    <input type="text" class="input" v-model="phone">
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Alamat</label>
                                <p class="control">
                                    <input type="text" class="input" v-model="address">
                                </p>
                            </div>
                        </div>
                        <div class="column is-6">
                            <div class="field">
                                <label class="label">Negara</label>
                                <p class="control">
                                    <select class="input" v-model="country" @change="getProvince">
                                        <option value="">Select Country</option>
                                        <option value="1">Indonesia</option>
                                    </select>
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Provinsi</label>
                                <p class="control">
                                    <select class="input" v-model="province" @change="getCity">
                                        <option v-for="p in provinceList" v-bind:key="p.id" :value="p.id">{{p.name}}</option>
                                    </select>
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Kota/Kabupaten</label>
                                <p class="control">
                                    <select class="input" v-model="city" @change="getState">
                                        <option v-for="c in cityList" v-bind:key="c.id" :value="c.id">{{c.name}}</option>
                                    </select>
                                </p>
                            </div>
                            <div class="field">
                                <label class="label">Kecamatan</label>
                                <p class="control">
                                    <select class="input" v-model="state">
                                        <option v-for="s in stateList" v-bind:key="s.id" :value="s.id">{{s.name}}</option>
                                    </select>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Pesan</label>
                        <p class="control">
                            <input type="text" class="input" v-model="notes">
                        </p>
                    </div>
                </div>
                <div class="column is-5">
                    <cart />
                    <p class="control">
                        <router-link class="button is-fullwidth is-uppercase" :to="{ name: 'Shop', subdomain: this.$route.params.subdomain}">Continue Shoping</router-link>
                        <br>
                        <button class="button is-primary is-fullwidth is-uppercase">Next to Shipping</button>
                    </p>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Cart from '@/components/Partial/Cart'
import ProductCard from '@/components/Partial/ProductCard'
import { PROVINCE_QUERY, CITY_QUERY, STATE_QUERY } from '@/graphql'

export default {
    name: 'Chekout',
    components:{
        Cart, ProductCard
    },
    computed: {
        ...mapState(['shop','user','cart','provinceList','cityList','stateList','order']),
    },
    data () {
        return {
            account_id: this.shop,
            name:  '',
            email: '',
            phone: '',
            address: '',
            country: '',
            province: '',
            city: '',
            state: '',
            notes: ''
        }
    },
    methods: {
        ...mapActions(['fetchShop', 'fetchProvince', 'fetchCity', 'fetchState', 'addBuyerData']),
        
        getProvince(){
            this.fetchProvince({
                id: this.country,
            });
        },
        getCity(){
            this.fetchCity({
                id: this.province,
            });
        },
        getState(){
            this.fetchState({
                id: this.city,
            });
        },
        saveData(){
             this.addBuyerData({
                account_id: this.shop.id,
                name: this.name,
                email: this.email,
                phone: this.phone,
                address: this.address,
                country: this.country,
                province: this.province,
                city: this.city,
                state: this.state,
                notes: this.notes
            }).then(response => {
                // redirect user
                this.$router.replace('/'+this.$route.params.subdomain+'/shipping')
            });
        }
    },
    created() {
        if(this.order !== null){
            this.name = this.order.data.name;
            this.email = this.order.data.email;
            this.phone = this.order.data.phone;
            this.address = this.order.data.address;
            this.notes = this.order.data.notes;
            this.country = this.order.data.country;
            this.province = this.order.data.province;
            this.city = this.order.data.city;
            this.state = this.order.data.state;
        }else if(this.user !== null){
            this.name = this.user.name;
            this.email = this.user.email;
            this.phone = this.user.phone;
            this.address = this.user.address;

        }
    }
}
</script>