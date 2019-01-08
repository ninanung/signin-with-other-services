<template>
    <div>
        <h1>GOOGLE LOGIN</h1>
    </div>
</template>

<script>
/* eslint-disable no-console */
export default {
    methods: {
        redirect: function(url) {
            window.location.href = url;
        }
    },
    created() {
        const queryData = this.$route.query;
        alert('Hello! ' + queryData.username + '! your email is ' + queryData.email);
        this.redirect('/');
    },
    beforeRouteEnter(to, from, next) {
        if(to.query) {
            if(to.query.token && to.query.email && to.query.username) {
                next()
            } else {
                alert('there\'s no query data.')
                next('/')
            }
        } else {
            alert('there\'s no query data.')
            next('/')
        }
    }
}
</script>
