<template>
    <div class="index_wrap">
        <i-tabs :current="activeName1" @change="tabClick1">
            <i-tab key="first" title="本月"></i-tab>
            <i-tab key="second" title="本季"></i-tab>
            <i-tab key="third" title="本年"></i-tab>
        </i-tabs>

        <view class="sale_view">
            <view class="sale_wrap_item">
                <p class="p1">销售目标</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">预计当月签约金额</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">签约金额</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">差额</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">收款金额</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">应收金额</p>
                <p>100</p>
            </view>
        </view>

        <i-panel title="销售简报" class="small_panel">
            <i-tabs :current="activeName2" @change="tabClick2">
                <i-tab key="first" title="今天"></i-tab>
                <i-tab key="second" title="本周"></i-tab>
                <i-tab key="third" title="本月"></i-tab>
                <i-tab key="fourth" title="上月"></i-tab>
            </i-tabs>
        </i-panel>

        <view class="sale_view">
            <view class="sale_wrap_item">
                <p class="p1">线索</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">新增线索</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">客户</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">新增客户</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">新增商机</p>
                <p>100</p>
            </view>
            <view class="sale_wrap_item">
                <p class="p1">新增跟进记录</p>
                <p>100</p>
            </view>
        </view>

        <!-- <div class="container">
            <i-button type="subject" @click="bindViewTap">查看登录日志</i-button>
        </div> -->
    </div>
</template>

<script>
    import card from '@/components/card'
    import config from '../../config'

    export default {
        data () {
            return {
                activeName1:'first',
                activeName2:'first',
            }
        },

        onShow () {
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
            },
            tabClick1(e){
                this.activeName = e.target.key
            },
            tabClick2(e){
                this.activeName = e.target.key
            },
        }
    }
</script>

<style scoped>
    .index_wrap{
        background-color: #f5f5f5
    }
    .sale_view{
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-items: center
    }
    .sale_wrap_item{
        flex: 0 0 50%;
        height: 60px;
        text-align: center;
        background-color: rgb(255, 255, 255);
        border: 0rpx solid #f0f0f0;
        border-bottom-width: 1rpx;
        box-sizing: border-box
    }
    .sale_wrap_item:nth-child(2n){
        border-left-width: 1rpx
    }
    .p1{
        line-height: 30px
    }
    .sale_wrap_item p{
        font-size: 12px
    }
</style>