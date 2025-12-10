<script>
import ExpenseForm from '@/components/ExpenseForm.vue';
import ExpenseChart from '@/components/ExpenseChart.vue';
import TransactionTable from '@/components/TransactionTable.vue';
import EditModal from '@/components/EditModal.vue'; 
import { ref, onMounted } from 'vue';
import { BASE_URL } from '@/services/api';

export default {
    name: "ManagementView",
    components: {
        ExpenseForm,
        ExpenseChart,
        TransactionTable,
        EditModal 
    },
    setup() {
        const chartData = ref({});
        const tableData = ref([]);
        
        const showModal = ref(false);
        const itemToEdit = ref(null);

        const token = localStorage.getItem('token');

        async function fetchChartData() {
            try {
                const response = await fetch(`${BASE_URL}/balance/getValues`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    chartData.value = await response.json();
                }
            } catch (error) {
                console.error('Erro ao buscar dados do gráfico:', error);
            }
        }

        async function fetchTableData() {
            try {
                const response = await fetch(`${BASE_URL}/balance/transactions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    tableData.value = await response.json();
                }
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
            }
        }

        function refreshAll() {
            fetchChartData();
            fetchTableData(); 
        }

        async function handleDelete(id) {
            try {
                const response = await fetch(`${BASE_URL}/balance/delete/${id}`, {
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    }
                });

                if (response.ok) {
                    alert("Item excluído com sucesso!");
                    refreshAll();
                } else {
                    alert("Erro ao excluir item.");
                }
            } catch (error) {
                console.error("Erro na requisição de delete:", error);
            }
        }

        function openEditModal(item) {
            itemToEdit.value = item; 
            showModal.value = true;  
        }

        async function saveEdit(updatedItem) {
            try {
                const response = await fetch(`${BASE_URL}/balance/update/${updatedItem.id}`, {
                    method: 'PUT',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` 
                    },
                    body: JSON.stringify(updatedItem)
                });

                if (response.ok) {
                    alert("Atualizado com sucesso!");
                    showModal.value = false; 
                    refreshAll(); 
                } else {
                    const errorData = await response.json();
                    alert("Erro: " + errorData.error);
                }
            } catch (error) {
                console.error("Erro ao atualizar:", error);
            }
        }

        onMounted(() => {
            refreshAll();
        });

        return {
            chartData,
            tableData,
            refreshAll,
            handleDelete,
            showModal,
            itemToEdit,
            openEditModal,
            saveEdit
        };
    }
}
</script>

<template>
    <div class="page-container">
        
        <div class="management-view">
            <div class="form-container">
                <ExpenseForm @addExpense="refreshAll" />
            </div>
            <div class="chart-container">
                <ExpenseChart :expenses="chartData" />
            </div>
        </div>

        <div class="table-section">
            <TransactionTable 
                :transactions="tableData" 
                @delete-transaction="handleDelete"
                @edit-transaction="openEditModal" 
            />
        </div>

        <EditModal 
            :isOpen="showModal"
            :transaction="itemToEdit"
            @close="showModal = false"
            @save="saveEdit"
        />

    </div>
</template>

<style scoped>
    .page-container {
        background-color: rgb(1, 11, 5);
        min-height: 91.5vh;
        display: flex;
        flex-direction: column;
    }
    .management-view {
        display: flex; 
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        width: 100%; 
        padding: 20px 0;
        height: 80vh;
    }
    .form-container { width: 40%; }
    .chart-container { width: 60%; }
    .table-section { width: 90%; margin: 0 auto; padding-bottom: 50px; }
</style>