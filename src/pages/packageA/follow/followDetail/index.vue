<template>
    <div class="follow_detail_wrap">
        <i-cell :title="numData.corporateName">
            <p class="cell_info">总联系人：{{numData.contactsTotal}}人&nbsp;&nbsp;|&nbsp;&nbsp;联系过其中：{{numData.contactsIng}}人</p>
            <p class="cell_info">总联系次数：{{numData.contactsNum}}次&nbsp;&nbsp;|&nbsp;&nbsp;最近联系：&nbsp;&nbsp;{{numData.contact_time}}</p>
            <p class="cell_info">距上次联系天数：{{numData.distanceDayNum}}天</p>
        </i-cell>

        <i-panel title=" ">
            <i-tabs :current="activeName" @change="tabClick">
                <i-tab key="first" title="跟进记录"></i-tab>
                <!-- <i-tab key="second" title="基本信息"></i-tab>
                <i-tab key="third" title="相关信息"></i-tab> -->
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
    </div>
</template>

<script>
    import config from '../../../../config'

    export default {
        data(){
            return{
                curent:'跟进记录详情页',

                customertwoId:'',
                customerpool_id:'',

                numData:{},

                activeName:'first',

                followData:[]
            }
        },

        mounted(){
            this.loadData()
        },

        methods:{
            loadData(){
                let info = config.information.followDetailData
                
                if(info.customertwo_id){
                    this.customertwoId = info.customertwoId
                    this.customerpool_id = ''
                    this.loadClueFollow()
                }
                if(info.customerpool_id){
                    this.customerpool_id = info.customerpool_id
                    this.customertwoId = ''
                    this.loadCusFollow()
                }

                this.loadOther()
            },
            loadOther(){
                const _this = this
                let data = {
                    customerPoolId: this.customerpool_id,
                    customertwoId: this.customertwoId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'follow/getFollowForSmallProcedures.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.numData = res.data
                    }
                })
            },
            loadClueFollow(){
                const _this = this
                let data = {
                    customertwoId: this.customertwoId
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
                            el.followContent = el.followContent.replace(/\n/g, '<br/>')
                            el.followContent = '<div>' + el.followContent + '</div>'
                        });

                        _this.followData = info
                    }
                })
            },
            loadCusFollow(){
                const _this = this
                let data = {
                    customerpool_id: this.customerpool_id
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
            },

            tabClick(e){
                this.activeName = e.target.key
            },
        }
    }
</script>

<style>
    .follow_detail_wrap{
        background-color: #f5f5f5
    }
</style>
