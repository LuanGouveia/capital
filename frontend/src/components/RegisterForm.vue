<template>

    <div class="register-container">
        <h2>Create Account</h2>

        <form @submit.prevent="Register">

            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username" required/>
            </div>

            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required />
            </div>

            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required />
            </div>
            
            <ul class="requirements-list">
                <li
                    v-for="(rule, index) in passwordRules"
                    :key="index"
                    :class="{'valid':rule.valid}"
                >
                    {{ rule.label }}
                </li>
            </ul>

            <div class="form-group">
                <label>Confirm password</label>
                <input 
                    type="password"  
                    v-model="confirmPassword" 
                />
                <p v-if="password && confirmPassword && password !== confirmPassword" class="error-message">
                    As senhas não conferem.
                </p>
                
            </div>

            <button type="submit" :disabled="!isFormValid" class="btn-submit">
                Submit
            </button>

        </form>

    </div>

</template>

<script setup>
    import {ref, computed} from "vue";
    import api from "@/services/api";

    const password = ref('')
    const confirmPassword = ref('')
    const email = ref('')
    const username = ref('')

    const passwordRules = computed(()=>{
        const val = password.value;
        return[
            {
                label: "Minimum eight characters",
                valid: val.length >= 8
            },
            {
                label:"At least one upper letter",
                valid: /[A-Z]/.test(val)
            },
            {
                label:"At least one number",
                valid: /\d/.test(val)
            },
            {
                label:"At least one symbol (@$!%*?&)",
                valid: /[@$!%*?&]/.test(val)
            }
        ]
    });

    const isFormValid = computed(()=>{
        const allRulesOk = passwordRules.value.every(rule=>rule.valid)
        const passwordsMatch = password.value === confirmPassword.value && password.value.length>0;

        return allRulesOk && passwordsMatch
    })

    async function Register() {

        const userData = {
            username: username.value,
            email: email.value,
            password: password.value
        }

        try {
            const response = await api.post("/user/register", userData)
            
            console.log("Success",response.data)
            alert("Account successful created")
        }catch(error){
            console.error("Error:", error)
            alert(error.response?.data?.error || "Registration failed, please try again.")
        }
}
 
</script>

<style scoped>

    .requirements-list{
        margin-top: 0;
        padding: 0;
        list-style-type: none;
        font-size: 0.85rem;
        color: #aa0000;
    }

    li {
        transition: 0.8s;
    }

    li.valid{
        color: rgb(17, 86, 17);
    }

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

    .register-container {
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

    button:hover:not(:disabled) {
        background-color: rgb(144, 106, 52);
        transform: scale(1.02);
    }

    button:disabled {
        cursor: not-allowed;
        box-shadow: none;
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