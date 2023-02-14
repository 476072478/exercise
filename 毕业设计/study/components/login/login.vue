<template>
	<view class="login" :class="{show:show}">
		<view class="mask" @tap="closeLogin" bind:tap="cancel" catch:touchmove="emptyHandler"></view>
		<view class="container">

			<view class="close-box" @tap="closeLogin" bind:tap="cancel">
				<image class="close-img" src="/static/close.png" />
			</view>
			
			<!-- #ifdef MP-WEIXIN -->
			<view class="p-name">
				前端交流学习中心欢迎你
			</view>
			<button class="submit-btn" open-type="getUserInfo" @getuserinfo="getWechatUserInfo">
				<image src="/static/wechat.png" class="wechat-img" />
				<text>点击获取微信用户信息</text>
			</button>
			<!-- #endif  -->
			<view class="serve-info">点击登录/注册前端论坛，即表示已阅读并同意</view>
			<view class="serve-text">
				<view @tap="gotoWeb('https://uniapp.dcloud.io/component/mp-weixin-plugin')">《隐私政策》</view>
				<view @tap="gotoWeb('https://developers.weixin.qq.com/miniprogram/dev/framework/')">《用户协议》</view>
			</view>
		</view>
	</view>
</template>

<script>
	import { mapState ,mapActions} from 'vuex'
	export default {
		data() {
			return {
				show:false,
			};
		},
		onReady(){
			this.show = this.loginState
		},
		onLoad(){
			
		},
		computed:{
			...mapState(['loginState','userInfo'])
		},
		methods : {
			...mapActions(['userlogin','getIntroduceInfo']),
			// 关闭弹窗
			closeLogin() {
				this.show = false
			},
			// 打开登陆弹窗
			openLogin() {
				this.show = true
			},
			// 跳转到 H5 页面
			gotoWeb(url) {
				wx.navigateTo({
					url: '/pages/webview/webview?url=' + encodeURI(url)
				});
			},
			getWechatUserInfo(){
				wx.login({
					success:loginRes=>{
						if(loginRes.code){
							uni.getUserInfo({
								success:userRes=>{						
									uni.request({
										url:'http://127.0.0.1:8080/my/logins',
										method:"POST",
										data:{
											code:loginRes.code,
											encryptedData:userRes.encryptedData,
											iv:userRes.iv
										},
										header:{'content-type':'application/x-www-form-urlencoded'},
										success:reqRes => {
											this.show = false
											this.userlogin(reqRes.data.data)
											this.getIntroduceInfo()
										}
									})
								}
							})
						}else{
							console.log('登录失败')
						}
					},
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: flex-end;
		opacity: 0;
		transition: opacity 300, z-index 0 300;
		pointer-events: none;
		z-index: 999;

		&.show {
			z-index: 9999;
			opacity: 1;
			pointer-events: auto;
		}

		.mask {
			position: fixed;
			width: 100%;
			height: 100%;
			background-color: rgba($color: #000000, $alpha: 0.3);
		}

		.container {
			z-index: 999;
			display: flex;
			flex-direction: column;
			width: 100%;
			padding: 40upx 20upx;
			background-color: #f1f1f1;
			border-radius: 20upx;
			align-items: center;
			position: relative;

			.p-name {
				margin-top: 48upx;
				font-size: 36upx;
				font-weight: normal;
			}

			.close-box {
				position: absolute;
				right: 32upx;
				top: 38upx;
				width: 56.56upx;
				height: 56.56upx;
				padding: 10upx;

				.close-img {
					width: 100%;
					height: 100%;
				}
			}
		}

		.header {
			display: flex;
			flex-direction: column;
			align-items: center;
			font-size: 28upx;

			.logo-wrap {
				width: 144upx;
				height: 144upx;
				overflow: hidden;
				border-radius: 20upx;
			}

			.logo {
				width: 100%;
				height: 100%;
			}
		}

		.info {
			color: #333;
		}

		.submit-btn {
			width: 642upx;
			height: 88upx;
			margin-top: 60upx;
			margin-bottom: 60upx;
			border-radius: 44upx;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			color: #fff;
			background-color: #0046f5;
			font-size: 36upx;

			.wechat-img {
				width: 44upx;
				height: 34upx;
				margin: 0 18upx;
			}
		}

		.phone-login {
			color: #0046f5;
			font-size: 28upx;
			margin-top: 40upx;
			border: none;
			background-color: #f1f1f1;
		}

		.cancel-btn {
			width: 100%;
			margin-top: 60upx;
			color: #333;
			background-color: #f1f1f1;
		}

		.serve-info {
			font-size: 22upx;
			margin-top: 20upx;
		}

		.serve-text {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: center;
			font-size: 22upx;
			color: #6079b8;
			margin-top: 10upx;
		}
	}

	button::after {
		border: none;
	}

	.btns {
		margin-top: 20upx;
		text-align: center;

		.ubtn {
			display: inline-block;
			margin: 0 20upx;
		}
	}

	.type {
		margin-top: 80upx;
	}
</style>
