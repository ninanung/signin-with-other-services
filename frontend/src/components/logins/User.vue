<template>
    <div>
        <h1>USER</h1>
    </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios'

export default {
    methods: {
        redirect: function(url) {
            window.location.href = url
        }
    },
    created() {
        const redirect = this.redirect;
        const service = this.$route.query.service;
        let url = '';
        if(service === 'github') {
            url = 'http://localhost:3000/github/user?token=' + this.$route.query.token
        } else if(service === 'google') {
            url = 'something'; // change something to url
        }
        axios.get(url)
        .then(function(resp) {
            alert(resp.data + '! login success!');
            redirect('/');
        })
        .catch(function(err) {
            console.log(err);
            alert('something goes wrong');
            redirect('/')
        })
    },
    beforeRouteEnter(to, from, next) {
        if(to.query) {
            if(to.query.service) {
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