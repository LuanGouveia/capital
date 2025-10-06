<template>

    <nav class="navbar">

        <div class="navbar-brand">

            <a class="navbar-item" href="/">
                <img src="@/assets/moneyfavicon.png" alt="Logo">
            </a>

        </div>

        <div class="navbar-menu">

            <div class="navbar-start">
                
                <router-link to="/" class="navbar-item capital">CAPITAL</router-link>

            </div>  

            <div class="navbar-end">

                <router-link to="/management" class="navbar-item">Management</router-link>
                <router-link to="/login" class="navbar-item">Login</router-link>
                <router-link to="/register" class="navbar-item">Register</router-link>

            </div>

        </div>

    </nav>

</template>

<script>
    export default {
        name: "AppNavbar"
    };
</script>

<style scoped>
    .navbar {
        background-color: #523603;
        padding: 1rem;
        margin-top: 0;
        display: flex;
        justify-content: space-between;
        font-family: Arial, sans-serif;
    }

    .navbar-item {
        color: #ffdc43;
        font-weight: bold;
        margin-right: 1rem;
        text-decoration: none;
    }

    .navbar-item:hover {
        color: #d6ba3b;
    }

    .navbar-brand img {
        max-height: 40px;
    }

    .navbar-menu {
        display: flex;
        justify-content: space-between;
        width: 100%;
    }

    .capital {
        font-size: 2em;
        font-weight: bold;
    }
</style>