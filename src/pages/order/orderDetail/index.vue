<template>
    <div class="order_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="orderDetail.customerName">
            <p class="cell_info">订单编号：&nbsp;&nbsp;{{orderDetail.orderNo}}</p>
            <p class="cell_info">负责人：&nbsp;&nbsp;{{orderDetail.ascription}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;订单时间：&nbsp;&nbsp;{{orderDetail.orderTime}}</p>
            <view class="btn_group" v-if="authority">
                <i-button class="flex_btn" type="subject" size="small" @click="handleClick($event,1)">通过</i-button>
                <i-button class="flex_btn" type="ghost" size="small" @click="handleClick($event,2)">拒绝</i-button>
            </view>
            <i-cell :title="'审核状态：' + orderDetail.auditStatus" i-class="cell_link"></i-cell>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="订单详情"></i-tab>
                <i-tab key="second" title="基本信息"></i-tab>
                <i-tab key="third" title="审核信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'">
            <view class="order_pro" v-for="item in productsData" :key="item.id">
                <view class="pro_head">
                    <image :src="item.proImage" aspectFit class="pro_image" />
                </view>
                <view class="pro_content">
                    <view class="detail_module"></view>
                    <view class="pro_title">{{item.goodsName}}</view>
                    <view class="pro_spec">{{item.title}}</view>
                    <view class="pro_desc">{{item.describe}}</view>
                    <view class="pro_foot">数量：{{item.num}} &nbsp;&nbsp;&nbsp;单价：{{item.price}}&nbsp;&nbsp;&nbsp;金额：{{item.amountOfMoney}}</view>
                </view>
            </view>
            <view class="detail_module"></view>
            <i-card full desc title="金额信息">
                <i-cell slot="content" i-class="card_cell" title="销售金额" :value="orderDetail.amountOfMoney"></i-cell>
                <i-cell slot="content" i-class="card_cell" title="折扣额" :value="orderDetail.discountAmount"></i-cell>
                <i-cell slot="content" i-class="card_cell" title="折后金额" :value="orderDetail.discountAfter"></i-cell>
                <i-cell slot="content" i-class="card_cell" title="税额" :value="orderDetail.taxAmount"></i-cell>
                <i-cell slot="content" i-class="card_cell" title="税后金额" :value="orderDetail.taxAfter"></i-cell>
            </i-card>
        </view>

        <view v-if="activeName == 'second'">
            <i-cell-group>
                <i-cell title="总金额" :value="orderDetail.totalSum"></i-cell>
                <i-cell title="联系人" :value="orderDetail.contactsName"></i-cell>
                <i-cell title="结算方式" :value="orderDetail.settlement"></i-cell>
                <i-cell title="交货方式" :value="orderDetail.delivery"></i-cell>
                <i-cell title="交货地址" :value="orderDetail.deliveryAddress"></i-cell>
                <i-cell title="创建时间" :value="orderDetail.createTime"></i-cell>
                <i-cell title="制单人" :value="orderDetail.private_employee"></i-cell>
                <i-cell title="业务员" :value="orderDetail.ascription"></i-cell>
                <i-cell title="部门" :value="orderDetail.deptname"></i-cell>
                <i-cell title="机构" :value="orderDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'" class="white_bg">
            <view class="detail_module"></view>
            <i-steps :current="stepIndex" direction="vertical" i-class="stage_steps">
                <i-step v-for="item in auditLog" :key="item.orderId" :status="item.stepStatus" :icon="item.stepIcon">
                    <i-fiche isContent isFooter slot="title" :title="item.realname" :extra="item.auditState" :thumb="item.portrait">
                        <view slot="content">{{item.remarks}}</view>
                        <view slot="footer">{{item.examineTime}}</view>
                    </i-fiche>
                </i-step>
            </i-steps>
        </view>

        <i-modal title="请填写审核意见" :visible="showSure" @ok="adopt" @cancel="cancelClick($event,1)">
            <i-input v-model="remarks" right type="textarea" request maxlength="200" @input="handleInput" />
        </i-modal>
        <i-modal title="请填写审核意见" :visible="showRefuse" @ok="refuse" @cancel="cancelClick($event,2)">
            <i-input v-model="remarks" right type="textarea" request maxlength="200" @input="handleInput" />
        </i-modal>

        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '订单详情页',
                
                infoData:{},

                orderDetail:{},
                productsData:[],
                authority:false,

                activeName:'first',

                stepIndex: -1,
                auditLog:[],

                showSure:false,
                showRefuse:false,
                remarks:'',
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.information.orderDetailData
                this.infoData = info

                const _this = this
                let data = {
                    id: info.id
                }
                
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'order/selectById.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data
                        if(info.checkStatus == 0){
                            info.auditStatus = '未审核'
                        }else if(info.checkStatus == 1){
                            info.auditStatus = '审核中'
                        }else if(info.checkStatus == 2){
                            info.auditStatus = '已审核'
                        }else if(info.checkStatus == 3){
                            info.auditStatus = '未通过'
                        }
                        _this.orderDetail = info

                        _this.productsData = info.orderDetails

                        let a = 0
                        let b = 0
                        let c = 0
                        let d = 0
                        let e = 0

                        _this.productsData.forEach(el => {
                            if(el.image){
                                el.proImage = config.sourcehost + 'product/' + config.userData.cId + '/' + el.image
                            }else{
                                el.proImage = '../../../static/images/noProduct.png'
                            }
                            a += el.amountOfMoney
                            b += el.discountAmount
                            c += el.discountAfter
                            d += el.taxAmount
                            e += el.taxAfter
                        });

                        _this.orderDetail.amountOfMoney = a.toFixed(2)
                        _this.orderDetail.discountAmount = b.toFixed(2)
                        _this.orderDetail.discountAfter = c.toFixed(2)
                        _this.orderDetail.taxAmount = d.toFixed(2)
                        _this.orderDetail.taxAfter = e.toFixed(2)

                        _this.loadState()
                        _this.loadLog()
                    }
                })
            },
            loadState(){
                const _this = this

                let data = {
                    checkStatus: this.orderDetail.checkStatus,
                    recordId: this.orderDetail.examineRecordId,
                    pId: config.userData.pId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'examineRecord/queryExamineRecordList.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data

                        if(info.isCheck == 1 && _this.orderDetail.checkStatus !== 2){
                            _this.authority = true
                        }else{
                            _this.authority = false
                        }
                    }
                })
            },
            loadLog(){
                const _this = this

                let data = {
                    recordId: this.orderDetail.examineRecordId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'examineLog/queryExamineLogList.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data
                        info.forEach(el => {
                            if(el.examineStatus == 1){
                                el.auditState = '审核通过'
                                el.stepStatus = 'finish'
                                el.stepIcon = 'right'
                            }else if(el.examineStatus == 2){
                                el.auditState = '审核未通过'
                                el.stepStatus = 'error'
                                el.stepIcon = 'close'
                            }
                            if(el.img){
                                el.portrait = config.sourcehost + 'upload/' + config.userData.cId + '/' + el.img
                            }else{
                                el.portrait = config.sourcehost + 'upload/staticImg/avatar.jpg'
                            }
                        });

                        _this.auditLog = info
                    }
                })
            },

            handleClick(e,val){
                if(val == 1){
                    this.showSure = true
                }else if(val == 2){
                    this.showRefuse = true
                }
            },
            cancelClick(e,val){
                if(val == 1){
                    this.showSure = false
                }else if(val == 2){
                    this.showRefuse = false
                }
            },
            handleInput(e){
                this.remarks = e.mp.detail
            },
            adopt(){
                const _this = this
                let data = {
                    id: this.orderDetail.id,
                    recordId: this.orderDetail.examineRecordId,
                    status: 1,
                    remarks:this.remarks,
                    pId: config.userData.pId
                }

                let flag = false
                if(!data.remarks){
                    $Toast({
                        content: '审批意见不能为空',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'examineRecord/auditExamine.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '审批成功',
                                type: 'success'
                            });
                            _this.remarks = ''
                            _this.showSure = false
                            _this.loadData()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            refuse(){
                const _this = this
                let data = {
                    id: this.orderDetail.id,
                    recordId: this.orderDetail.examineRecordId,
                    status: 2,
                    remarks:this.remarks,
                    pId: config.userData.pId
                }

                let flag = false
                if(!data.remarks){
                    $Toast({
                        content: '审批意见不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'examineRecord/auditExamine.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '审批成功',
                                type: 'success'
                            });
                            _this.remarks = ''
                            _this.showRefuse = false
                            _this.loadData()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },

            tabClick(e){
                this.activeName = e.target.key
            },
        },
    }
</script>

<style>
    .order_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
    .order_pro{
        background-color: rgb(255, 255, 255);
        border-bottom: 1rpx solid #dddee1;
        display: flex;
        align-items: center;
    }
    .pro_head{
        flex: 0 0 100px;
        display: flex;
        justify-content: center
    }
    .pro_content{
        position: relative;
        flex: 0 0 calc(100% - 100px);
        padding-right: 10px;
        box-sizing: border-box
    }
    .pro_image{
        width: 70px;
        height: 70px
    }
    .pro_title{
        line-height: 30px;
        font-size: 14px
    }
    .pro_spec{
        line-height: 24px;
        font-size: 13px;
        color: #80848f
    }
    .pro_desc{
        line-height: 20px;
        font-size: 12px;
        margin-bottom: 30px;
        color: #80848f
    }
    .pro_foot{
        line-height: 24px;
        font-size: 12px;
        position: absolute;
        bottom: 5px
    }
</style>