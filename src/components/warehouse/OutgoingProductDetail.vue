<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <!-- MAIN CONTENT -->
        <div class="main-content p-4 lg:h-screen h-full bg-indigo-50">
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
                <div class="summary_table px-4 py-8 w-full overflow-auto rounded font-semibold text-center hover:shadow-md bg-white">
                    <div class="grid grid-cols-2 gap-8 text-gray-500">
                        <div class="bg-gray-50 shadow px-2 rounded border py-4">
                            <table class="table text-left w-full">
                                <tr>
                                    <td class="">Kode Transaksi</td>
                                    <td class=" text-gray-700">
                                        {{productDetailOrder.transaction_code}}
                                    </td>
                                </tr>
                                <tr>
                                    <td class="">Metode Pembayaran</td>
                                    <td class="">
                                        <span class="bg-yellow-500 px-2 py-1 text-white lowercase">
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
                                            <span class="bg-green-400 px-2 py-0 text-white mr-2 lowercase">
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
                                            <div class="">
                                                <button
                                                    @click="changeStatusOrder(productDetailOrder.status)" 
                                                    class="bg-blue-500 px-3 hover:bg-blue-600 focus:bg-blue-600 rounded-sm shadow py-1 text-white mr-2">
                                                    <span class="font-semibold">
                                                        {{ productDetailOrder.status == 1 ? 'Kemas': 'Kirim' }}
                                                    </span>
                                                </button>
                                                <button class="bg-gray-500 px-3 hover:bg-gray-600 focus:bg-gray-600 rounded-sm shadow py-1 text-white mr-2">
                                                    <span class="font-semibold">Cancel</span>
                                                </button>
                                                <!-- {{ statusOrder }} -->
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <div class="bg-gray-50 shadow px-2 rounded border py-4">
                            <table class="table border-collapse text-left w-full">
                                <tr>
                                    <td class="">Kurir</td>
                                    <td class=" text-gray-700">
                                        <span class="bg-yellow-500 px-2 py-1 text-white">{{productDetailOrder.courier}}</span>
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
                                        {{ productDetailOrder.tracking_number }}
                                    </td>
                                </tr>
                            </table>
                        </div>

                        <!-- ALAMAT GUDANG -->
                        <div class="bg-gray-50 shadow px-2 rounded border py-4">
                            <table class="table border-collapse text-left w-full">
                                <tr>
                                    <td colspan="2" class="font-bold text-gray-700">Alamat Gudang</td>
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

                        <!-- ALAMAT PENGIRIMAN -->
                        <div class="bg-gray-50 shadow px-2 rounded border py-4">
                            <table class="table border-collapse text-left w-full">
                                <tr>
                                    <td colspan="2 " class="font-bold text-gray-700">Alamat Pengiriman</td>
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

                        <!-- PRODUCT -->
                        <div class="col-span-2 my-8">
                            <div class="add-retur py-8">
                                <div class="input flex items-center justify-start">
                                    <div class="flex items-center mr-2">
                                        <input
                                            class="shadow rounded w-full py-2 leading-none border px-3 text-grey-darker focus:outline-none focus:border-blue-300 focus:shadow-inner focus:bg-gray-100" 
                                            type="text" 
                                            placeholder="Transaction Code">
                                        <button 
                                            class="bg-gray-200 px-3 py-2 rounded ml-2">
                                            <span class="">Add</span>
                                        </button>
                                    </div>
                                    <div>
                                        <button class="flex items-center justify-between bg-blue-400 px-2 py-2 rounded">
                                            <svg class="w-4 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            <span class="text-white">Scan QR</span>
                                        </button>
                                    </div>
                                </div>
                            </div><!-- form -->
                            <div class="bg-gray-50 shadow px-2 rounded border py-4">
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
                                                    class="text-left" 
                                                    v-html="productDetailOrder.barcode_html">
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
                                            <td class="">isi promo</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class=" text-right">Ongkir</td>
                                            <td class="">:</td>
                                            <td class="">isi promo</td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class=" text-right">Total</td>
                                            <td class="">:</td>
                                            <td class="">isi promo</td>
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
export default {
    props: ['id'],
    data(){
        return {
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
        }
    },
    mounted() {
        this.getRecords();
    },
    computed: {
        userToken(){
            return this.$store.getters['currentUser/userToken'];
        },
        // statusOrder(){
        //     if(this.productDetailOrder.status == 1)
        //         return 2;
        //     else
        //         return 3
        // }
    },
    methods: {
        changeStatusOrder(param){
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
                this.$swal('Data berhasil diupdate!');
                this.getRecords();
                console.log(response);
            })
            .catch((error) => {
                console.log('woooo...'+error);
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
                this.productDetailOrder = response.data.order;
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