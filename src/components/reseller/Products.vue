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
                                    <input type="hidden" :id="'copy-url-'+i" :value="item.resellerproduct.url">
                                    <a @click="copyurl(i)" href="javascript:void(0)" 
                                    class="copy-product-link text-white px-2 py-1 rounded text-sm" 
                                    :class="{ 'bg-gray-500':copied===i,'bg-blue-700':copied!==i }"> 
                                        {{ copied===i ? 'Copied!!!' : 'Copy Link'  }} 
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
                        Setting Form Product
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

                            <div class="md:w-full  mb-4 px-3" >
                                <div v-if="urlFile">
                                    <img :src="urlFile" class="object-contain w-full h-64 border-dashed border-2 border-gray-300 rounded-lg"/>
                                    <div class="my-2">
                                        <span 
                                            class="text-red-400 text-sm border px-2 rounded font-semibold cursor-pointer hover:text-red-600" @click="clearFile">
                                            Clear file
                                        </span>
                                    </div>
                                </div>
                                <div v-if="!urlFile">
                                    <div class="object-contain w-full h-64 border-dashed border-2 border-gray-300 rounded-lg">
                                         <label class="border mx-auto my-24 flex justify-center w-1/3 px-1 py-2 rounded cursor-pointer hover:bg-green-600 hover:text-white text-green-500">
                                            <svg class="w-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                            </svg>
                                            <span class="font-semibold ml-1" >Pilih file</span>
                                            <input 
                                                type='file' class="hidden" name="photo_product" ref="file" @change="onFileChange"
                                            />
                                        </label>
                                    </div>
                                </div>

                            </div>

                            <div class="md:w-full mb-4 px-3">
                                <label class="block uppercase text-gray-500 tracking-wide text-xs font-bold mb-1">
                                    Fee CS
                                </label>
                                <input 
                                    v-model="data.fee_cs"                                    
                                    class="appearance-none border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded py-2 px-2">
                            </div>

                            <div class="md:w-full mb-4 px-3">
                                <label class="block uppercase text-blue-500 tracking-wide text-xs font-bold mb-1">
                                    Facebook Pixel
                                </label>
                                
                            </div>
                            <div class="md:w-full mb-4 px-3">                                
                                <label class="block uppercase text-gray-500 tracking-wide text-xs font-bold mb-1">
                                    Pixel IDs
                                </label>
                                <!-- <div class="flex flex-col items-center"> -->
                                    <div class="flex items-center my-2" v-for="(pixel, i) in data.facebook_pixel" :key="i">
                                        <input 
                                        placeholder="Pixel ID"
                                        v-model="data.facebook_pixel[i]"
                                        class="appearance-none border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded-tl rounded-bl py-2 px-2">
                                        <div class="float-right ">
                                            <a @click="delPixelID(i)" class="bg-red-600 text-white rounded-tr rounded-br px-4 py-2.5" href="javascript:void(0)">
                                                <i class="fa fa-trash text-white"></i>
                                            </a>
                                        </div>
                                        
                                    </div>
                                <!-- </div> -->
                                
                                <div><button @click="addPixelID" class="px-3 py-2 mt-3 float-right bg-blue-600 text-white rounded border-gray-500 border ">Add</button></div>
                            </div>
                            <div class="md:w-full mb-4 px-3 clear-both">                                
                                <label class="block uppercase text-gray-500 tracking-wide text-xs font-bold mb-1">
                                    Pixel Events
                                </label>
                                <!-- <div class="flex flex-col items-center"> -->
                                    <div class="flex items-center my-2" v-for="(pixel, i) in data.pixel_events" :key="i">
                                        <input 
                                        placeholder="Pixel Event"
                                        v-model="data.pixel_events[i]"
                                        class="appearance-none border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded-tl rounded-bl py-2 px-2">
                                        <div class="float-right flex">
                                            <a @click="setPixelEvent(i)" class="bg-gray-300 px-4 py-2.5" href="javascript:void(0)">
                                                <i class="fa fa-gear text-black"></i>
                                            </a>
                                            <a @click="delPixelEvent(i)" class="bg-red-600 text-white rounded-tr rounded-br px-4 py-2.5" href="javascript:void(0)">
                                                <i class="fa fa-trash text-white"></i>
                                            </a>
                                        </div>
                                        
                                    </div>
                                <!-- </div> -->
                                
                                <div><button @click="addPixelEvent" class="px-3 py-2 mt-3 float-right bg-blue-600 text-white rounded border-gray-500 border ">Add</button></div>
                            </div>
                        </div>


                        <div class="w-1/2 p-4 pr-0">
                            
                        </div>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button
                            @click="submitForm" 
                            class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                            {{ isSubmit ? 'Processing...':'Submit' }}
                        </button>
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
            copied: '',
            data : {
                photo_product : '',
                fee_cs: '',
                facebook_pixel: [''],
                pixel_events:[''],
            },
            urlFile: '',
            isSubmit: false,
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
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
        clearFile(){
            this.urlFile = '';
            this.data.photo_product = '';
        },
        onFileChange(e) {
            const file = e.target.files[0];
            this.urlFile = URL.createObjectURL(file);
            this.data.photo_product = file;
            console.log(this.data.photo_product);
        },
        submitForm(){
            this.isSubmit = true
            setTimeout(() => {                
                this.isSubmit = false
            }, 1000);
        },
        async addProduct(data){
            // console.log(data);
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
        addPixelID: function () {
            this.data.facebook_pixel.push([]);
        },
        delPixelID:function(i){
            this.data.facebook_pixel.splice(i,1);
            // console.log(i)
        },
        addPixelEvent: function () {
            this.data.pixel_events.push([]);
        },
        delPixelEvent:function(i){
            this.data.pixel_events.splice(i,1);
            // console.log(i)
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
        copyurl: function(i){
            // this.copied[i] = false
            let copyURL = document.querySelector('#copy-url-'+i)
            copyURL.setAttribute('type', 'text')
            copyURL.select()
            document.execCommand("copy");

            copyURL.setAttribute('type', 'hidden')
            window.getSelection().removeAllRanges()

            this.copied = i
            setTimeout(() => {
                this.copied = ''
            }, 2000);

        }
    },
}
</script>