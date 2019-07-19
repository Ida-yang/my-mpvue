<template>
    <div class="clue_detail">
        <i-cell :title="clueData.name">
            <p class="clueInfo">联系人姓名：&nbsp;&nbsp;{{clueContact.coName}}</p>
            <p class="clueInfo">联系人手机：&nbsp;&nbsp;{{clueContact.phone || '无'}}</p>
            <p class="clueInfo">详细地址：&nbsp;&nbsp;&nbsp;&nbsp;{{clueData.address || '无'}}</p>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="跟进记录"></i-tab>
                <i-tab key="second" title="联系人"></i-tab>
                <i-tab key="third" title="基本信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'" class="follow_view">
            <!-- <i-cell-group>
                <i-cell title=" " v-for="item in followData" :key="item.id">
                    <p class="follow_content">
                        <span class="contact_span1">{{item.contacts[0].name}}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span class="contact_span2">{{item.createTime}}</span>
                        <span class="contact_span1">&nbsp;&nbsp;&nbsp;{{item.state}}&nbsp;&nbsp;&nbsp;</span>
                        <span class="contact_way">{{item.followType}}</span>
                    </p>
                    <p class="follow_content">{{item.followContent}}</p>
                    <p class="follow_content contact_span2">{{item.inputType}}&nbsp;&nbsp;{{item.contactTime}}</p>
                </i-cell>
            </i-cell-group> -->
            <view v-for="item in followData" :key="item.id">
                <i-panel :title="item.createTime" i-class="vice_panel"></i-panel>
                <i-fiche full :title="item.contacts[0].name" :extra="item.state" :thumb="item.portrait">
                    <view slot="content">{{item.followContent}}</view>
                    <view slot="footer">
                        {{item.inputType}}&nbsp;&nbsp;&nbsp;&nbsp;
                        <span v-if="item.contactTime">下次联系时间：{{item.contactTime}}</span>
                        <br/>
                        <image v-if="item.followImg" mode="scaleToFill" :src="item.followImg" class="follow_image"></image>
                    </view>
                </i-fiche>
            </view>
            
        </view>

        <view v-if="activeName == 'second'" class="font_size_12">
            <i-cell-group v-for="item in contactData" :key="item.id">
                <i-cell title="联系人" :value="item.name"></i-cell>
                <i-cell title="手机号码" :value="item.phone"></i-cell>
            </i-cell-group>
            <!-- <i-card v-for="item in contactData" :key="item.id" :title="item.name" :extra="item.isCrux" class="margin_card">
                <view slot="content">{{item.phone || '无'}}</view>
            </i-card> -->
        </view>

        <view v-if="activeName == 'third'" class="font_size_12">
            <i-cell-group>
                <i-cell title="公司名称" :value="clueData.name"></i-cell>
                <i-cell title="负责人" :value="clueData.privateUser[0].private_employee"></i-cell>
                <i-cell title="线索状态" :value="clueData.state"></i-cell>
                <i-cell title="未联系天数" :value="clueData.dayNum"></i-cell>
                <i-cell title="创建时间" :value="clueData.createTime"></i-cell>
            </i-cell-group>
        </view>

        <!-- 更多 -->
        <!-- <i-button @click="moreOptions" type="ghost" :long="true" class="bottom_btn">更多</i-button> -->
        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="brush" icon="brush" current-icon="brush" title="写跟进"></i-tab-bar-item>
            <i-tab-bar-item key="addressbook" icon="addressbook" current-icon="addressbook" title="打电话"></i-tab-bar-item>
            <i-tab-bar-item key="more" icon="more" current-icon="more" title="更多"></i-tab-bar-item>
        </i-tab-bar>
        <i-action-sheet :visible="showOptions" :actions="optionList" show-cancel @cancel="optionCencel" @change="optionChange" />
        <i-toast id="toast" />

    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '线索详情',
                clueData:{},
                clueContact:{},
                clue_id:7029,

                activeName:'first',
                collapseName:'one',

                typeData:[],
                stateList:[],

                followData:[],
                contactData:[],

                showOptions:false,
                optionList:[
                    {name:'转移至客户'},
                    {name:'转移至线索池'},
                ],

                activeBar:''
            }
        },

        mounted(){
            this.loadType()
            this.loadData()
        },

        methods: {
            loadData(){
                console.log(config.information.clueDetailData)
                this.clueData = config.information.clueDetailData
                this.clueContact = config.information.clueDetailData.contacts[0]
                // this.clueData = {id:7057}

                this.loadFollows()
                this.loadContacts()
            },
            loadFollows(){
                const _this = this
                let data = {
                    customertwoId:this.clueData.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getFollowStaff.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        // _this.followData = res.data.map.success
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
                        });

                        _this.followData = info
                    }
                })
            },
            loadContacts(){
                const _this = this
                let data = {
                    customeroneId:this.clueData.id,
                    page:1,
                    limit:50,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/getClueContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:function(res) {
                        _this.contactData = res.data.map.success
                    }
                })
            },
            loadType(){
                const _this = this
                _this.stateList = []

                wx.request({
                    url: config.defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + config.userData.cId,  //接口地址
                    data: {
                        type: '线索状态'
                    },
                    success: function (res) {
                        _this.typeData = res.data
                        let info = res.data
                        info.forEach(el => {
                            _this.stateList.push({name:el.typeName})
                        });
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
                }else if(key == 'more'){
                    this.moreOptions()
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
                    this.transferToCustomer()
                }else if(index === 1){
                    this.transferTocluePool()
                }
                this.showOptions = false
            },
            toAddFollow(){
                const url = '../clueFollow/main'
                mpvue.navigateTo({ url })
            },
            telephoneCall(){
                let phoneNum = this.clueContact.phone
                if(phoneNum){
                    wx.makePhoneCall({
                        phoneNumber: phoneNum //仅为示例，并非真实的电话号码
                    })
                }else{
                    $Toast({
                        content: '无法呼叫，请添加手机号码',
                        type: 'error'
                    });
                }
            },
            // 转移至客户
            transferToCustomer(){
                const _this = this
                let data = {
                    id: this.clueData.id,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                }

                wx.request({
                    methods: 'post',
                    url: config.defaulthost + 'customerTwo/insert.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        let info = res.data
                        if(res.data.code && res.data.code == '200'){
                            $Toast({
                                content: '转移成功',
                                type: 'success'
                            });
                            _this.toClue()
                        }else if(res.data.msg && res.data.msg == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }else{
                            $Toast({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            // 转移至线索池
            transferTocluePool(){
                const _this = this
                let data = {
                    id: this.clueData.id,
                }

                wx.request({
                    methods: 'post',
                    url: config.defaulthost + 'customerTwo/updateState.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        let info = res.data
                        if(res.data.code && res.data.code == '200'){
                            $Toast({
                                content: '转移成功',
                                type: 'success'
                            });
                            _this.toClue()
                        }else if(res.data.msg && res.data.msg == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }else{
                            $Toast({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toClue(){
                const url = '../main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .clue_detail{
        background-color: #f5f5f5;
        margin-bottom: 60px;
    }
    .clueInfo{
        font-size: 12px;
        color: #80848f;
        padding-top: 6px;
        box-sizing: border-box
    }
</style>