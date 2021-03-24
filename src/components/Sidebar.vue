<template>
    <div class="sidebar">
        <aside
            :class="{'bg-purple-800': userRole == '3', 'bg-gray-700' : userRole =='4'}" 
            class="hidden z-50 sidebar-desktop pt-0 w-40 text-white fixed inset-y-0 overflow-x-hidden overflow-y-auto sm:block">
            <div class="p-4 min-h-full">
                <!-- Extract: user_info blade partial -->
                <div class="px-1 pb-6  border-b border-indigo-400 sm:flex-col">
                    <div class="my-4 flex flex-col items-center">
                        <svg class="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <span class="text-yellow-300 font-bold text-xs sm:text-sm">{{userName}}</span>
                    </div>
                </div>
                <!--  RESELLER MENU-->
                <div v-if="userRole == '3'" class="flex flex-col">
                    <router-link to="/dashboard" class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                        <svg class="w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span class="text-sm text-gray-200">
                            Dashboard
                        </span>
                    </router-link>
                    <router-link to="/products" class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                        <svg class="w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                        <span class="text-sm text-gray-200">
                            Products
                        </span>
                    </router-link>
                    <router-link to="/customer-service" class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                        <svg class="w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="text-sm text-gray-200">
                            Customer Service
                        </span>
                    </router-link>
                    <router-link to="/orders" class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                        <svg class="w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span class="text-sm text-gray-200">
                            Orders
                        </span>
                    </router-link>
                    <router-link to="/reseller-bank" class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                        <svg class="w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span class="text-sm text-gray-200">
                            Reseller Bank
                        </span>
                    </router-link>
                    <router-link to="/deposite" class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                        <svg class="w-10 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="text-sm text-gray-200">
                            Deposite
                        </span>
                    </router-link>                    
                </div>
                <div 
                    @click="handleLogout"
                    class="logout flex flex-col items-center my-4 cursor-pointer py-2 hover:bg-purple-900 hover:-mx-4">
                    <svg class="w-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span class="text-sm text-gray-200">
                        Logout
                    </span>
                </div>
                
            </div>
        </aside>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            userName: '',
            userRole: '',
        }
    },
    computed: {
        userToken(){
            return localStorage.access_token;
            // return this.$store.getters['currentUser/userToken'];
        }
    },
    mounted(){
        this.userName = localStorage.userName;
        this.userRole = localStorage.userRole;
    },
    methods: {
        handleLogout(){
            this.$swal({
                title: "Anda Yakin?",
                text: "Akan logout",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Ya, logout!",
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post("/api/auth/logout", {
                        headers: {
                            'Authorization': 'Bearer ' + this.userToken
                        }
                    })
                    .then((response) => {
                        this.$store.dispatch('currentUser/afterLogout');
                        this.$router.push('/');
                    })
                    .catch((error) => {
                        console.log('woooo...'+error);
                    });
                } 
            });
        },
    },
}
</script>

<style scoped>
.router-link-exact-active {
  background-color: #3d2e80;
  margin-left: -1rem;
  margin-right: -1rem;
  /* color: #1e30b8; */
  /* cursor: pointer; */
  /*border-radius: 0.5rem;*/
}
</style>