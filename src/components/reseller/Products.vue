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
                        :class="{'bg-gray-200':item.resellerproduct}"   
                        class="kotak3 px-4 py-8 bg-white rounded shadow-lg text-center hover:shadow-md">
                        
                        <div class="md:block -shrink-0">
                            <img class="rounded-lg md:w-56" :src="item.photo" :alt="item.name">
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
                                <a @click="getDetail(item)" href="javascript:void(0)" class="bg-blue-700 opacity-80 px-2 py-1 rounded">
                                    <i class="fa fa-eye text-white"></i>
                                </a>
                                <a @click="addProduct(item)" href="javascript:void(0)" class="bg-green-600 opacity-100 px-2 py-1 mx-1 rounded" v-if="!item.resellerproduct">
                                    <i class="fa fa-plus text-white"></i>
                                </a>
                                <a @click="removeProduct(item)" href="javascript:void(0)" class="bg-red-600 opacity-80 px-2 py-1 mx-1 rounded" v-if="item.resellerproduct">
                                    <i class="fa fa-trash text-white"></i>
                                </a>
                                <a @click="editSettingForm(item)" href="javascript:void(0)" class="bg-yellow-500 opacity-80 px-2 py-1 rounded" v-if="item.resellerproduct">
                                    <i class="fa fa-gear text-white"></i>
                                </a>
                            </div>

                            <div class="link-product-reseller" v-if="item.resellerproduct">
                                <div class="mb-3 overflow-hidden">
                                    <a class="text-indigo-800 hover:text-blue-600" :href="item.resellerproduct.url">{{ item.resellerproduct.url }}</a>
                                </div>
                                <div>
                                    <input type="hidden" id="copy-url" :value="item.resellerproduct.url">
                                    <a @click="copyurl(item.resellerproduct.url)" href="javascript:void(0)" 
                                    class="copy-product-link text-white px-2 py-1 rounded text-sm" 
                                    :class="{ 'bg-gray-500':copied,'bg-blue-700':!copied }"> 
                                        {{ copied ? 'Copied!!!' : 'Copy Link'  }} 
                                    </a>
                                </div>    
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


        <!-- MODAL HOW TO Detail-->
        <div v-if="showModalDetail" class="overflow-x-hidden overflow-y-auto absolute inset-x-0 top-4 z-40 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-5/6 pl-20">
                <!--content-->
                <div class="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        Detail Product
                        </span>
                        <button 
                            class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalDetail = false" >
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex">
                        <div class=" w-1/2 p-4 pl-0">
                            <img :src="product.photo"/>
                        </div>
                        <div class="w-1/2 p-4 pr-0">
                            <div class="text-2xl font-semibold">
                                {{ product.name }}
                            </div>
                            <div class="text-gray-500 text-2xl mt-5 font-normal">
                                {{ product.reseller_price }}
                            </div>
                            <div class="mb-5 text-xs text-red-500">
                                *Harga Reseller
                            </div>
                            <div class="text-gray-500 text-2xl mt-5">
                                {{ product.price }}
                            </div>
                            <div class="mb-5 text-xs text-red-500">
                                *Harga Jual
                            </div>
                            <div class="relative flex">
                                <div class="border border-gray-300 p-4 text-sm w-1/2 border-r-0 bg-gray-100">
                                    <div>Min Transaksi</div>
                                    <div class="text-blue-500">100 produk per bulan</div>
                                </div>

                                <div class="border border-gray-300 p-4 text-sm w-1/2 bg-gray-100">
                                    <div>Bonus Cashback</div>
                                    <div class="text-blue-500">{{product.bonus_cashback}}% dari harga reseller</div>
                                </div>
                            </div>


                            <div class="mt-5" v-html="product.description"></div>

                        </div>
                        
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button
                            @click="showModalDetail = false" 
                            class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end MODAL Detail-->

        <!-- MODAL Setting Form-->
        <div v-if="showModalSettingForm" class="overflow-x-hidden overflow-y-auto absolute inset-x-0 top-4 z-40 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-5/6 pl-20">
                <!--content-->
                <div class="border rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        Detail Product
                        </span>
                        <button 
                            class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalSettingForm = false" >
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex">
                        <div class=" w-1/2 p-4 pl-0">
                            <img :src="product.photo"/>
                        </div>
                        <div class="w-1/2 p-4 pr-0">
                            
                        </div>
                        <div class="-mx-3 flex mb-4 items-center">
                            <div class="md:w-full px-3">
                                <label class="block uppercase text-gray-500 tracking-wide text-xs font-bold mb-1">
                                    Nomor rekening *
                                </label>
                                <input 
                                    v-model="upload.account_no"
                                    class="appearance-none border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded py-2 px-2">
                            </div>
                            <div class="md:w-full px-3 mt-5 flex items-center">
                                <label class="border flex justify-center w-1/3 px-1 py-2 rounded cursor-pointer hover:bg-green-600 hover:text-white text-green-500">
									<svg class="w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
										<path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
									</svg>
									<span class="font-semibold ml-1" >Pilih file</span>
									<input 
										type='file' class="hidden" name="proof_of_payment" ref="file" @change="onFileChange"
									/>
							    </label>
                            </div>
                        </div>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button
                            @click="showModalSettingForm = false" 
                            class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end MODAL Setting Form-->
        <div v-if="showModalDetail" class="opacity-25 fixed inset-0 z-30 bg-black"></div>
        <div v-if="showModalSettingForm" class="opacity-25 fixed inset-0 z-30 bg-black"></div>

    </main>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            role: 'reseller',
            loading: true,
            isLoading: false,
            products: '',
            product:'',
            showModalDetail:false,
            showModalSettingForm:false,
            copied: false,
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
        async addProduct(data){
            console.log(data);
            const formData = new FormData();
            formData.append('product_id', data.id);
            await axios.post(`/api/reseller_products/add`,formData,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            }).then((response) => {
                this.isLoading = false;
                console.log(response);
                this.getRecords();
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
        async removeProduct(data){
            console.log(data);
            await axios.delete(`/api/reseller_products/remove/`+data.id,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            }).then((response) => {
                this.isLoading = false;
                console.log(response);
                this.getRecords();
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
        getDetail: function (data) {
            // alert(message)
            this.showModalDetail = true
            this.product = data
            // console.log(data.name)
        },
        editSettingForm: function (data) {
            // alert(message)
            this.showModalSettingForm = true
            this.product = data
            // console.log(data.name)
        },
        copyurl: function(url){

            let copyURL = document.querySelector('#copy-url')
            copyURL.setAttribute('type', 'text')
            copyURL.select()
            document.execCommand("copy");

            copyURL.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()

            this.copied = true
            setTimeout(() => {
                this.copied = false
            }, 3000);
        }
    },
}
</script>