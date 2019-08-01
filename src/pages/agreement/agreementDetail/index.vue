<template>
    <div class="agree_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="agreementDetail.contract_name">
            <p class="cell_info">合同编号：&nbsp;&nbsp;{{agreementDetail.contract_number}}</p>
            <p class="cell_info">合同金额：&nbsp;&nbsp;{{agreementDetail.amount}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;到期时间：&nbsp;&nbsp;{{agreementDetail.end_date}}</p>
            <view class="btn_group" v-if="authority">
                <i-button class="flex_btn" type="subject" size="small" @click="handleClick($event,1)">通过</i-button>
                <i-button class="flex_btn" type="ghost" size="small" @click="handleClick($event,2)">拒绝</i-button>
            </view>
            <i-cell :title="'审核状态：' + agreementDetail.auditStatus" is-link @click="toAgreeState" i-class="cell_link"></i-cell>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="跟进记录"></i-tab>
                <i-tab key="second" title="基本信息"></i-tab>
                <i-tab key="third" title="相关信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'" class="follow_view">
            <view v-for="item in followData" :key="item.id">
                <i-panel :title="item.createTime" i-class="vice_panel"></i-panel>
                <i-fiche full isContent isFooter :title="item.contacts[0].name" :thumb="item.portrait">
                    <view slot="content"><rich-text :nodes="item.followContent" /></view>
                    <view slot="footer">
                        <span class="bgc_span">{{item.followType}}</span>
                        <span v-if="item.contactTime">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="bgc_span" v-if="item.contactTime">{{item.contactTime}}</span>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <span>{{item.inputType}}</span>
                        <br/>
                        <image v-if="item.followImg" mode="scaleToFill" :src="item.followImg" class="follow_image"></image>
                    </view>
                </i-fiche>
            </view>
        </view>

        <view v-if="activeName == 'second'" class="font_size_12">
            <i-cell-group>
                <i-cell title="公司名称" :value="agreementDetail.poolName"></i-cell>
                <i-cell title="客户签约人" :value="agreementDetail.signatories"></i-cell>
                <i-cell title="电话" :value="agreementDetail.phone"></i-cell>
                <i-cell title="合同类型" :value="agreementDetail.contract_type"></i-cell>
                <i-cell title="合同开始时间" :value="agreementDetail.start_date"></i-cell>
                <i-cell title="合同结束时间" :value="agreementDetail.end_date"></i-cell>
                <i-cell title="合同金额" :value="agreementDetail.amount"></i-cell>
                <i-cell title="关联商机" :value="agreementDetail.opportunity_name"></i-cell>
                <i-cell title="创建时间" :value="agreementDetail.create_time"></i-cell>
                <i-cell title="我方签约人" :value="agreementDetail.our_signatories"></i-cell>
                <i-cell title="部门" :value="agreementDetail.deptname"></i-cell>
                <i-cell title="机构" :value="agreementDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'" class="font_size_12">
            <i-card full desc title="回款计划">
                <span slot="desc" @click="topayPlan">+</span>
                <i-cell slot="content" i-class="card_cell" v-for="item in payPlanData" :key="item.id" :title="item.stage" :value="item.price + '元'" :label="'预计回款日期：' + item.date"></i-cell>
            </i-card>
            <view class="detail_module"></view>
            <i-card full desc title="回款信息">
                <span slot="desc" @click="topayInfo">+</span>
                <i-cell slot="content" i-class="card_cell" v-for="item in payInfoData" :key="item.id" :title="item.back_plan" :label="'回款日期：' + item.createTime">
                    <view slot="footer">
                        <p>{{item.price + '元'}}</p>
                        <p class="gray_12">{{item.pay_type}}</p>
                    </view>
                </i-cell>
            </i-card>
        </view>

        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="brush" icon="brush" current-icon="brush" title="写跟进"></i-tab-bar-item>
            <i-tab-bar-item key="addressbook" icon="addressbook" current-icon="addressbook" title="打电话"></i-tab-bar-item>
            <i-tab-bar-item key="trash" icon="trash" current-icon="trash" title="删除"></i-tab-bar-item>
        </i-tab-bar>

        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="deleteAgree" :mask-closable="false">
            <view slot="header" style="padding: 16px">
                <view style="color: #444;font-size: 16px">确定吗？</view>
                <text>删除后无法恢复哦</text>
            </view>
        </i-action-sheet>
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
                current: '合同详情',

                agreementDetail:{},
                checkStatus:'',
                examineRecordId:'',
                authority:false,

                activeName:'first',

                followData:[],
                payPlanData:[],
                payInfoData:[],

                activeBar:'',
                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#f56c6c'
                    }
                ],

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
                const _this = this
                this.agreementDetail = config.information.agreementDetailData
                // let info = config.information.agreementDetailData
                // let data = {
                //     contractId: info.contract_id
                // }

                // wx.request({
                //     method:'post',
                //     url: config.defaulthost + 'backPlan/selectBackPlanByContractId.do?cId=' + config.userData.cId,  //接口地址
                //     data: data,
                //     header:{
                //         "Content-Type": "application/x-www-form-urlencoded",
                //         'Cookie': config.SESSIONID
                //     },
                //     success:function(res) {
                //         _this.agreementDetail = res.data
                        _this.checkStatus = _this.agreementDetail.checkStatus
                        _this.examineRecordId = _this.agreementDetail.examineRecordId

                        _this.loadState()
                        _this.loadFollows()
                        _this.loadMoneyBack()
                //     }
                // })
            },
            loadState(){
                const _this = this

                let data = {
                    checkStatus: this.checkStatus,
                    recordId: this.examineRecordId,
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
            loadFollows(){
                const _this = this
                let data = {
                    contract_id: this.agreementDetail.contract_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getFollowByOpportunityIdOrContractId.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        info.forEach(el => {
                            if(el.userImagName){
                                el.portrait = config.sourcehost + 'upload/' + config.userData.cId + '/' + el.userImagName
                            }else{
                                el.portrait = config.sourcehost + 'upload/staticImg/avatar.jpg'
                            }

                            if(el.imgName){
                                el.followImg = config.sourcehost + 'upload/' + config.userData.cId + '/' + el.imgName
                            }else{
                                el.followImg = ''
                            }
                            el.followContent = el.followContent.replace(/\n/g, '<br/>')
                            el.followContent = '<div>' + el.followContent + '</div>'
                        });

                        _this.followData = info
                    }
                })
            },
            loadMoneyBack(){
                const _this = this
                let data = {
                    contract_id: this.agreementDetail.contract_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'backPlan/selectBackPlanByContractId.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        config.information.payplanData = res.data
                        _this.payPlanData = res.data
                    }
                })

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'back/selectBackByContactId.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        config.information.payinfoData = res.data
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
                    id: this.agreementDetail.contract_id,
                    recordId: this.agreementDetail.examineRecordId,
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
                    id: this.agreementDetail.contract_id,
                    recordId: this.agreementDetail.examineRecordId,
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
            toAgreeState(){
                const url = '../agreementState/main'
                mpvue.navigateTo({ url })
            },

            tabClick(e){
                this.activeName = e.target.key
            },
            topayPlan(e){
                const url = '../paymentPlan/main'
                mpvue.navigateTo({ url })
            },
            topayInfo(){
                const url = '../paymentInfo/main'
                mpvue.navigateTo({ url })
            },
            
            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'brush'){
                    const url = '../agreementFollow/main'
                    mpvue.navigateTo({ url })
                }else if(key == 'addressbook'){
                    this.telephoneCall()
                }else if(key == 'trash'){
                    this.showDetele = true
                }
            },
            telephoneCall(){
                let phoneNum = this.agreementDetail.phone
                if(phoneNum){
                    wx.makePhoneCall({
                        phoneNumber: phoneNum
                    })
                }else{
                    $Toast({
                        content: '无法呼叫，请添加手机号码',
                        type: 'error'
                    });
                }
            },
            cancelDelete(){
                this.showDetele = false
            },
            deleteAgree(){
                const _this = this
                let data = {
                    ids: this.agreementDetail.contract_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'delContract.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data == 'success'){
                            $Message({
                                content: '删除成功',
                                type: 'success'
                            });
                            _this.toAgreement()
                        }else if(res.data.msg && res.data.msg == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                            _this.cancelDelete()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toAgreement(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
    .agree_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px;
    }
</style>