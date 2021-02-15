<template>
	<div id="app-vue" class="app-vue">
		<Navbar />
		<router-view></router-view>
		<Sidebar />
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
  
}
</script>