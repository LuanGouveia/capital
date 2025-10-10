<script>
import ExpenseForm from '@/components/ExpenseForm.vue';
import ExpenseChart from '@/components/ExpenseChart.vue';
import { ref, onMounted } from 'vue';

export default {

    name: "ManagementView",

    components: {
        ExpenseForm,
        ExpenseChart
    },

    setup() {

        const expenses = ref([]); 

        const fetchExpenses = async () => {

            try {

                const token = localStorage.getItem('token');

                const response = await fetch('http://localhost:3000/balance/getValues', {
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch expenses');
                }

                expenses.value = await response.json();
                
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

         const addExpenseToList = (newExpense) => {
            expenses.value.push(newExpense);
        };

        onMounted(() => {
            fetchExpenses();
        });

        return {
            expenses,
            addExpenseToList,
            fetchExpenses
        };
    }
}
</script>

<template>

    <div class="management-view">

        <div class="form-container">

            <ExpenseForm @addExpense="addExpenseToList" />

        </div>

        <div class="chart-container">

            <ExpenseChart :expenses="expenses" />

        </div>

    </div>

</template>

<style scoped>
    .management-view {
        display: flex;
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