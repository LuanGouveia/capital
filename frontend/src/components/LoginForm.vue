<template>

    <div class="login-container">
        <h2>Acess your account</h2>

        <form @submit.prevent="Login">

            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email" required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>

            <button type="submit">Submit</button>

        </form>

    </div>

</template>

<script setup>
    import { store } from '@/store';
    import axios from 'axios';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const email = ref('')
    const password = ref('')

    const router = useRouter();

    async function Login() {
                
            const userData = {
                email: email.value,
                password: password.value
            };

            try {
                const response = await axios.post('http://localhost:5000/users/login', userData);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username)
                store.isLoggedIn = true;
                store.username = response.data.username;
                router.push('/management');   
            }catch(error){
                console.error('Login error:', error);
                if(error.response){
                    alert(error.response.data.error ||"Incorrect user or password")
                }else if(error.request)  {
                    alert("Conecction error")
                }else{
                    alert("Unexpected error")
                }
            }
    }
</script>

<style scoped>
    h2{
        font-size: 90px;
        text-align: center;
        color: rgb(94, 58, 7);
        margin-bottom: 20px;
    }

    .form-group{
        display: flex;
        flex-direction: column;
        margin: 10px 0;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    input {
        width: 20vw;
        height: 5vh;
        padding: 10px;
        border-radius: 18px;
        border: 1px solid #000000;
        background-color: rgb(94, 58, 7);
        color: white;
        font-weight: bold;
    }

    .error-message{
        color: red;
        font-size: 0.8rem;
        margin-top: 0;
        margin-bottom: 0;
    }

    button {
        padding: 10px;
        font-size: 1em;
        background-color: rgb(228, 167, 83);
        color: rgb(0, 0, 0);
        border: 2px solid #000000;
        cursor: pointer;
        border-radius: 1rem;
        margin-top: 10px;
        transition: all 0.3s;
        font-weight: bold;
        text-transform: uppercase;
        width: 100%;
    }

    label {
        font-size: 0.9rem;          
        font-weight: 800;           
        color: rgb(94, 58, 7);     
        margin-bottom: 0;        
        display: block;            
        letter-spacing: 0.5px;
        margin-left: 10px;         
        cursor: pointer;           
        text-transform: uppercase; 
    }
</style>