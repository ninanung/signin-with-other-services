<template>
    <div>
        <h1>GOOGLE LOGIN</h1>
    </div>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios';

export default {
    methods: {
        redirect: function(url) {
            window.location.href = url;
        }
    },
    created() {
        const redirect = this.redirect;
        axios.get() // insert url here
        .then(function(res) {
            // do something
        })
        .catch(function(err) {
            alert('something went wrong. request failed.');
            console.log(err)
            redirect('/')
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
