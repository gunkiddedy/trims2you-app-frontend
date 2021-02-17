<template>
	<div id="app-vue" class="app-vue">
		<div v-if="!isLoginPage">
			<Navbar />
		</div>
		<router-view></router-view>
		<div v-if="!isLoginPage">
			<Sidebar />
		</div>
		<span hidden> {{ checkRoute }} </span>
  	</div>
</template>

<script>
// @ is an alias to /src
import Sidebar from '@/components/Sidebar.vue';
import Navbar from '@/components/Navbar.vue';

export default {
	components: {
		Sidebar,
		Navbar
	},
	data() {
		return {
			isLoginPage: false,
		}
	},
	computed: {
		checkRoute(){
			if(this.$route.name =='Login'){
				this.isLoginPage = true;
			}else{
				this.isLoginPage = false;
			}
		}
	},
}
</script>