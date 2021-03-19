<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <!-- MAIN CONTENT -->
        <div class="main-content pl-16 pt-4 lg:h-screen h-full bg-indigo-50">
            <div class="bg-white">

                <!-- TITLE -->
                <div class="title px-4 py-4 border-b border-gray-200 flex items-center justify-between">
                    <span class="text-2xl font-semibold text-gray-400">
                        Product ID : {{ id }}</span>
                    <div>
                        <button 
                            @click="goBackPrevious"
                            class="flex items-center justify-between bg-gray-400 px-4 py-1 rounded-full hover:bg-gray-500 focus:bg-gray-500">
                            <svg class="w-6 text-white mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
                            <span class="text-white">Back</span>
                        </button>
                    </div>
                </div>
                <!-- INPUT BATCH NUMBER -->
                <div class="add-retur px-4 py-8">
                    <div class="input flex items-center justify-start">
                        <div class="flex items-center mr-2">
                            <input
                                v-model="incomingData"
                                class="shadow rounded w-full py-2 leading-none border px-3 text-grey-darker focus:outline-none focus:border-blue-300 focus:shadow-inner focus:bg-gray-100" 
                                type="text" 
                                placeholder="Transaction Code">
                            <button 
                                @click="addIncoming(incomingData)"
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
                </div>

                <!-- summary_table -->
                <div class="summary_table px-4 py-8 w-full overflow-auto rounded font-semibold text-center hover:shadow-md">
                    <vue-good-table
                        mode="remote"
                        :pagination-options="{
                            enabled: true,
                            mode: 'records',
                            perPage: 5,
                            perPageDropdown: [5, 10, 15],
                            dropdownAllowAll: false,
                            setCurrentPage: 2,
                            nextLabel: 'next',
                            prevLabel: 'prev',
                            rowsPerPageLabel: 'Per page',
                            ofLabel: 'of',
                            pageLabel: 'page',
                            allLabel: 'All',
                        }"
                        @on-page-change="onPageChange"
                        @on-sort-change="onSortChange"
                        @on-column-filter="onColumnFilter"
                        @on-per-page-change="onPerPageChange"
                        :lineNumbers="false"
                        :totalRows="totalRecords"
                        :isLoading.sync="isLoading"
                        :rows="rows"
                        :columns="columns"
                    >
                        <!-- <div slot="table-actions">
                            <button
                                @click="exportExcel()"
                                class="bg-indigo-500 hover:bg-indigo-600 px-3 py-1 text-white text-xs rounded-full mr-2"
                            >
                                Download
                            </button>
                        </div> -->
                        <template
                            slot="table-row"
                            slot-scope="props"
                            v-if="role === 'gudang' || role === 'reseller'"
                        >
                            <span v-if="props.column.field == 'status'">
                                <span 
                                    :class="{
                                        'bg-gray-400': props.row.barcode_status.status == 0, 
                                        'bg-red-400': props.row.barcode_status.status == 1,
                                        'bg-yellow-400': props.row.barcode_status.status == 2,
                                        'bg-green-400': props.row.barcode_status.status == 3,
                                        'bg-blue-400': props.row.barcode_status.status == 4,
                                        'bg-indigo-400': props.row.barcode_status.status == 5,
                                        'bg-purple-400': props.row.barcode_status.status == 6,
                                        'bg-pink-400': props.row.barcode_status.status == 7,
                                        'bg-gray-600': props.row.barcode_status.status == 8
                                    }"
                                    class="px-2 text-white font-bold py-0 leading-loose flex items-center justify-center max-w-max">
                                    {{ props.row.barcode_status.status == 0 ? 'Review' : '' }}
                                    {{ props.row.barcode_status.status == 1 ? 'Proses' : '' }}
                                    {{ props.row.barcode_status.status == 2 ? 'Sudah diterima' : '' }}
                                    {{ props.row.barcode_status.status == 3 ? 'Terjual' : '' }}
                                    {{ props.row.barcode_status.status == 4 ? 'Terkirim' : '' }}
                                    {{ props.row.barcode_status.status == 5 ? 'Cancel oleh user' : '' }}
                                    {{ props.row.barcode_status.status == 6 ? 'Cancel oleh reseller' : '' }}
                                    {{ props.row.barcode_status.status == 7 ? 'Cancel oleh warehouse' : '' }}
                                    {{ props.row.barcode_status.status == 8 ? 'Retur' : '' }}
                                </span>
                            </span>
                            <span v-if="props.column.field == 'action'">
                                <button
                                    class="bg-pink-500 rounded border border-pink-600 hover:bg-pink-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                                    @click="detailData(props.row.id)"
                                >
                                    <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                    <span>Hapus</span>
                                </button>
                            </span>
                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                    <!-- {{ name }} -->
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
            loading: true,
            isLoading: false,
            columns: [
                {
                    label: "Barcode",
                    field: "barcode",
                    sortable: true,
                    // width: "150px",
                    // filterable: true,
                    // filterOptions: {
                    //     enabled: true,
                    //     placeholder: "Filter",
                    //     trigger: "enter",
                    // },
                },
                {
                    label: "Status",
                    field: "status",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        filterDropdownItems: [
                            { value: '1', text: 'GAGAL' },  
                            { value: '2', text: 'DITERIMA' },
                            { value: '3', text: 'TERJUAL' },
                            { value: '4', text: 'RETUR' }
                        ],
                        trigger: "keyup",
                    },
                },
                {
                    label: "Action",
                    field: "action",
                    sortable: false,
                    width: "100px",
                },
            ],
            rows: [],
            totalRecords: 0,
            serverParams: {
                columnFilters: {},
                sort: {
                    field: '', 
                    type: '',
                },
                page: 1,
                perPage: 5,
            },
            keyword: '',
            incomingData: '',
        }
    },
    mounted() {
        this.getRecords();
    },
    computed: {
        userToken(){
            return localStorage.access_token;
            // return this.$store.getters['currentUser/userToken'];
        }
    },
    methods: {
        goBackPrevious(){
            this.$router.go(-1);
        },
        async getRecords(){
            this.isLoading = true;
            if(!this.id) return false;
            await axios.get(`/api/incoming_product/detail/${this.id}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.isLoading = false;
                // this.loading = false;
                this.totalRecords = response.data.length;
                this.rows = response.data.data;
                this.$store.dispatch('warehouseData/handleIncomingProductNameDetail', response.data);
                console.log(response);
                console.log(this.serverParams);
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
        updateParams(newProps) {
            this.serverParams = Object.assign({}, this.serverParams, newProps);
        },
        onPageChange(params) {
            this.updateParams({ page: params.currentPage });
            this.getRecords();
        },
        onPerPageChange(params) {
            this.updateParams({ perPage: params.currentPerPage });
            this.getRecords();
        },
        onSortChange(params) {
            this.updateParams({
                sort: [
                    {
                        field: params[0].field,
                        type: params[0].type,
                    },
                ],
            });
            this.getRecords();
        },
        onColumnFilter(params) {
            this.updateParams(params);
            this.getRecords();
        },
        detailData(param) {
            this.$swal({
                title: "Anda Yakin?",
                text: `Data ${param} akan dihapus!`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, hapus ini!",
            }).then((result) => {
                if (result.isConfirmed) {
                    // axios
                    // .post("/api/delete-umkm-desa/" + param)
                    // .then((response) => {
                    //     console.log(response);
                    // })
                    // .catch((error) => {
                    //     console.log(error);
                    // });
                    // this.$swal("Success!", "Data berhasil dihapus.", "success");
                    // this.getRecords();
                } 
                // else if (result.isDismissed) {
                //     this.$swal("Canceled!", "Proses Dibatalkan!", "info");
                // }
            });
        },
    },
}
</script>