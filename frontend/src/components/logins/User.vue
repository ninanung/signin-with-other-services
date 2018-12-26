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
        if(this.$route.query.service === 'github') {
            axios.get('http://localhost:3000/github/user?token=' + this.$route.query.token)
            .then(function(resp) {
                alert(resp.data + '! login success!');
            })
            .catch(function(err) {
                console.log(err)
                redirect('/')
            })
        }
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