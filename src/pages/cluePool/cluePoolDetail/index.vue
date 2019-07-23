<template>
    <div class="clue_pool_detail">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="cluePoolDetail.name">
            <p class="cell_info">联系人姓名：&nbsp;&nbsp;{{cluePoolContact.coName}}</p>
            <p class="cell_info">联系人手机：&nbsp;&nbsp;{{cluePoolContact.phone || '无'}}</p>
            <p class="cell_info">详细地址：&nbsp;&nbsp;&nbsp;&nbsp;{{cluePoolDetail.address || '无'}}</p>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="跟进记录"></i-tab>
                <i-tab key="second" title="联系人"></i-tab>
                <i-tab key="third" title="基本信息"></i-tab>
            </i-tabs>
        </i-panel>

        <view v-if="activeName == 'first'" class="follow_view">
            <view v-for="item in followData" :key="item.id">
                <i-panel :title="item.createTime" i-class="vice_panel"></i-panel>
                <i-fiche full :title="item.contacts[0].name" :extra="item.state" :thumb="item.portrait">
                    <view slot="content">{{item.followContent}}</view>
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
            <i-cell-group v-for="item in contactData" :key="item.id">
                <i-cell title="联系人" :value="item.name"></i-cell>
                <i-cell title="手机号码" :value="item.phone"></i-cell>
            </i-cell-group>
        </view>

        <view v-if="activeName == 'third'" class="font_size_12">
            <i-cell-group>
                <i-cell title="公司名称" :value="cluePoolDetail.name"></i-cell>
                <i-cell title="负责人" :value="cluePoolDetail.privateUser[0].private_employee"></i-cell>
                <i-cell title="线索状态" :value="cluePoolDetail.state"></i-cell>
                <i-cell title="未联系天数" :value="cluePoolDetail.dayNum"></i-cell>
                <i-cell title="创建时间" :value="cluePoolDetail.createTime"></i-cell>
            </i-cell-group>
        </view>

        <!-- 更多 -->
        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="receive" icon="group" current-icon="group" title="领取"></i-tab-bar-item>
            <i-tab-bar-item key="distribute" icon="share" current-icon="share" title="分配"></i-tab-bar-item>
            <i-tab-bar-item key="trash" icon="trash" current-icon="trash" title="删除"></i-tab-bar-item>
        </i-tab-bar>

        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDalete" @click="clickDelete" :mask-closable="false">
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
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '线索池详情',

                cluePoolDetail:{},
                cluePoolContact:{},

                activeName: 'first',

                followData:[],
                contactData:[],

                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#ed3f14'
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
                // console.log(config.information.cluePoolDetailData)
                this.cluePoolDetail = config.information.cluePoolDetailData
                this.cluePoolContact = config.information.cluePoolDetailData.contacts[0]

                this.loadFollows()
                this.loadContacts()
            },
            loadFollows(){
                const _this = this
                let data = {
                    customertwoId:this.cluePoolDetail.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getFollowStaff.do?cId=' + config.userData.cId,  //接口地址
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
                        });

                        _this.followData = info
                    }
                })
            },
            loadContacts(){
                const _this = this
                let data = {
                    customeroneId:this.cluePoolDetail.id,
                    page:1,
                    limit:50,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/getClueContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.contactData = res.data.map.success
                    }
                })
            },
            tabClick(e){
                this.activeName = e.target.key
            },

            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'receive'){
                    this.receiveItem()
                }else if(key == 'distribute'){
                    this.distributeItem()
                }else if(key == 'trash'){
                    this.deleteItem()
                }
            },
            receiveItem(){
                const _this = this
                console.log(this.cluePoolDetail.id)
                let data = {
                    ids: this.cluePoolDetail.id,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/receiveClue.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toCluePool()
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
                const _this = this
                console.log(this.cluePoolDetail.id)
            },

            deleteItem(){
                this.showDetele = true
            },
            cancelDalete(){
                this.showDetele = false
            },
            clickDelete(){
                const _this = this
                console.log(this.cluePoolDetail.id)
                let data = {

                }
            },

            toCluePool(){
                const url = '../main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style scoped>
</style>