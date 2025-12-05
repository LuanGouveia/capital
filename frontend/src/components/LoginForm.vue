<template>

    <div>

        <form @submit.prevent="handleSubmit">

            <div>
                <input type="text" id="email" v-model="email" required placeholder="Email" />
            </div>

            <div>
                <input placeholder="Password" type="password" id="password" v-model="password" required />
            </div>

            <button type="submit">Login</button>

        </form>

    </div>

</template>

<script>
import { store } from '@/store';

    export default {

        name: "LoginForm",

        data() {
            return {
                email: '',
                password: ''
            };
        },

        methods: {
            async handleSubmit() {

                console.log('Form submitted with:', this.email, this.password);
                
                const userData = {
                    email: this.email,
                    password: this.password
                };

                try {

                    const response = await fetch('http://localhost:5000/users/login', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },

                        body: JSON.stringify(userData)
                    });

                    if (response.ok) {

                        const data = await response.json();

                        localStorage.setItem('token', data.token);
                        localStorage.setItem('username', data.username)
                        store.isLoggedIn = true;
                        store.username = data.username;
                        this.$router.push('/management');   

                        
                    } else {

                        const errorData = await response.json();
                        console.error('Login failed:', errorData);
                        
                    }

                } catch (error) {
                    console.error('Error during login:', error);
                   
                }
            }
        }
    };
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
        width: 300px;
        margin: auto;
    }

    div {
        margin-bottom: 15px;
    }

    input {
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }

    button {
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        cursor: pointer;
    }

    button:hover {
        background-color: #45a049;
    }
</style>