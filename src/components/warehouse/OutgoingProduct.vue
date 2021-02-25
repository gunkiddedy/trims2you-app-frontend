<template>
    <div>
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
                            class="px-3 rounded-md text-white font-bold py-0 leading-loose flex items-center justify-center w-2/3">
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
                            class="px-3 rounded-md text-white font-bold py-0 leading-loose flex items-center justify-center w-1/2">
                            {{ props.row.payment_status == 0 ? 'Waiting': '' }}
                            {{ props.row.payment_status == 1 ? 'Review': '' }}
                            {{ props.row.payment_status == 2 ? 'Paid': '' }}
                            {{ props.row.payment_status == 3 ? 'Failed': '' }}
                        </span>
                    </span>
                    <span v-if="props.column.field == 'action'">
                        <button
                            class="bg-gray-500 rounded border border-gray-600 hover:bg-gray-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-center"
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
            columns: [
                {
                    label: "Reseller",
                    field: "cms_users_id",
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
                    field: "customer_name",
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
                    sortable: true,
                    width: "70px",
                    filterable: true,
                },
                {
                    label: "Payment Status",
                    field: "payment_status_custom",
                    tdClass: 'text-center',
                    sortable: true,
                    width: "110px",
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
    computed: {
        userToken(){
            return this.$store.getters['currentUser/userToken'];
        }
    },
    methods: {
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/outgoing_product`,
            {
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.isLoading = false;
                this.loading = false;
                this.totalRecords = response.data.total;
                this.rows = response.data.data;
                this.$store.dispatch('warehouseData/handleOutgoing', response.data);
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