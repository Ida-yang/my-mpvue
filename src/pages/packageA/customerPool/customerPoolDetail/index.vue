<template>
    <div class="customer_pool_detail">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="customerPoolDetail.name">
            <p class="cell_info">联系人姓名：&nbsp;&nbsp;{{customerPoolContact.coName}}</p>
            <p class="cell_info">联系人手机：&nbsp;&nbsp;{{customerPoolContact.phone || '无'}}</p>
            <p class="cell_info">详细地址：&nbsp;&nbsp;&nbsp;&nbsp;{{customerPoolDetail.address || '无'}}</p>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="跟进记录"></i-tab>
                <i-tab key="second" title="基本信息"></i-tab>
                <i-tab key="third" title="相关信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'" class="white_bg">
            <view v-for="item in followData" :key="item.id">
                <i-panel :title="item.createTime" i-class="vice_panel"></i-panel>
                <i-fiche full isContent isFooter :title="item.contacts[0].name" :extra="item.state" :thumb="item.portrait">
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

        <view v-if="activeName == 'second'">
            <i-cell-group>
                <i-cell title="公司名称" :value="customerPoolDetail.pName"></i-cell>
                <i-cell title="客户状态" :value="customerPoolDetail.source"></i-cell>
                <i-cell title="未联系天数" :value="customerPoolDetail.dayNum"></i-cell>
                <i-cell title="创建时间" :value="customerPoolDetail.createTime"></i-cell>
                <i-cell title="前负责人" :value="customerPoolDetail.privateUser[0].private_employee"></i-cell>
                <i-cell title="部门" :value="customerPoolDetail.deptname"></i-cell>
                <i-cell title="机构" :value="customerPoolDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'">
            <i-card full title="联系人">
                <i-cell slot="content" i-class="card_cell" v-for="item in contactData" :key="item.id" :title="item.name" :value="item.phone"></i-cell>
            </i-card>
            <view class="detail_module"></view>
            <i-card full title="商机">
                <i-cell slot="content" i-class="card_cell" v-for="item in opportunityData" :key="item.id" :title="item.opportunity_name" :label="item.opportunity_time">
                    <view slot="footer">
                        <span style="font-size:11px;color:#80848f">{{item.opportunity_achievement}}</span>
                        <br>
                        <span style="font-size:11px;color:#80848f">{{item.opportunityProgress[0].progress_name}}</span>
                    </view>
                </i-cell>
            </i-card>
            <view class="detail_module"></view>
            <i-card full title="合同">
                <i-cell slot="content" i-class="card_cell" v-for="item in agreementData" :key="item.id" :title="item.contract_name" :label="item.start_date">
                    <view slot="footer">
                        <span style="font-size:11px;color:#80848f">{{item.amount}}</span>
                        <br>
                        <span style="font-size:11px;color:#80848f">{{item.contract_type}}</span>
                    </view>
                </i-cell>
            </i-card>
            <view class="detail_module"></view>
            <i-card full title="任务">
                <i-cell slot="content" i-class="card_cell" v-for="item in outWordAddTaskDara" :key="item.id" :title="item.theme" :label="item.startTime">
                    <view slot="footer">
                        <span style="font-size:11px;color:#80848f">{{item.type}}</span>
                        <br>
                        <span style="font-size:11px;color:#80848f">{{item.state}}</span>
                    </view>
                </i-cell>
            </i-card>
        </view>

        <!-- 更多 -->
        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="receive" icon="group" current-icon="group" title="领取"></i-tab-bar-item>
            <i-tab-bar-item key="distribute" icon="share" current-icon="share" title="分配"></i-tab-bar-item>
            <i-tab-bar-item key="trash" icon="trash" current-icon="trash" title="删除"></i-tab-bar-item>
        </i-tab-bar>

        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="clickDelete" :mask-closable="false">
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
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '客户池详情',

                customerPoolDetail:{},
                customerPoolContact:{},

                activeName:'first',

                followData:[],
                contactData:[],
                opportunityData:[],
                agreementData:[],
                outWordAddTaskDara:[],

                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#f56c6c'
                    }
                ],

                activeBar:''
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                this.customerPoolDetail = config.information.customerPoolDetailData
                this.customerPoolContact = config.information.customerPoolDetailData.contacts[0]
                

                this.loadFollows()
                this.loadOthers()
            },
            loadFollows(){
                const _this = this
                let data = {
                    customerpool_id:this.customerPoolDetail.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/getFollowStaffAndpool.do?cId=' + config.userData.cId,  //接口地址
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

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/selectWorkPlanAndVisit.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.outWordAddTaskDara = res.data.map.workPlanAndVisit
                    }
                })
            },
            loadOthers(){
                const _this = this
                let data = {
                    customerpool_id:this.customerPoolDetail.id,
                    page:1,
                    limit:50,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/getPoolContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.contactData = res.data.map.success
                    }
                })

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/queryForPoolList.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.opportunityData = res.data.map.success
                    }
                })

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/getContractByPool.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.agreementData = res.data.map.success
                    }
                })
            },
            tabClick(e){
                this.activeName = e.target.key
            },

            changeBar(val){
                const _this = this

                let key = val.target.key
                this.activeBar = key

                if(key == 'receive'){
                    wx.request({
                        url: config.defaulthost + 'customerPoolJurisdiction/receive.do',  //接口地址
                        header:{
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            let info = res.data.msg
                            if(info == 'success'){
                                _this.receiveItem()
                            }else if(info == 'error'){
                                $Toast({
                                    content: '对不起，您没有此权限',
                                    type: 'error'
                                });
                            }
                        }
                    })
                }else if(key == 'distribute'){
                    wx.request({
                        url: config.defaulthost + 'customerPoolJurisdiction/distribution.do',  //接口地址
                        header:{
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            let info = res.data.msg
                            if(info == 'success'){
                                _this.distributeItem()
                            }else if(info == 'error'){
                                $Toast({
                                    content: '对不起，您没有此权限',
                                    type: 'error'
                                });
                            }
                        }
                    })
                }else if(key == 'trash'){
                    this.deleteItem()
                }
            },
            receiveItem(){
                const _this = this
                let data = {
                    ids: this.customerPoolDetail.id,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/receivepool.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '领取成功',
                                type: 'success'
                            });
                            _this.toCustomerPool()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },

            distributeItem(){
                const url = '../userList/main'
                mpvue.navigateTo({ url })
            },

            deleteItem(){
                this.showDetele = true
            },
            cancelDelete(){
                this.showDetele = false
            },
            clickDelete(){
                const _this = this
                let data = {
                    id: this.customerPoolDetail.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/delete.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toCustomerPool()
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

            toCustomerPool(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .customer_pool_detail{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
</style>