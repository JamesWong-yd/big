<template>
    <div style="width:100%;height:100%;" id="data_source_con"></div>
</template>

<script>
import echarts from 'echarts';

export default {
    name: 'dataSourcePie',
    data () {
        return {
            //
        };
    },
    mounted () {
        this.$nextTick(() => {
            var dataSourcePie = echarts.init(document.getElementById('data_source_con'));
            const option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: ['ios', 'android', 'pc', 'web', 'others']
                },
                series: [
                    {
                        name: '数据来源:',
                        type: 'pie',
                        radius: '66%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 24, name: '项目申请', itemStyle: {normal: {color: '#9bd598'}}},
                            {value: 13, name: '项目初审', itemStyle: {normal: {color: '#ffd58f'}}},
                            {value: 54, name: '项目审阅', itemStyle: {normal: {color: '#abd5f2'}}},
                            {value: 79, name: '项目会审', itemStyle: {normal: {color: '#ab8df2'}}},
                            {value: 30, name: '项目确认', itemStyle: {normal: {color: '#e14f60'}}}
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
            };
            dataSourcePie.setOption(option);
            window.addEventListener('resize', function () {
                dataSourcePie.resize();
            });
        });
    }
};
</script>
