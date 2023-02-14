<template>
	<view class="me">
		<uni-nav-bar :shadow="true" backState="2000" fontColor="#FFF" type="transparent">
			<view class="icon-setup" slot="left">
				<image class="setting" src="@/static/setup.png" mode="aspectFit"
					@tap="gotoLink('/subpages/setting/setting')" />
			</view>
		</uni-nav-bar>
		
		<uni-nav-bar backState="1000" :titleCenter="false" v-if="navBarShow">
			<view class="icon-setup" slot="left">
				<image class="setting" src="@/static/setup_b.png" mode="aspectFit"
					@tap="gotoLink('/subpages/setting/setting')" />
			</view>
		</uni-nav-bar>
		
		<!-- 页面区域 允许滚动 -->
		<view class="page-item">
			<!-- 用户信息卡片 -->
			<view class="user-info">
				<image class="hbg" src="@/static/hbg.png" mode="aspectFit" />
				<image class="user-info-content" src="@/static/ubg.png" mode="aspectFit" />
				<view class="user-content" @tap="checkLogin">
					<view class="user-imgbox">
						<view class="user-img">
							<u-avatar :src="userInfo.avatarUrl"></u-avatar>
						</view>
					</view>
					<view class="user-text">
						<text class="user-name">{{userInfo.username}}</text>
						<view class="user-brief">
							{{bio ? bio : '这个人有点懒，什么都没留下'}}
						</view>
					</view>
				</view>
				<!-- 下面的半圆导航 -->
				<view class="view-circle" />
		
		
				<view class="user-tabs">
					<view class="tab-item left" @tap="gotoLink('/subpages/setting/setting')">
						<image class="tab-svg" src="@/static/setup_b.png" mode="aspectFit" />
						<text class="tab-name">个人设置</text>
					</view>
					<view class="tab-item" @tap="viewMsg">
						<image class="tab-svg" src="@/static/bell.png" mode="aspectFit" />
						<text class="tab-name">我的消息</text>
						<text class="badges right" v-if="loginState">{{ userInfo.liked + userInfo.commented }}</text>
					</view>
				</view>
				
				<!-- 内容轮播展示 -->						
		</view>
			<view class="page-item sns-now">
				<view class="feeds-box">
					<view class="feed-one" v-for="item in screenInfo" :key="item.id">
						<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?id=' + item.id">
							<image class="feed-img" :src="item.imgsrc" mode="widthFix" :lazy-load="true" />
							<view class="feed-info">
								<view class="iview">
									<text class="name u-line-1">{{ item.name }}</text>
								</view>
								<view class="iview">
									<view class="ilike" @tap.stop="checkLove(item)">
										<image v-if="getUser_check().includes(item.id)" src="@/static/lover.png" class="micon" />
										<image v-else src="@/static/love.png" class="micon" />
										<text class="love-count" v-if="item.like_count>0">{{ item.like_count }}</text>
									</view>
								</view>
							</view>
						</navigator>
					</view>
				</view>
			</view>
		</view>
		<login ref="login"/>
	</view>
</template>

<script>
	import {getIntroduce,changeUserCheck,Collection} from '@/common/http.api.js';
	import {
		mapState,
		mapActions,
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				// 是否显示 navbar
				navBarShow: false,
				//判断用户是否第一次进入页面
				cheshi:false,
				//瀑布流高度设置
				swpierHight:'',
				usercheck:[]
			}
		},
		onPageScroll(event){
			//navBar显示隐藏
			if(event.scrollTop > 100){
				this.navBarShow = true
			}else{
				this.navBarShow = false
			}
		},
		onLoad(){
			//获取瀑布流数据
			this.getIntroduceInfo()
			// this.usercheck = this.getUser_check()
		},
		onShow(){
			this.usercheck = this.getUser_check()
		},
		computed:{
			...mapState(['userInfo','loginState','Introduce']),
			screenInfo(){
				let data = this.Introduce.filter(item=>this.usercheck.includes(item.id))
				return data
			}
		},
		methods:{
			...mapActions(['getIntroduceInfo','changeCheck']),
			...mapGetters(['getUser_check']),
			...mapMutations(['CHANGELIKE_COUNT']),
			// 用户跳转页面
			gotoLink(url){
				uni.navigateTo({
					url,
				})
			},
			// 收藏操作
			checkLove(item){
				let checknumber = this.usercheck.indexOf(item.id)
				if(checknumber >= 0){
					// console.log('已收藏')
					this.usercheck.splice(checknumber,1)
				}else{
					// console.log('未收藏')
					this.usercheck.push(item.id)
				}
				this.CHANGELIKE_COUNT({
					item,
					checknumber
				})
				Collection({
					id:item.id,
					checknumber
				})
				let newObj = {
					user_check:this.usercheck.join(','),
					appid:this.userInfo.appid
				}
				changeUserCheck(newObj).then(res=>{
					this.changeCheck(newObj.user_check)
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	// 顶部设置按钮
	.icon-setup {
		padding-left: 50upx;
		display: flex;
		justify-content: center;
		align-items: center;

		.setting {
			width: 44upx;
			height: 44upx;
		}

		.nav-text {
			color: #111;
			margin-left: 10upx;
		}
	}

	.page-item {
		width: 750upx;
		overflow-x: hidden;
	}

	// 用户信息
	.user-info {
		position: relative;
		z-index: 1;
		display: flex;
		justify-content: center;
		width: 750upx;
		height: 708upx;
		background: linear-gradient(to top, #1d293c, #25354b);

		.hbg {
			position: absolute;
			width: 300upx;
			height: 300upx;
			top: 0;
			left: 0;
			z-index: 3;
		}

		.user-info-content {
			position: absolute;
			width: 620upx;
			height: 568upx;
			bottom: 0;
			z-index: 4;
		}

		.user-content {
			position: absolute;
			width: 620upx;
			height: 568upx;
			bottom: 0;
			z-index: 5;
			background-size: cover;
			border: none;
			border-radius: 20upx 20upx 0 0;
			font-size: 28upx;
			padding: 0;
			text-align: center;
			line-height: 40upx;
			font-weight: normal;
			font-style: normal;

			.user-text {
				text-align: left;
				width: 560upx;
				height: 180upx;
				position: absolute;
				top: 180upx;
				left: 50upx;
				z-index: 99;

				.user-name {
					font-weight: 400;
					font-size: 40upx;
					color: #001432;
					font-style: normal;
					letter-spacing: 0;
					line-height: 60upx;
					padding-bottom: 12upx;
				}

				.user-brief {
					width: 550upx;
					font-weight: 400;
					font-size: 24upx;
					color: #757474;
					font-style: normal;
					line-height: 36upx;
				}
			}

			.user-imgbox {
				height: 118upx;
				margin-top: 70upx;
				margin-bottom: 80upx;

				.user-img {
					width: 118upx;
					height: 118upx;
					margin-left: 30upx;
					overflow: hidden;
					border-radius: 30upx;

					image {
						width: 118upx;
						height: 118upx;
					}
				}
			}
		}

		.view-circle {
			overflow: hidden;
			border-width: 0;
			border-style: solid;
			position: absolute;
			z-index: 9;
			width: 750upx;
			height: 300upx;
			background: url(@/static/half-circle.png) no-repeat center;
			background-size: cover;
			bottom: 0;

			.view-circle-bg {
				width: 750upx;
				height: 100%;
			}
		}

		.user-tabs {
			position: absolute;
			height: 120upx;
			width: 610upx;
			display: flex;
			z-index: 11;
			bottom: 120upx;
			left: 90upx;

			.tab-item {
				width: 284upx;
				height: 112upx;
				background-color: rgba(0, 20, 50, 0.04);
				border-radius: 8upx;
				display: flex;
				justify-content: center;
				align-items: center;

				.badges {
					position: absolute;
					bottom: 70upx;
					right: 215upx;
					background-color: #f73c52;
					height: 36upx;
					line-height: 36upx;
					border-radius: 18upx;
					padding: 0 14upx;
					margin-left: 20upx;
					color: #ffffff;
					font-size: 20upx;

					&.left {
						right: 510upx;
					}
				}

				.tab-svg {
					width: 40upx;
					height: 40upx;
					margin-right: 20upx;
				}

				.tab-name {
					font-size: 32upx;
					color: #001432;
					font-style: normal;
					letter-spacing: 0px;
					line-height: 20px;
					margin-left: 10upx;

					&.left {
						margin-right: 10upx;
					}
				}

				&.left {
					margin-right: 10upx;
				}
			}
		}
	}

	.sns-now {
		// 动态相关瀑布流样式
		.feeds-box {
			width: 735upx;
			column-count: 2; /*css3新增，把contaner容器中的内容分为三列*/
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
