<template>
    <div class="index_wrap">
        <i-panel title="目标简报" class="small_panel">
            <i-tabs :current="activeName1" @change="tabClick1">
                <i-tab key="first" title="本月"></i-tab>
                <i-tab key="second" title="上月"></i-tab>
                <i-tab key="third" title="本年"></i-tab>
            </i-tabs>
        </i-panel>

        <view class="sale_view">
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/saleTarget.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{amountData.target}}</p>
                    <p>销售目标</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/estMoney.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{amountData.opportunity_achievement}}</p>
                    <p>预计金额</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/successMoney.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{amountData.deal}}</p>
                    <p>完成金额</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/difference.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{amountData.difference}}</p>
                    <p>差&nbsp;&nbsp;&nbsp;&nbsp;额</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/backMoney.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{amountData.back}}</p>
                    <p>回款金额</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/planMoney.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{amountData.backPlan}}</p>
                    <p>计划回款金额</p>
                </view>
            </view>
        </view>

        <i-panel title="销售简报" class="small_panel">
            <i-tabs :current="activeName2" @change="tabClick2">
                <i-tab key="1" title="今天"></i-tab>
                <i-tab key="3" title="本周"></i-tab>
                <i-tab key="4" title="本月"></i-tab>
                <i-tab key="5" title="上月"></i-tab>
            </i-tabs>
        </i-panel>

        <view class="sale_view">
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/clue.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{saleData.customertwoNum}}</p>
                    <p>线索</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/clue.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{saleData.customertwoAddNum}}</p>
                    <p>新增线索</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/customer.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{saleData.customerpoolNum}}</p>
                    <p>客户</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/customer.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{saleData.customerpoolAddNum}}</p>
                    <p>新增客户</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/opportunity.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{saleData.opportunityAddNum}}</p>
                    <p>新增商机</p>
                </view>
            </view>
            <view class="sale_wrap_item_two">
                <view class="item_two_view1">
                    <image src="../../static/images/follow.png" style="width:24px;height:24px;" />
                </view>
                <view class="item_two_view2">
                    <p>{{saleData.followNum}}</p>
                    <p>新增跟进记录</p>
                </view>
            </view>
        </view>
        
        <i-panel title="商机漏斗" class="small_panel">
            <i-tabs :current="activeName3" @change="tabClick3">
                <i-tab key="1" title="预计7天"></i-tab>
                <i-tab key="2" title="预计15天"></i-tab>
                <i-tab key="3" title="预计当月"></i-tab>
                <i-tab key="4" title="预计下月"></i-tab>
            </i-tabs>
        </i-panel>

        <div class="index_funnel">
            <mp-echarts :echarts="echarts" :onInit="onInit" canvasId="demo-canvas" />
        </div>

        <view class="index_table">
            <view class="index_table_th">
                <span style="flex:1.5">商机阶段</span>
                <span style="flex:1">机会数量</span>
                <span style="flex:1">预计成交金额</span>
            </view>
            <view class="index_table_td" v-for="(item,index) in tableData" :key="index">
                <span style="flex:1.5">{{item.name + '(' + item.proportion + ')'}}</span>
                <span style="padding-left:42px;box-sizing:border-box;flex:1">{{item.value}}</span>
                <span style="flex:1">{{item.opportunity_achievement}}</span>
            </view>
            <view class="index_table_foot">
                <span style="flex:1.5">合计</span>
                <span style="padding-left:42px;box-sizing:border-box;flex:1"></span>
                <span style="flex:1">{{totalMoney}}</span>
            </view>
        </view>
    </div>
</template>

<script>
    import card from '@/components/card'
    import config from '../../config'
    import echarts from '../../../static/echarts.min.js'
    import mpEcharts from 'mpvue-echarts'

    let chart = null
    let option = { //ECharts 配置项
        title: {},
        // tooltip: {
        //     trigger: 'item',
        //     // formatter: "{b}\n{a}：{c}"
        //     formatter: function(params, ticket, callback){
        //         let a = params.data
        //         let b = params.seriesName
        //         var showHtm = a.name + '\n' + b + '：' + a.label

        //         return showHtm;
        //     }
        // },
        calculable: true,
        series: [
            {
                name:'数量',
                type:'funnel',
                left: '10%',
                top: 30,
                bottom: 30,
                width: '80%',
                minSize: '30%',
                sort: 'descending',
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

        return chart; // 返回 chart 后可以自动绑定触摸操作
    }

    export default {
        components: {
            mpEcharts
        },

        data () {
            return {
                activeName1:'first',
                activeName2:'1',
                activeName3:'3',

                next:false,

                month:'',
                year:'',
                searchyear:'',
                searchyearMonth:'',

                amountData:{},

                saleData:{},

                echarts,
                onInit: initChart,

                tableData:[],
                totalMoney:'',
            }
        },

        onShow () {
            this.next = false
            this.loadDate()
            this.loadSale()
            this.drawfunnel()
        },

        methods: {
            loadDate(){
                let date = new Date()
                let y = date.getFullYear()
                let m = date.getMonth() + 1
                m = (m < 10 ? "0" + m : m)

                this.year = y
                this.month = m

                this.searchyearMonth = y + '-' + m

                this.loadAmount()
            },
            loadAmount(){
                const _this = this
                let data = {
                    pId: config.userData.pId,
                    year: this.searchyear,
                    yearMonth: this.searchyearMonth
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'homePageHeader/selectMoneyForSmallProcedures.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.amountData = res.data
                    }
                })
            },
            loadSale(){
                const _this = this
                let data = {
                    pId: config.userData.pId,
                    example: this.activeName2
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'homePageHeader/saleBriefingForSmallProcedures.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.saleData = res.data
                    }
                })
            },
            drawfunnel(){
                const _this = this
                let data = {
                    pId: config.userData.pId,
                    keyWord: this.activeName3
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getMonthCountByExample.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.reverse()
                        option.series[0].data = []
                        let num = new Number()
                        info.forEach((el,i) => {
                            option.series[0].data.push(
                                {value:i,name:el.name + '(' + el.value + ')',label:el.value}
                            )
                            if(el.name !== '成功签约' && el.name !== '失败关闭'){
                                let val = el.opportunity_achievement.replace(new RegExp(',','g'),'')
                                val = parseFloat(val)
                                num += val
                            }
                        });
                        
                        _this.totalMoney = num

                        _this.tableData = info.reverse()

                        if(_this.next == true){
                            _this.reloadFunnel()
                        }
                    }
                })
            },

            tabClick1(e){
                this.activeName1 = e.target.key
                if(e.target.key == 'first'){
                    this.searchyear = ''
                    this.searchyearMonth = this.year + '-' + this.month
                }else if(e.target.key == 'second'){
                    this.searchyear = ''
                    let m = ''
                    if(this.month == '01'){
                        let y = this.year - 1
                        m = 12
                        this.searchyearMonth = y + '-' + m
                    }else{
                        m = parseInt(this.month - 1)
                        m = (m < 10 ? "0" + m : m)
                        this.searchyearMonth = this.year + '-' + m
                    }
                }else if(e.target.key == 'third'){
                    this.searchyear = this.year
                    this.searchyearMonth = ''
                }

                this.loadAmount()
            },
            tabClick2(e){
                this.activeName2 = e.target.key
                this.loadSale()
            },
            tabClick3(e){
                this.activeName3 = e.target.key
                this.next = true
                this.drawfunnel()
            },

            reloadFunnel(){
                chart.setOption(option,true);
            },
        }
    }
</script>

<style scoped>
    .index_wrap{
        background-color: #f5f5f5;
        margin-bottom: 20px
    }
    .sale_view{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
    }
    .sale_wrap_item_one{
        flex: 0 0 50%;
        height: 60px;
        background-color: rgb(255, 255, 255);
        padding-top: 5px;
        padding-left: 60px;
        box-sizing: border-box
    }
    .p1{
        line-height: 24px;
        font-size: 12px !important;
        color: #80848f
    }

    .sale_wrap_item_two{
        flex: 0 0 50%;
        height: 80px;
        background-color: rgb(255, 255, 255);
        box-sizing: border-box;
        display: flex;
        align-items: center
    }
    .item_two_view1{
        flex: 1;
        text-align: center
    }
    .item_two_view2{
        flex: 1.5
    }
    .item_two_view2 p{
        line-height: 20px
    }
    .sale_wrap_item_one p,.sale_wrap_item_two p{
        font-size: 14px
    }

    .index_funnel{
        width: 100%;
        height: 400px;
        background-color: #fff
    }
    .index_funnel ec-canvas {
        width: 400px;
        height: 400px
    }
    .index_table{
        background-color: #fff
    }
    .index_table_th{
        display: flex;
        align-items: center;
        height: 32px;
        background-color: #f8f8f8
    }
    .index_table_th span{
        font-size: 14px;
        font-weight: 500;
        padding: 10px;
        box-sizing: border-box
    }
    .index_table_td{
        display: flex;
        align-items: center;
        height: 32px;
        border-bottom: 1rpx solid #f0f0f0
    }
    .index_table_td span{
        font-size: 13px;
        padding: 5px 10px;
        box-sizing: border-box
    }
    .index_table_foot{
        display: flex;
        align-items: center;
        height: 32px;
        background-color: #fcfcfc;
        border-bottom: 1rpx solid #f0f0f0
    }
    .index_table_foot span{
        font-size: 13px;
        padding: 5px 10px;
        box-sizing: border-box
    }
</style>