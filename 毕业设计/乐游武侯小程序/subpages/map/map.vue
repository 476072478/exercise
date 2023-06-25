<template>
	<view>
		<view class="map_box" @click="handleClose"><map id="navi_map" :longitude="longitude" :latitude="latitude" :scale="18" :polyline="polyline" :markers="markers"></map></view>
		<view class="popup" v-show="show">
			<!-- <view class="popup_child close" @click="handleClose"><img src="../../static/close_popup.png" alt="" /></view> -->
			<view class="popup_child" v-for="(item, index) in routerData" key="item">
				<view class="popup_c" v-if="index == routerData.length - 1"><img src="../../static/zhongdian.png" alt="" /></view>
				<view class="popup_c" v-else-if="item.islast"><img src="../../static/mdd.png" alt="" /></view>
				<view class="popup_c" v-else-if="index !== 0"><img src="../../static/qizhi.png" alt="" /></view>
				<view class="popup_c" v-else><img src="../../static/qidian.png" alt="" /></view>
				<view class="popup_text">{{ item.instruction }}</view>
			</view>
		</view>
		<button class="openPopup" @click.stop="open">查看线路</button>
	</view>
</template>

<script>
import amap from '@/lib/amap-wx.130.js';
import { getTravelrouter } from '@/common/http.api.js';
export default {
	data() {
		return {
			amapPlugin: null,
			key: '936a28e1439ab805f3a73050db009fb4',
			longitude: Number,
			latitude: Number,
			markers: [],
			travelrouterdata: [],
			polyline: [],
			show: false,
			routerData: []
		};
	},
	onLoad(data) {
		this.amapPlugin = new amap.AMapWX({
			key: this.key
		});
		getTravelrouter(data.id)
			.then(res => {
				this.travelrouterdata = res.data[0];
				let newdata = res.data[0];
				this.longitude = newdata[0].origin.split(',')[0];
				this.latitude = newdata[0].origin.split(',')[1];
			})
			.then(() => this.getRegeo());
	},
	methods: {
		getRegeo() {
			let routerText = '';
			let router = '';
			for (let s = 0; s < this.travelrouterdata.length; s++) {
				if (s === 0) {
					this.amapPlugin.getWalkingRoute({
						origin: this.travelrouterdata[s].origin,
						destination: this.travelrouterdata[s].destination,
						success: data => {
							var points = [];
							if (data.paths && data.paths[0] && data.paths[0].steps) {
								var steps = data.paths[0].steps;
								for (var i = 0; i < steps.length; i++) {
									var poLen = steps[i].polyline.split(';');
									let islast = i == steps.length - 1;
									let obj = { instruction: steps[i].instruction, islast };
									this.routerData.push(obj);
									for (var j = 0; j < poLen.length; j++) {
										points.push({
											longitude: parseFloat(poLen[j].split(',')[0]),
											latitude: parseFloat(poLen[j].split(',')[1])
										});
									}
								}
							}
							console.log(this.routerData);
							this.markers.push({
								iconPath: '../../static/qidian.png',
								id: s,
								latitude: points[0].latitude,
								longitude: points[0].longitude,
								width: 34,
								height: 34
							});
							points.push({
								longitude: this.travelrouterdata[s].destination.split(',')[0],
								latitude: this.travelrouterdata[s].destination.split(',')[1]
							});
							this.polyline.push({
								points: points,
								color: '#0081CF',
								width: 6
							});
							router =
								this.polyline[s].points[this.polyline[s].points.length - 1].longitude + ',' + this.polyline[s].points[this.polyline[s].points.length - 1].latitude;
						},
						fail: function(info) {}
					});
				}
				if (s === this.travelrouterdata.length - 1) {
					setTimeout(() => {
						this.amapPlugin.getWalkingRoute({
							origin: this.travelrouterdata[s].origin,
							destination: this.travelrouterdata[s].destination,
							success: data => {
								var points = [];
								points.push({
									longitude: router.split(',')[0],
									latitude: router.split(',')[1]
								});
								if (data.paths && data.paths[0] && data.paths[0].steps) {
									var steps = data.paths[0].steps;
									for (var i = 0; i < steps.length; i++) {
										var poLen = steps[i].polyline.split(';');
										let islast = i == steps.length - 1;
										let obj = { instruction: steps[i].instruction, islast };
										this.routerData.push(obj);
										for (var j = 0; j < poLen.length; j++) {
											points.push({
												longitude: parseFloat(poLen[j].split(',')[0]),
												latitude: parseFloat(poLen[j].split(',')[1])
											});
										}
									}
								}
								this.markers.push({
									iconPath: '../../static/mdd.png',
									id: s,
									latitude: points[0].latitude,
									longitude: points[0].longitude,
									width: 34,
									height: 34
								});
								points.push({
									longitude: this.travelrouterdata[s].destination.split(',')[0],
									latitude: this.travelrouterdata[s].destination.split(',')[1]
								});
								this.polyline.push({
									points: points,
									color: '#0081CF',
									width: 6
								});
								this.markers.push({
									iconPath: '../../static/zhongdian.png',
									id: s + 1,
									latitude: points[points.length - 1].latitude,
									longitude: points[points.length - 1].longitude,
									width: 34,
									height: 34
								});
							},
							fail: function(info) {}
						});
					}, 500);
				}
				if (s !== this.travelrouterdata.length - 1 && s !== 0) {
					setTimeout(() => {
						this.amapPlugin.getWalkingRoute({
							origin: this.travelrouterdata[s].origin,
							destination: this.travelrouterdata[s].destination,
							success: data => {
								var points = [];
								points.push({
									longitude: router.split(',')[0],
									latitude: router.split(',')[1]
								});
								if (data.paths && data.paths[0] && data.paths[0].steps) {
									var steps = data.paths[0].steps;
									for (var i = 0; i < steps.length; i++) {
										var poLen = steps[i].polyline.split(';');
										let islast = i == steps.length - 1;
										let obj = { instruction: steps[i].instruction, islast };
										this.routerData.push(obj);
										for (var j = 0; j < poLen.length; j++) {
											points.push({
												longitude: parseFloat(poLen[j].split(',')[0]),
												latitude: parseFloat(poLen[j].split(',')[1])
											});
										}
									}
								}
								this.markers.push({
									iconPath: '../../static/mdd.png',
									id: s,
									latitude: points[0].latitude,
									longitude: points[0].longitude,
									width: 34,
									height: 34
								});
								points.push({
									longitude: this.travelrouterdata[s].destination.split(',')[0],
									latitude: this.travelrouterdata[s].destination.split(',')[1]
								});
								this.polyline.push({
									points: points,
									color: '#0081CF',
									width: 6
								});
								router =
									this.polyline[this.polyline.length - 1].points[this.polyline[this.polyline.length - 1].points.length - 1].longitude +
									',' +
									this.polyline[this.polyline.length - 1].points[this.polyline[this.polyline.length - 1].points.length - 1].latitude;
							},
							fail: function(info) {}
						});
					}, 300);
				}
			}
		},
		open() {
			this.show = true;
		},
		handleClose() {
			this.show = false;
		}
	}
};
</script>

<style lang="scss">
.map_box {
	position: absolute;
	left: 0px;
	right: 0px;
	height: 100vh;
	width: 100vw;
}
#navi_map {
	width: 100%;
	height: 100%;
}
.popup {
	position: absolute;
	bottom: 0;
	background: white;
	width: 100vw;
	display: flex;
	flex-direction: column;
	height: 40vh;
	box-sizing: border-box;
	overflow: scroll;
	clear: both;
}
.popup_c {
	width: 50px;
	height: 45px;
	display: flex;
	justify-content: center;
	align-items: center;
	img {
		width: 28px;
		height: 28px;
	}
}
.popup_child {
	width: 100vw;
	display: flex;
	height: 45px;
}
.popup_text {
	flex: 1;
	border-bottom: 1px solid rgba(0, 0, 0, 0.2);
	display: flex;
	align-items: center;
}
// .close {
// 	position: sticky;
// 	left: 285px;
// 	top: 5px;
// 	height: 30px;
// 	img {
// 		width: 28px;
// 		height: 28px;
// 	}
// }
.openPopup {
	position: absolute;
	top: 10px;
	right: 10px;
	background: white;
	font-size: 12px;
}
</style>
