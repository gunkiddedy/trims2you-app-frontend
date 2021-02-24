<template>
    <div>
        <div class="add-retur px-4 py-8">
            <div class="input flex items-center justify-start">
                <div class="flex items-center mr-2">
                    <input
                        v-model="returData"
                        class="shadow rounded w-full py-2 leading-none border px-3 text-grey-darker focus:outline-none focus:border-blue-300 focus:shadow-inner focus:bg-gray-100" 
                        type="text" 
                        placeholder="Transaction Code">
                    <button 
                        @click="addRetur(returData)"
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
                    <span v-if="props.column.field == 'action'">
                        <button
                            class="bg-indigo-500 rounded border border-indigo-600 hover:bg-indigo-600 px-2 py-0 text-white font-semibold mx-1 flex items-center justify-between"
                            @click="editData(props.row.id)"
                        >
                            <svg class="w-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg> Edit
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
                    field: "status",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                },
                {
                    label: "Payment Status",
                    field: "payment_status",
                    sortable: true,
                    width: "150px",
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
                    label: "Tracking Number",
                    field: "tracking_number",
                    sortable: true,
                    width: "150px",
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
            returData: '',
        }
    },
    mounted() {
        this.getRecords();
    },
    methods: {
        async addRetur(param){
            if(param == ''){
                this.$swal('cannot empty!');
                return false;
            }
            await axios.post(`/api/retur/${param}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                this.loading = false;
                this.getRecords();
                // this.$store.dispatch('warehouseData/handleRetur', response.data);
                console.log(response);
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
        },
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/retur`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                this.isLoading = false;
                this.loading = false;
                this.totalRecords = response.data.total;
                this.rows = response.data.data;
                this.$store.dispatch('warehouseData/handleRetur', response.data);
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
        editData(param) {
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

<style scoped>
.swal2-title {
    position: relative;
    max-width: 100%;
    margin: 0 0 .4em;
    padding: 0;
    color: #595959;
    font-size: .875em;
    font-weight: 600;
    text-align: center;
    text-transform: none;
    word-wrap: break-word;
}
</style>