<template>

    <div class="description">

        <div class="descdata">

            <h1 class="left-title">About us</h1>

            <p class="left-text">Financial success depends primarily on one factor: organization, and that's what CAPITAL offers – a system to facilitate financial planning for its users, enabling you to optimize your spending and boost your income.</p>

        </div>

    </div>

    <div class="login">

        <div class="logindata">

            <h1 class="right-title">Login into your acccount</h1>
            <button v-on:click="Redirect()">Click here</button>

        </div>

    </div>

</template>

<script setup>
    import { useRouter } from 'vue-router';
    const router = useRouter()
    async function Redirect() {
        router.push('/management')
    }
</script>

<style scoped>

    *{
        margin-top: 0;
    }

    .description{
        background-color: rgb(94, 58, 7);
        width: 50%;
        height: 91.5vh;
        float: left;
    }

    .login{
        background-color: #ffdc43;
        width: 50%;
        height: 91.5vh;
        float: right;
    }

    .logindata{
        width: 80vh;
        margin: auto;
        margin-top: 50px;
        display:flex;
        align-items: center;
        flex-direction: column;
    }

    .right-title{
        font-size: 60px;
        text-align: center;
        color: rgb(94, 58, 7);
    }
    
    .register{
        font-size: 20px;
        color: rgb(59, 37, 5);
    }

    .descdata{
        width: 80vh;
        margin: auto;
        margin-top: 50px;
    }

    .left-title{
        font-size: 80px;
        text-align: center;
        color: #ffdc43;
    }

    .left-text{
        font-size: 60px;
        color: #c0a633;
    }

    button {
        background-color: rgb(94, 58, 7);
        color: #ffdc43;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        width: 400px;
    }

    button:hover {
        background-color: rgb(59, 37, 5);
    }

</style>