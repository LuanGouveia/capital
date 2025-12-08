<template>

    <div class="formexpense">
        <form @submit.prevent="addExpense()">

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

            <div class="firstsection">

                <div class="field">

                    <label class="label number">VALUE:</label>

                    <div class="control number-input">
                        <input type="number" required v-model="value" step="0.01" placeholder="0,00" />
                    </div>

                </div>

                <div class="field">

                    <div class="control radio-input">
                        <div>
                            <input type="radio" name="expenseType" id="expenseType1" value="Fixed" v-model="expenseType" /> Fixed
                        </div>
                        <div>
                            <input type="radio" name="expenseType" id="expenseType2" value="Occasional" v-model="expenseType" /> Occasional
                        </div>
                    </div>

                </div>

            </div>
  
            <div class="field secondsection">

                <label class="label number">Category</label> 
                <div class="control">
                    <select name="forma" id="forma" v-model="category" required>
                        <option value="Lazer">Lazer</option>
                        <option value="Transporte">Transporte</option>
                        <option value="Saúde">Saúde</option>
                        <option value="Educação">Educação</option>
                        <option value="Contas">Contas</option>
                        <option value="Outros">Outros</option>
                    </select>
                </div>

                <div class="control description">
                    <label for="desc" class="">Describe your spent/profit</label>
                    <textarea name="desc" id="desc" placeholder="Here" required v-model="desc" />
                </div>

            </div>

            <div class="fieldbutton">

                <div class="control">
                    <button class="button is-primary">Submit</button>
                </div>

            </div>

        </form>
    </div>
    

</template>

<script>

    export default {

        name: "ExpenseForm",

        data() {
            return {
                isProfit: "",
                value: '',
                expenseType: '',
                category: '',
                desc: ''
            };
        },

        methods: {
            async addExpense() {

                const token = localStorage.getItem('token');
                console.log('Using token:', token);

                if (!token) {
                    throw new Error('No token found, user might not be authenticated');
                }

                let profitOrSpent = this.isProfit;
                let expenseType = this.expenseType;

                if (profitOrSpent){
                    profitOrSpent = 'profit';
                } else {
                    profitOrSpent = 'expense';
                }

                if (expenseType){
                    expenseType = 'Fixed';
                } else {
                    expenseType = 'Occasional';
                }

                const expense = {
                    profitorexpense: profitOrSpent,
                    value: this.value,
                    expenseType: this.expenseType,
                    category: this.category,
                    desc: this.desc
                };

                console.log('Expense added:', expense);

                this.value = '';
                this.radiotype = '';
                this.category = '';
                this.desc = '';

                try {

                    if (!token) {
                        throw new Error('No token found, user might not be authenticated');
                    }

                    const response = await fetch('http://localhost:5000/balance/addValue', {

                        method: 'POST',

                        headers: {
                            'Content-Type': 'application/json',
                            authorization: `Bearer ${token}`
                        },

                        body: JSON.stringify(expense)
                    });

                    if (!response.ok) {
                        throw new Error('Error adding expense-profit / submitting form');
                    }

                    const responseData = await response.json();
                    console.log('Server response:', responseData);
                    this.$emit('addExpense', responseData);

                } catch (error) {
                    console.error('Error adding expense:', error);
                    alert('Failed to add expense. Please try again.');
                }
            }
        }
    };
</script>

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

    .formexpense {
        width: 100%;
        height: 70vh;
        padding: 1rem;
        color: white;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    input[type="text"] {
        width: 250px;
        height: 40px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 16px;
        color: #333;
        background-color: #f9f9f9;
    }

    input[type="text"]:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none; 
    }

    button {
        background-color: #007bff;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
    }

    select {
        width: 6rem;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        color: #333;
        background-color: #f9f9f9;
    }

    option {
        padding: 10px;
    }

    input[type="number"] {
        border: 2px solid #ccc;
        border-radius: 8px;
        transition: border-color 0.3s; 
        font-family: 'Courier New', monospace;
        font-weight: bold;
        font-size: 1.2rem;
        margin-left: 5px;
        width: 150px;
        height: 40px;
    }

    input[type="number"]:focus {
        border-color: #007bff;
        box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        outline: none; 
    }

    input[type="number"]::placeholder {
        color: #aaa;
        font-style: italic;
    }

    .number-input {
        position: relative;
        display: inline-block;
    }

    .number-input span {
        position: absolute;
        left: 10px;
        top: 50%;
        transform: translateY(-50%);
        color: #555;
        font-size: 1.2rem;
        pointer-events: none; 
    }

    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    .firstsection {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
    }
    .radio-input {
        display: flex;
        gap: 5px;
        font-size: 1.1rem;
        font-weight: 600;
        flex-direction: column;

    }
    .number {
        font-size: 1.4rem;
        font-weight: 300;
    }

    .description{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .secondsection {
        display: flex;
        gap: 20px;
        margin-bottom: 15px;
    }
    .fieldbutton{
        text-align: center;
    }

</style>