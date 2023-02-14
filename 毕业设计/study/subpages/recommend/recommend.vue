<template>
	<view class="recommendview">
		<view class="page-item sns-now">
			<view class="feeds-box">
				<view class="feed-one" v-for="item in introduceInfo" :key="item.id">
					<navigator open-type="navigate" :url=" '/subpages/map/map?id=' + item.Id">
						<image class="feed-img" :src="item.imgsrc" mode="widthFix" :lazy-load="true" />
						<view class="feed-info">
							<view class="iview">
								<text class="name u-line-1">{{ item.name }}</text>
							</view>
							<view class="iview">
								<view class="ilike" @tap.stop="checkLove(item)">
									<image v-if="true" src="@/static/lover.png" class="micon" />
									<image v-else src="@/static/love.png" class="micon" />
									<text class="love-count" v-if="item.id>0">{{ item.id }}</text>
								</view>
							</view>
						</view>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getrecommend} from '@/common/http.api.js'
	export default {
		data() {
			return {
				introduceInfo:[]
			};
		},
		onLoad(){
			getrecommend().then(res=>{
				this.introduceInfo = res.data
			})
		}
	}
</script>

<style lang="scss">
	.recommendview{
		background: linear-gradient(to top, #1d293c, #25354b);
		height: 100vh;
	}
	.page-item {
		width: 750upx;
		overflow-x: hidden;
	}
	.sns-now {
		// 动态相关瀑布流样式
		.feeds-box {
			width: 735upx;
			margin: 10px 0;
			// column-count: 2; /*css3新增，把contaner容器中的内容分为三列*/
			display: flex;
			flex-wrap: wrap;
			.feed-one{
				width:345upx;
				margin: 10upx;
				background-color: #FFF;
				border-radius: 20upx;
				position: relative;
				-webkit-column-break-inside: avoid;
				break-inside: avoid;
				counter-increment: item-counter;
				.feed-img {
					width: 100%;
					height: 300upx;
					border-radius: 10upx;
				}
	
				.feed-title {
					width: 350upx;
					margin-top: 15upx;
					margin-left: 10upx;
					font-size: 28upx;
					line-height: 40upx;
					color: #001432;
					text-align: left;
				}
	
				.feed-info {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 10upx;
					font-size: 20upx;
					color: #666;
					padding: 0 10upx 16upx;
	
					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: nowrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;
	
						.ilike {
							display: flex;
							flex-direction: row;
							flex-wrap: nowrap;
							justify-content: space-between;
							align-items: center;
							align-content: center;
							height: 60upx;
							padding: 0 10upx;
							background-color: #FFFFFF;
						}
					}
	
					.avatar {
						margin-right: 10upx;
						height: 40upx;
						width: 40upx;
						border-radius: 50%;
						border: 1upx solid #eee;
					}
	
					.name {
						max-width: 120upx;
						color: #757474;
					}
	
					.micon {
						width: 32upx;
						height: 28upx;
					}
	
					.love-count {
						padding-left: 10upx;
						color: #757474;
					}
				}
			}
		}
	}
</style>
