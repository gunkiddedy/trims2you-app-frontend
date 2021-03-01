<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <!-- MAIN CONTENT -->
        <div class="main-content p-4 lg:h-screen h-full bg-indigo-50">
            <div class="bg-white">

                <!-- TITLE -->
                <div class="title px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                    <span class="text-2xl font-semibold text-gray-400">
                        Product ID : {{ id }}
                        </span>
                    <div>
                        <button 
                            @click="goBackPrevious"
                            class="flex items-center justify-between bg-gray-400 px-4 py-1 rounded-full hover:bg-gray-500 focus:bg-gray-500">
                            <svg class="w-6 text-white mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
                            <span class="text-white">Back</span>
                        </button>
                    </div>
                </div>

                <!-- summary_table -->
                <div class="summary_table px-4 py-8 w-full overflow-auto rounded font-semibold text-center hover:shadow-md">
                    {{ productDetail }}
                    {{ productDetailWarehouse }}
                </div><!-- summary_table -->
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    props: ['id'],
    data(){
        return {
            role: 'gudang',
            keyword: '',
            productDetail: '',
            productDetailWarehouse: '',
        }
    },
    mounted() {
        this.getRecords();
    },
    computed: {
        userToken(){
            return this.$store.getters['currentUser/userToken'];
        }
    },
    methods: {
        goBackPrevious(){
            this.$router.go(-1);
        },
        async getRecords(){
            if(!this.id) return false;
            await axios.get(`/api/outgoing_product/detail/${this.id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.ProductDetail = response.data;
                this.ProductDetailWarehouse = response.data;
                this.$store.dispatch('warehouseData/handleOutgoingProductDetail', response.data);
                console.log(response.data.order);
                console.log(response.data.order.warehouse);
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
    },
}
</script>