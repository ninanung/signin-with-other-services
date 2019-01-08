<template>
    <button class='button' v-on:click='buttonClick' >
        <img class='image' :src='require("../assets/" + service + ".png")' />
        {{'Login with ' + service }}
    </button>
</template>

<script>
/* eslint-disable no-console */
import axios from 'axios';
import firebase from 'firebase';
import config from '../firebase_config.js';

firebase.initializeApp(config.config);
const provider = new firebase.auth.GoogleAuthProvider();

export default {
    props: [ 'service', 'index' ],
    methods: {
        redirect: function(url) {
            window.location.href = url;
        },
        buttonClick: function() {
            const redirect = this.redirect;
            if(this.service === 'google') {
                firebase.auth().signInWithPopup(provider).then(function(result) {
                    const token = result.credential.accessToken;
                    const userName = result.user.displayName;
                    const email = result.user.email;
                    redirect('/googlelogin?token=' + token + '&username=' + userName + '&email=' + email)
                })
                .catch(function(error) {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.email;
                    const credential = error.credential;
                    const errorData = {
                        errorCode,
                        errorMessage,
                        email,
                        credential,
                    }
                    console.log(errorData);
                    alert('something goes wrong');
                    redirect('/')
                });
            }
            axios.get('http://localhost:3000/' + this.service)
            .then(function(res) {
                redirect(res.data);
            })
            .catch(function(err) {
                console.log(err)
            })
        }
    },
}
</script>

<style scoped>
    .button {
        width: 400px; height: 50px; font-weight: bold;
        font-size: 30px; background: #6D7E85;
        color: white; border-radius: 10px; margin-top: 10px;
        display: flex; align-items: center; justify-content: center;
    }
    .button:hover {
        cursor: pointer;
    }
    .image {
        width: 40px; height: auto;
    }
</style>