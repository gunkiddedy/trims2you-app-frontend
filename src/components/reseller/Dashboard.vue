<template>
    <div>
        <!-- index_statistic -->
        <div class="index_statistic grid lg:grid-cols-4 md:grid-cols-3 gap-4 pb-4 sm:grid-cols-2 xs:grid-cols-1 px-4 py-8">
            <!-- <div 
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
            </div> -->
            {{userName}}
        </div><!-- index_statistic -->

    </div>
</template>

<script>
export default {
    data(){
        return {
            index_statistic: '',
            userName: ''
        }
    },
    mounted(){
        this.userName = localStorage.userName;
    },
    methods: {

    }
}
</script>

<style scoped>

</style>