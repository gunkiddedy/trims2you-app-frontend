<template>
    <div>

        <!-- index_statistic -->
        <div class="index_statistic grid lg:grid-cols-4 md:grid-cols-3 gap-4 pb-4 sm:grid-cols-2 xs:grid-cols-1 px-4 py-8">

            <div 
                v-for="(item, i) in index_statistic"
                :key="i"
                class="kotak3 px-4 py-8 bg-white rounded shadow-lg font-semibold text-center hover:shadow-md">
                <div class="flex items-center justify-start">
                    <div class="icon bg-blue-500 rounded px-4 py-2 text-4xl">
                        <i :class="item.icon" class="text-gray-50"></i>
                    </div>
                    <div class="flex flex-col items-start ml-2">
                        <div class="uang text-3xl text-gray-500">
                            {{ item.count }}
                        </div>
                        <div class="title text-gray-400">
                            {{ item.label }}
                        </div>
                    </div>
                </div>
            </div>
            
        </div><!-- index_statistic -->

        <div
            v-if="userToken !== 'undefined'" 
            class="refresh my-2 px-4">
            <button
                @click="refreshTable" 
                class="bg-green-500 hover:bg-green-600 focus:bg-green-600
             px-2 py-1 rounded-full text-white flex items-center">
                <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                <span>Refresh Table</span>
            </button>
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
                    pageLabel: 'page', // for 'pages' mode
                    allLabel: 'All',
                }"
                @on-page-change="onPageChange"
                @on-sort-change="onSortChange"
                @on-column-filter="onColumnFilter"
                @on-per-page-change="onPerPageChange"
                :lineNumbers="false"
                :totalRows="totalRecords"
                :isLoading.sync="isLoading"
                :columns="columns"
                :rows="rows"
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
                    <span v-if="props.column.field == 'status_custom'">
                        <span class="bg-purple-500 px-3 rounded-md text-white font-bold py-0 leading-loose flex items-center justify-center w-2/3">
                            {{ props.row.status == 1 ? 'proses' : '' }}
                        </span>
                    </span>
                    <span v-if="props.column.field == 'payment_method_custom'">
                        <span
                            :class="{'bg-green-500': props.row.payment_method == 'cod', 'bg-blue-500': props.row.payment_method == 'transfer'}" 
                            class="px-3 rounded-md text-white font-bold py-0 leading-loose flex items-center justify-center w-1/2">
                            {{ props.row.payment_method }}
                        </span>
                    </span>
                    <span v-if="props.column.field == 'action'">
                        <button
                            class="bg-pink-500 rounded border border-pink-600 hover:bg-pink-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                            @click="detailData(props.row.id)"
                        >
                            <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Check</span>
                        </button>
                    </span>
                    <span v-else>
                        {{ props.formattedRow[props.column.field] }}
                    </span>
                </template>
            </vue-good-table>
        </div><!-- summary_table -->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            role: 'gudang',
            loading: true,
            isLoading: false,
            index_statistic: '',
            page_title: '',
            summary_table: '',
            columns: [
                {
                    label: "Transaction Code",
                    field: "transaction_code",
                    sortable: true,
                    width: "150px",
                    // filterable: true,
                    // filterOptions: {
                    //     enabled: true,
                    //     placeholder: "Filter",
                    //     trigger: "enter",
                    // },
                },
                {
                    label: "Reseller",
                    field: "name",
                    sortable: true,
                    width: "150px",
                    // filterable: true,
                    // filterOptions: {
                    //     enabled: true,
                    //     placeholder: "Filter",
                    //     trigger: "enter",
                    // },
                },
                {
                    label: "Product Name",
                    field: "product_name",
                    sortable: true,
                    width: "150px",
                    // filterable: true,
                    // filterOptions: {
                    //     enabled: true,
                    //     placeholder: "Filter",
                    //     trigger: "enter",
                    // },
                },
                {
                    label: "Customer Name",
                    field: "name",
                    sortable: true,
                    width: "150px",
                    // filterable: true,
                    // filterOptions: {
                    //     enabled: true,
                    //     placeholder: "Filter",
                    //     trigger: "enter",
                    // },
                },
                {
                    label: "Status",
                    field: "status_custom",
                    tdClass: 'text-center',
                    sortable: false,
                    width: "70px",
                    // filterable: true,
                },
                {
                    label: "Payment Method",
                    field: "payment_method_custom",
                    sortable: true,
                    width: "110px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        filterDropdownItems: [
                            { value: 'cod', text: 'COD' },  
                            { value: 'transfer', text: 'TRANSFER' } 
                        ],
                        trigger: "keyup",
                    },
                },
                {
                    label: "Action",
                    field: "action",
                    sortable: false,
                    width: "70px",
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
            orderStatus: 2,
        }
    },
    mounted() {
        if(this.userToken == undefined){
            this.$router.push('/');
        }else{
            this.getRecords();
            console.log(this.userToken)
        }
    },
    computed: {
        userToken(){
            return this.$store.getters['currentUser/userToken'];
        },
        paymentMethod(){
            let pm = this.serverParams.columnFilters.payment_method_custom;
            if (pm == undefined){
                return pm = '';
            }
            return pm;
        }
    },
    methods: {
        refreshTable(){
            this.getRecords();
        },
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/dashboard?page=${this.serverParams.page}&keyword=${this.keyword}&perpage=${this.serverParams.perPage}&payment_method=${this.paymentMethod}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.isLoading = false;
                this.loading = false;
                this.index_statistic = response.data.index_statistic;
                this.page_title = response.data.page_title;
                this.summary_table = response.data.summary_table;
                this.totalRecords = response.data.summary_table.total;
                this.rows = response.data.summary_table.data;

                this.$store.dispatch('warehouseData/handleDashboard', response.data);
                console.log(response);
                console.log(this.serverParams);
                console.log('token dashboard '+this.userToken);
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
            //alert(param);
            this.$swal({
                title: "Anda Yakin?",
                text: "Anda akan memproses produk ini!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, proses ini!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`/api/outgoing_product/status/${param}`, {status: this.orderStatus},
                    {
                        headers: {
                            'Authorization': 'Bearer ' + this.userToken
                        }
                    })
                    .then((response) => {
                        this.getRecords();
                        console.log(response);
                        console.log(this.orderStatus);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                    this.$swal("Success!", `Data berhasil diproses.`, "success");
                    // this.getRecords();
                } 
                // else if (result.isDismissed) {
                //     this.$swal("Canceled!", "Proses Dibatalkan!", "info");
                // }
            });
        },
        deleteData(param) {
            //alert(param);
            this.$swal({
                title: "Anda Yakin?",
                text: "Data yang dihapus tidak bisa dikembalikan lagi!",
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
                } else if (result.isDismissed) {
                    this.$swal("Canceled!", "Proses Dibatalkan!", "info");
                }
            });
        },
    },
}
</script>