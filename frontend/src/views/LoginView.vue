<script>
import LoginForm from '../components/LoginForm.vue';

export default {
    name: "LoginView",
    components: {
            LoginForm
    }
};
</script>

<template>

    <div class="login-view">

        <div class="form-container">
            <LoginForm />
        </div>
        
    </div>

</template>

<style scoped>

    .login-view {
        width: 100vw;
        height: 91.5vh;
        background-color: #ffdc43;
        display: flex;
        justify-content: center;
    }

    .form-container {
        width: 100%;
        max-width: 60vw;  
        display: flex;
        justify-content: center;
    }

</style>