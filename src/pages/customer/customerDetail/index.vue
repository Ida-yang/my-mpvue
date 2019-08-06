<template>
    <div class="customer_detail">
        <i-cell :title="customerData.pName">
            <p class="cell_info">联系人姓名：&nbsp;&nbsp;{{customerContact.coName}}</p>
            <p class="cell_info">联系人手机：&nbsp;&nbsp;{{customerContact.phone || '无'}}</p>
            <p class="cell_info">详细地址：&nbsp;&nbsp;&nbsp;&nbsp;{{customerData.address || '无'}}</p>
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
                <i-fiche full isContent isFooter :title="item.contacts[0].name" :extra="item.state" :thumb="item.portrait">
                    <view slot="content"><rich-text :nodes="item.followContent" /></view>
                    <view slot="footer">
                        <span class="bgc_span">{{item.followType}}</span>
                        <span v-if="item.contactTime">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span class="bgc_span" v-if="item.contactTime">{{item.contactTime}}</span>
                        <!-- <span class="bgc_span" v-if="item.contactTime">下次联系时间：{{item.contactTime}}</span> -->
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
                <i-cell title="公司名称" :value="customerData.pName"></i-cell>
                <i-cell title="客户状态" :value="customerData.source"></i-cell>
                <i-cell title="未联系天数" :value="customerData.dayNum"></i-cell>
                <i-cell title="创建时间" :value="customerData.createTime"></i-cell>
                <i-cell title="负责人" :value="customerData.privateUser[0].private_employee"></i-cell>
                <i-cell title="部门" :value="customerData.deptname"></i-cell>
                <i-cell title="机构" :value="customerData.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'" class="font_size_12">
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
            <i-tab-bar-item key="brush" icon="brush" current-icon="brush" title="写跟进"></i-tab-bar-item>
            <i-tab-bar-item key="addressbook" icon="addressbook" current-icon="addressbook" title="打电话"></i-tab-bar-item>
            <i-tab-bar-item key="send" icon="send" current-icon="send" title="转移至客户池"></i-tab-bar-item>
        </i-tab-bar>
        <i-action-sheet :visible="showOptions" :actions="optionList" show-cancel @cancel="optionCencel" @change="optionChange" />
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
                current: '客户详情',

                customerData:{},
                customerContact:{},

                activeName:'first',

                followData:[],
                contactData:[],
                opportunityData:[],
                agreementData:[],
                outWordAddTaskDara:[],

                showOptions:false,
                optionList:[
                    {name:'转移至客户池'},
                ],

                activeBar:''
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                this.customerData = config.information.customerDetailData
                this.customerContact = config.information.customerDetailData.contacts[0]

                this.activeBar = ''

                this.loadFollows()
                this.loadOthers()
            },
            loadFollows(){
                const _this = this
                let data = {
                    customerpool_id:this.customerData.id
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
                    customerpool_id:this.customerData.id,
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
                console.log(val)
                let key = val.target.key
                this.activeBar = key
                if(key == 'brush'){
                    this.toAddFollow()
                }else if(key == 'addressbook'){
                    this.telephoneCall()
                }else if(key == 'send'){
                    this.transferTocustomerPool()
                }
            },
            moreOptions(){
                this.showOptions = true
            },
            optionCencel(){
                this.showOptions = false
            },
            optionChange(val){
                let index = val.target.index
                if(index === 0){
                    this.transferTocustomerPool()
                }
                this.showOptions = false
            },
            toAddFollow(){
                const url = '../customerFollow/main'
                mpvue.navigateTo({ url })
            },
            telephoneCall(){
                let phoneNum = this.customerContact.phone
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
            // 转移至客户池
            transferTocustomerPool(){
                const _this = this
                let data = {
                    id: this.customerData.id,
                }

                wx.request({
                    methods: 'post',
                    url: config.defaulthost + 'customerpool/updateTo.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '转移成功',
                                type: 'success'
                            });
                            _this.toCustomer()
                        }else if(res.data.msg && res.data.msg == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toCustomer(){
                // const url = '../main'
                // mpvue.navigateTo({ url })
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .customer_detail{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
</style>