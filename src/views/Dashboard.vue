<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">

        <div v-if="loading" class="opacity-25 fixed inset-0 z-30 bg-white"></div>

        <!-- MAIN CONTENT -->
        <div class="main-content p-4 bg-indigo-50 lg:h-screen h-full">

            <!-- loader -->
            <div class="z-30 mx-auto flex items-center justify-center" v-if="loading">
				<svg class="w-12 text-blue-500" viewBox="0 0 120 30" fill="currentColor">
					<circle cx="15" cy="15" r="15">
					<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
					<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
					</circle>
					<circle cx="60" cy="15" r="9" fill-opacity="0.3">
					<animate attributeName="r" from="9" to="9" begin="0s" dur="0.8s" values="9;15;9" calcMode="linear" repeatCount="indefinite" />
					<animate attributeName="fill-opacity" from="0.5" to="0.5" begin="0s" dur="0.8s" values=".5;1;.5" calcMode="linear" repeatCount="indefinite" />
					</circle>
					<circle cx="105" cy="15" r="15">
					<animate attributeName="r" from="15" to="15" begin="0s" dur="0.8s" values="15;9;15" calcMode="linear" repeatCount="indefinite" />
					<animate attributeName="fill-opacity" from="1" to="1" begin="0s" dur="0.8s" values="1;.5;1" calcMode="linear" repeatCount="indefinite" />
					</circle>
				</svg>
			</div>

            <!-- TABS WRAPER-->
            <div class="tab-wraper bg-white">
                <!-- NAV TAB -->
                <ul class="flex border-b border-gray-300 font-bold py-3">
                    <li 
                        v-for="(item, i) in index_statistic"
                        :key="i"
                        class="mx-2">
                        <a class="inline-block py-2 px-4 text-blue-500 font-semibold  hover:text-blue-800" href="#" v-on:click="toggleTabs(i)" v-bind:class="{'text-blue-600': openTab !== i, 'border-b-2 border-blue-500': openTab === i}">{{i}} {{item.label}}</a>
                    </li>
                </ul>
                
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
                <div class="summary_table px-4 py-8 w-full overflow-auto px-0 py-0 rounded font-semibold text-center hover:shadow-md">
                    <vue-good-table
                        mode="remote"
                        :pagination-options="{
                            enabled: true,
                            perPage: 2,
                            perPageDropdownEnabled: false,
                        }"
                        :sort-options="{
                            enabled: true,
                            initialSortBy: [
                                {field: 'transaction_code', type: 'asc'},
                                {field: 'payment_method', type: 'desc'}
                            ],
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

            </div><!-- TABS WRAPER-->

        </div><!-- MAIN CONTENT -->
        
    </main>
</template>

<script>
import axios from 'axios'
// import Pagination from '@/components/Pagination.vue'
/**
 * :search-options="{
        enabled: true,
        placeholder: 'Search this table'
    }"
 * 
 * 
 */
export default {
    // components: {
    //     Pagination
    // },
    data() {
        return {
            index_statistic: '',
            page_title: '',
            summary_table: '',
            isLoading: false,
            loading: true,
            role: 'gudang',
            columns: [
                {
                    label: "Transaction Code",
                    field: "transaction_code",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        trigger: "enter",
                    },
                },
                {
                    label: "Reseller",
                    field: "reseller_name",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        trigger: "enter",
                    },
                },
                {
                    label: "Product Name",
                    field: "product_name",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        trigger: "enter",
                    },
                },
                {
                    label: "Customer Name",
                    field: "name",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        trigger: "enter",
                    },
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
                        trigger: "enter",
                    },
                },
                {
                    label: "Payment Method",
                    field: "payment_method",
                    sortable: true,
                    width: "150px",
                    filterable: true,
                    filterOptions: {
                        enabled: true,
                        placeholder: "Filter",
                        trigger: "enter",
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
                    field: "",
                    type: "desc",
                },
                page: 1,
                perPage: 2,
            },
            pagination: {},
            selected: {
                keywords: ''
            },
            openTab: ''
        }
    },
    created() {
        this.getRecords();
    },
    methods: {
        toggleTabs(tabNumber) {
            this.openTab = tabNumber;
            // if (this.openTab == 0) {
            //     this.openTab = tabNumber;
            // } else {

            // }
        },
        getRecords(){
            axios.get(`/api/dashboard?page=${this.serverParams.page}`,
            {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token')
                }
            })
            .then((response) => {
                this.loading = false;
                this.index_statistic = response.data.index_statistic;
                this.page_title = response.data.page_title;
                this.summary_table = response.data.summary_table;
                this.totalRecords = response.data.summary_table.total;
                this.rows = response.data.summary_table.data;
                console.log(response);
                console.log(this.serverParams);
            })
            .catch((error) => {
                console.log('woooo...'+error);
            });
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
        goToAddData() {
            // this.$router.push({
            //     name: "add-page",
            //     params: {
            //     id: this.id,
            //     },
            // });
        },
        exportExcel() {
            // this.unduhData = true;
            // this.loading = true;
            // let param;
            // if (this.role === "desa") {
            //     param = this.desa_id;
            // } else if (this.role === "admin") {
            //     param = this.id;
            // }
            // axios
            // .get("/api/export-umkm-desa/" + param, {
            //     responseType: "blob",
            // })
            // .then((response) => {
            //     this.unduhData = false;
            //     this.loading = false;
            //     const url = window.URL.createObjectURL(new Blob([response.data]));
            //     const link = document.createElement("a");
            //     link.href = url;
            //     link.setAttribute("download", "umkm-desa-" + param + ".xlsx");
            //     document.body.appendChild(link);
            //     link.click();
            //     console.log(response.data);
            //     console.log("success download excel");
            // })
            // .catch((error) => {
            //     console.log(error);
            // });
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
            // this.$set(this.columns[foundIndex].filterOptions, 'filterValue', value);
            this.updateParams(params);
            this.getRecords();
        }
       
    },
}
</script>

<style scoped>
.vgt-input, .vgt-select {
    width: 30%;
    height: 32px;
    line-height: 1;
    display: block;
    font-size: 14px;
    font-weight: 400;
    padding: 6px 12px;
    color: #606266;
    border-radius: 4px;
    box-sizing: border-box;
    background-image: none;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
}
/* The hack for Safari */
.h-screen {
    height: 100vh;
    height: -webkit-fill-available;
}
.min-h-screen {
    min-height: 100vh;
    min-height: -webkit-fill-available;
}
.max-h-screen {
    max-height: 100vh;
    max-height: -webkit-fill-available;
}
</style>