<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <div class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <div class="wraper bg-white">
                <div class="title px-4 py-4 border-b">
                    <span class="text-xl text-gray-600 font-semibold">Products</span>
                </div>
                <div class="index_statistic grid lg:grid-cols-4 md:grid-cols-3 gap-4 pb-4 sm:grid-cols-2 xs:grid-cols-1 px-4 py-8">
                    <div
                        v-for="(item, i) in products"
                        :key="i"
                     class="kotak3 px-4 py-8 bg-white rounded shadow-lg text-center hover:shadow-md">
                        
                        <div class="md:block -shrink-0">
                            <img class="rounded-lg md:w-56" :src=item.photo :alt=item.name>
                        </div>
                        
                        <div class="flex-col">
                            <div class="mt-2 text-lg font-semibold">
                                {{ item.name }}
                            </div>
                            
                            <div class="text-sm">
                                {{ item.reseller_price }}
                            </div>
                            <div class="text-xs mb-3 text-gray-500">
                                Harga Reseller
                            </div>

                            <div class="text-sm">
                                {{ item.price}}
                            </div>
                            
                            <div class="text-xs mb-3 text-gray-500">
                                Harga Jual
                            </div>

                            <div class="my-4">
                                <a href="#" class="bg-blue-700 opacity-80 px-2 py-1 rounded">
                                    <i class="fa fa-eye text-white"></i>
                                </a>
                                <a href="#" class="bg-red-600 opacity-80 px-2 py-1 mx-1 rounded">
                                    <i class="fa fa-trash text-white"></i>
                                </a>
                                <a href="#" class="bg-yellow-500 opacity-80 px-2 py-1 rounded">
                                    <i class="fa fa-gear text-white"></i>
                                </a>
                            </div>

                            <div>
                                
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