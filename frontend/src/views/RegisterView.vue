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
        height: 100vh;
        background-color: #2c3e50;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        width: 100%;
        max-width: 400px;   
        padding: 20px;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
    }

</style>