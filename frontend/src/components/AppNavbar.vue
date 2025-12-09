<template>
    <nav class="navbar">
        <div class="navbar-brand">
            <a class="navbar-item" to="/">
                <img src="@/assets/moneyfavicon.png" alt="Logo">
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item capital">CAPITAL</router-link>
            </div>  
            <div class="navbar-end">

                <template v-if="store.isLoggedIn">
                    <router-link to="/management" class="navbar-item">Management</router-link>
                    <div class="user-menu-container">
                        <div class="navbar-item user-name" @click="toggleMenu">
                            Hello, {{ store.username }} ▾
                        </div>
                        <div v-if="isMenuOpen" class="dropdown-menu">
                            <a @click="logout" class="dropdown-item">Exit (logout)</a>
                        </div>
                    </div>
                </template>

                <template v-else>
                    <router-link to="/login" class="navbar-item">Login</router-link>
                    <router-link to="/register" class="navbar-item">Register</router-link>
                </template>
            </div>
        </div>
    </nav>
</template>

<script setup>
    import { ref, onMounted } from 'vue';
    import { useRouter, useRoute } from 'vue-router'; 
    import { jwtDecode } from "jwt-decode";
    import { store } from '@/store'
    const router = useRouter();
    const route = useRoute();

    const isMenuOpen = ref(false);

    function toggleMenu() {
        isMenuOpen.value = !isMenuOpen.value;
    }

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem('username');

        store.isLoggedIn = false;
        store.username = "";
        isMenuOpen.value = false;

        if (route.path === '/management') {
            router.push('/login');
        }
    }

    onMounted(() => {
        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                if (decoded.exp < currentTime) {
                    console.log("Token expirado (Navbar). Deslogando...");
                    logout();
                } else {
                    store.isLoggedIn = true;
                    store.username = username;
                }
            } catch (error) {
                console.error("Token inválido:", error);
                logout();
            }
        }
    });
</script>

<style scoped>
    .navbar {
        background-color: #523603;
        padding: 1rem;
        margin-top: 0;
        display: flex;
        justify-content: space-between;
        align-items: center; 
        font-family: Arial, sans-serif;
    }

    .navbar-menu {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
    }

    .navbar-end {
        display: flex; 
        align-items: center;
        gap: 10px; 
    }

    .navbar-item {
        color: #ffdc43;
        font-weight: bold;
        margin-right: 1rem;
        text-decoration: none;
        cursor: pointer;
        display: block; 
    }

    .navbar-item:hover {
        color: #d6ba3b;
    }

    .user-menu-container {
        position: relative; 
        display: flex; 
        align-items: center;
    }

    .user-name {
        border: 1px solid #ffdc43;
        padding: 5px 10px;
        border-radius: 4px;
        transition: 0.3s;
        margin-right: 0; 
    }
    
    .user-name:hover {
        background-color: rgba(255, 220, 67, 0.1);
    }

    .dropdown-menu {
        position: absolute; 
        top: 120%;
        right: 0;  
        background-color: white;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        width: 150px;
        z-index: 100; 
    }

    .dropdown-item {
        display: block;
        padding: 10px;
        color: #333; 
        text-decoration: none;
        cursor: pointer;
        font-weight: normal;
        text-align: center;
    }

    .dropdown-item:hover {
        background-color: #f0f0f0; 
    }

    .navbar-brand img {
        max-height: 40px;
    }

    .capital {
        font-size: 2em;
        font-weight: bold
    }
</style>