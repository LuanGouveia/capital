<template>

    <div>

        <form @submit.prevent="handleSubmit">

            <div>
                <input type="text" id="username" v-model="username" required placeholder="Username" />
            </div>

            <div>
                <input placeholder="Email" type="email" id="email" v-model="email" required />
            </div>

            <div>
                <input placeholder="Password" type="password" id="password" v-model="password" required />
            </div>

            <button type="submit">Register</button>

        </form>

    </div>

</template>

<script>
    export default {

        name: "RegisterForm",

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

                    const response = await fetch('http://localhost:5000/users/register', {
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

    input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border-radius: 4px;
        border: 1px solid #ccc;
        background-color: rgb(208, 209, 209);
    }

    button {
        padding: 10px;
        font-size: 1em;
        background-color: #ffdc43;
        color: rgb(0, 0, 0);
        border: 2px solid #000000;
        cursor: pointer;
        border-radius: 5rem;
        margin-top: 10px;
        transition: background-color 0.3s;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        text-transform: uppercase;
        letter-spacing: 1px;
        width: 100%;
        height: 40px;
    }

    button:hover {
        background-color: #d6ba3b;
    }
</style>