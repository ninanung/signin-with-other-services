<template>
    <login-button :service=service />
</template>

<script>
import LoginButton from './LoginButton.vue';

export default {
    props: [ 'service', 'index' ],
    components: { LoginButton },
}
</script>

<style scoped>

</style>