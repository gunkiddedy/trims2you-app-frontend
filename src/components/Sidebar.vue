<template>
    <div class="sidebar">
        <aside class="hidden z-50 sidebar-desktop pt-0 w-28 text-white bg-gray-700 fixed inset-y-0 overflow-x-hidden overflow-y-auto sm:block">
            <div class="p-4 min-h-full">
                <!-- Extract: user_info blade partial -->
                <div class="px-1 pb-6 flex items-center border-b border-green-100 sm:flex-col">
                    <div class="my-4">
                        <span class="text-yellow-500 text-xs sm:text-sm">{{userName}}</span>
                    </div>
                </div>
                <div 
                    @click="handleLogout"
                    class="logout flex flex-col items-center my-4 cursor-pointer">
                    <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <span>
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
            userName: ''
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
    },
    methods: {
        handleLogout(){
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
    },
}
</script>

<style scoped>
.router-link-exact-active {
  /* background-color: #1947ee; */
  color: #1e30b8;
  cursor: pointer;
  /*border-radius: 0.5rem;*/
}
</style>