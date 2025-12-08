<template>
    <div class="table-container">
        <h3 class="title">Data</h3>
        
        <table>
            <thead>
                <tr>
                    <th>Value</th>
                    <th>Category</th>
                    <th>Type</th>
                    <th>Expense/Earning</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in transactions" :key="item.id">

                    <td>R$ {{ item.value }}</td>
                    
                    <td>{{ item.category }}</td>

                    <td>{{ item.expensetype }}</td>
                    
                    <td :class="item.profitOrExpense === 'profit' ? 'text-green' : 'text-red'">
                        {{ item.profitOrExpense === 'profit' ? 'Earning' : 'Expense' }}
                    </td>

                    <td>{{ item.description }}</td>

                    <td>
                        <button @click="onEdit(item)" class="btn-edit">✏️</button>
                        <button @click="onDelete(item.id)" class="btn-delete">🗑️</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-if="transactions.length === 0" class="empty-msg">
            No transactions found.
        </div>
    </div>
</template>

<script>
export default {
    name: "TransactionTable",
    props: {
        transactions: {
            type: Array,
            required: true
        }
    },
    methods: {
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return date.toLocaleDateString('pt-BR');
        },
        onDelete(id) {
            
            console.log("trying to delete the item:", id);

            if(confirm("you sure you want to delete?")) {
                this.$emit('delete-transaction', id);
            }
        },
        onEdit(item) {
            this.$emit('edit-transaction', item);
        }
    }
}
</script>

<style scoped>

    .title{
        color:#ffdc43;
        font-size: 100px;
        margin-bottom: 0px;
    }

    .table-container {
        width: 100%;
        overflow-x: auto; 
    }

    table {
        width: 100%;
        border-collapse: separate;
        border-spacing: 0;
        background: rgb(197, 132, 52);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        border-radius: 10px;
    }

    thead tr:first-child th:first-child {
        border-top-left-radius: 10px;
    }

    thead tr:first-child th:last-child {
        border-top-right-radius: 10px;
    }

    th, td {
        padding: 12px;
        text-align: left;
        border-bottom: 1px solid #000000;
        color: rgb(255, 255, 255);
    } 

    th {
        background-color: #523603;
        font-weight: bold;
    }

    .text-green { color: green; font-weight: bold; }
    .text-red { color: red; font-weight: bold; }

    .btn-delete, .btn-edit {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2rem;
        margin-right: 10px;
    }

    .btn-delete:hover,.btn-edit:hover { transform: scale(1.2); }

    .empty-msg { 
        text-align: center; 
        padding: 20px; 
        color: #ffffff; 
    }
</style>