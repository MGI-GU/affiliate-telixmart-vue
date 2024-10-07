<template>
    <section class="section">
        <div class="columns">
            <div class="column is-4 is-offset-4">
                <!-- <h2 class="title has-text-centered">Login</h2> -->

                <form method="POST" @submit.prevent="login">
                    <div class="field">
                        <label class="label">E-Mail Login</label>

                        <p class="control">
                            <input
                                type="email"
                                class="input"
                                v-model="email">
                        </p>
                    </div>

                    <p class="control">
                        <button class="button is-primary is-fullwidth is-uppercase">Login</button>
                    </p>
                </form>
            </div>
        </div>
    </section>
</template>

<script>

import { LOGIN_MUTATION } from '@/graphql'
import { mapActions, mapState } from 'vuex';

export default {
    name: 'LogIn',
    data () {
        return {
            email: 'putu@asd.com'
        }
    },
    methods: {
        ...mapActions(['fetchUser', 'resetState']),
        login () {
            this.fetchUser({
                 email: this.email
            }).then(response => {
                // redirect user
                this.$router.replace('/'+this.user.shop.subdomain)
            });
        }
    },
    computed: {
        ...mapState(['user']),
    },
    mounted() {
        this.resetState();
    }
}
</script>
