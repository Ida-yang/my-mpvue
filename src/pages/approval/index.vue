<template>
    <div class="approval_wrap">
        <i-cell-group>
            <i-cell title=" 今日需联系" is-link @click="tolink(1)">
                <i-badge slot="icon" :count="callLength" overflow-count="99">
                    <view class="meaasge_icon_span" style="background-color:rgb(104,150,245)">
                        <image src="../../static/images/jrxlx.png" class="message_image" />
                    </view>
                </i-badge>
            </i-cell>
            <i-cell title=" 分配给我的线索" is-link @click="tolink(2)">
                <i-badge slot="icon" :count="clueLength" overflow-count="99">
                    <view class="meaasge_icon_span" style="background-color:rgb(255,156,46)">
                        <image src="../../static/images/xs.png" class="message_image" />
                    </view>
                </i-badge>
            </i-cell>
            <i-cell title=" 分配给我的客户" is-link @click="tolink(3)">
                <i-badge slot="icon" :count="customerLength" overflow-count="99">
                    <view class="meaasge_icon_span" style="background-color:rgb(37,199,120)">
                        <image src="../../static/images/kh.png" class="message_image" />
                    </view>
                </i-badge>
            </i-cell>
            <i-cell title=" 异常商机信息" is-link @click="tolink(4)">
                <i-badge slot="icon" :count="opportunityLength" overflow-count="99">
                    <view class="meaasge_icon_span" style="background-color:rgb(152,108,245)">
                        <image src="../../static/images/sj.png" class="message_image" />
                    </view>
                </i-badge>
            </i-cell>
            <i-cell title=" 待审核合同" is-link @click="tolink(5)">
                <i-badge slot="icon" :count="agreeLength" overflow-count="99">
                    <view class="meaasge_icon_span" style="background-color:rgb(102,150,246)">
                        <image src="../../static/images/ht.png" class="message_image" />
                    </view>
                </i-badge>
            </i-cell>
            <i-cell title=" 待审核回款" is-link @click="tolink(6)">
                <i-badge slot="icon" :count="paybackLength" overflow-count="99">
                    <view class="meaasge_icon_span" style="background-color:rgb(253,172,80)">
                        <image src="../../static/images/hk.png" class="message_image" />
                    </view>
                </i-badge>
            </i-cell>
        </i-cell-group>
    </div>
</template>

<script>
    import config from '../../config'
    import { $Toast,$Message } from '../../../dist/wx/iview/base/index';

    export default {
        data(){
            return{
                msg: '待办',

                agreeLength: 0,
                callLength: 0,
                clueLength: 0,
                customerLength: 0,
                opportunityLength: 0,
                paybackLength: 0,
            }
        },

        mounted(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this
                let data1 = {
                    example: '2',
                    pId: config.userData.pId
                }
                let data2 = {
                    example: '1',
                    pId: config.userData.pId
                }
                let data3 = {
                    example: '5',
                    page: 1,
                    limit: 99999999,
                    pId: config.userData.pId
                }
                
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'contract/examineInfo.do?cId=' + config.userData.cId,  //接口地址
                    data: data1,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.agreeLength = res.data.length
                    }
                })
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/selectCustomerpoolAndClue.do?cId=' + config.userData.cId,  //接口地址
                    data: data2,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.callLength = res.data.length
                    }
                })
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/selectDistributionClue.do?cId=' + config.userData.cId,  //接口地址
                    data: data2,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.clueLength = res.data.length
                    }
                })
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/selectDistributionCspool.do?cId=' + config.userData.cId,  //接口地址
                    data: data2,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.customerLength = res.data.length
                    }
                })
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'opportunity/query.do?cId=' + config.userData.cId,  //接口地址
                    data: data3,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.opportunityLength = res.data.length
                    }
                })
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'back/examineInfo.do?cId=' + config.userData.cId,  //接口地址
                    data: data1,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.paybackLength = res.data.length
                    }
                })
            },
            tolink(val){
                let url = ''
                if(val == 1){
                    url = 'call-item/main'
                    // url = '../packageA/call-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 2){
                    url = 'clue-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 3){
                    url = 'customer-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 4){
                    url = 'opportunity-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 5){
                    url = 'agreement-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 6){
                    url = 'payback-item/main'
                    mpvue.navigateTo({ url })
                }
            },
        },
    }
</script>

<style>
    .approval_wrap{
        background-color: #fff;
    }
    .meaasge_icon_span{
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .message_image{
        width: 50rpx;
        height: 50rpx
    }
</style>