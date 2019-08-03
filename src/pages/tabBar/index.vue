<template>
    <div>
        <i-notice-bar icon="systemprompt" loop>
            2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;
        </i-notice-bar>
        <i-panel title="基本用法"></i-panel>

        <i-tab-bar :current="current" @change="handleChange">
            <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="Home"></i-tab-bar-item>
            <i-tab-bar-item key="group" icon="group" current-icon="group_fill" title="Friends"></i-tab-bar-item>
            <i-tab-bar-item key="remind" icon="remind" current-icon="remind_fill" count="3" title="Notice"></i-tab-bar-item>
            <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="My"></i-tab-bar-item>
        </i-tab-bar>

        <i-button type="success" @click="bindViewTap">进入小程序</i-button>

        <div class="home-funnel">
            <mp-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
        </div>
    </div>
</template>

<script>
    import config from '../../config'
    import { $Toast,$Message } from '../../../dist/wx/iview/base/index'
    import echarts from '../../../static/echarts.min.js'
    import mpEcharts from 'mpvue-echarts'

    let chart = null
    let option = { //ECharts 配置项
        title: {
            text: '商机漏斗',
            left: 10,
            top: 10,
            textStyle: {　//标题的文字样式
                fontSize: 15
            }
        },
        tooltip: {
            trigger: 'item',
            // formatter: "{b}\n{a}：{c}"
            formatter: function(params, ticket, callback){
                console.log(params.seriesName,params.data)
                let a = params.data
                let b = params.seriesName
                var showHtm = a.name + '\n' + b + '：' + a.label

                return showHtm;
            }
        },
        legend: {
            data: ['加载失败'],
            bottom: 30
        },
        calculable: true,
        series: [
            {
                name:'数量',
                type:'funnel',
                left: '10%',
                top: 60,
                bottom: 100,
                width: '80%',
                minSize: '20%',
                sort: 'none',
                // gap: 2,
                label: {
                    show: true,
                    position: 'inside'
                },
                emphasis: {
                    label: {
                        fontSize: 14
                    }
                },
                data: [{name:'加载失败'}]
            }
        ]
    }
        
    function initChart(canvas, width, height) {
        chart = echarts.init(canvas, null, {
            width: width,
            height: height
        });
        canvas.setChart(chart);
        chart.setOption(option,true);
        
        // console.log(this.next,'333333333')
        return chart; // 返回 chart 后可以自动绑定触摸操作
    }

    export default {
        
        components: {
            mpEcharts
        },
        data () {
            return {
                current: 'homepage',
                
                echarts,
                onInit: initChart,
            }
        },

        onShow(){
            this.drawfunnel()
        },

        methods: {
            handleChange (detail) {
                this.current = detail.target.key
            },
            bindViewTap () {
                const url = '../index/main'
                if (mpvuePlatform === 'wx') {
                    mpvue.switchTab({ url })
                } else {
                    mpvue.navigateTo({ url })
                }
            },

            onShareAppMessage() {
                return {
                    title: 'iView Weapp',
                    imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
                };
            },

            drawfunnel(){
                option.series[0].data = [
                    {value:70,name:'xxxx',label:100},
                    {value:60,name:'yyyy',label:100},
                    {value:50,name:'aaaa',label:100},
                    {value:40,name:'bbbb',label:200},
                    {value:30,name:'cccc',label:300},
                    {value:20,name:'dddd',label:400},
                    {value:10,name:'eeee',label:500},
                ]
                option.legend.data = ['xxxx','yyyy','aaaa','bbbb','cccc','dddd','eeee']
            },
        },
    }
</script>

<style>
    .demo-container{
        width: 100%;
        height: 100%;
        background-color: #fff;
        text-align: center;
    }
    .index_cell{
        position: relative;
    }
    .index_picker{
        position: absolute;
        top: -10px;
        right: 10px;
    }
    
    .home-funnel{
        width: 100%;
        height: 500px;
    }
    .home-funnel ec-canvas {
        width: 400px;
        height: 400px;
    }
</style>