<template>
    <div>

        <!-- index_statistic -->
        <div class="index_statistic grid lg:grid-cols-4 md:grid-cols-3 gap-4 pb-4 sm:grid-cols-2 xs:grid-cols-1 px-4 py-8">

            <div 
                v-for="(item, i) in index_statistic"
                :key="i"
                class="kotak3 px-4 py-8 bg-white rounded shadow-lg font-semibold text-center hover:shadow-md">
                <div class="flex items-center justify-start">
                    <div class="icon bg-pink-500 rounded px-4 py-2 text-4xl">
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

        <!-- summary_table -->
        <div class="summary_table px-4 py-8 w-full overflow-auto rounded font-semibold text-center hover:shadow-md">
            <div
                v-if="userToken !== 'undefined'" 
                class="refresh mb-2 px-0">
                <button
                    @click="refreshTable" 
                    class="bg-green-500 hover:bg-green-600 focus:bg-green-600 px-4 py-1 rounded text-white flex items-center">
                    <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                    <span>Refresh</span>
                </button>
            </div>
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
                        <span 
                            :class="{
                                'bg-gray-400': props.row.status == 0, 
                                'bg-red-400': props.row.status == 1,
                                'bg-yellow-400': props.row.status == 2,
                                'bg-green-400': props.row.status == 3,
                                'bg-blue-400': props.row.status == 4,
                                'bg-indigo-400': props.row.status == 5,
                                'bg-purple-400': props.row.status == 6,
                                'bg-pink-400': props.row.status == 7,
                                'bg-gray-600': props.row.status == 8
                            }"
                            class="px-3 text-white font-bold py-0 leading-loose flex items-center justify-center w-2/3">
                            {{ props.row.status == 0 ? 'Review' : '' }}
                            {{ props.row.status == 1 ? 'Proses' : '' }}
                            {{ props.row.status == 2 ? 'Dikemas' : '' }}
                            {{ props.row.status == 3 ? 'Dikirim' : '' }}
                            {{ props.row.status == 4 ? 'Terkirim' : '' }}
                            {{ props.row.status == 5 ? 'Cancel oleh user' : '' }}
                            {{ props.row.status == 6 ? 'Cancel oleh reseller' : '' }}
                            {{ props.row.status == 7 ? 'Cancel oleh warehouse' : '' }}
                            {{ props.row.status == 8 ? 'Retur' : '' }}
                        </span>
                    </span>
                    <span v-if="props.column.field == 'payment_status_custom'">
                        <span
                            :class="{
                                'bg-blue-400': props.row.payment_status == 0,
                                'bg-purple-400': props.row.payment_status == 1,
                                'bg-green-400': props.row.payment_status == 2,
                                'bg-red-400': props.row.payment_status == 3
                            }" 
                            class="px-3 text-white font-bold py-0 leading-loose flex items-center justify-center w-1/2">
                            {{ props.row.payment_status == 0 ? 'Waiting': '' }}
                            {{ props.row.payment_status == 1 ? 'Review': '' }}
                            {{ props.row.payment_status == 2 ? 'Paid': '' }}
                            {{ props.row.payment_status == 3 ? 'Failed': '' }}
                        </span>
                    </span>
                    <span v-if="props.column.field == 'payment_method_custom'">
                        <span
                            :class="{'bg-green-500': props.row.payment_method == 'cod', 'bg-blue-500': props.row.payment_method == 'transfer'}" 
                            class="px-3 text-white font-bold py-0 leading-loose flex items-center justify-center w-1/2">
                            {{ props.row.payment_method }}
                        </span>
                    </span>
                    <span v-if="props.column.field == 'action'" class="flex items-center justify-start max-w-max">
                        <button
                            class="bg-green-500 rounded border border-green-600 hover:bg-green-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                            @click="sendToWarehouse(props.row.id)"
                        >
                            <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span title="send to warehouse">Send</span>
                        </button>
                        <button
                            class="bg-purple-500 rounded border border-purple-600 hover:bg-purple-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                            @click="detailData(props.row.id)"
                        >
                            <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            <span>Detail</span>
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
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Payment Method",
                    field: "payment_method_custom",
                    sortable: true,
                    // width: "110px",
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
                    label: "Payment Status",
                    field: "payment_status_custom",
                    tdClass: 'text-center',
                    sortable: true,
                    // width: "110px",
                    filterable: true,
                    // filterOptions: {
                    //     enabled: true,
                    //     placeholder: "Filter",
                    //     filterDropdownItems: [
                    //         { value: 'cod', text: 'COD' },  
                    //         { value: 'transfer', text: 'TRANSFER' } 
                    //     ],
                    //     trigger: "keyup",
                    // },
                },
                {
                    label: "Action",
                    field: "action",
                    sortable: false,
                    tdClass: 'text-center',
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
        paymentMethod(){
            let pm = this.serverParams.columnFilters.payment_method_custom;
            if (pm == undefined) return pm = '';
            return pm;
        }
    },
    methods: {
        refreshTable(){
            this.getRecords();
        },
        detailData(param){
            this.$router.push({
                name: 'OrderDetail',
                params: { id: param }
            });
        },
        sendToWarehouse(param) {
            this.$swal({
                title: "Anda Yakin?",
                text: "Akan mengirim produk ini ke Gudang!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Ya, kirim ini!",
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.put(`/api/orders/send-to-warehouse/${param}`,{
                        headers: {
                            'Authorization': 'Bearer ' + this.userToken
                        }
                    })
                    .then((response) => {
                        this.$swal("Success!", `Produk berhasil dikirim ke Gudang.`, "success");
                        this.getRecords();
                        console.log(response);
                    })
                    .catch((error) => {
                        this.$swal("Error!", `${error}`, "error");
                        // console.log(error);
                    });
                } 
            });
        },
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/dashboard?page=${this.serverParams.page}&keyword=${this.keyword}&perpage=${this.serverParams.perPage}&sort=product_name__asc`,{
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
        }
    },
}
</script>