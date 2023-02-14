<template>
	<view>
		<!-- 评论列表 -->
		<view class="comments">
			<view class="title gohere" id="gohere">最新评论</view>
			<view class="no-comment" v-if="oneInfo.length == 0">暂无评论</view>
			<view v-for="(commentItem, index) in oneInfo" :key="index" class="one-comment">
				<!-- 一级评论相关 -->
				<view class="commenter">
					<view class="info">
						<view class="left">
							<u-avatar size="25" class="avatar" :src="!!commentItem.user.avatar ? commentItem.user.avatar.url : '' " />
							<view class="name">{{ commentItem.username }}</view>
						</view>
					</view>
					<view class="content">{{ commentItem.usertext }}</view>
					<view class="uptime">{{ computed_time(commentItem.comment_time) }} 评论</view>
				</view>
			</view>
		</view>

		<!-- 底部信息 -->
		<view class="tab-bar">
			<view class="minput" @tap="openComment">说点什么···</view>
			<view class="mview">
				<!-- 收藏相关统计 -->
				<view class="mbtn" @tap="checkLove">
					<image class="micon" :src="usercheck && usercheck.includes(postid) ? '/static/lover.png' : '/static/love.png' "
					 mode="aspectFit" />
					<text class="mtext">{{infolist.like_count}}</text>
				</view>

				<!-- 评论相关统计 -->
				<view class="mbtn" @tap="toComment">
					<image class="micon" src="/static/msg.png" mode="aspectFit" />
					<text class="mtext">{{oneInfo.length}}</text>
				</view>

				<!-- 转发次数统计 -->
				<!-- #ifdef MP-WEIXIN -->
				<view class="mbtn">
					<button class="mbtns" open-type="share">
						<image class="micon" src="/static/wx.png" mode="aspectFit" />
						<text class="mtext">分享</text>
					</button>
				</view>
				
				<!-- #endif -->
				
			</view>
		</view>

		<!-- 发布评论 -->
		<view class="commentBox" v-if="showCommentBox">
			<view class="header">
				<text class="title">发表评论</text>
				<u-icon class="icon" name="arrow-down-fill" color="#999" size="28" @tap="closeComment" />
			</view>
			<textarea class="texta" placeholder-style="color:#888" placeholder="想说点什么..." cursor-spacing="150" :focus="true"
			 :fixed="true" :value="cinput" @input="getInput" />
			<view class="btns">
		        <button
		          class="mini-btn"
		          type="primary"
		          size="mini"
		          @tap="sendComment"
		          :disabled="disableSendCommentTag"
		        >发布</button>
		        <button class="mini-btn" type="default" size="mini" @tap="closeComment">取消</button>
			</view>
		</view>
		
		<!-- 登陆组件 -->
		<login ref="login"></login>

	</view>
</template>

<script>
	import moment from 'moment'
	import {postcommon,changeUserCheck,Collection} from '@/common/http.api.js'
	import {mapGetters,mapActions,mapState,mapMutations} from 'vuex'
	export default {
		props: {
			oneInfo: Array,
			outcommentlength:Number,
			postid:Number,
			usercheck:[],
		},
		data() {
			return {
				// 当前动态评论列表详情
				commintsList: [],
				// props 传递的数据无法改变触发 DOM 更新
				oneInfoClone: [],
				// 是否展开评论弹窗
				showCommentBox: false,
				// 评论输入内容
				cinput:'',
				// 是否可以发送评论
				disableSendCommentTag: true,
				infolist:{},
			};
		},
		onReady(){
			this.usercheck = this.getUser_check()
			let data = this.Introduce.filter(item=>
				item.id === this.postid
			)
			this.infolist = data[0]
		},
		watch:{
			oneInfo(newVal, oldVal){
				// console.log('数据触发了更新：')
				// console.log(newVal)
			}
		},
		computed:{
			...mapState(['userInfo','Introduce']),
			computed_time(){
				return function(time){
					return moment(Number(time)).format('YYYY-MM-DD HH:MM')
				}
			}
		},
		methods: {
			...mapGetters(['getUser_check']),
			...mapActions(['changeCheck']),
			...mapMutations(['CHANGELIKE_COUNT']),
			openComment(){
				uni.pageScrollTo({
					duration:500,
					scrollTop:this.outcommentlength
				})
				this.showCommentBox = true
			},
			closeComment(){
				this.showCommentBox = false
			},
			getInput(data){
				this.cinput = data.detail.value
				if(this.cinput !== ''){
					this.disableSendCommentTag = false
				}else{
					this.disableSendCommentTag = true
				}
			},
			sendComment(){
				uni.setStorage({
					key: 'storage_key',
					info:'小唐'
				})
				uni.getStorage({
					key: 'storage_key',
					success:(res) =>{
						let comment_time = new Date().getTime()
						postcommon({
									username:'小钟',
									usertext:this.cinput, 
									spot_id:this.postid, 
									user_id:1,
									comment_time
						}).then(res=>{
							this.$emit('updateinfocomment')
							this.cinput = ''
							this.showCommentBox = false
							uni.pageScrollTo({
								duration:1000,								scrollTop:50000
							})
						})
					},
					fail(){
						console.log('还未登录')
					}
				});
			},
			toComment(){
				uni.pageScrollTo({
					duration:500,
					scrollTop:this.outcommentlength
				})
			},
			// 收藏操作
			checkLove(){
				let checknumber = this.usercheck.indexOf(this.postid)
				if(checknumber >= 0){
					// console.log('已收藏')
					this.usercheck.splice(checknumber,1)
				}else{
					// console.log('未收藏')
					this.usercheck.push(this.postid)
				}
				this.CHANGELIKE_COUNT({
					item:this.infolist,
					checknumber
				})
				Collection({
					id:this.infolist.id,
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
	};
</script>

<style lang="scss" scoped>
	.comments {
		padding: 20upx 20upx 200upx;

		.title {
			font-weight: bolder;
			font-size: 32upx;
			margin-bottom: 40upx;
		}

		.no-comment {
			text-align: center;
			margin: 120upx 0 280upx;
			color: #666;
		}

		.one-comment {
			&.last-comment {
				border-bottom: none;
			}

			.commenter {
				.info {
					display: flex;
					flex-direction: row;
					flex-wrap: wrap;
					justify-content: space-between;
					align-items: center;
					align-content: center;
					margin-top: 20upx;

					.left {
						display: flex;
						flex-direction: row;
						flex-wrap: wrap;
						justify-content: flex-start;
						align-items: center;
						align-content: center;

						.avatar {
							margin-right: 20upx;
							margin-top: 10upx;
						}

						.name {
							font-size: 24upx;
							font-weight: bolder;
							color: #1f2046;
							margin-left: 15upx;
						}
					}
				}

				.content {
					color: #666;
					font-size: 30upx;
					line-height: 50upx;
					margin-left: 70upx;
					margin-top: 10upx;
					padding-right: 20upx;
				}

				.uptime {
					color: #999;
					font-size: 20upx;
					margin-left: 70upx;
					margin-top: 10upx;
					padding-bottom: 20upx;
					border-bottom: 1upx solid #f2f2f2;
				}
			}
		}
	}
	
	.tab-bar {
		position: fixed;
		width: 100%;
		height: 120upx;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		align-content: center;
		color: #ccc;
		border-top: 1upx solid #f6f6f6;
		background-color: #fff;

		.minput {
			background-color: #eee;
			height: 60upx;
			flex: 1;
			border-radius: 30upx;
			padding-left: 30upx;
			margin-left: 20upx;
			line-height: 60upx;
			color: #AAAAAA;
			font-size: 22upx;
		}

		.mview {
			display: flex;
			align-items: center;
			justify-content: space-around;
			margin-right: 20upx;
			flex: 1.9;
			color: #ccc;
			.mbtn {
				display: flex;
				justify-content: center;
				align-items: center;
				align-content: center;
				background-color: #fff;
			}
			.share{
				width: 150upx;
			}
			.mbtns{
				display: flex;
				align-items: center;
			}
			.mbtns::after {
				border: none;
				background-color: none;
			}

			.micon {
				width: 36upx;
				height: 36upx;
			}

			.mtext {
				color: #001432;
				font-size: 24upx;
				margin-left: 10upx;
			}
		}


	}

	.commentBox {
		position: fixed;
		width: 750upx;
		height: 250px;
		left: 0;
		bottom: 0;
		border-top: 1upx solid #eee;
		background-color: #fafafa;

		.header {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-between;
			align-items: center;
			align-content: center;
			padding: 20upx 15px 20upx 25px;

			.title {
				color: #999;
				font-size: 28upx;
				font-weight: bold;
			}

			.icon {
				padding: 20upx;
			}
		}

		.texta {
			width: 600upx;
			height: 100px;
			margin-left: 50upx;
			padding: 10px 25upx;
			border: 1upx solid #ddd;
			border-radius: 10upx;
			background: #fff;
			font-size: 28upx;
		}

		.btns {
			width: 650upx;
			margin-left: 50upx;
			margin-top: 15px;
			text-align: right;

			.mini-btn {
				margin-left: 40upx;
			}
		}
	}
</style>
