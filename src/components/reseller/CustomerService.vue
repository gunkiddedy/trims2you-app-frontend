<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <div class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <div class="wraper bg-white">
                <div class="title px-4 py-4 border-b">
                    <span class="text-xl text-gray-600 font-semibold">Customer Service</span>
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
                                        'bg-green-500': props.row.status == 1,
                                    }"
                                    class="px-3 text-white font-bold py-0 leading-loose flex items-center justify-center w-2/3">
                                    {{ props.row.status == 0 ? 'Inactive' : '' }}
                                    {{ props.row.status == 1 ? 'Active' : '' }}
                                </span>
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
                                <button
                                    class="bg-yellow-500 rounded hover:bg-yellow-600 px-1 py-1 text-white font-semibold flex items-center justify-between mr-1"
                                    @click="editData(props.row.id)"
                                >
                                    <svg class="w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    <!-- <span>Edit</span> -->
                                </button>
                                <button
                                    class="bg-red-500 rounded hover:bg-red-600 px-1 py-1 text-white font-semibold flex items-center justify-between"
                                    @click="hapusData(props.row.id)"
                                >
                                    <svg class="w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                    <!-- <span>Hapus</span> -->
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
                            <tr>
                            <td class="">Name</td>
                            <td class="text-gray-600 font-semibold">{{customerDetail.cuctomer_servicename}}</td>
                            </tr>
                            <tr>
                            <td class="">Whatsapp Number</td>
                            <td class="text-gray-600 font-semibold">{{customerDetail.whatsapp_number}}</td>
                            </tr>
                            <tr>
                            <td class="">Username</td>
                            <td class="text-gray-600 font-semibold">{{customerDetail.username}}</td>
                            </tr>
                            <tr>
                            <td class="">Status</td>
                            <td class="text-gray-600 font-semibold">{{customerDetail.status==1 ? 'Active' : 'Inactive'}}</td>
                            </tr>
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
        <!-- MODAL EDIT-->
        <div v-if="showModalEdit" class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
            <div class="relative w-2/5 max-w-lg pl-20">
                <!--content-->
                <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <!--header-->
                    <div class="flex items-start justify-between p-2 border-b border-solid border-gray-300 rounded-t">
                        <span class="text-xl font-semibold pt-2">
                        Customer Edit
                        </span>
                        <button class="p-1 ml-auto bg-transparent border-0 text-black float-right text-2xl leading-none font-semibold outline-none focus:outline-none" @click="showModalEdit = !showModalEdit">
                            <svg class="w-8 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <!--body-->
                    <div class="relative px-4 py-2 flex-auto">
                        <!-- component -->
                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-first-name">
                                First Name
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" placeholder="Jane">
                            <p class="text-red text-xs italic">Please fill out this field.</p>
                            </div>
                            <div class="md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-last-name">
                                Last Name
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="text" placeholder="Doe">
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mb-6">
                            <div class="md:w-full px-3">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-password">
                                Password
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="password" placeholder="******************">
                            <p class="text-grey-dark text-xs italic">Make it as long and as crazy as you'd like</p>
                            </div>
                        </div>
                        <div class="-mx-3 md:flex mb-2">
                            <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-city">
                                City
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-city" type="text" placeholder="Albuquerque">
                            </div>
                            <div class="md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-state">
                                State
                            </label>
                            <div class="relative">
                                <select class="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded" id="grid-state">
                                <option>New Mexico</option>
                                <option>Missouri</option>
                                <option>Texas</option>
                                </select>
                                <div class="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
                                <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                                </div>
                            </div>
                            </div>
                            <div class="md:w-1/2 px-3">
                            <label class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" for="grid-zip">
                                Zip
                            </label>
                            <input class="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="text" placeholder="90210">
                            </div>
                        </div>
                    </div>
                    <!--footer-->
                    <div class="flex items-center justify-end py-3 px-4 border-t border-solid border-gray-300 rounded-b">
                        <button class="text-blue-500 bg-transparent border border-solid border-blue-500 hover:bg-blue-500 hover:text-white active:bg-blue-600 font-semibold uppercase text-sm px-4 py-1 rounded outline-none focus:outline-none mr-1 mb-1" type="button" style="transition: all .15s ease" @click="showModalEdit = !showModalEdit">
                        Update
                        </button>
                    </div>
                </div>
            </div>
        </div><!-- end MODAL EDIT-->
        <div v-if="showModalDetail" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
        <div v-if="showModalEdit" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </main>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return {
            showModalDetail: false,
            showModalEdit: false,
            role: 'gudang',
            loading: true,
            isLoading: false,
            page_title: '',
            summary_table: '',
            columns: [
                {
                    label: "Reseller Name",
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
                    label: "Name",
                    field: "cuctomer_servicename",
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
                    label: "Order",
                    field: "status",
                    tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Follow Up",
                    field: "status",
                    tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
                },
                {
                    label: "Lead",
                    field: "status",
                    tdClass: 'text-center',
                    sortable: false,
                    // width: "70px",
                    // filterable: true,
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
            customerDetail: '',
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
        },
    },
    methods: {
        refreshTable(){
            this.getRecords();
        },
        detailData(param){
            axios.get(`/api/customer_service/${param}`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.customerDetail = response.data;
                this.showModalDetail = !this.showModalDetail;
                console.log(response);
            })
            .catch((error) => {
                this.$swal("Error!", `${error}`, "error");
            });
        },
        editData(param){
            axios.get(`/api/customer_service/${param}`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.customerDetail = response.data;
                this.showModalEdit = !this.showModalEdit;
                console.log(response);
            })
            .catch((error) => {
                this.$swal("Error!", `${error}`, "error");
            });
        },
        updateData(){
            axios.put(`/api/customer_service/update/${param}`,{
                headers: {
                    'Authorization': 'Bearer ' + this.userToken
                }
            })
            .then((response) => {
                this.showModalEdit = false;
                console.log(response);
            })
            .catch((error) => {
                this.$swal("Error!", `${error}`, "error");
            });
        },
        hapusData(param){
            alert(param)
        },
        sendToWarehouse(param) {
            this.$swal({
                title: "Anda Yakin?",
                text: "Akan mengirim produk ini ke Gudang!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                // cancelButtonColor: "#d33",
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
            await axios.get(`/api/customer_service?keyword=${this.keyword}&perpage=${this.serverParams.perPage}`,{
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