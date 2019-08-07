<template>
    <div class="out_work_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="outworkData.visitTheme">
            <p class="cell_info">拜访公司：&nbsp;&nbsp;{{outworkData.customerName}}</p>
            <p class="cell_info">拜访对象：&nbsp;&nbsp;{{outworkData.contactsName}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;手机号码：&nbsp;&nbsp;{{outworkData.phone || '无'}}</p>
            <!-- <p class="cell_info">拜访时间：&nbsp;&nbsp;{{outworkData.visitTime}}&nbsp;&nbsp;-&nbsp;&nbsp;{{outworkData.endTime}}</p> -->
            <p class="cell_info">拜访目的：&nbsp;&nbsp;{{outworkData.visitObjective}}</p>
            <view class="btn_group" v-if="authority">
                <i-button class="flex_btn" type="subject" size="small" @click="handleClick($event,1)">通过</i-button>
                <i-button class="flex_btn" type="ghost" size="small" @click="handleClick($event,2)">拒绝</i-button>
            </view>
            <i-cell :title="'审核状态：' + outworkData.auditStatus" i-class="cell_link"></i-cell>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="审核历史"></i-tab>
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
                <i-cell title="拜访时间" :value="outworkData.visitTime"></i-cell>
                <i-cell title="结束时间" :value="outworkData.endTime"></i-cell>
                <i-cell title="提醒时间" :value="outworkData.remindTime"></i-cell>
                <i-cell title="协助人员">
                    <span slot="footer" v-for="(item,index) in outworkData.privateUser" :key="item.private_id">
                        <span v-if="index !== 0">，</span>
                        {{item.private_name}}
                    </span>
                </i-cell>
                <i-cell title="状态" :value="outworkData.state"></i-cell>
                <i-cell title="负责人" :value="outworkData.private_employee"></i-cell>
                <i-cell title="部门" :value="outworkData.deptname"></i-cell>
                <i-cell title="机构" :value="outworkData.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'" class="font_size_12">
            <i-card full isContent title="执行结果" :extra="outworkData.state">
                <view slot="content">
                    <p>签到时间：{{outworkData.timeCheck || ''}}</p>
                    <p>签到地址：{{outworkData.addressCheck || ''}}</p>
                    <br/>
                    <image v-if="outworkData.photoCheck" mode="scaleToFill" :src="outworkData.photoCheck" class="follow_image"></image>
                </view>
            </i-card>
        </view>

        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="coordinates" icon="coordinates" current-icon="coordinates" title="签到"></i-tab-bar-item>
            <i-tab-bar-item key="collection" icon="collection" current-icon="collection" title="打分"></i-tab-bar-item>
            <i-tab-bar-item key="more" icon="more" current-icon="more" title="更多"></i-tab-bar-item>
        </i-tab-bar>
        <i-action-sheet :visible="showMore" :actions="moreActions" show-cancel @cancel="cancelMore" @change="changeOption" :mask-closable="false"></i-action-sheet>
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
                current: '外勤详情',

                visitId:'',
                outworkData:{},
                authority:false,

                activeName:'first',

                stepIndex:-1,
                auditLog:[],
                
                activeBar:'',
                showMore:false,
                moreActions:[
                    {name:'未完成'},
                    {name:'已完成'},
                    {name:'作废'},
                    {name:'删除'},
                ],
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.information.outworkDetailData
                this.outworkData = info
                this.visitId = info.id

                // this.loadVisit()
                this.loadState()
                this.loadAudit()
            },

            loadVisit(){
                const _this = this
                let data = {
                    id: this.visitId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'visit/selectVisitById.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.visit
                        info.forEach(el => {
                            if(el.checkStatus == 0){
                                el.checkState = '待审核'
                            }else if(el.checkStatus == 1){
                                el.checkState = '审核中'
                            }else if(el.checkStatus == 2){
                                el.checkState = '已审核'
                            }else if(el.checkStatus == 3){
                                el.checkState = '未通过'
                            }
                        });
                        _this.outworkData = info

                        _this.loadState()
                        _this.loadAudit()
                    }
                })
            },
            loadState(){
                const _this = this

                let data = {
                    recordId: this.outworkData.examineRecordId,
                    checkStatus: this.outworkData.checkStatus,
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
                    recordId: this.outworkData.examineRecordId
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

            tabClick(e){
                this.activeName = e.target.key
            },

            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'coordinates'){
                    this.toSignIn()
                }else if(key == 'collection'){
                    this.toscore()
                }else if(key == 'more'){
                    this.showMore = true
                }
            },
            cancelMore(){
                this.showMore = false
            },

            changeOption(val){
                let index = val.target.index
                if(index === 0){
                    this.toSignIn()
                }else if(index === 1){
                    this.toSignIn()
                }else if(index === 2){
                    this.toSignIn()
                }else if(index === 3){
                    this.toSignIn()
                }
                this.showMore = false
            },

            toSignIn(){},
            toscore(){},
        },
    }
</script>

<style>
    .out_work_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
</style>