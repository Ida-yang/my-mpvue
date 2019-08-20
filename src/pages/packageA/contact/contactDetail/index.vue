<template>
    <div class="contact_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="contactDetail.name">
            <p class="cell_info">公司名称：&nbsp;&nbsp;{{contactDetail.poolname}}</p>
            <p class="cell_info">联系人手机：&nbsp;&nbsp;{{contactDetail.phone || '无'}}</p>
            <!-- <p class="cell_info">详细地址：&nbsp;&nbsp;&nbsp;&nbsp;{{contactDetail.address || '无'}}</p> -->
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
                <i-cell title="公司名称" :value="contactDetail.poolname"></i-cell>
                <i-cell title="是否为关键人" :value="contactDetail.isCrux"></i-cell>
                <i-cell title="电话" :value="contactDetail.telephone"></i-cell>
                <i-cell title="QQ" :value="contactDetail.qq"></i-cell>
                <i-cell title="邮箱" :value="contactDetail.email"></i-cell>
                <i-cell title="微信" :value="contactDetail.wechat"></i-cell>
                <i-cell title="性别" :value="contactDetail.sex"></i-cell>
                <i-cell title="创建时间" :value="contactDetail.createTime"></i-cell>
                <i-cell title="负责人" :value="contactDetail.private_employee"></i-cell>
                <i-cell title="部门" :value="contactDetail.deptname"></i-cell>
                <i-cell title="机构" :value="contactDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'">
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
        </view>

        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <!-- <i-tab-bar-item key="brush" icon="brush" current-icon="brush" title="写跟进"></i-tab-bar-item> -->
            <i-tab-bar-item key="addressbook" icon="addressbook" current-icon="addressbook" title="打电话"></i-tab-bar-item>
            <i-tab-bar-item key="trash" icon="trash" current-icon="trash" title="删除"></i-tab-bar-item>
        </i-tab-bar>

        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="deleteContact" :mask-closable="false">
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
                current: '联系人详情',

                contactDetail:{},

                activeName:'first',
                followData:[],
                opportunityData:[],
                agreementData:[],

                activeBar:'',
                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#f56c6c'
                    }
                ],
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                this.contactDetail = config.information.contactDetailData

                this.loadFollows()
                this.loadOppAndAgree()
            },
            loadFollows(){
                const _this = this
                let data = {
                    id: this.contactDetail.csId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'selectFollowByContactsId.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data
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
            loadOppAndAgree(){
                const _this = this
                let data = {
                    contacts_id: this.contactDetail.csId,
                    page: 1,
                    limit: 999999
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/getContractByPool.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        _this.agreementData = info
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
                        let info = res.data.map.success
                        _this.opportunityData = info
                    }
                })
            },

            tabClick(e){
                this.activeName = e.target.key
            },

            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'addressbook'){
                    this.telephoneCall()
                }else if(key == 'trash'){
                    this.showDetele = true
                }
            },

            toAddFollow(){
                const _this = this
                let data = {
                    id: this.contactDetail.csId
                }
            },
            telephoneCall(){
                let phoneNum = this.contactDetail.phone
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
            deleteContact(){
                const _this = this
                let data = {
                    id: this.contactDetail.csId
                }

                
                wx.request({
                    methods: 'post',
                    url: config.defaulthost + 'deleteContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.success && res.data.success == true){
                            $Message({
                                content: '删除成功',
                                type: 'success'
                            });
                            _this.toClue()
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
        },
    }
</script>

<style>
    .contact_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px;
    }
</style>