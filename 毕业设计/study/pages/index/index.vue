<template>
	<view>
		<login ref="login" />
		<!-- 顶部导航 -->
		<uni-nav-bar v-if="navBarShowTag">
			<view class="tabs-box">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">资讯</view>
			</view>
		</uni-nav-bar>
		<view class="header-box">
			<!-- 顶部广告位轮播图 -->
			<swiper class="swiper" :indicator-dots="false" :autoplay="true" :interval="2500" :duration="500" circular='true'>
				<swiper-item v-for="item in swiperAdlist" :key="item.id">
					<navigator open-type="navigate" :url=" '/pages/webview/webview?urls=' + encodeURI('http://baidu.com')">
						<image class="banner-swiper-img" :src="item.imgSrc" mode="aspectFill" />
					</navigator>	
				</swiper-item>				
			</swiper>
			<!-- 遮罩使用弧形框 -->
			<image class="crile" src="@/static/crile.png" mode="aspectFill" />
			<!-- 两个选项按钮 -->
			<view class="card-header">
				<view class="card-one card-left" @tap="gotoSearch('/subpages/search/search')">
					<image class="img" src="@/static/coffee.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">查询景区</view>
					</view>
				</view>
				<view class="card-one card-right" @tap="gotoSearch('/subpages/recommend/recommend')">
					<image class="img" src="@/static/ran.png" mode="aspectFill" />
					<view class="iright">
						<view class="title">线路推荐</view>
					</view>
				</view>
			</view>
		
			<!-- Tab 选项卡 -->
			<view class="tabs-box">
				<view class="one-nav" :class="currentSwiperIndex === 0 ? 'nav-actived' : '' " @tap="swiperChange(0)">推荐</view>
				<view class="one-nav" :class="currentSwiperIndex === 1 ? 'nav-actived' : '' " @tap="swiperChange(1)">讨论</view>
			</view>
		</view>
		<!-- 内容轮播展示 -->
		<swiper class="swiper-box" :style="{height:swpierHight}" :current="currentSwiperIndex" @change='monitorswiper'>
			<swiper-item class="swiper-item sns-now">
				<view class="page-item sns-now">
					<view class="feeds-box" :style="{height:swpierHight}">
						<view class="feed-one" v-for="item in Introduce" :key="item.id">
							<navigator open-type="navigate" :url=" '/subpages/feedinfo/feedinfo?id=' + item.id">
								<image class="feed-img" :src="item.imgsrc" mode="widthFix" :lazy-load="true" />
								<view class="feed-info">
									<view class="iview">
										<text class="name u-line-1">{{ item.name }}</text>
									</view>
									<view class="iview">
										<view class="ilike" @tap.stop="checkLove(item)">
											<image v-if="usercheck.includes(item.id)" src="@/static/lover.png" class="micon" />
											<image v-else src="@/static/love.png" class="micon" />
											<text class="love-count" v-if="item.like_count>0">{{ item.like_count }}</text>
										</view>
									</view>
								</view>
							</navigator>
						</view>
					</view>
				</view>
			</swiper-item>		
			<swiper-item class="swiper-item sns-news" >
				<view :style="{height:newsHeight}">
					<view v-for="(item, index) in Introduce" :key="index">
						<navigator class="one-new" open-type="navigate" :url=" '/subpages/newinfo/newinfo?id=' + item.id">
							<view class="left">
								<view class="title u-line-2">{{item.text}}</view>
								<view class="uinfo">
									<view class="iview">
										<view class="utime">
											<text class="name">{{ item.name }}</text>
										</view>
									</view>
								</view>
							</view>
							<view class="right">
								<image class="pic" mode="aspectFill" :src="item.imgsrc" />
							</view>
						</navigator>
					</view>
				</view>
			</swiper-item>		
		</swiper>
		
	</view>
</template>

<script>
	import {getAdvert,getIntroduce,changeUserCheck,Collection} from '@/common/http.api.js'
	import {
		mapState,
		mapGetters,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				//轮播图广告列表
				swiperAdlist:[],
				//推荐咨询滑动位置
				currentSwiperIndex:0,
				// 动态列表数据
				introducelist:[],
				//讨论列表数据
				News:[],
				// 滑动页面轮播器高度
				swpierHight:'',
				//是否第一次进入当前页面
				cheshi:false,
				//	推荐列表高度
				newsHeight:'',
				// 讨论列表高度
				oldHeight:'',
				// NavBar显示状态
				navBarShowTag:false,
				//记录推荐滚动的位置
				scrollrecommend:0,
				//记录讨论滚动的位置
				scrolldiscuss:0,
				//用户收藏数据
				usercheck:[]
			};
		},
		computed:{
			...mapState(['userInfo','Introduce'])
		},
		onLoad(){
			//获取轮播图数据
			getAdvert().then(res=>this.swiperAdlist = res.data)
			//获取动态瀑布流信息
			this.getIntroduceInfo()
			//获取咨询列表信息
			// getNews().then(res=>this.News = res.data)
		},
		onShow(){
			this.myref(),
			this.usercheck = this.getUser_check()
		},
		onPageScroll(event){
			//在推荐列表中
			if(this.currentSwiperIndex === 0){
				this.scrollrecommend = event.scrollTop
			}else{
				this.scrolldiscuss = event.scrollTop
			}
			if(event.scrollTop>220){
				this.navBarShowTag = true
			}else{
				this.navBarShowTag = false
			}
		},
		onPullDownRefresh(){
			this.introducelist = [],
			getAdvert().then(res=>{this.swiperAdlist = res.data})
			if(this.currentSwiperIndex === 0){
				getIntroduce().then(res=>this.introducelist = res.data)
			}else{
				getIntroduce().then(res=>this.introducelist = res.data)
			}
		},
		methods:{
			...mapGetters(['getUser_check']),
			...mapActions(['changeCheck','getIntroduceInfo']),
			...mapMutations(['CHANGELIKE_COUNT']),
			gotoFeeds(urls){
				uni.switchTab({
					url:urls
				})
			},
			gotoSearch(urls){
				uni.navigateTo({
					url:urls
				})
			},
			swiperChange(number){
				this.currentSwiperIndex = number
			},
			myref(){
				if(!this.cheshi){
					this.cheshi = true
					setTimeout(()=>{
						wx.createSelectorQuery()
						.select('.feeds-box')
						.boundingClientRect((rect)=> {
						  this.$nextTick(()=>{
							  // console.log(rect.height);// 这里包含内容 的宽高
							  this.swpierHight = rect.height/2.4 + 'px'
								this.oldHeight = this.swpierHight
						  })
						})
						.exec();
					},300)
				}else{
					// console.log('已经有高度了')
				}
			},
			monitorswiper(index){
				this.currentSwiperIndex = index.detail.current
				if(index.detail.current === 1){
					//调整讨论页面高度
					this.newsHeight = (this.introducelist.length * 100 + 100) + 'px'
					this.swpierHight = this.newsHeight
					//调整讨论页面滚动高度
					uni.pageScrollTo({
						duration:0,
						scrollTop:this.scrolldiscuss,
					})
				}else{
					//调整推荐页面高度
					this.swpierHight = this.oldHeight
					//调整推荐页面滚动高度
					uni.pageScrollTo({
						duration:0,
						scrollTop:this.scrollrecommend,
					})
				}
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
		}
	}
</script>

<style lang="scss" scoped>
	#sns {
		background-color: #f1f1f1;
	}

	// 推荐、咨询 按钮样式
	.tabs-box {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 750upx;
		.one-nav {
			width: 120upx;
			color: #9B9B9B;
			font-size: 36upx;
			text-align: center;
			font-weight: blod;

			&.nav-actived {
				color: #0050FF;
			}
		}
	}

	.header-box {
		position: relative;
		left: 0;
		height: 500upx;
		background-color: #f1f1f1;
		z-index: 1;

		// 广告位轮播器相关样式
		.swiper {
			width: 750upx;
			height: 400upx;
			position: absolute;
			left: 0;
			top: 0;
			text-align: center;
			z-index: 1;

			.banner-swiper-img {
				width: 750upx;
				height: 400upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
			}
		}

		.crile {
			width: 750upx;
			height: 50upx;
			position: absolute;
			left: 0;
			top: 355upx;
			z-index: 9;
		}

		// 新鲜事 活动墙 按钮样式
		.card-header {
			position: absolute;
			left: 0;
			top: 320upx;
			height: 160upx;
			z-index: 99;
			width: 710upx;
			margin-left: 20upx;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;

			.card-one {
				width: 328upx;
				height: 96upx;
				border-radius: 49upx;
				background-color: #fff;
				margin: 0 10upx;
				box-shadow: 0 0 2px 0 rgb(188, 188, 188);
				display: flex;
				flex-direction: row;
				flex-wrap: wrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;

				.img {
					width: 44upx;
					height: 44upx;
					margin-left: 50upx;
				}

				.iright {
					margin-left: 30upx;
					text-align: left;
					color: #888;

					.title {
						font-size: 30upx;
						color: #001432;
					}

					.iview {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: space-between;
						align-items: center;
						align-content: center;
						font-size: 20upx;
						margin-top: -5upx;
					}
				}
			}
		}

		// 推荐、咨询 按钮样式
		.tabs-box {
			width: 750upx;
			position: absolute;
			z-index: 1;
			left: 0;
			top: 480upx;
			display: flex;
			flex-direction: row;
			justify-content: center;

			.one-nav {
				height: 80upx;
				width: 110upx;
				color: #9B9B9B;
				font-size: 36upx;
				text-align: center;
				font-weight: blod;

				&.nav-actived {
					color: #0050FF;
				}
			}
		}
	}

	// 此刻 栏目样式\
	.swiper-box {
		background-color: #f1f1f1;
		padding: 60upx 0 40upx;
	}

	.sns-now {
		// 动态相关瀑布流样式
		.feeds-box {
			width: 735upx;
			margin-left: 13upx;
			padding-bottom: 20upx;
			display: flex;
			flex-wrap: wrap;
			flex-direction: column;
			.feed-one {
				width: calc(100% / 2 - 20rpx);
				margin: 10upx;
				background-color: #FFF;
				border-radius: 20upx;
				position: relative;
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

	// 轮播页面 资讯
	.sns-news {
		background-color: #fff;
		width: 750upx;

		.one-new {
			width: 700upx;
			height: 74px;
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: flex-start;
			align-content: center;
			padding-bottom: 10px;
			padding-top: 10px;
			padding-left: 25upx;
			padding-right: 25upx;
			border-bottom: 1px solid #f1f1f1;

			.left {
				width: 490upx;
				height: 140upx;
				text-align: left;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				align-items: flex-start;

				.title {
					font-size: 30upx;
					line-height: 42upx;
					color: #001432;
					margin-top: 21upx;
				}

				.uinfo {
					width: 490upx;
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 6upx;
					font-size: 20upx;
					color: #999;

					.utime {
						font-size: 24upx;

						.name {
							max-width: 120upx;
							color: #777;
						}
					}
				}
			}

			.right {
				width: 120upx;

				.pic {
					width: 120upx;
					height: 120upx;
					margin-top: 20upx;
					border-radius: 6upx;
				}
			}
		}
	}
</style>

