<template>
    <h1>test</h1>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'
import qs from 'querystring';

export default {
    methods: {
        passToUser: function(url) {
            axios.post(url)
            .then(function(res) {
                console.log(qs.parse(res.data))
            })
            .catch(function(err) {
                console.log(err)
            })
        }
    },
    created() {
        const passUser = this.passToUser;
        axios.get('http://localhost:3000/githublogin?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        .then(function(res) {
            if(!res.data) {
                alert('something goes wrong.');
                this.$route.push('/')
            }
            return res.data;
        })
        .then(function(url) {
            passUser(url);
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