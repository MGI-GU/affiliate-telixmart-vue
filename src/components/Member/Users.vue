<template>
    <section class="section">
        <div class="container">
            <div class="columns">
                <div class="column is-3">
                    <Menu/>
                </div>
                <div class="column is-9">
                    <h2 class="title">Users</h2>

                    <table class="table is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>Email</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="user in users"
                                :key="user.id">
                                    <td>{{ user.name }}</td>
                                    <td>{{ user.email }}</td>
                                    <td>
                                        <router-link :to="`/admin/users/${user.id}`">View</router-link>
                                    </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import Menu from '@/components/Member/Menu'
import { ALL_USERS_QUERY } from '@/graphql'

export default {
    name: 'Users',
    components: {
        Menu
    },
    data () {
        return {
            users: []
        }
    },
    apollo: {
        // fetch all users
        users: {
            query: ALL_USERS_QUERY
        }
    }
}
</script>