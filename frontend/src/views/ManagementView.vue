<script>
import ExpenseForm from '@/components/ExpenseForm.vue';
import ExpenseChart from '@/components/ExpenseChart.vue';
import {ref, onMounted } from 'vue';

export default {

    name: "ManagementView",

    components: {
        ExpenseForm,
        ExpenseChart
    },

    setup() {

        const expenses = ref([]);

        async function addExpense() {
            const response = await fetch('http://localhost:3000/balance/getValues', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.ok) {
                expenses.value = await response.json();
            } else {
                console.error('Failed to fetch expenses');
            }
        };  

        onMounted(addExpense);

        return {
            expenses,
            addExpense
        };
    }
}
</script>

<template>

    <div class="management-view">

        <div class="form-container">

            <ExpenseForm @addExpense="addExpense" />

        </div>

        <div class="chart-container">

            <ExpenseChart :expenses="expenses" />

        </div>

    </div>

</template>

<style scoped>
    .management-view {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100vh;
        background-color: rgb(1, 11, 5);
    }

    .form-container {
        width: 40%;
    }

    .chart-container {
        width: 60%;
    }
</style>