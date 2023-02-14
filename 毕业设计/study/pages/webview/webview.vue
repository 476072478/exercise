<template>
	<view>
		<web-view :src="urls"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urls:''
			};
		},
		onLoad(options){
			this.urls = decodeURI(options.urls)
		}
	}
</script>

<style lang="scss">

</style>
