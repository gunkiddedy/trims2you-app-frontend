<template>
    <main class="pt-16 sm:pl-28 dashboard-wrape">

        <!-- MAIN CONTENT -->
        <div class="main-content p-4 bg-indigo-50 lg:h-screen h-full">

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

        </div><!-- MAIN CONTENT -->
        
    </main>
</template>

<script>
import Dashboard from '@/components/warehouse/Dashboard'
import OutgoingProduct from '@/components/warehouse/OutgoingProduct'
import IncomingProduct from '@/components/warehouse/IncomingProduct'
import ReturProduct from '@/components/warehouse/ReturProduct'
import WarehouseIncome from '@/components/warehouse/WarehouseIncome'
export default {
    components: {
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
        }
    },
    mounted(){
        console.log(localStorage.userRole);
    },
    methods: {
        toggleTabs(tabNumber) {
            this.openTab = tabNumber;
        },
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
</style>