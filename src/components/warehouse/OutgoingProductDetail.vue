<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <!-- MAIN CONTENT -->
        <div class="main-content p-4 lg:h-screen h-full bg-indigo-50">
            <div class="bg-white">

                <!-- TITLE -->
                <div class="title px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                    <span class="text-2xl font-semibold text-gray-400">Order Detail</span>
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
                        <table class="border-collapse text-left w-full">
                            <tr>
                                <td class="border-t border-b border-collapse">Kode Transaksi</td>
                                <td class="border-t border-b border-collapse">...</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Metode Pembayaran</td>
                                <td class="border-t border-b border-collapse">Columbus</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Status Order</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                        </table>
                        <table class="border-collapse text-left w-full">
                            <tr>
                                <td class="border-t border-b border-collapse">Kode Transaksi</td>
                                <td class="border-t border-b border-collapse">...</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Metode Pembayaran</td>
                                <td class="border-t border-b border-collapse">Columbus</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                        </table>

                        <!-- ALAMAT GUDANG -->
                        <table class="border-collapse text-left w-full">
                            <tr>
                                <td colspan="2" class="font-bold text-gray-700">Alamat Gudang</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Kode Transaksi</td>
                                <td class="border-t border-b border-collapse">...</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Metode Pembayaran</td>
                                <td class="border-t border-b border-collapse">Columbus</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                        </table>

                        <!-- ALAMAT PENGIRIMAN -->
                        <table class="border-collapse text-left w-full">
                            <tr>
                                <td colspan="2 " class="font-bold text-gray-700">Alamat Pengiriman</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Kode Transaksi</td>
                                <td class="border-t border-b border-collapse">...</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Metode Pembayaran</td>
                                <td class="border-t border-b border-collapse">Columbus</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                            <tr>
                                <td class="border-t border-b border-collapse">Tanggal</td>
                                <td class="border-t border-b border-collapse">Detroit</td>
                            </tr>
                        </table>

                        <!-- PRODUCT -->
                        <div class="col-span-2 my-4">
                            <table class="border-collapse text-left w-full">
                                <thead class="font-bold bg-gray-200 text-gray-700">
                                    <tr>
                                        <th>Gambar Produk</th>
                                        <th>Barcode</th>
                                        <th>Nama Produk</th>
                                        <th>QTY</th>
                                        <th>Harga</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td class="border-t border-b border-collapse">1</td>
                                        <td class="border-t border-b border-collapse">1</td>
                                        <td class="border-t border-b border-collapse">1</td>
                                        <td class="border-t border-b border-collapse">1</td>
                                        <td class="border-t border-b border-collapse">1</td>
                                        <td class="border-t border-b border-collapse">1</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="border-t border-b border-collapse text-right">Promo</td>
                                        <td class="border-t border-b border-collapse">:</td>
                                        <td class="border-t border-b border-collapse">isi promo</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="border-t border-b border-collapse text-right">Ongkir</td>
                                        <td class="border-t border-b border-collapse">:</td>
                                        <td class="border-t border-b border-collapse">isi promo</td>
                                    </tr>
                                    <tr>
                                        <td colspan="4" class="border-t border-b border-collapse text-right">Total</td>
                                        <td class="border-t border-b border-collapse">:</td>
                                        <td class="border-t border-b border-collapse">isi promo</td>
                                    </tr>
                                </tbody>
                            </table>
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
            ProductDetailOrder: '',
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
                this.ProductDetailOrder = response.data.order;
                this.ProductDetailWarehouse = response.data.order.warehouse;
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