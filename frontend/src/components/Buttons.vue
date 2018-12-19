<template>
    <div class='body'>
        <li class='li' v-for='(service, index) in services' :key=index>
            <login :index=index :service=service />
        </li>
    </div>
</template>

<script>
import Login from './Login.vue';

export default {
    components: { Login },
    data() {
        return {
            services: ['github', 'facebook', 'google']
        }
    },
}
</script>

<style scoped>
    .body {
        list-style: none; width: 400px;
        margin: 0 !important;
        position: relative;
        left: calc(50% - 200px); right: calc(50% - 200px);
    }
    .li {
        width: 400px; margin: 0;
    }
</style>