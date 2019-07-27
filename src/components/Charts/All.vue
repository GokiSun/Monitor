<template>
    <div class="all">
        <div class="sub">
            <charts></charts>
        </div>
        <div class="sub">
            <timechart></timechart>
        </div>
        <div class="sub">
            <piecharts></piecharts>
        </div>
        <div class="sub">
            <panel></panel>
        </div>
    </div>
</template>
<script>
import timechart from './TimeCharts'
// import barcharts from './BarCharts'
import charts from './LineCharts'
import piecharts from './PieCharts'
import panel from './Panel'
export default {
    components:{
        timechart,
        charts,
        piecharts,
        panel
    }
}
</script>
<style>
    .all{
        width: 100%;
    }
    .sub{
        width: 50%;
        float: left;
    }
</style>

