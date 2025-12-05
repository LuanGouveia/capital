<script>
import { ref, watch } from 'vue';

export default {
    name: "EditModal",
    props: {
        isOpen: Boolean,        
        transaction: Object    
    },
    emits: ['close', 'save'],   
    setup(props, { emit }) {
        
        const isProfit = ref(false);

        const form = ref({
            id: null,
            value: 0,
            category: '',
            expenseType: 'fixed',
            description: '',
            profitOrExpense: ''  
        });

        watch(() => props.transaction, (newItem) => {
            if (newItem) {
                form.value = { 
                    ...newItem, 
                    value: Math.abs(newItem.value),
                    expenseType: newItem.expenseType || newItem.expensetype || 'fixed',
            
                };
                isProfit.value = newItem.profitOrExpense === 'profit';
            }
        }, { immediate: true });

        function save() {
            if (!form.value.value || !form.value.category) {
                alert("Preencha valor e categoria!");
                return;
            }
            form.value.profitOrExpense = isProfit.value ? 'profit' : 'expense';
            emit('save', form.value);
        }
        return { form, save, emit, isProfit };
    }
}
</script>

<template>
    <div v-if="isOpen" class="modal-overlay">
        <div class="modal-content">
            <h3>Edit transaction</h3>

            <form @submit.prevent="save">
                
                <div class="form-group">
                    <label>Value (R$)</label>
                    <input type="number" step="0.01" v-model="form.value" required>
                </div>

                <div class="form-group">
                    <label>Category</label>
                    <select v-model="form.category"> 
                        <option value="Lazer">Lazer</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Educação">Educação</option>
                        <option value="Contas">Contas</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <div class="field">
                    <div class="control switch-container">
                        <label class="switch">
                            <input type="checkbox" v-model="isProfit">

                            <span class="label-container">
                                <span class="label-text left-label">EXPENSE</span>
                                <span class="label-text right-label">EARNING</span>
                            </span>
                            
                            <span class="slider">
                                <span class="slider-fill"></span>
                            </span>

                        </label>
                    </div>
                </div>

                <div class="form-group">
                    <label>Type</label>
                    <select v-model="form.expenseType"> 
                        <option value="fixed">Fixed</option>
                        <option value="occasional">Occasional (variable)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Description (Optional)</label>
                    <input type="text" v-model="form.description">
                </div>

                <div class="actions">
                    <button type="button" @click="emit('close')" class="btn-cancel">Cancelar</button>
                    <button type="submit" class="btn-save">Salvar Alterações</button>
                </div>

            </form>
        </div>
    </div>
</template>

<style scoped>
    .switch-container {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
    }

    .switch {
        position: relative;
        display: inline-block;
        width: 400px;
        height: 50px;
        cursor: pointer;
        border-radius: 25px;
        background-color: #ccc;
        overflow: hidden;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
    }

    .label-container {
        position: absolute;
        display: flex;
        width: 100%;
        height: 100%;
        z-index: 2;
    }

    .label-text {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 1000;
        font-size: 28px;
        text-transform: uppercase;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        color: #333; 
        transition: color 0.32s;
        user-select: none;
    }

    .slider-fill {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        border-radius: 25px;
        transition: transform 0.32s, background-color 0.32s;
        z-index: 1; 
    }

    .slider-fill {
        transform: translateX(0);
        background-color: #f32121; 
    }
    
    .switch input:not(:checked) ~ .label-container .left-label {
        color: white; 
    }

    .switch input:checked ~ .slider .slider-fill {
        transform: translateX(100%);
        background-color: #28f321; 
    }
    
    .switch input:checked ~ .label-container .right-label {
        color: white; 
    }
    
    .switch input:focus + .label-container + .slider {
        outline: 2px solid rgba(0,0,0,0.08);
        outline-offset: 2px;
        box-shadow: 0 0 0 3px rgba(39,174,96,0.12);
    }

    .modal-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 20px;
        border-radius: 8px;
        width: 350px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    }

    .form-group {
        margin-bottom: 15px;
    }

    label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
    }

    input, select {
        width: 100%;
        padding: 8px;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .btn-save {
        background-color: #4CAF50;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .btn-cancel {
        background-color: #f44336;
        color: white;
        padding: 10px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
</style>