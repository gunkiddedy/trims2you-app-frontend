<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <div class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <div class="wraper bg-white">
                <div class="title px-4 py-4 border-b">
                    <span class="text-xl text-gray-600 font-semibold">Products</span>
                </div>
                <div class="index_statistic grid lg:grid-cols-4 md:grid-cols-3 gap-4 pb-4 sm:grid-cols-2 xs:grid-cols-1 px-4 py-8">
                    <div class="kotak3 px-4 py-8 bg-white rounded shadow-lg font-semibold text-center hover:shadow-md">
                        <div class="flex items-center justify-start">
                            <div class="icon bg-pink-500 rounded px-4 py-2 text-4xl">
                                icon
                            </div>
                            <div class="flex flex-col items-start ml-2">
                                <div class="title text-gray-400">
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            role: 'gudang',
            loading: true,
            isLoading: false,
            products: '',
        }
    },
    mounted() {
        if(this.userToken == undefined){
            this.$router.push('/');
        }else{
            this.getRecords();
        }
    },
    computed: {
        userToken(){
            return localStorage.access_token;
            // return this.$store.getters['currentUser/userToken'];
        },
    },
    methods: {
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/products`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.products = response.data.data.data;
                this.isLoading = false;
                console.log(response.data.data.data);
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
    },
}
</script>