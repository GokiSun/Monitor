<template>
    <div style="width:100%;height:400px" ref="main"></div>
</template>
<script>
// import bmap from 'BMap'
export default {
	data(){
			return {
				dataArr:[
				{name: '海门', value: 9},
				{name: '拉萨', value: 19},
				{name: '福州', value: 110},
				{name: '南宁', value: 220},
				{name: '广州', value: 32},
				{name: '太原', value: 90},
				{name: '昆明', value: 200},
				{name: '沈阳', value: 100},
				{name: '长春', value: 92},
				{name: '呼和浩特', value: 54},
				{name: '西安', value: 34},
				{name: '重庆', value: 188},
				{name: '南京', value: 138},
				{name: '贵阳', value: 45},
				{name: '北京', value: 44},
				{name: '乌鲁木齐', value: 79},
				{name: '济南', value: 59},
				{name: '兰州', value: 90},
				{name: '天津', value: 119},
				{name: '郑州', value: 149},
				{name: '哈尔滨', value:159},
				{name: '石家庄', value: 329},
				{name: '长沙', value: 169},
				{name: '合肥', value: 219},
				{name: '武汉', value: 239},
				{name: '西宁', value: 219},
				{name: '杭州', value: 139},
				{name: '南昌', value: 199},
				{name: '海口', value: 219},
				{name: '成都', value: 119},
				{name: '台北', value:119},
				{name: '北京', value: 129},
				{name: '上海', value: 19},
				{name: '银川', value: 119},
				{name: '香港', value: 9},
				{name: '澳门', value: 9}
			],
				geoCoordMap:{
				'拉萨':[91.15,29.55],
				'福州':[119.3,26.08],
				'南宁':[108.33,22.84],
				'广州':[113.23,23.16],
				'太原':[112.53,37.87],
				'昆明':[102.73,25.04],
				'沈阳':[123.38,41.8],
				'长春':[125.35,43.88],
				'呼和浩特':[111.65,40.82],
				'西安':[108.95,34.27],
				'重庆':[106.54,29.59],
				'南京':[118.78,32.04],
				'贵阳':[106.71,26.57],
				'北京':[116.46,39.92],
				'乌鲁木齐':[87.68,43.77],
				'济南':[117,36.65],
				'兰州':[103.73,36.03],
				'天津':[117.2,39.13],
				'郑州':[113.65,34.76],
				'哈尔滨':[126.63,45.75],
				'石家庄':[114.48,38.03],
				'长沙':[113,28.21],
				'合肥':[117.27,31.86],
				'武汉':[114.31,30.52],
				'西宁':[101.77,36.62],
				'杭州':[120.21,30.20],
				'南昌':[115.27,28.09],
				'海口':[110.20,20.04],
				'成都':[104.02,30.55],
				'台北':[121.50,24.85],
				'北京':[116.55,39.85],
				'上海':[121.51,31.20],
				'银川':[106.27,38.47],
				'香港':[113.52,22.09],
				'澳门':[113.05,22.02]
				}
			}
	},
	mounted(){
		this.MapChart()
	},
	methods:{
  		convertData:function(){
			let res = []
			for (let i = 0; i < this.dataArr.length; i++) {
				let geoCoord = this.geoCoordMap[this.dataArr[i].name];
				if (geoCoord) {
						res.push({
								name: this.dataArr[i].name,
								value: geoCoord.concat(this.dataArr[i].value)
						});
				}
			}
			return res;
			},
		MapChart(){
			let myChart = this.$echarts.init(this.$refs.main)
			myChart.setOption({
						title: {
						text: '全国主要城市空气质量 - 百度地图',
						subtext: 'data from PM25.in',
						left: 'center'
				},
				geo: {
            map: 'china',
            itemStyle:{
              normal:{
                areaColor:'#6699CC',
                borderColor: '#fff',
              },
              emphasis: {
                areaColor: '#e9fbf1'
              }
            }
          },
				tooltip : {
						trigger: 'item',
						textStyle:{
							align:'left'
						}
				},
				bmap: {
						center: [104.114129, 37.550339],
						zoom: 5,
						roam: true,
						mapStyle: {
								styleJson: [{
										'featureType': 'water',
										'elementType': 'all',
										'stylers': {
												'color': '#d1d1d1'
										}
								}, {
										'featureType': 'land',
										'elementType': 'all',
										'stylers': {
												'color': '#f3f3f3'
										}
								}, {
										'featureType': 'railway',
										'elementType': 'all',
										'stylers': {
												'visibility': 'off'
										}
								}, {
										'featureType': 'highway',
										'elementType': 'all',
										'stylers': {
												'color': '#fdfdfd'
										}
								}, {
										'featureType': 'highway',
										'elementType': 'labels',
										'stylers': {
												'visibility': 'off'
										}
								}, {
										'featureType': 'arterial',
										'elementType': 'geometry',
										'stylers': {
												'color': '#fefefe'
										}
								}, {
										'featureType': 'arterial',
										'elementType': 'geometry.fill',
										'stylers': {
												'color': '#fefefe'
										}
								}, {
										'featureType': 'poi',
										'elementType': 'all',
										'stylers': {
												'visibility': 'off'
										}
								}, {
										'featureType': 'green',
										'elementType': 'all',
										'stylers': {
												'visibility': 'off'
										}
								}, {
										'featureType': 'subway',
										'elementType': 'all',
										'stylers': {
												'visibility': 'off'
										}
								}, {
										'featureType': 'manmade',
										'elementType': 'all',
										'stylers': {
												'color': '#d1d1d1'
										}
								}, {
										'featureType': 'local',
										'elementType': 'all',
										'stylers': {
												'color': '#d1d1d1'
										}
								}, {
										'featureType': 'arterial',
										'elementType': 'labels',
										'stylers': {
												'visibility': 'off'
										}
								}, {
										'featureType': 'boundary',
										'elementType': 'all',
										'stylers': {
												'color': '#fefefe'
										}
								}, {
										'featureType': 'building',
										'elementType': 'all',
										'stylers': {
												'color': '#d1d1d1'
										}
								}, {
										'featureType': 'label',
										'elementType': 'labels.text.fill',
										'stylers': {
												'color': '#999999'
										}
								}]
						}
				},
				series : [
						{
								name: 'pm2.5',
								type: 'scatter',
								coordinateSystem: 'bmap',
								data: this.convertData(this.dataArr),
								symbolSize: function (val) {
										return val[2] / 10;
								},
								label: {
										normal: {
												formatter: '{b}',
												position: 'right',
												show: false
										},
										emphasis: {
												show: true
										}
								},
								itemStyle: {
										normal: {
												color: 'purple'
										}
								}
						},
						{
								name: 'Top 5',
								type: 'effectScatter',
								coordinateSystem: 'bmap',
								data: this.convertData(this.dataArr.sort(function (a, b) {
										return b.value - a.value;
								}).slice(0, 6)),
								symbolSize: function (val) {
										return val[2] / 10;
								},
								showEffectOn: 'render',
								rippleEffect: {
										brushType: 'stroke'
								},
								hoverAnimation: true,
								label: {
										normal: {
												formatter: '{b}',
												position: 'right',
												show: true
										}
								},
								itemStyle: {
										normal: {
												color: 'purple',
												shadowBlur: 10,
												shadowColor: '#333'
										}
								},
								zlevel: 1
						}
				]
			})
		}
	}
}
</script>
<style scoped>
	div{
		float: left;
	}
</style>
