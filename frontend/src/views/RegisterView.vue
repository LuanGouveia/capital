<script>
    import ExpenseForm from '../components/ExpenseForm.vue';

    export default {
        name: "RegisterView",
        components: {
            ExpenseForm
        }
    };
</script>

<template>
    <div class="register-view">
        <h1>Register</h1>
        <ExpenseForm />
    </div>
</template>