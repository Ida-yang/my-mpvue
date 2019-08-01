<template>
    <div class="pay_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="payCollectionDetail.customerName">
            <p class="cell_info">回款金额：&nbsp;&nbsp;{{payCollectionDetail.price + '元'}}</p>
            <p class="cell_info">收款方式：&nbsp;&nbsp;{{payCollectionDetail.pay_type}}</p>
            <p class="cell_info">单号：&nbsp;&nbsp;{{payCollectionDetail.backNo}}</p>
            <view class="btn_group" v-if="authority">
                <i-button class="flex_btn" type="subject" size="small" @click="handleClick($event,1)">通过</i-button>
                <i-button class="flex_btn" type="ghost" size="small" @click="handleClick($event,2)">拒绝</i-button>
            </view>
            <i-cell :title="'审核状态：' + payCollectionDetail.checkState" is-link @click="toPayState" i-class="cell_link"></i-cell>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="审批历史"></i-tab>
                <i-tab key="second" title="基本信息"></i-tab>
                <i-tab key="third" title="相关信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'" class="white_bg font_size_12">
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

        <view v-if="activeName == 'second'" class="font_size_12">
            <i-cell-group>
                <i-cell title="回款单号" :value="payCollectionDetail.backNo"></i-cell>
                <i-cell title="客户名称" :value="payCollectionDetail.customerName"></i-cell>
                <i-cell title="回款阶段" :value="payCollectionDetail.back_plan"></i-cell>
                <i-cell title="回款金额" :value="payCollectionDetail.price + '元'"></i-cell>
                <i-cell title="收款方式" :value="payCollectionDetail.pay_type"></i-cell>
                <i-cell title="原单号" :value="payCollectionDetail.contract_number"></i-cell>
                <i-cell title="原单类型" :value="payCollectionDetail.type"></i-cell>
                <i-cell title="创建时间" :value="payCollectionDetail.createTime"></i-cell>
                <i-cell title="我方签约人" :value="payCollectionDetail.private_employee"></i-cell>
                <i-cell title="部门" :value="payCollectionDetail.deptname"></i-cell>
                <i-cell title="机构" :value="payCollectionDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'" class="font_size_12">
            <i-card full title="已回款信息">
                <i-cell slot="content" i-class="card_cell" v-for="item in payInfoData" :key="item.id" :title="item.back_plan" :label="'回款日期：' + item.createTime">
                    <view slot="footer">
                        <p>{{item.price + '元'}}</p>
                        <p class="gray_12">{{item.pay_type}}</p>
                    </view>
                </i-cell>
            </i-card>
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
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '回款详情',

                payCollectionDetail:{},
                authority:false,

                activeName:'first',

                stepIndex:-1,
                auditLog:[],
                payInfoData:[],

                showSure:false,
                showRefuse:false,
                remarks:'',
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                this.payCollectionDetail = config.information.payCollectionDetailData
                
                this.loadState()
                this.loadAudit()
                this.loadMoneyBack()
            },
            loadState(){
                const _this = this

                let data = {
                    recordId: this.payCollectionDetail.examineRecordId,
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

                        if(info.isCheck == 1 && _this.checkStatus !== 2){
                            _this.authority = true
                        }else{
                            _this.authority = false
                        }
                    }
                })
            },
            loadAudit(){
                const _this = this
                let data = {
                    recordId: this.payCollectionDetail.examineRecordId
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
            loadMoneyBack(){
                const _this = this
                let data = {
                    contract_id: this.payCollectionDetail.contract_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'back/selectBackByContactId.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.payInfoData = res.data
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
                    id: this.payCollectionDetail.id,
                    recordId: this.payCollectionDetail.examineRecordId,
                    status: 1,
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
                    id: this.payCollectionDetail.id,
                    recordId: this.payCollectionDetail.examineRecordId,
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
            toPayState(){},

            tabClick(e){
                this.activeName = e.target.key
            },
        },
    }
</script>

<style>
    .pay_detail_wrap{
        background-color: #f5f5f5;
    }
</style>