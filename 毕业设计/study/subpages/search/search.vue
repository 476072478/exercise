<template>
	<view class="DetailsUL">
		<u-sticky offset-top="0" bgColor='#F9F9F9'>
			<view class="Searchlist">
				<u-search 
				:animation="true" 
				borderColor='#ACAAB2' 
				v-model='userSearch'
				@change='userlookup' 
				actionText='清除' 
				@custom="clearuserSearch"
				></u-search>
				<u-tabs :list="list2" @click='tabClick' :current='tabcurrent'>
					<view
					   slot="right"
					   style="padding-left: 4px;"
					   @tap="Clicktab"             
					>
					    <u-icon
					            name="list"
					            size="21"
					            bold
					    ></u-icon>        
					</view>
				</u-tabs>
				<view :class="mysubsection ? 'mysubsection': 'altmysubsection'" class="subsection">
					<u-subsection :list="list" :current="current" @change="sectionChange" bgColor='#F9F9F9'></u-subsection>
				</view>
			</view>
		</u-sticky>
		<ul>
			<li class='DetailsLi' v-for="item in userIntroduce" :key="item.id" @click='gotofeedinfo(item.id)'>
			    <view class="DetailsLiOne">
			        <image alt='' :src='item.imgsrc'
					style="border-top-left-radius: 15px;
					border-top-right-radius: 15px;
					width: 100%;
					height: 160px;">
					</image>
			    </view>
			    <view class='DetailsText'>
			        <view>
			            <view class='Detailsname'>
			                {{item.name}}
			            </view>
			            <view class='Detailsjieshao' >
			                {{item.text}}
			            </view>
			            <view class='Detailsposition' >
			                {{item.position}}
			            </view>
			        </view>
			        <view>
			            <view class='Detailsprice'>
			                {{item.price}}元/起
			            </view>
			            <view class='Detailsfraction'>
			                <u-rate :value="item.fraction" readonly></u-rate>
			            </view>
			        </view>
			    </view>
			</li>
		</ul>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				userIntroduce:[],
				list2: [ 
						{
							name: '全部'
						},
						{
						    name: '景区'
						}, {
						    name: '酒店'
						}, {
						    name: '美食'
						},
				],
				list: ['价格降序', '价格升序', '评分升序','评分降序'],
				current: 0,
				mysubsection:true,
				// 用户搜索
				userSearch:'',
				//Tab标签current
				tabcurrent:0,
			}
		},
		onLoad(){
			this.getIntroduceInfo()
		},
		onShow(){
			this.$nextTick(()=>{
				this.userIntroduce = this.getIntroduce()
			})
		},
		computed:{
			
		},
		methods:{
			...mapActions(['getIntroduceInfo']),
			...mapGetters(['getIntroduce']),
			// 打开关闭插槽
			Clicktab(){
				this.mysubsection = !this.mysubsection
			},
			// 滑块被点击
			sectionChange(index) {
				this.current = index;
				if(index === 0){
					//价格升序
					this.userIntroduce.sort((a,b)=>{
						return a.price - b.price
					})	
				}
				if(index === 1){
					//价格降序
					this.userIntroduce.sort((a,b)=>{
						return b.price - a.price
					})
				}
				if(index === 2){
					//评分升序
					this.userIntroduce.sort((a,b)=>{
						return a.fraction - b.fraction
					})
				}
				if(index === 3){
					//评分降序
					this.userIntroduce.sort((a,b)=>{
						return b.fraction - a.fraction
					})
				}
				this.Clicktab()
			},
			// 用户搜索内容
			userlookup(){
				this.userIntroduce = this.getIntroduce().filter(item=>{
					if(this.tabcurrent === 0){
						return item.name.includes(this.userSearch)
					}else{
						return item.name.includes(this.userSearch) && item.cover_id === this.tabcurrent - 1
					}
				})	
			},
			// 清除用户输入内容
			clearuserSearch(){
				this.userSearch = ''
			},
			// Tab标签被点击
			tabClick(data){
				this.tabcurrent = data.index
				if(this.tabcurrent === 0 ){
					this.userIntroduce = this.getIntroduce()
				}else{
					this.userIntroduce = this.getIntroduce().filter(item=>{
						return item.cover_id === this.tabcurrent - 1
					})
				}
				this.userlookup()	
			},
			gotofeedinfo(id){
				uni.navigateTo({
					url:'/subpages/feedinfo/feedinfo?id='+id
				})
			}
		}
	}
</script>

<style lang="scss">
	.Searchlist{
		width: 90%;
		margin: 5px auto;
		padding: 8px 0;
	}
	
	.subsection{
		position: absolute;
		transition:all .3s linear;
		width: 90%;
		margin: 0 auto;
		background: #F9F9F9;
	}
	.mysubsection{
		height: 0px;
		overflow: hidden;
	}
	.altmysubsection{
		height: 30px;
	}
	.DetailsUL {
	    position: relative;
	    margin-top: 60px;
	    bottom: 60px;
	}
	
	.DetailsLi {
	    margin: 15px auto;
	    width: 95%;
	    height: 240px;
	    border-radius: 15px;
	    display: flex;
	    flex-direction: column;
	    box-shadow: 0px 0px 3px #3A3232;
	}
	
	.DetailsL{
		.DetailsLiOne{
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
			height: 160px;
			width: 100%;
		}
	} 
	
	.DetailsText {
	    flex: 0.3;
	    display: flex;
	    justify-content: space-between;
		padding: 5px 15px;
	}
	
	
	.Detailsname,
	.Detailsprice {
	    font-weight: 600;
	    font-size: 16px;
	}
	
	
	.Detailsposition {
	    width: 175px;
	    height: 15px;
	    line-height: 15px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
		font-size: 12px;
	}
	
	.Detailsjieshao {
	    width: 175px;
	    height: 25px;
	    line-height: 25px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    white-space: nowrap;
		font-size: 12px;
	}
	
	.Detailsfraction {
	    position: absolute;
	    padding: 10px 0;
	    right: 10px;
	    height: 25px;
	    line-height: 25px;
	}
</style>
