<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <!-- MAIN CONTENT -->
        <div class="main-content pl-16 pt-4 h-full bg-indigo-50">
            <div class="bg-white">

                <!-- TITLE -->
                <div class="title px-4 py-4 bg-gray-100 shadow border-b border-gray-200 flex items-center justify-between">
                    <span class="text-2xl font-semibold text-gray-600">Order Detail</span>
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
                <div class="summary_table px-10 py-8 w-full overflow-auto rounded font-semibold text-center hover:shadow-md bg-white">
                    <div class="grid grid-cols-2 gap-8 text-gray-500">

                        <!-- ====================TRANSAKSI -->
                        <!-- <div class="my-card hover:shadow-lg bg-white shadow px-8 rounded border py-4"> -->
                        <div>
                            <table class="table text-left w-full table-auto">
                                <tr>
                                    <td>Kode Transaksi</td>
                                    <td class=" text-gray-700">
                                        {{productDetailOrder.transaction_code}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Metode Pembayaran</td>
                                    <td class="">
                                        <span class="bg-green-200 px-4 py-1 text-green-700 uppercase font-bold text-sm rounded-full">
                                            {{ productDetailOrder.payment_method }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Tanggal</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.created_at }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Status Order</td>
                                    <td class="">
                                        <div class="flex items-center justify-start">
                                            <span class="bg-green-200 px-4 py-1 text-green-700 uppercase font-bold text-sm rounded-full">
                                                {{ productDetailOrder.status == 0 ? 'Review': '' }}
                                                {{ productDetailOrder.status == 1 ? 'Proses': '' }}
                                                {{ productDetailOrder.status == 2 ? 'Dikemas': '' }}
                                                {{ productDetailOrder.status == 3 ? 'Dikirim': '' }}
                                                {{ productDetailOrder.status == 4 ? 'Terkirim': '' }}
                                                {{ productDetailOrder.status == 5 ? 'Cancel User': '' }}
                                                {{ productDetailOrder.status == 6 ? 'Cancle Reseller': '' }}
                                                {{ productDetailOrder.status == 7 ? 'Cancel Warehouse': '' }}
                                                {{ productDetailOrder.status == 8 ? 'Retur': '' }}
                                            </span>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-if="productDetailOrder.status <= 2">
                                    <td>&nbsp;</td>
                                    <td>
                                        <div class="mt-4">
                                            <button
                                                @click="changeStatusOrder(productDetailOrder.status)" 
                                                class="bg-blue-600 px-6 hover:bg-blue-700 focus:bg-blue-700 rounded focus:outline-none py-2 text-white mr-2">
                                                <span class="font-semibold">
                                                    {{ productDetailOrder.status == 1 ? 'Kemas': 'Kirim' }}
                                                </span>
                                            </button>
                                            <button
                                                @click="cancelOrder" 
                                                class="bg-yellow-500 px-6 hover:bg-yellow-600 focus:bg-yellow-600 rounded focus:outline-none py-2 text-white mr-2">
                                                <span class="font-semibold">Cancel</span>
                                            </button>
                                            <!-- {{ statusOrder }} -->
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- ====================KURIR -->
                        <!-- <div class="my-card hover:shadow-lg bg-white shadow px-8 rounded border py-4"> -->
                        <div>
                            <table class="table border-collapse text-left w-full">
                                <tr>
                                    <td class="">Kurir</td>
                                    <td class=" text-gray-700">
                                        <span
                                            v-if="productDetailOrder.courier !== null" 
                                            class="bg-green-200 px-4 py-1 text-green-700 uppercase font-bold text-sm rounded-full">{{productDetailOrder.courier}}</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Shipping Service</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.courier_detail }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Tracking Number</td>
                                    <td class=" text-gray-700">
                                        <input
                                            v-model="tracking_number"
                                            :readonly="productDetailOrder.payment_method == 'cod'"
                                            class="shadow rounded-full w-2/3 py-1 leading-none border px-3 text-grey-darker focus:outline-none focus:border-blue-300 focus:shadow-inner focus:bg-gray-100" 
                                            type="text" 
                                            name="" 
                                            id="">
                                        <!-- {{ productDetailOrder.tracking_number }} -->
                                    </td>
                                </tr>
                                <tr v-if="productDetailOrder.payment_method == 'transfer'">
                                    <td>&nbsp;</td>
                                    <td>
                                        <div class="mt-4">
                                            <button
                                                @click="changeTrackingNumber" 
                                                class="bg-green-500 px-6 hover:bg-green-600 focus:bg-green-600 rounded focus:outline-none shadow py-2 text-white mr-2">
                                                <span class="font-semibold">
                                                    Update
                                                </span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- ====================ALAMAT GUDANG -->
                        <!-- <div class="my-card hover:shadow-lg bg-white shadow px-8 rounded border py-4"> -->
                        <div>
                            <table class="table border-collapse text-left w-full">
                                <tr>
                                    <td colspan="2" class="font-bold text-gray-700">
                                        <span class="">#Alamat Gudang</span>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Nama</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Alamat Lengkap</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.address }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Kecamatan</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.kecamatan }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Kabupaten</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.kabupaten }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Provinsi</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.provinsi }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Kode Pos</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.postal_code }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Nomor Telp.</td>
                                    <td class=" text-gray-700">
                                        {{ warehouse.phone }}
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- ======================ALAMAT PENGIRIMAN -->
                        <!-- <div class="my-card hover:shadow-lg bg-white shadow px-8 rounded border py-4"> -->
                        <div>
                            <table class="table border-collapse text-left w-full">
                                <tr>
                                    <td colspan="2 " class="font-bold text-gray-700">#Alamat Pengiriman</td>
                                </tr>
                                <tr>
                                    <td class="">Nama</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.name }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Alamat Lengkap</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.address }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Kecamatan</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.kecamatan }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Kabupaten</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.kabupaten }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Provinsi</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.provinsi }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Kode Pos</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.postal_code }}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Nomor Telp.</td>
                                    <td class=" text-gray-700">
                                        {{ productDetailOrder.no_hp }}
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- ============================PRODUCT -->
                        <div class="col-span-2 my-8">
                            <!-- ==============FORM  -->
                            <div class="add-retur py-8 border-t">
                                <div class="input flex items-center justify-start">
                                    <div class="flex items-center mr-2">
                                        <input
                                            v-model="new_barcode"
                                            class="shadow rounded w-full py-2 leading-none border px-3 text-grey-darker focus:outline-none focus:border-blue-300 focus:shadow-inner focus:bg-gray-100" 
                                            type="text" 
                                            placeholder="Transaction Code">
                                        <button 
                                            @click="addBarcode"
                                            class="hover:bg-gray-400 bg-gray-300 px-3 py-2 rounded ml-2">
                                            <span class="text-gray-600">Add</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="flex items-center justify-between hover:bg-blue-600 bg-blue-500 px-2 py-2 rounded">
                                            <svg class="w-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span class="text-white">Scan QR</span>
                                        </button>
                                    </div>
                                </div>
                            </div><!-- form -->

                            <div class="text-left px-2 py-2 bg-gray-100 shadow">
                                <span class="text-xl text-gray-500 font-bold">Infomasi Produk</span>
                            </div>

                            <!-- INFORMASI PRODUK -->
                            <div class="my-card hover:bg-white bg-white shadow px-10 rounded-b border py-4">
                                
                                <table class="table border-collapse text-left w-full">
                                    <thead class="font-bold text-gray-700">
                                        <tr>
                                            <th class="w-1/6">Gambar Produk</th>
                                            <th class="w-1/3">Barcode</th>
                                            <th>Nama Produk</th>
                                            <th>QTY</th>
                                            <th>Harga</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td class="">
                                                <div class="img rounded px-2 py-2 border shadow w-2/3">
                                                    <img
                                                        class="img rounded object-contain w-full" 
                                                        :src="productDetailOrder.photo_product" 
                                                        alt="">
                                                </div>
                                            </td>
                                            <td class="">
                                                <span 
                                                    v-for="(barcode, i) in productDetailOrder.barcodes"
                                                    :key="i"
                                                    v-if="barcode"
                                                    class="text-left flex items-center" 
                                                >
                                                    <vue-barcode 
                                                        :value="barcode" 
                                                        :options="{ displayValue: false, height:40 }">
                                                    </vue-barcode>
                                                    <!-- {{productDetailOrder.barcodes}} -->
                                                    <span >
                                                        <svg
                                                            @click="deleteBarcode(i)" 
                                                            class="w-8 text-red-400 hover:text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                                        </svg>
                                                    </span>   
                                                </span>
                                            </td>
                                            <td class="">
                                                {{ productDetailOrder.product_name }}
                                            </td>
                                            <td class="">
                                                {{ productDetailOrder.qty }}
                                            </td>
                                            <td class="">
                                                {{ productDetailOrder.price }}
                                            </td>
                                            <td class="">
                                                {{ productDetailOrder.qty * productDetailOrder.price }}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class=" text-right">Promo</td>
                                            <td class="">:</td>
                                            <td class="">{{ productDetailOrder.promo_name }}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class=" text-right">Ongkir</td>
                                            <td class="">:</td>
                                            <td class="">{{ productDetailOrder.shipping_cost }}</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class=" text-right">Total</td>
                                            <td class="">:</td>
                                            <td class="">{{ totalBayar }}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div><!-- col-span-2 -->
                    </div><!-- grid -->
                </div><!-- summary_table -->
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'
import VueBarcode from '@chenfengyuan/vue-barcode';
// app.component(VueBarcode.name, VueBarcode);
export default {
    components: {VueBarcode},
    props: ['id'],
    data(){
        return {
            isChangeStatusOrder: false,
            isChangeTrackingNumber: false,
            role: 'gudang',
            keyword: '',
            productDetailOrder: '',
            warehouse: {
                name: '',
                address: '',
                kecamatan: '',
                kabupaten: '',
                provinsi: '',
                postal_code: '',
                phone: '',
            },
            tracking_number: '',
            barcodes: [],
            new_barcode: ''
        }
    },
    mounted() {
        this.getRecords();
    },
    computed: {
        userToken(){
            return localStorage.access_token;
            // return this.$store.getters['currentUser/userToken'];
        },
        totalBayar(){
            let qty = this.productDetailOrder.qty;
            let price = this.productDetailOrder.price;
            let shipping_cost = this.productDetailOrder.shipping_cost;
            let total = qty * price + parseInt(shipping_cost);
            return total;
        }
        // statusOrder(){
        //     if(this.productDetailOrder.status == 1)
        //         return 2;
        //     else
        //         return 3
        // }
    },
    methods: {
        deleteBarcode(param){
            // alert(param)
            this.barcodes.splice(param, 1);
            console.log(this.barcodes);
            axios.put(`/api/outgoing_product/barcode/${this.id}`, {barcodes: this.barcodes.join(',')},
            {
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            }).then((response) => {
                this.getRecords();
                console.log(response);
            }).catch((error) => {
                console.log('woooo...'+error);
            });
        },
        addBarcode(){
            this.barcodes.push(this.new_barcode);
            this.barcodes = this.barcodes.filter(barcode => barcode);
            console.log(this.barcodes);
            axios.put(`/api/outgoing_product/barcode/${this.id}`, {barcodes: this.barcodes.join(',')},
            {
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            }).then((response) => {
                this.getRecords();
                this.new_barcode = '';
                console.log(response);
            }).catch((error) => {
                console.log('woooo...'+error);
            });
        },
        changeTrackingNumber(){
            this.$swal({
                title: "Anda Yakin!",
                text: "Akan mengupdate tracking number ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Ya, update ini!",
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isChangeTrackingNumber = true;
                    axios.put(`/api/outgoing_product/tracking_number/${this.id}`, 
                    {tracking_number: this.tracking_number},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.userToken
                        }
                    })
                    .then((response) => {
                        this.isChangeTrackingNumber = false;
                        this.$swal('Tracking Number berhasil diupdate!');
                        this.getRecords();
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log('woooo...'+error);
                    });
                } 
            });
        },
        cancelOrder(){
            this.$swal({
                title: 'Tulis alasan anda!',
                input: 'textarea',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Cancel Orderan',
                cancelButtonText: 'Batal',
                // showLoaderOnConfirm: true,
            })
            .then((result) => {
                if (result.isConfirmed) {
                    this.isChangeStatusOrder = false;
                    // this.$swal(result.value)
                    let message = result.value;
                    let status = 7; //cancel by warehouse
                    axios.put(`/api/outgoing_product/status/${this.id}`, 
                    {
                        status: status,
                        remarks: message
                    },
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.userToken
                        }
                    })
                    .then((response) => {
                        this.isChangeStatusOrder = false;
                        this.$swal('Status Order berhasil diupdate!');
                        this.getRecords();
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log('woooo...'+error);
                    });
                }
            })
        },
        changeStatusOrder(param){
            this.$swal({
                title: "Anda Yakin!",
                text: "Akan memproses orderan ini?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
                confirmButtonText: "Ya, proses ini!",
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    this.isChangeStatusOrder = true;
                    // alert(param)
                    let status = parseInt(param) + 1;
                    axios.put(`/api/outgoing_product/status/${this.id}`, 
                    {status: status},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.userToken
                        }
                    })
                    .then((response) => {
                        this.isChangeStatusOrder = false;
                        this.$swal('Status Order berhasil diupdate!');
                        this.getRecords();
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log('woooo...'+error);
                    });
                } 
                // else if (result.isDismissed) {
                //     this.$swal("Canceled!", "Proses Dibatalkan!", "info");
                // }
            });
        },
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
                this.barcodes = response.data.order.barcodes;
                this.productDetailOrder = response.data.order;
                // console.log(response.data.order);
                this.tracking_number = response.data.order.tracking_number;
                this.warehouse.name = response.data.order.warehouse.name;
                this.warehouse.address = response.data.order.warehouse.address;
                this.warehouse.kecamatan = response.data.order.warehouse.district.subdistrict_name;
                this.warehouse.kabupaten = response.data.order.warehouse.city.city_name;
                this.warehouse.provinsi = response.data.order.warehouse.province.province_name;
                this.warehouse.postal_code = response.data.order.warehouse.postal_code;
                this.warehouse.phone = response.data.order.warehouse.phone;
                this.$store.dispatch('warehouseData/handleOutgoingProductDetail', response.data);
                // console.log(response.data);
                // this.$swal(response.data.order.address);
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
    },
}
</script>

<style scoped>
    table {
        font-family: Arial, Helvetica, sans-serif;
    }
    .table > td{
        font-style: italic;
    }
</style>