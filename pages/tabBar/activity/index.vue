<template>
	<view class="activity">
		热门活动
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
