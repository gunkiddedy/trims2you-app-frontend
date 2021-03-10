<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">
        <!-- WAREHOUSE-->
        <div v-if="userRole == '4'" class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <!-- TABS WRAPER-->
            <div class="tab-wraper bg-white">
                <!-- NAV TAB -->
                <ul class="flex border-b border-gray-300 font-bold py-3">
                    <li 
                        v-for="(item, i) in sub_menus"
                        :key="i"
                        class="mx-2">
                        <a 
                            class="inline-block py-2 px-4 text-gray-500 font-semibold  hover:text-blue-300" href="#" v-on:click="toggleTabs(i)" 
                            :class="{
                                'text-gray-600': openTab !== i, 
                                'text-blue-500 border-b-2 border-blue-500': openTab === i,
                            }
                        ">
                            {{item}}
                        </a>
                    </li>
                </ul>
                <!-- DASHBOARD -->
                <div v-if="openTab == 0" class="dashboard-container">
                    <Dashboard />
                </div>
                <!-- INCOMING PRODUCT -->
                <div v-if="openTab == 1" class="ip-container">
                    <IncomingProduct />
                </div>
                <!-- OUTGOING PRODUCT -->
                <div v-if="openTab == 2" class="op-container">
                    <OutgoingProduct />
                </div>
                <!-- RETUR PRODUCT-->
                <div v-if="openTab == 3" class="rp-container">
                    <ReturProduct />
                </div>
                <!-- WAREHOUSE INCOME -->
                <div v-if="openTab == 4" class="wi-container">
                    <WarehouseIncome />
                </div>
            </div><!-- TABS WRAPER-->
        </div>
        <!-- RESELLER -->
        <div v-if="userRole == '3'" class="main-content pl-16 pt-4 bg-indigo-50 lg:h-screen h-full">
            <div class="wraper bg-white">
                <DashboardReseller />
            </div>
        </div>
    </main>
</template>

<script>
import Dashboard from '@/components/warehouse/Dashboard'
import OutgoingProduct from '@/components/warehouse/OutgoingProduct'
import IncomingProduct from '@/components/warehouse/IncomingProduct'
import ReturProduct from '@/components/warehouse/ReturProduct'
import WarehouseIncome from '@/components/warehouse/WarehouseIncome'
import DashboardReseller from '@/components/reseller/Dashboard'
export default {
    components: {
        DashboardReseller,
        Dashboard,
        OutgoingProduct,
        IncomingProduct,
        ReturProduct,
        WarehouseIncome
    },
    data() {
        return {
            openTab: 0,
            sub_menus: [
                'Dashboard',
                'Incoming Product',
                'Outgoing Product',
                'Retur Product',
                'Warehouse Income'
            ],
            userRole: '',
            userName: '',
        }
    },
    mounted(){
        this.userRole = localStorage.userRole;
        // console.log(localStorage.userRole + localStorage.userName);
    },
    methods: {
        toggleTabs(tabNumber) {
            this.openTab = tabNumber;
        },
    },
}
</script>

<style scoped>
</style>