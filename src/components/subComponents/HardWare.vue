<template>
    <div>
        <cpu></cpu>
        <disk></disk>
    </div>
    
</template>
<script>
import cpu from '../Charts/Panel'
import disk from '../Charts/PieCharts'
export default {
    components:{
        cpu,
        disk
    }
}
</script>
<style>

</style>
