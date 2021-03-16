<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <div class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <div class="wraper bg-white">
                <div class="title px-4 py-4 border-b">
                    <span class="text-xl text-gray-600 font-semibold">Deposite</span>
                </div>

                <div class="index_statistic grid lg:grid-cols-4 md:grid-cols-3 gap-4 pb-4 sm:grid-cols-2 xs:grid-cols-1 px-4 py-8">
                    <div class="kotak3 px-4 py-4 bg-white rounded shadow-lg cursor-pointer font-semibold text-center hover:shadow-md">
                        <div
                            @click="getHowToDeposite" 
                            class="flex flex-col items-center justify-start">
                            <svg class="w-10 mr-1 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                            <div class="uang text-xl text-gray-500">
                                Cara Deposite
                            </div>
                        </div>
                    </div>
                    <div class="kotak3 px-4 py-4 bg-white rounded shadow-lg cursor-pointer font-semibold text-center hover:shadow-md">
                        <div class="flex flex-col items-center justify-start">
                            <svg class="w-10 mr-1 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                            <div class="uang text-xl text-gray-500">
                                Upload Bukti Transfer
                            </div>
                        </div>
                    </div>
                    <div class="kotak3 px-4 py-4 bg-white rounded shadow-lg font-semibold text-center hover:shadow-md">
                        <div class="flex flex-col items-center justify-start">
                            <svg class="w-10 mr-1 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div class="uang flex flex-col">
                                <span class="text-gray-500">Your Balance</span> 
                                <span class="text-gray-500 text-2xl">{{userBalance}}</span>
                            </div>
                        </div>
                    </div>
                    <div
                        @click="getTransactionHistory" 
                        class="kotak3 px-4 py-4 bg-white rounded shadow-lg cursor-pointer font-semibold text-center hover:shadow-md">
                        <div class="flex flex-col items-center justify-start">
                            <svg class="w-10 mr-1 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                            </svg>
                            <div class="uang text-xl text-gray-500">
                                Transaction History
                            </div>
                        </div>
                    </div>
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
                                        'bg-yellow-500': props.row.status == 0,
                                        'bg-green-500': props.row.status == 'approved',
                                    }"
                                    class="px-1 text-white font-bold py-0 leading-loose flex items-center justify-center max-w-min">
                                    {{ props.row.status }}
                                </span>
                            </span>
                            <span v-if="props.column.field == 'transfer_at_custom'">
                                {{ props.row.transfer_at|momentDateIndoTime }}
                            </span>
                            <span v-if="props.column.field == 'transfer_to_custom'">
                                {{ props.row.admin_bank.bank.name }}
                            </span>
                            <span v-if="props.column.field == 'transfer_from_custom'">
                                {{ props.row.from_bank.name }}
                            </span>
                            <span v-if="props.column.field == 'action'" class="flex items-center justify-start max-w-max">
                                <button
                                    class="bg-blue-500 rounded hover:bg-blue-600 px-1 focus:ring-2 focus:ring-indigo-300 py-1 text-white font-semibold flex items-center justify-between mr-1"
                                    @click="detailData(props.row.id)"
                                >
                                    <svg class="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <!-- <span title="send to warehouse">Detail</span> -->
                                </button>
                            </span>
                            <span v-else>
                                {{ props.formattedRow[props.column.field] }}
                            </span>
                        </template>
                    </vue-good-table>
                </div><!-- summary_table -->
            </div>
        </div>
        <!-- MODAL DETAIL-->
        <div v-if="showModalDetail" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-2/3 pl-20">
                <!--content-->
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        Deposite Detail
                        </span>
                        <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalDetail = !showModalDetail">
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex-auto">
                        <table class="table-fixed text-gray-500 w-full">
                            <tbody>
                            <tr >
                                <td class="py-2 px-2">Reseller</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.reseller.name}}
                                </td>
                                <td class="py-2 px-2">Bukti transfer</td>
                            </tr>
                            <tr class="">
                                <td class="py-2 px-2">Bank tujuan transfer</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.admin_bank.bank.name}}
                                </td>
                                <td rowspan="8" class="text-gray-600 font-semibold">
                                    <img class="object-cover w-full" src="https://images.unsplash.com/photo-1550853024-fae8cd4be47f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=507&q=80" alt="">
                                </td>
                            </tr>
                            <tr >
                                <td class="py-2 px-2">Nama rekening</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.admin_bank.account_name}}</td>
                            </tr>
                            <tr class="">
                                <td class="py-2 px-2">Nomor rekening</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.admin_bank.account_no}}
                                </td>
                            </tr>
                            <tr >
                                <td class="py-2 px-2">Jumlah transfer</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.amount}}
                                </td>
                            </tr>
                            <tr class="">
                                <td class="py-2 px-2">Tanggal dan jam transfer</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.transfer_at}}
                                </td>
                            </tr>
                            <tr >
                                <td class="py-2 px-2">Di transfer dari Bank</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.from_bank.name}}
                                </td>
                            </tr>
                            <tr class="">
                                <td class="py-2 px-2">Nama rekening</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.account_name}}
                                </td>
                            </tr>
                            <tr >
                                <td class="py-2 px-2">Nomor rekening</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.account_no}}
                                </td>
                            </tr>
                            <tr class="">
                                <td class="py-2 px-2">Status</td>
                                <td class="text-gray-600 font-semibold">
                                    {{depositeDetail.status}}
                                </td>
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
        </div><!-- end MODAL DETAIL-->
        <!-- MODAL HISTORY-->
        <div v-if="showModalHistory" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-2/3 pl-20">
                <!--content-->
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        History
                        </span>
                        <button 
                            class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalHistory = !showModalHistory">
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex-auto">
                        <div class="filter flex items-center justify-start pt-1 pb-4 text-gray-400">
                            <span
                                @click="changeHistoryType(0)"
                                :class="{'bg-blue-500 text-white':historyType == 'all'}" 
                                class="px-2 py-1 font-semibold cursor-pointer">Semua</span>
                            <span
                                @click="changeHistoryType(1)"
                                :class="{'bg-blue-500 text-white':historyType == 'debit'}" 
                                class="px-2 py-1 font-semibold cursor-pointer">Debit</span>
                            <span
                                @click="changeHistoryType(2)"
                                :class="{'bg-blue-500 text-white':historyType == 'credit'}" 
                                class="px-2 py-1 font-semibold cursor-pointer">Credit</span>
                        </div>
                        <table class="w-full border-collapse text-left">
                            <thead class="text-gray-500">
                                <tr>
                                <th class="border-collapse">Type</th>
                                <th class="border-collapse">Posting date</th>
                                <th class="border-collapse">Amount</th>
                                <th class="border-collapse">Reference</th>
                                </tr>
                            </thead>
                            <tbody class="text-gray-400">
                                <tr v-for="(item, i) in customerHistory" :key="i">
                                    <td class="border-collapse">{{item.type}}</td>
                                    <td class="border-collapse">{{item.posting_date}}</td>
                                    <td class="border-collapse">{{item.amount}}</td>
                                    <td class="border-collapse">
                                        <span
                                            class="cursor-pointer hover:text-blue-400" 
                                            @click="detailData(item.reference_id)">
                                            Deposite #{{item.reference_id}}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button
                            @click="showModalHistory = false" 
                            class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end MODAL HISTORY-->
        <!-- MODAL HOW TO DEPOSITE-->
        <div v-if="showModalHowToDeposite" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-2/3 pl-20">
                <!--content-->
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        How To Deposite
                        </span>
                        <button 
                            class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalHowToDeposite = !showModalHowToDeposite">
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex-auto">
                        {{howDeposite}}
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button
                            @click="showModalHowToDeposite = false" 
                            class="text-red-500 bg-transparent border border-solid border-red-500 hover:bg-red-500 hover:text-white active:bg-red-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end MODAL HOW TO DEPOSITE-->
        <div v-if="showModalDetail" class="opacity-25 fixed inset-0 z-30 bg-black"></div>
        <div v-if="showModalHistory" class="opacity-25 fixed inset-0 z-30 bg-black"></div>
        <div v-if="showModalHowToDeposite" class="opacity-25 fixed inset-0 z-30 bg-black"></div>
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
            showModalHistory: false,
            showModalHowToDeposite: false,
            role: 'gudang',
            loading: true,
            isLoading: false,
            page_title: '',
            summary_table: '',
            columns: [
                {
                    label: "Transfer to",
                    field: "transfer_to_custom",
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
                    label: "Amount",
                    field: "amount",
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
                    label: "Transfer at",
                    field: "transfer_at_custom",
                    // tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Transfer from",
                    field: "transfer_from_custom",
                    // tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Account Name",
                    field: "account_name",
                    // tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Account No",
                    field: "account_no",
                    // tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Status",
                    field: "status_custom",
                    // tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Action",
                    field: "action",
                    sortable: false,
                    // tdClass: 'text-center',
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
            depositeDetail: '',
            customerHistory: '',
            howDeposite: '',
            userBalance: 0,
            historyType: 'all',
        }
    },
    watch: {
        historyType(oldValue, newValue){
            this.getTransactionHistory();
        },
        deep: true
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
        async getHowToDeposite(){
            await axios.get(`/api/deposites/how-to-deposite`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.howDeposite = response.data;
                this.showModalHowToDeposite = true;
                console.log(response.data);
            })
            .catch((error) => {
                this.$swal("Error!", `${error}`, "error");
            });
        },
        changeHistoryType(param){
            if(param == 1){
                this.historyType = 'debit';
            }else if(param == 2){
                this.historyType = 'credit';
            }else{
                this.historyType = 'all';
            }
        },
        async getTransactionHistory(){
            await axios.get(`/api/deposites/transaction-history?perpage=10&page=1&type=${this.historyType}`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.customerHistory = response.data.data.data;
                this.showModalHistory = true;
                console.log(response.data.data.data);
            })
            .catch((error) => {
                this.$swal("Error!", `${error}`, "error");
            });
        },
        detailData(param){
            axios.get(`/api/deposites/${param}`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.depositeDetail = response.data.data;
                this.showModalDetail = !this.showModalDetail;
                console.log(response);
            })
            .catch((error) => {
                this.$swal("Error!", `${error}`, "error");
            });
        },
        async getRecords(){
            this.isLoading = true;
            // {{url}}/api/deposites?perpage=2&keyword=&page=1&status=approved
            await axios.get(`/api/deposites?perpage=${this.serverParams.perPage}&keyword=${this.keyword}&page=${this.serverParams.page}&status=approved`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.isLoading = false;
                this.loading = false;
                this.summary_table = response.data.data;
                this.totalRecords = response.data.data.length;
                this.rows = response.data.data.data;
                this.userBalance = response.data.user.balance;
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