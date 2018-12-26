<template>
    <div>
        <h1>GITHUBLOGIN</h1>
        <h3>{{this.isLogin}}</h3>
    </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'
import qs from 'querystring';

export default {
    data() {
        return {
            isLogin: '',
        }
    },
    methods: {
        insertData: function(data) {
            this.isLogin = data;
        }
    },
    created() {
        const insertData = this.insertData;
        axios.get('http://localhost:3000/githublogin?code=' + this.$route.query.code + '&state=' + this.$route.query.state)
        .then(function(res) {
            if(!res.data) {
                alert('something went wrong. plz try again');
                this.$route.push('/')
            }
            return res.data;
        })
        .then(function(data) {
            insertData(data)
        })
        .catch(function(err) {
            alert('something went wrong. plz try again');
            console.log(err)
            this.$route.push('/');
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