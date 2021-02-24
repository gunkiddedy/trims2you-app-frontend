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
                        <span class="bg-yellow-500 px-3 rounded-md text-white font-bold py-0 leading-loose flex items-center justify-center w-2/3">
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
                            class="bg-gray-500 rounded border border-gray-600 hover:bg-gray-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                            @click="detailData(props.row.id)"
                        >
                            <svg class="w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg> Detail
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
        }
    },
    mounted() {
        this.getRecords();
    },
    methods: {
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/dashboard?page=${this.serverParams.page}&keyword=${this.keyword}&perpage=${this.serverParams.perPage}&payment_method=${this.serverParams.columnFilters.payment_method}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
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
            alert(param);
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