<script>
import RegisterForm from '../components/RegisterForm.vue';

export default {
    name: "RegisterView",
    components: {
            RegisterForm
    }
};
</script>

<template>

    <div class="register-view">

        <div class="form-container">
            <RegisterForm />
        </div>
        
    </div>

</template>

<style scoped>

    .register-view {
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