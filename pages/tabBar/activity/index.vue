<template>
	<view class="activity">
		{{adData.A1.name}}
	</view>
</template>

<script>
	import {mapGetters} from 'vuex'
	
	export default {
		 
		 computed:{
			 ...mapGetters(['adData'])
		 }
		
	}
	
</script>

<style>
</style>
