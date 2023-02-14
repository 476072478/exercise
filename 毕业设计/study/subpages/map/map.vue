<template>
	<view class="map_box">
	  <map id="navi_map" :longitude="longitude" :latitude="latitude" :scale="18" :polyline="polyline" :markers="markers" ></map>
	</view>
</template>

<script>
	import amap from '@/lib/amap-wx.130.js'
	import {getTravelrouter} from '@/common/http.api.js'
	export default {
		data() {
			return {
				amapPlugin: null,  
				key: '936a28e1439ab805f3a73050db009fb4',
				longitude:Number,
				latitude:Number,
				markers: [],
				travelrouterdata:[],
				polyline:[],
			}
		},
		onLoad(data){
			this.amapPlugin = new amap.AMapWX({
				key:this.key
			})
			getTravelrouter(data.id)
				.then(res=>{
					this.travelrouterdata = res.data
					this.longitude = res.data[0].origin.split(',')[0]
					this.latitude = res.data[0].origin.split(',')[1]
				})
					.then(()=>this.getRegeo())
		},
		methods:{
			getRegeo() {
				let router = '123'
				for(let s = 0 ; s<this.travelrouterdata.length;s++){
					if(s===0){
						this.amapPlugin.getWalkingRoute({
							  origin:this.travelrouterdata[s].origin,
							  destination:this.travelrouterdata[s].destination,
							  success: (data) =>{
							          var points = [];
							          if(data.paths && data.paths[0] && data.paths[0].steps){
							            var steps = data.paths[0].steps;
							            for(var i = 0; i < steps.length; i++){
							              var poLen = steps[i].polyline.split(';');
							              for(var j = 0;j < poLen.length; j++){
												points.push({
												  longitude: parseFloat(poLen[j].split(',')[0]),
												  latitude: parseFloat(poLen[j].split(',')[1])
												})
											} 
										}
									}
								this.markers.push({
									iconPath: "../../static/qidian.png",
									id: s,
									latitude: points[0].latitude,
									longitude: points[0].longitude,
									width: 34,
									height: 34	  
								})	
								points.push({
									longitude:this.travelrouterdata[s].destination.split(',')[0],
									latitude:this.travelrouterdata[s].destination.split(',')[1],
								})
								this.polyline.push({
									points: points,
									color: "#0081CF",
									width: 6
								})
								router = this.polyline[s].points[this.polyline[s].points.length - 1].longitude + ',' + this.polyline[s].points[this.polyline[s].points.length - 1].latitude
							  },
							  fail: function(info){
						
							  }
						})
					}
					if(s===this.travelrouterdata.length-1){
						setTimeout(()=>{
							this.amapPlugin.getWalkingRoute({
								  origin:this.travelrouterdata[s].origin,
								  destination:this.travelrouterdata[s].destination,
								  success: (data) =>{
								          var points = [];
										  points.push({
										  	longitude:router.split(',')[0],
										  	latitude:router.split(',')[1],
										  })
								          if(data.paths && data.paths[0] && data.paths[0].steps){
								            var steps = data.paths[0].steps;
								            for(var i = 0; i < steps.length; i++){
								              var poLen = steps[i].polyline.split(';');
								              for(var j = 0;j < poLen.length; j++){
													points.push({
													  longitude: parseFloat(poLen[j].split(',')[0]),
													  latitude: parseFloat(poLen[j].split(',')[1])
													})
												} 
											}
										}
									this.markers.push(
										{
											iconPath: "../../static/qizhi.png",
											id: s,
											latitude: points[0].latitude,
											longitude: points[0].longitude,
											width: 34,
											height: 34	  
										},
										{
											iconPath: "../../static/zhongdian.png",
											id: s+1,
											longitude:this.travelrouterdata[s].destination.split(',')[0],
											latitude:this.travelrouterdata[s].destination.split(',')[1],
											width: 34,
											height: 34	  
										}
									)	
									points.push({
										longitude:this.travelrouterdata[s].destination.split(',')[0],
										latitude:this.travelrouterdata[s].destination.split(',')[1],
									})
									this.polyline.push({
										points: points,
										color: "#0081CF",
										width: 6
									})
									router = this.polyline[0].points[this.polyline[0].points.length - 1].longitude + ',' + this.polyline[0].points[this.polyline[0].points.length - 1].latitude
								  },
								  fail: function(info){
							
								  }
							})
						},300)
					}
					if(s!==this.travelrouterdata.length-1 && s!==0){
						setTimeout(()=>{
							this.amapPlugin.getWalkingRoute({
								  origin:this.travelrouterdata[s].origin,
								  destination:this.travelrouterdata[s].destination,
								  success: (data) =>{
								          var points = [];
										  points.push({
										  	longitude:router.split(',')[0],
										  	latitude:router.split(',')[1],
										  })
								          if(data.paths && data.paths[0] && data.paths[0].steps){
								            var steps = data.paths[0].steps;
								            for(var i = 0; i < steps.length; i++){
								              var poLen = steps[i].polyline.split(';');
								              for(var j = 0;j < poLen.length; j++){
													points.push({
													  longitude: parseFloat(poLen[j].split(',')[0]),
													  latitude: parseFloat(poLen[j].split(',')[1])
													})
												} 
											}
										}
									this.markers.push({
										iconPath: "../../static/qizhi.png",
										id: s,
										latitude: points[0].latitude,
										longitude: points[0].longitude,
										width: 34,
										height: 34	  
									})	
									points.push({
										longitude:this.travelrouterdata[s].destination.split(',')[0],
										latitude:this.travelrouterdata[s].destination.split(',')[1],
									})
									this.polyline.push({
										points: points,
										color: "#0081CF",
										width: 6
									})
									router = this.polyline[0].points[this.polyline[0].points.length - 1].longitude + ',' + this.polyline[0].points[this.polyline[0].points.length - 1].latitude
								  },
								  fail: function(info){
							
								  }
							})
						},300)
					}
				}			
			}
		}
	}
</script>

<style lang="scss">
.map_box{
  position:absolute;
  left: 0px;
  right: 0px;
  height: 100vh;
  width: 100vw;
}
#navi_map{
  width: 100%;
  height: 100%;
}

</style>



