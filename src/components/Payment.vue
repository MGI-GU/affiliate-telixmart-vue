<template>
    <section class="section">
        <h1 class="title">Checkout</h1>
        <form method="POST">
            <div class="columns">
                <div class="column is-3">
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
                        <table class="table">
                            <thead><tr><td colspan="2">Data Pengiriman</td></tr></thead>
                            <tbody>
                                <tr v-for="o in ongkir" :key="o.id" >
                                    <td>{{o.data[0].name}} {{o.data[0].costs[0].description}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="column is-4 is-offset-1">
                    <div class="field">
                       <table class="table">
                            <thead><tr><td colspan="2">Metode Pembayaran</td></tr></thead>
                            <tbody>
                                <tr >
                                    <td>
                                        <p>
                                            <input id="bank" type="radio" value="bank" v-model="pay" @change="updateInfoSource()">
                                            <label for="bank">
                                                Transfer Bank
                                            </label>
                                            <br>
                                            <span v-for="pay in paymentList.bank" :key="pay.id">
                                                <img v-bind:src="pay.name.logo" alt />
                                            </span>
                                        </p>
                                    </td>
                                </tr>
                                <tr >
                                    <td>
                                        <p>
                                            <input id="midtrans" type="radio" value="midtrans" v-model="pay" @change="updateInfoSource()">
                                            <label for="midtrans">
                                                Online Payment 
                                            </label>
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
                        <router-link class="button is-fullwidth is-uppercase" :to="{ name: 'Shipping'}">Back</router-link>
                        <br>
                        <button class="button is-primary is-fullwidth is-uppercase" @click="saveData()">Checkout</button>
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
    name: 'Payment',
    components:{
        Cart
    },
    data () {
        return {
            pay: 'bank'
        }
    },
    computed: {
        ...mapState(['shop', 'user', 'cart', 'provinceList', 'cityList', 'stateList', 'order', 'ongkir', 'paymentList', 'payment']),
    },
    mounted() {
        // FETCT PAYMENT DATA
        this.getPaymentMethod(this.shop.id);
    },
     methods:{
        ...mapActions(['getPaymentMethod', 'addPayment']),
        updateInfoSource() {
            this.addPayment({
                data: this.pay
            });
        },
        saveData(){
            // redirect usernp
            this.$router.replace('/'+this.$route.params.subdomain+'/finish')
        }

     }
}
</script>