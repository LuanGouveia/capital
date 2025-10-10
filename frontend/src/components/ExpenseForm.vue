<template>

    <div class="formexpense">
        <form @submit.prevent="addExpense">

            <div class="field">

                <div class="control switch-container">

                    <label class="switch">

                        <input type="checkbox" v-model="isProfit">

                        <span class="slider">
                            <span class="slider-inner" >
                                <span class="state spent">expense</span>
                                <span class="state profit">profit</span>
                            </span>
                        </span>

                    </label>

                </div>

            </div>

            <div class="field">

                <label class="label">Value</label>

                <div class="control">
                    <input type="number" placeholder="Enter the value" required v-model="value" />
                </div>

            </div>

            <div class="field">

                <div class="control">
                    <input type="radio" name="expenseType" id="expenseType1" value="Fixed" v-model="expenseType" /> Fixed
                    <input type="radio" name="expenseType" id="expenseType2" value="Occasional" v-model="expenseType" /> Occasional
                </div>

            </div>

            <div class="field">

                <label class="label">Category</label> 
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

            </div>

            <div class="field">

                <div class="control">
                    <label for="desc">Describe your spent/profit</label>
                    <input type="text" name="desc" id="desc" placeholder="Description" required v-model="desc" />
                </div>

            </div>

            <div class="field">

                <div class="control">
                    <button class="button is-primary">Add</button>
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

                    const response = await fetch('http://localhost:3000/balance/addValue', {

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
                    this.$emit('expense-added', responseData);

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
        width: 150px;
        height: 40px;
        position: relative;
        cursor: pointer;
    }

    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
        position: absolute;
        top: 0;
        left: 0;
    }

    .slider {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 20px;
        overflow: hidden;
        user-select: none;
    }

    .slider-inner {
        display: flex;
        width: 200%;
        height: 100%;
        transform: translateX(0);
        transition: transform 0.32s cubic-bezier(.2,.9,.2,.1);
    }

    .state{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 700;
        font-size: 14px;
        height: 100%;
        box-sizing: border-box;
    }

    .state.profit{
        background-color: #28f321;
    }

    .state.spent{
        background-color: #f32121;
    }

    .switch input:checked + .slider .slider-inner {
        transform: translateX(-50%);
    }

    .switch input:focus + .slider {
        outline: 2px solid rgba(0,0,0,0.08);
        outline-offset: 2px;
        box-shadow: 0 0 0 3px rgba(39,174,96,0.12);
    }

    .formexpense {
        max-width: 400px;
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 8px;
        background-color: #f9f9f9;
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
  width: 100%;
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
</style>