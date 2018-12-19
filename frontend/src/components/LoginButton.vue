<template>
    <button class='button'>
        <img class='image' :src='require("../assets/" + service + ".png")' />
        {{'Login with ' + service }}
    </button>
</template>

<script>
export default {
    props: [ 'service' ],
    methods: {
        buttonClick: () => {
            
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