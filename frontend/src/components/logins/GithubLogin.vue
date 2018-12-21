<template>
    <h1>test</h1>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'

export default {
    methods: {
        passToUser: function(url) {
            window.location.href = url;
        }
    },
    created() {
        axios.get('http://localhost:3000/githublogin?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        .then(function(res) {
            
        })
        .catch(function(err) {
            console.log(err)
        })
    },
    beforeRouteEnter(to, from, next) {
        if(to.query) {
            if(to.query.code && to.query.state) {
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

<style>

</style>