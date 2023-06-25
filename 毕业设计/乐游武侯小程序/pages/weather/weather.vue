<template>
	<view class="weather" v-if="inited">
		<img src="../../static/bg_weather.jpg" alt="" />
		<view class="weatherTop">
			<view class="topbox">
				武侯区当前天气现象：
				<img :src="getImgPost(weatherData.weather)" alt="" />
				{{ weatherData.weather }}
			</view>
			<view class="topbox reporttime">{{ weatherData.temperature }} ­°C</view>
			<view class="topbox">数据发布时间：{{ weatherData.reporttime }}</view>
		</view>
		<view class="weatherCenter">
			<view class="CenterBox">
				<img src="../../static/weather/btfl_icon.png" alt="" />
				<div>{{ weatherObj.daypower }}</div>
				<div>白天风力级别</div>
			</view>
			<view class="CenterBox">
				<img src="../../static/weather/wsfl_icon.png" alt="" />
				<div>{{ weatherObj.nightpower }}</div>
				<div>夜晚风力级别</div>
			</view>
			<view class="CenterBox">
				<img :src="getImgPost(weatherObj.dayweather)" alt="" />
				<div>{{ weatherObj.dayweather }}</div>
				<div>白天天气现象</div>
			</view>
			<view class="CenterBox">
				<img :src="getImgPost(weatherObj.nightweather)" alt="" />
				<div>{{ weatherObj.nightweather }}</div>
				<div>夜晚天气现象</div>
			</view>
			<view class="CenterBox">
				<img src="../../static/weather/btwd_icon.png" alt="" />
				<div>{{ weatherObj.daytemp }} ~ {{ weatherObj.daytemp_float }}</div>
				<div>白天温度</div>
			</view>
			<view class="CenterBox">
				<img src="../../static/weather/ywwd_icon.png" alt="" />
				<div>{{ weatherObj.nighttemp }} ~ {{ weatherObj.nighttemp_float }}</div>
				<div>晚间温度</div>
			</view>
			<view></view>
		</view>
		<view class="weatherBottom">
			<view :class="{ bottomBox: true, boxhandle: index == clickBox }" v-for="(item, index) in futureWeatherData" @click="changeDay(index)">
				<view class="box_div">{{ week[item.week] }}­</view>
				<view class="box_div"><img :src="getImgPost(item.dayweather)" alt="" /></view>
				<view class="box_div">{{ item.dayweather }}­</view>
				<view class="box_div">{{ item.daytemp }}­°</view>
				<view class="box_div">{{ item.nighttemp }}­°</view>
			</view>
		</view>
		<login></login>
	</view>
</template>

<script>
import { getWeatherInfo } from '../../common/http.api.js';
import moment from 'moment';
export default {
	data() {
		return {
			weatherData: {},
			weatherObj: {},
			futureWeatherData: [],
			week: {
				1: 'Mon',
				2: 'Tue',
				3: 'Wed',
				4: 'Thu',
				5: 'Fri',
				6: 'Sat',
				7: 'Sun'
			},
			clickBox: 0,
			inited: false
		};
	},
	methods: {
		getImgPost(img) {
			return img ? `../../static/weather/${img}.png` : '';
		},
		changeDay(index) {
			this.weatherObj = this.futureWeatherData[index];
			this.clickBox = index;
		},
		getData() {
			let arr = [
				getWeatherInfo().then(res => {
					this.weatherData = res.lives.length > 0 && res.lives[0];
					return Promise.resolve();
				}),
				getWeatherInfo(510107, 'all').then(res => {
					this.futureWeatherData = res.forecasts && res.forecasts.length > 0 && res.forecasts[0].casts;
					this.weatherObj = res.forecasts[0].casts[0];
					return Promise.resolve();
				})
			];
			return Promise.all(arr).then(() => Promise.resolve(true));
		}
	},
	onLoad() {
		this.getData().then(res => {
			this.inited = res;
		});
	}
};
</script>
<style scoped>
.weather > img {
	width: 100vw;
	height: 100vh;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;
}
.weatherTop {
	height: 30vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	color: white;
}
.weatherTop .topbox {
	padding: 5px 0;
	display: flex;
	align-items: center;
}
.topbox img {
	width: 30px;
	height: 30px;
}
.reporttime {
	font-size: 24px;
}
.weatherCenter {
	display: flex;
	flex-wrap: wrap;
	color: white;
}
.weatherCenter .CenterBox {
	width: 33%;
	height: 15vh;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
	font-size: 12px;
}
.weatherCenter img {
	width: 30px;
	height: 30px;
}
.weatherBottom {
	margin-top: 15px;
	border-top: 1px solid rgb(255, 255, 255, 0.5);
	display: flex;
	padding: 0 15px;
	color: white;
}
.bottomBox {
	display: flex;
	flex-direction: column;
	flex: 1;
	justify-content: center;
	text-align: center;
	height: 30vh;
	padding-top: 20px;
	font-size: 14px;
	background: rgb(0, 0, 0, 0);
	transition: all 0.2s linear;
}
.boxhandle {
	background: rgb(0, 0, 0, 0.5);
}
.box_div {
	height: 20%;
}
.box_div img {
	width: 30px;
	height: 30px;
}
</style>
