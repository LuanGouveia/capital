<script>
import ExpenseForm from '@/components/ExpenseForm.vue';

export default {
    name: "ManagementView",
    components: {
        ExpenseForm
    }
};
</script>

<template>

    <div class="management-view">

        <div class="form-container">

            <ExpenseForm />
            
        </div>

    </div>

</template>