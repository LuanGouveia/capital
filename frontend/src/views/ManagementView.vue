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
    setup(props) {
        const expenses = ref([]);

        const fetchExpenses = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:3000/balance/getExpenses', {
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

        onMounted(() => {
            fetchExpenses();
        });

        const addExpenseToList = (newExpense) => {
            expenses.value.push(newExpense);
        };

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

            <ExpenseForm @expense-added="addExpenseToList" />

        </div>

        <div class="chart-container">

            <ExpenseChart :expenses="expenses" />

        </div>

    </div>

</template>

<style scoped>
    .management-view {
        display: flex;
        gap: 20px;           /* separa form e chart */
        margin-top: 20px;    /* espaço para a Navbar */
        position: relative;  /* garante que z-index funcione corretamente */
    }

.form-container, .chart-container {
  flex: 1;
  position: relative;  /* não cobre a Navbar */
  z-index: 0;
}
</style>