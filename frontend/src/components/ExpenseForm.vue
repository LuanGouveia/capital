<template>
    <div>

        <h1>Create your account</h1>

        <form @submit.prevent="handleSubmit">

            <div>
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required />
            </div>

            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required />
            </div>

            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required />
            </div>

            <button type="submit">Register</button>
            
        </form>

    </div>
</template>

<script>
    export default {

        name: "ExpenseForm",

        data() {
            return {
                username: '',
                email: '',
                password: ''
            };
        },

        methods: {
            async handleSubmit() {

                console.log('Form submitted with:', this.username, this.email, this.password);
                
                const userData = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                };

                try {

                    const response = await fetch('http://localhost:3000/backend/users/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify(userData)
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();

                    console.log('Success:', result);

                    alert('Registration successful!');

                } catch (error) {
                    console.error('Error:', error);
                    alert('Registration failed. Please try again.');
                }
            }
        }
    };
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        max-width: 300px;
    }

    div {
        margin-bottom: 10px;
    }

    label {
        margin-bottom: 5px;
    }

    input {
        padding: 8px;
        font-size: 1em;
    }

    button {
        padding: 10px;
        font-size: 1em;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
</style>