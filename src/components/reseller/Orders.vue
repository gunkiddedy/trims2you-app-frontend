<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <div class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <div class="wraper bg-white">
                <div class="title px-4 py-4 border-b">
                    <span class="text-xl text-gray-600 font-semibold">Orders</span>
                </div>
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
                            <span v-if="props.column.field == 'action'" class="flex items-center justify-start max-w-max">
                                <button
                                    class="bg-green-500 rounded border border-green-600 hover:bg-green-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                                    @click="sendToWarehouse(props.row.id)"
                                >
                                    <svg class="w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                    </svg>
                                    <span title="send to warehouse">Send</span>
                                </button>
                                <button
                                    class="bg-gray-500 rounded border border-gray-600 hover:bg-gray-600 px-2 py-1 text-white font-semibold mx-1 flex items-center justify-between"
                                    @click="detailData(props.row.id)"
                                >
                                    <svg class="w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span title="Detail data">Detail</span>
                                </button>
                            </span>
                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div>
            </div>
        </div>
        <!-- MODAL DETAIL-->
        <div v-if="showModalDetail" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-2/5 max-w-lg pl-20">
                <!--content-->
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        Customer Detail
                        </span>
                        <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalDetail = !showModalDetail">
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex-auto">
                        <table class="table-auto text-gray-500 w-full">
                            <tbody>
                            <tr >
                                <td class="py-2 px-2">Name</td>
                                <td class="text-gray-600 font-semibold">{{bankDetail.cuctomer_servicename}}</td>
                            </tr>
                            <tr class="bg-gray-100">
                                <td class="py-2 px-2">Whatsapp Number</td>
                                <td class="text-gray-600 font-semibold">{{bankDetail.whatsapp_number}}</td>
                            </tr>
                            <tr >
                                <td class="py-2 px-2">Username</td>
                                <td class="text-gray-600 font-semibold">{{bankDetail.username}}</td>
                            </tr>
                            <tr class="bg-gray-100">
                                <td class="py-2 px-2">Status</td>
                                <td class="text-gray-600 font-semibold">{{bankDetail.status==1 ? 'Active' : 'Inactive'}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-bold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="showModalDetail = !showModalDetail">
                        Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- MODAL EDIT-->
        <div v-if="showModalEdit" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-2/5 max-w-lg pl-20">
                <!--content-->
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        Reseller Bank Edit
                        </span>
                        <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalEdit = !showModalEdit">
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex-auto">
                        <div class="-mx-3 md:flex my-4">
                            <div class="md:w-full px-3">
                                <label class="block uppercase tracking-wide text-xs font-bold mb-1">Bank *</label>
                                <select
                                    v-model="bankDetail.bank_id" 
                                    class="border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded py-2 px-4">
                                    <option
                                        v-for="(bank, i) in banks"
                                        :value="bank.id"
                                        :key="i"
                                        :selected="bankDetail.bank_id == bank.id">
                                        {{ bank.name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="-mx-3 md:flex my-4">
                            <div class="md:w-full px-3">
                                <label class="block uppercase tracking-wide text-xs font-bold mb-1">Account Name *</label>
                                <input 
                                    v-model="bankDetail.account_name"
                                    class="appearance-none border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded py-2 px-4">
                            </div>
                        </div>
                        <div class="-mx-3 md:flex my-4">
                            <div class="md:w-full px-3">
                                <label class="block uppercase tracking-wide text-xs font-bold mb-1">Account No *</label>
                                <input 
                                    v-model="bankDetail.account_no"
                                    class="appearance-none border focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent block w-full rounded py-2 px-4">
                            </div>
                        </div>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button 
                            @click="updateData(bankDetail.id)"
                            class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                            {{isUpdate ? 'Updating...': 'Update'}}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showModalDetail" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
        <div v-if="showModalEdit" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            isUpdate: false,
            check_active: false,
            check_inactive: false,
            showModalDetail: false,
            showModalEdit: false,
            role: 'reseller',
            loading: true,
            isLoading: false,
            page_title: '',
            summary_table: '',
            columns: [
                {
                    label: "Transaction Code",
                    field: "transaction_code",
                    sortable: true,
                },
                {
                    label: "Product Name",
                    field: "product_name",
                    sortable: true,
                },
                {
                    label: "Customer Name",
                    field: "customer_name",
                    sortable: false,
                },
                {
                    label: "Status",
                    field: "status_custom",
                    sortable: false,
                },
                {
                    label: "Payment Status",
                    field: "payment_status_custom",
                    sortable: false,
                },
                {
                    label: "Tracking Number",
                    field: "tracking_number",
                    sortable: false,
                },
                {
                    label: "Action",
                    field: "action",
                    sortable: false,
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
            bankDetail: '',
            banks: '',
        }
    },
    computed: {
        userToken(){
            return localStorage.access_token;
        },
    },
    mounted() {
        if(this.userToken == undefined){
            this.$router.push('/');
        }else{
            this.getRecords();
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
                        console.log(error);
                    });
                } 
            });
        },
        async getRecords(){
            this.isLoading = true;
            await axios.get(`/api/orders`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.isLoading = false;
                this.loading = false;
                this.summary_table = response.data;
                this.totalRecords = response.data.total;
                this.rows = response.data.data;
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