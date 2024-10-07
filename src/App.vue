<template>
    <div id="app">
        <nav-bar :route="this.$route.name"/>
        <router-view/>
    </div>
</template>

<script>
import NavBar from '@/components/Partial/NavBar'
export default {
    name: 'app',
    components:{
        NavBar
    },
    mounted() {
        console.log(this.$route.name)
    }
}
</script>