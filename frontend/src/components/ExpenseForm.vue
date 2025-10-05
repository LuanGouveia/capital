<template>

    <form @submit.prevent="addExpense">

        <div class="field">

            <div class="control switch-container">

                <label class="switch">

                    <input type="checkbox" v-model="isProfit">

                    <span class="slider">
                        <span class="slider-inner">
                            <span class="state spent">Spent</span>
                            <span class="state profit">Profit</span>
                        </span>
                    </span>

                </label>

            </div>

        </div>

        <div class="field">

            <label class="label">Value</label>

            <div class="control">
                <input type="text" placeholder="Enter the value" required v-model="value" />
            </div>

        </div>

        <div class="field">

            <div class="control">
                <input type="radio" name="radiotype" id="radiotype" value="Fixo" v-model="radiotype" /> Fixo
                <input type="radio" name="radiotype" id="radiotype" value="Variavel" v-model="radiotype" /> Variavel
            </div>

        </div>

        <div class="field">

            <label class="label">Forma</label>
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
                <label for="desc">Descreva seu gasto/lucro</label>
                <input type="text" name="desc" id="desc" placeholder="Descrição" required v-model="desc" />
            </div>

        </div>

        <div class="field">

            <div class="control">
                <button class="button is-primary">Add</button>
            </div>

        </div>

    </form>

</template>

<script>
    export default {

        name: "ExpenseForm",

        data() {
            return {
                isProfit: true,
                value: '',
                radiotype: '',
                category: '',
                desc: ''
            };
        },

        methods: {
            addExpense() {
                const expense = {
                    value: this.value,
                    profit: this.isProfit,
                    type: this.radiotype,
                    category: this.category,
                    desc: this.desc
                };

                console.log('Expense added:', expense);

                // Clear form fields after submission
                this.value = '';
                this.radiotype = '';
                this.category = '';
                this.desc = '';
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
</style>