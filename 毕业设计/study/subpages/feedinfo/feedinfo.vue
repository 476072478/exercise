<template>
	<view>
		<!-- 顶部毛玻璃背景图 -->
		<view class="picblur">
			<pic-blur v-if="infoimgsrc.length !== 0" :params="{
			        width:'750rpx',
			        height:'520rpx',
			        image: infoimgsrc[0].imgsrc,
			        blur:'xs'
			    }"></pic-blur>
		</view>
		<view class="model">
			<!-- 标题 -->
			<view class="mtitle">{{infolist.name}}</view>
			<view class="info-user">
				<view class="info">
					<view class="infotext">{{ infolist.detailText }}</view>
					<text>{{ infolist.bigname }}</text>
					<text>{{ infolist.position }}</text>
				</view>
			</view>
		</view>
		<view class="myimg">
			<view v-for="(item,index) in infoimgsrc" v-if='index !== 0' >
				<image :src="item.imgsrc" alt="" class="viewimg">
			</view>
		</view>
		<comment :oneInfo='infocomment' :outcommentlength = 'outcommentlength' :postid='post_id' @updateinfocomment='updateinfocomment'></comment>
	</view>
</template>

<script>
	import {getfeedinfo} from '@/common/http.api.js'
	// 引入毛玻璃组件
	import picBlur from "@/components/pic-blur/pic-blur.vue";
	//引入评论组件
	import comment from '@/components/comment.vue'
	export default {
		data() {
			return {
				//景区介绍
				infolist:[],
				//景区评论
				infocomment:[],
				//景区图片
				infoimgsrc:[],
				//除开评论区的高度
				outcommentlength:0,
				//景区id，
				post_id:Number,
			}
		},
		onLoad(params){
			this.post_id = params.id
			getfeedinfo(params.id).then(res=>{
				this.infolist = res.data[0]
				this.infocomment = res.data[1]
				this.infoimgsrc = res.data[2]
			})
		},
		onShow(){
			setTimeout(()=>{
				const query = uni.createSelectorQuery().in(this);
				var mylength = 0
				query.select('.picblur').boundingClientRect(data => {
					mylength += data.height
				}).select('.model').boundingClientRect(data => {
					mylength += data.height
				}).select('.myimg').boundingClientRect(data=> {
					mylength += data.height
					this.outcommentlength = mylength
				}).exec()
			},300)
		},
		components:{
			comment,
			picBlur,
		},
		methods: {
			addcheck(){
				
			},
			updateinfocomment(){
				this.infocomment = []
				getfeedinfo(this.post_id).then(res=>
					this.infocomment = res.data[1]
				)
			},
		}
	}
</script>
<style lang="scss" scoped>
	.hicon {
		height: 36upx;
		width: 36upx;
		padding-left: 30upx;
		padding-top: 10upx;
	}

	.model {
		width: 750upx;
		height: 520upx;
		position: absolute;
		background-color: rgba($color: #364161, $alpha: 0.2);
		z-index: 1;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		flex-wrap: nowrap;
		justify-content: flex-end;

		.mtitle {
			margin-top: 20upx;
			width: 700upx;
			margin-left: 25upx;
			font-size: 44upx;
			color: #fff;
			line-height: 64upx;
		}


		.info-user {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: flex-start;
			align-items: center;
			align-content: center;
			margin-top: 30upx;
			margin-left: 5upx;
			margin-bottom: 30upx;

			.info {
				display: flex;
				flex-direction: column;
				flex-wrap: wrap;
				justify-content: flex-end;
				align-items: left;
				margin-left: 20upx;
				font-size: 24upx;
				font-weight: bolder;
				color: #fff;
				.infotext{
					font-size: 15px;
					margin-bottom: 20px;
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
				}
			}
		}
	}


	.info-content {
		width: 680upx;
		text-align: left;
		margin-top: 40upx;
		// #ifdef MP-WEIXIN
		margin-left: 35upx;
		// #endif
		// #ifndef MP-WEIXIN
		margin-left: 0;
		// #endif
	}

	.info-header {
		margin-top: 10upx;
		margin-left: 25upx;
		padding-bottom: 20upx;
		color: #999;
		font-size: 22upx;

		.send {
			margin-right: 20upx;
		}
	}

	.line {
		height: 30upx;
		width: 750upx;
		background-color: #f3f3f3;
	}
	.myimg{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 5rpx 0;
		.viewimg{
			width: 650rpx;
			height: 400upx;
			padding: 15rpx 0;
		}
	}
	
</style>
