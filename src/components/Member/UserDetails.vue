<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <Menu/>
                </div>
                <div class="column is-9">
                    <h2 class="title">User Details</h2>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Username</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input class="input is-static" :value="users_by_pk.name" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Email Address</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input class="input is-static" :value="users_by_pk.email" readonly>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="field is-horizontal">
                        <div class="field-label is-normal">
                            <label class="label">Number of products</label>
                        </div>
                        <div class="field-body">
                            <div class="field">
                                <p class="control">
                                    <input class="input is-static" :value="users_by_pk.produk_aggregate.aggregate.count" readonly>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Menu from '@/components/Member/Menu'
import { USER_QUERY } from '@/graphql'

export default {
    name: 'UserDetails',
    components: {
        Menu
    },
    data () {
        return {
            users_by_pk: '',
            id: this.$route.params.id
        }
    },
    apollo: {
        // fetch user by ID
        users_by_pk: {
            query: USER_QUERY,
            variables () {
                return {
                    id: this.id
                }
            }
        }
    }
}
</script>