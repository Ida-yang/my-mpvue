<template>
    <div class="oppo_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="opportunityDetail.opportunity_name">
            <p class="cell_info">商机编号：&nbsp;&nbsp;{{opportunityDetail.opportunity_number}}</p>
            <p class="cell_info">预计成交金额：&nbsp;&nbsp;{{opportunityDetail.opportunity_achievement}}&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;时间：&nbsp;&nbsp;{{opportunityDetail.opportunity_deal}}</p>
            <i-cell :title="'商机阶段：' + opportunityDetail.opportunityProgress[0].progress_name" is-link @click="toOpportunityStage" i-class="cell_link">
                <!-- <i-icon slot="icon" type="homepage_fill" /> -->
            </i-cell>
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
                <i-cell title="公司名称" :value="opportunityDetail.customerpool[0].name"></i-cell>
                <i-cell title="客户决策人" :value="opportunityDetail.contacts[0].coName"></i-cell>
                <i-cell title="电话" :value="opportunityDetail.phone"></i-cell>
                <i-cell title="项目阶段" :value="opportunityDetail.opportunityProgress[0].progress_name"></i-cell>
                <i-cell title="预计成交时间" :value="opportunityDetail.opportunity_deal"></i-cell>
                <i-cell title="预计成交金额" :value="opportunityDetail.opportunity_achievement"></i-cell>
                <i-cell title="签约时间" :value="opportunityDetail.signingTime"></i-cell>
                <i-cell title="失败时间" :value="opportunityDetail.failureTime"></i-cell>
                <i-cell title="创建时间" :value="opportunityDetail.opportunity_time"></i-cell>
                <i-cell title="创建人" :value="opportunityDetail.private_employee"></i-cell>
                <i-cell title="部门" :value="opportunityDetail.deptname"></i-cell>
                <i-cell title="机构" :value="opportunityDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'">
            <i-card full title="联系人">
                <i-cell slot="content" i-class="card_cell" v-for="item in contactData" :key="item.id" :title="item.name" :value="item.phone"></i-cell>
            </i-card>
            <view class="detail_module"></view>
            <i-card full title="竞争对手">
                <i-cell slot="content" i-class="card_cell" v-for="item in competitorData" :key="item.id" :title="item.name" :value="item.contacts"></i-cell>
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
        </view>

        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="brush" icon="brush" current-icon="brush" title="写跟进"></i-tab-bar-item>
            <i-tab-bar-item key="addressbook" icon="addressbook" current-icon="addressbook" title="打电话"></i-tab-bar-item>
            <i-tab-bar-item key="trash" icon="trash" current-icon="trash" title="删除"></i-tab-bar-item>
        </i-tab-bar>
        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="deleteOppo" :mask-closable="false">
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
                current: '商机详情',

                opportunityDetail:{},

                activeName:'first',
                followData:[],
                contactData:[],
                competitorData:[],
                agreementData:[],

                activeBar:'',
                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#f56c6c'
                    }
                ]
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                
                let opportunityinfo = config.information.opportunityDetailData
                let data = {
                    opportunity_id: opportunityinfo.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'opportunity/getopportunityById.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success[0]

                        let probability = info.opportunityProgress[0].progress_probability
                        let theTime = info.opportunityProgress[0].createTime
                        if(probability == '100'){
                            info.signingTime = theTime
                        }else if(probability == '0'){
                            info.failureTime = theTime
                        }

                        _this.opportunityDetail = info

                        _this.loadFollows()
                        _this.loadOthers()
                    }
                })
            },
            loadFollows(){
                const _this = this
                let data = {
                    opportunity_id: this.opportunityDetail.opportunity_id
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
            loadOthers(){
                const _this = this
                let data = {
                    page: 1,
                    limit: 999999,
                    customerpool_id: this.opportunityDetail.customerpool_id
                }
                let data2 = {
                    oy_id: this.opportunityDetail.opportunity_id
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
                    url: config.defaulthost + 'opportunityCompetitor/selectByOpportunityId.do?cId=' + config.userData.cId,  //接口地址
                    data: data2,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.competitorData = res.data
                    }
                })
            },

            tabClick(e){
                this.activeName = e.target.key
            },
            
            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'brush'){
                    this.toAddFollow()
                }else if(key == 'addressbook'){
                    this.telephoneCall()
                }else if(key == 'trash'){
                    this.showDetele = true
                }
            },

            toAddFollow(){
                const url = '../opportunityFollow/main'
                mpvue.navigateTo({ url })
            },
            telephoneCall(){
                let phoneNum = this.opportunityDetail.phone
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
            deleteOppo(){
                const _this = this
                let data = {
                    id: this.opportunityDetail.opportunity_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'opportunity/delete.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toOpportunity()
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
            toOpportunity(){
                wx.navigateBack({
                    delta: 1,
                })
            },
            toOpportunityStage(){
                const url = '../opportunityStage/main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .oppo_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
</style>