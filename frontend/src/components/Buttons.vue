<template>
    <div class='body'>
        <li class='li' v-for='(service, index) in services' :key=index>
            <login-button :index=index :service=service />
        </li>
    </div>
</template>

<script>
import LoginButton from './LoginButton.vue';

export default {
    components: { LoginButton },
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