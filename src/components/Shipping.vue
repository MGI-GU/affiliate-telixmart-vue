<template>
    <section class="section">
        <h1 class="title">Checkout</h1>
        <form method="POST">
            <div class="columns">
                <div class="column is-4">
                    <div class="field">
                        <table class="table">
                            <thead><tr><td colspan="2">Data Pembeli</td></tr></thead>
                            <tbody v-for="data in order" :key="data.id">
                                <tr v-for="(d,k) in data" :key="d.id" >
                                    <td v-if="k!='account_id'">{{k}} </td>
                                    <td v-if="k!='account_id'">
                                        <span v-if="k=='state'">{{stateList.find(item => {return item.id === d}).name}}</span>
                                        <span v-else-if="k=='city'">{{cityList.find(item => {return item.id === d}).name}}</span>
                                        <span v-else-if="k=='province'">{{provinceList.find(item => {return item.id === d}).name}}</span>
                                        <span v-else-if="k=='country' && d==1">Indonesia</span>
                                        <span v-else-if="k=='country' && d>1">Luar Negeri</span>
                                        <span v-else>{{d}} </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="column is-3 is-offset-1">
                    <div class="field">
                       <table class="table">
                            <thead><tr><td colspan="2">Pengiriman</td></tr></thead>
                            <tbody>
                                <tr v-for="o in ongkirList" :key="o.id">
                                    <td v-for="c in o.costs" :key="c.id">
                                        <p v-for="price in c.cost" :key="price.id">
                                            <input type="radio" v-bind:id="o.code+'-'+c.service+'-'+price.value" :value="[o, c, price]" v-model="shipping" @change="setOngkir()">
                                            <label v-bind:for="o.code+'-'+c.service+'-'+price.value">{{o.code}} {{c.service}} {{price.value}}</label>
                                        </p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="column is-4">
                    <cart />
                    <p class="control">
                        <router-link class="button is-fullwidth is-uppercase" :to="{ name: 'Checkout'}">Back</router-link>
                        <br>
                        <button class="button is-primary is-fullwidth is-uppercase" @click="saveData()">Next to Payment</button>
                    </p>
                </div>
            </div>
        </form>
    </section>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import Cart from '@/components/Partial/Cart'

export default {
    name: 'Shipping',
    components:{
        Cart
    },
    data () {
        return {
            shipping: ''
        }
    },
    computed: {
        ...mapState(['shop','user','cart','provinceList','cityList','stateList', 'order', 'ongkirList', 'ongkir']),
        ...mapGetters(['getWeightTotal'])
    },
    mounted() {
        // FETCT SHIPPING FEE DATA
        this.apiOngkir([144, 144, this.getWeightTotal]);
    },
     methods:{
        ...mapActions(['apiOngkir', 'addOngkir']),
        setOngkir() {
            this.addOngkir({
                data: this.shipping
            }).then(response => {
                // re calculate mini cart
                
            });
        },
        saveData(){
            // redirect user
            this.$router.replace('/'+this.$route.params.subdomain+'/payment')
        }

     }
}
</script>