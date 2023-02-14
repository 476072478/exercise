<template>
	<view class="rfeeds">
		<view class="one-feeds-box" v-for="(item,i) in modify " :key="item.id">
			<view v-for=" (item, k) in item " :key="item.id" class="one-feed" :class="k % 6 == 0 ? ( i%2==0 ? 'feed-big-left' :'feed-big-right' ) : '' ">
				<navigator :url=" '/subpages/feedinfo/feedinfo?id=' + item.spot_id">
					<image :src="item.imgsrc" class="feed-content" mode="aspectFill" :lazy-load="true" />
				</navigator>
			</view>
		</view>
		<login ref="login"/>
	</view>
</template>
<script>
	import {getAllimg} from '@/common/http.api.js'
	export default {
		data() {
			return {
				allimg:[],
				modify:[]
			};
		},
		onLoad(){
			this.getimg()
		},
		methods:{
			getimg(){
				getAllimg().then(res=> {
					this.allimg = res.data
					this.setimg()
				})
			},
			setimg(){
				let newdata = this.allimg
				let length = newdata.length
				while(length){
					let randomIndex = Math.floor(Math.random()* length --)
					let temp = newdata[randomIndex]
					newdata[randomIndex] = newdata[length]
					newdata[length] = temp
				}
				let newmodify = []
				for(let i = 0 ; i < newdata.length; i++){
					if(i%6 === 0 && newdata[i+5]){
						newmodify.push(newdata.slice(i,i+6))
					}
				}
				this.modify = newmodify
			}
		}
	}
</script>

<style lang="scss" scoped>
	.rfeeds {
		background-color: #FFFFFF;
		padding-bottom: 20upx;

		.one-feeds-box {
			width: 704upx;
			margin: 4upx 22upx 0 22upx;
			// 定义栅格布局
			display: grid;
			// 定义栅格每一列的宽度
			grid-template-columns: 232upx 232upx 232upx;
			// 定义栅格每一行的高度
			grid-template-rows: 232upx 232upx 232upx;
			// grid-row-gap属性设置行与行的间隔（行间距），grid-column-gap属性设置列与列的间隔（列间距）
			grid-row-gap: 4upx;
			grid-column-gap: 4upx;
			background-color: #DADADA;

			.one-feed {
				position: relative;

				.feed-content {
					width: 232upx;
					height: 232upx;
					border: 1px solid #EEEEEE;
					border-radius: 4upx;
				}

				.icon {
					position: absolute;
					right: 10upx;
					top: 10upx;

					.play-icon {
						width: 40upx;
						height: 40upx;
					}
				}

				&.feed-big-left {
					grid-column-start: 1;
					grid-column-end: 3;
					grid-row-start: 1;
					grid-row-end: 3;
					background-color: #DADADA;

					.feed-content {
						width: 466upx;
						height: 466upx;
						border: 1px solid #EEEEEE;
					}
				}

				&.feed-big-right {
					grid-column-start: 2;
					grid-column-end: 4;
					grid-row-start: 1;
					grid-row-end: 3;
					background-color: #DADADA;

					.feed-content {
						width: 466upx;
						height: 466upx;
						border: 1px solid #EEEEEE;
					}
				}
			}
		}
	}
</style>
