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
            <i-cell :title="'审核状态：' + outworkData.checkState" i-class="cell_link"></i-cell>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="审核历史"></i-tab>
                <i-tab key="second" title="基本信息"></i-tab>
                <i-tab key="third" title="相关信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'" class="white_bg">
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

        <view v-if="activeName == 'second'">
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

        <view v-if="activeName == 'third'">
            <i-card full isContent title="执行结果" :extra="outworkData.state">
                <view slot="content">
                    <p>签到时间：{{outworkData.timeCheck || ''}}</p>
                    <p>签到地址：{{outworkData.addressCheck || ''}}</p>
                    <br/>
                    <image v-if="outworkData.photoName" mode="scaleToFill" :src="outworkData.photoName" class="follow_image"></image>
                </view>
            </i-card>
            <view class="detail_module"></view>
            <i-card full isContent title="打分" :extra="outworkData.state">
                <view slot="content">
                    <i-rate 
                        @change="changeStar" 
                        :value="starIndex">
                        {{scoreIndex}}
                    </i-rate>
                </view>
            </i-card>
        </view>
        
        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="coordinates" icon="coordinates" current-icon="coordinates" title="签到"></i-tab-bar-item>
            <i-tab-bar-item key="success" icon="success" current-icon="success" title="已完成"></i-tab-bar-item>
            <i-tab-bar-item key="collection" icon="collection" current-icon="collection" title="打分"></i-tab-bar-item>
            <i-tab-bar-item key="more" icon="more" current-icon="more" title="更多"></i-tab-bar-item>
        </i-tab-bar>

        <i-modal title="请填写审核意见" :visible="showSure" @ok="adopt" @cancel="cancelClick($event,1)">
            <i-input v-model="remarks" right type="textarea" request maxlength="200" @input="handleInput" />
        </i-modal>
        <i-modal title="请填写审核意见" :visible="showRefuse" @ok="refuse" @cancel="cancelClick($event,2)">
            <i-input v-model="remarks" right type="textarea" request maxlength="200" @input="handleInput" />
        </i-modal>
        <i-action-sheet :visible="showMore" :actions="moreActions" show-cancel @cancel="cancelMore" @change="changeOption" :mask-closable="false"></i-action-sheet>
        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="deleteOutwork" :mask-closable="false">
            <view slot="header" style="padding: 16px">
                <view style="color: #444;font-size: 16px">确定吗？</view>
                <text>删除后无法恢复哦</text>
            </view>
        </i-action-sheet>
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '外勤详情',

                outworkData:{},
                authority:false,

                activeName:'first',

                stepIndex:-1,
                auditLog:[],
                
                activeBar:'',
                showMore:false,
                moreActions:[
                    {name:'未完成'},
                    {name:'作废'},
                    {name:'删除'},
                ],
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

                starIndex:0,
                scoreIndex:0,

                nowTime:'',
                
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.information.outworkDetailData
                this.outworkData = info

                this.loadVisit()
            },

            loadVisit(){
                const _this = this
                let data = {
                    id: this.outworkData.id
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
                        if(info.checkStatus == 0){
                            info.checkState = '待审核'
                        }else if(info.checkStatus == 1){
                            info.checkState = '审核中'
                        }else if(info.checkStatus == 2){
                            info.checkState = '已审核'
                        }else if(info.checkStatus == 3){
                            info.checkState = '未通过'
                        }

                        if(info.photoCheck){
                            info.photoName = config.sourcehost + 'upload/' + config.userData.cId + '/' + info.photoCheck
                        }

                        if(info.score){
                            _this.starIndex = parseInt(info.score)
                            _this.scoreIndex = _this.starIndex * 2
                        }
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

                        if(info.isCheck == 1 && _this.outworkData.checkStatus !== 2){
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

            loadTime(){
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let min = date.getMinutes()
                let sec = date.getSeconds()

                month = (month < 10 ? "0" + month : month)
                day = (day < 10 ? "0" + day : day)
                hour = (hour < 10 ? "0" + hour : hour)
                min = (min < 10 ? "0" + min : min)
                sec = (sec < 10 ? "0" + sec : sec)

                this.nowTime = year + '-' +month + '-' + day + ' ' + hour + ':' + min + ':' + sec
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
                    id: this.outworkData.id,
                    recordId: this.outworkData.examineRecordId,
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
                            _this.loadVisit()
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
                    id: this.outworkData.id,
                    recordId: this.outworkData.examineRecordId,
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
                            _this.loadVisit()
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

            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'coordinates'){
                    this.signIn()
                }else if(key == 'success'){
                    this.complete()
                }else if(key == 'collection'){
                    this.score()
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
                    this.incomplete()
                }else if(index === 1){
                    this.nullify()
                }else if(index === 2){
                    if(this.outworkData.state == '已完成' || this.outworkData.state == '作废' || this.outworkData.checkStatus == 2){
                        $Toast({
                            content: '不可删除',
                            type: 'warning'
                        });
                    }else{
                        this.showDetele = true
                    }
                }
                this.showMore = false
            },
            
            cancelDelete(){
                this.showDetele = false
            },

            incomplete(){
                const _this = this
                if(this.outworkData.state == '已完成'){
                    $Toast({
                        content: '该外勤已经是完成状态',
                        type: 'warning'
                    });
                }else{
                    this.loadTime()
                    
                    let data = {
                        id: this.outworkData.id,
                        state: '已完成',
                        updateTime: this.nowTime
                    }

                    wx.request({
                        method:'post',
                        url: config.defaulthost + 'visit/updateVisitState.do?cId=' + config.userData.cId,  //接口地址
                        data: data,
                        header:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            if(res.data.code && res.data.code == "200"){
                                $Message({
                                    content: '已修改为未完成',
                                    type: 'success'
                                });
                                _this.loadVisit()
                            }else{
                                $Message({
                                    content: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    })
                }
            },
            complete(){
                const _this = this
                if(!this.outworkData.timeCheck){
                    // console.log('没有签到')
                    $Toast({
                        content: '该外勤未签到',
                        type: 'warning'
                    });
                }else if(this.outworkData.state == '已完成'){
                    $Toast({
                        content: '该外勤已完成',
                        type: 'warning'
                    });
                }else{
                    this.loadTime()

                    let data = {
                        id: this.outworkData.id,
                        state: '已完成',
                        updateTime: this.nowTime
                    }

                    wx.request({
                        method:'post',
                        url: config.defaulthost + 'visit/updateVisitState.do?cId=' + config.userData.cId,  //接口地址
                        data: data,
                        header:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            if(res.data.code && res.data.code == "200"){
                                $Message({
                                    content: '已完成',
                                    type: 'success'
                                });
                                _this.loadVisit()
                            }else{
                                $Message({
                                    content: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    })
                }
            },
            nullify(){
                const _this = this

                if(this.outworkData.state == '已完成'){
                    $Toast({
                        content: '该外勤已经是完成状态',
                        type: 'warning'
                    });
                }else{
                    this.loadTime()
                    
                    let data = {
                        id: this.outworkData.id,
                        state: '已完成',
                        updateTime: this.nowTime
                    }

                    wx.request({
                        method:'post',
                        url: config.defaulthost + 'visit/updateVisitState.do?cId=' + config.userData.cId,  //接口地址
                        data: data,
                        header:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            if(res.data.code && res.data.code == "200"){
                                $Message({
                                    content: '作废成功',
                                    type: 'success'
                                });
                                _this.loadVisit()
                            }else{
                                $Message({
                                    content: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    })
                }
            },
            deleteOutwork(){
                const _this = this
                let data = {
                    id: this.outworkData.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'visit/deleteVisit.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.success && res.data.success == true){
                            $Message({
                                content: '删除成功',
                                type: 'success'
                            });
                            _this.tooutwork()
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
            signIn(){
                if(this.outworkData.timeCheck){
                    $Toast({
                        content: '该外勤已签到',
                        type: 'warning'
                    });
                }else if(this.outworkData.checkStatus !== 2){
                    $Toast({
                        content: '该外勤非已审核状态',
                        type: 'warning'
                    });
                }else{
                    const url = '../signIn/main'
                    mpvue.navigateTo({ url })
                }
            },

            changeStar(e){
                let index = e.target.index
                this.starIndex = index
                this.scoreIndex = index * 2
            },
            score(){
                const _this = this
                if(this.outworkData.state !== '已完成'){
                    $Toast({
                        content: '该外勤不是完成状态',
                        type: 'warning'
                    });
                }else if(this.scoreIndex == 0){
                    $Toast({
                        content: '请先选择评分等级',
                        type: 'warning'
                    });
                }else{
                    let data = {
                        id: this.outworkData.id,
                        score: this.starIndex
                    }

                    wx.request({
                        method:'post',
                        url: config.defaulthost + 'visit/updateVisitState.do?cId=' + config.userData.cId,  //接口地址
                        data: data,
                        header:{
                            "Content-Type": "application/x-www-form-urlencoded",
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            if(res.data.code && res.data.code == "200"){
                                $Message({
                                    content: '打分成功',
                                    type: 'success'
                                });
                                _this.loadVisit()
                            }else{
                                $Message({
                                    content: res.data.msg,
                                    type: 'error'
                                });
                            }
                        }
                    })
                }
            },

            tooutwork(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .out_work_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
</style>