<template>
    <div ref="main" style="width:100%;height:400px"></div>
</template>
<script>
export default {
	data(){
			return {}
	},
	created(){

	},
	mounted(){
		this.PieChart()
	},
	methods:{
		PieChart(){
			let myChart = this.$echarts.init(this.$refs.main)
			myChart.setOption({
				title : {
				text: '磁盘容量',
				subtext: '纯属虚构',
				x:'center'
				},
				tooltip : {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
				},
				legend: {
					orient: 'vertical',
					left: 'left',
					data: ['已用','剩余容量']
				},
				series : [
					{
						name: '磁盘容量',
						type: 'pie',
						radius : '55%',
						center: ['50%', '60%'],
						data:[
							{value:335, name:'已用'},
							{value:310, name:'剩余'}
						],
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
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
