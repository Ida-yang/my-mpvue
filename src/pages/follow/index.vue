<template>
    <view class="follow_wrap">
        <view class="search_view">
            <view class="search_box">
                <i-icon type="search" size="16" color="#80848f" class="search_icon" />
                <i-input v-model="searchList.searchName" maxlength="50" i-class="search_input" @input="handleInput($event,1)" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="search_icon" @click="closeSearch" />
            </view>
            <span class="search_btn" @click="search">搜索</span>
            <i-icon type="other" size="18" color="#80848f" class="search_icon" @click="queryCriteria" />
        </view>
        <i-drawer mode="right" :visible="searchCriteria" @close="queryCriteria">
            <view class="search_container">
                <i-panel title="数据授权" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == powerActive ? 'isActive':'']" v-for="(item,index) in powerList" :key="item.label" @click="checkCriteria(item,index,1)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="模块" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == modelActive ? 'isActive':'']" v-for="(item,index) in modelList" :key="item.label" @click="checkCriteria(item,index,2)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="跟进时间" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == timeActive ? 'isActive':'']" v-for="(item,index) in timeList" :key="item.label" @click="checkCriteria(item,index,3)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="跟进类型" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == keyTypeActive ? 'isActive':'']" v-for="(item,index) in keyTypeList" :key="item.label" @click="checkCriteria(item,index,4)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="small" long="true" class="reset_btn">重置</i-button>
            </view>
        </i-drawer>
        
        <view v-for="item in followData" :key="item.id">
            <i-panel :title="item.createTime" i-class="vice_panel"></i-panel>
            <i-fiche full isContent isFooter :title="item.contacts[0].name" :extra="item.state" :thumb="item.portrait" @click="toFollowDetail($event,item)">
                <view slot="content"><rich-text :nodes="item.followContent" /></view>
                <view slot="footer">
                    <p class="follow_cus_p">{{item.poolname}}</p>
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
</template>

<script>
    import config from '../../config'
    export default {
        data(){
            return{
                init:true,
                noMore:false,
                followData:[],

                searchList:{
                    searchName:'',
                    type: '',
                    example: '',
                    keyType: '',
                    page: 1,
                    limit: 10,
                },
                powerList:[
                    {label:'11',name:'全部'},
                    {label:'12',name:'我的'},
                    {label:'13',name:'本组'},
                    {label:'14',name:'本机构'},
                ],
                powerActive: '1',
                modelList:[
                    {label:'1',name:'线索'},
                    {label:'2',name:'客户'},
                ],
                modelActive: '-1',
                timeList:[
                    {label:'2',name:'昨天'},
                    {label:'1',name:'今天'},
                    {label:'3',name:'本周'},
                    {label:'4',name:'本月'},
                    {label:'5',name:'上月'},
                ],
                timeActive:'-1',
                keyTypeList:[
                    {label:'1',name:'电话'},
                    {label:'2',name:'QQ'},
                    {label:'3',name:'微信'},
                    {label:'4',name:'邮箱'},
                    {label:'5',name:'拜访'},
                ],
                keyTypeActive: '-1',
                

                isValue:false,
                searchCriteria:false,
            }
        },

        mounted(){
            this.init = true
            this.noMore = false
            this.searchList.page = 1
            this.loadData()
        },
        // 触底加载
        onReachBottom(){
            // console.log('碰到底部啦')
            this.searchList.page = this.searchList.page + 1
            if(this.noMore == false){
                this.loadData()
            }
        },

        methods:{
            loadData(){
                const _this = this
                let data = {
                    searchName: this.searchList.searchName,
                    type: this.searchList.type,
                    example: this.searchList.example,
                    keyType: this.searchList.keyType,
                    page: this.searchList.page,
                    limit: this.searchList.limit,
                }
                if(this.searchList.powerid == '11'){
                    data.pId = ''
                }else if(this.searchList.powerid == '12'){
                    data.pId = config.userData.pId
                }else if(this.searchList.powerid == '13'){
                    data.secondid = config.userData.second_id
                }else if(this.searchList.powerid == '14'){
                    data.deptid = config.userData.private_deptid
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'selectFollowReportForm.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
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
                        if(_this.init === true){
                            _this.followData = info
                            _this.init = false
                            // console.log('我的第一次加载')
                            wx.stopPullDownRefresh()
                        }else{
                            _this.followData = _this.followData.concat(info)
                            // console.log('我不是第一次加载了')
                            if(info.length < 10){
                                _this.noMore = true
                            }
                        }
                    }
                })
            },

            
            
            handleInput(e,val){
                if(val === 1){
                    this.searchList.searchName = e.mp.detail
                }
                if(e.mp.detail){
                    this.isValue = true
                }else{
                    this.isValue = false
                }
            },
            closeSearch(){
                this.searchList.searchName = ''
                this.isValue = false
                this.search()
            },
            search(){
                this.init = true
                this.noMore = false
                this.searchList.page = 1
                this.loadData()
            },
            queryCriteria(){
                this.searchCriteria = !this.searchCriteria
            },
            checkCriteria(item,index,val){
                if(val === 1){
                    this.powerActive = index
                    this.searchList.powerid = item.label
                }else if(val === 2){
                    this.modelActive = index
                    this.searchList.type = item.label
                }else if(val === 3){
                    this.timeActive = index
                    this.searchList.example = item.label
                }else if(val === 4){
                    this.keyTypeActive = index
                    this.searchList.keyType = item.name
                }
                this.search()
            },
            reSet(){
                this.searchList = {
                    searchName: '',
                    type: '',
                    example: '',
                    keyType: '',
                    page: 1,
                    limit: 10,
                }
                this.originActive = '-1'
                this.powerActive = '1'
                this.timeActive = '-1'
                this.init = true
                this.noMore = false
                this.loadData()
            },

            toFollowDetail(e,val){
                const url = 'followDetail/main'
                config.information.followDetailData = val
                mpvue.navigateTo({ url })
            },
        }
    }
</script>

<style>
    .follow_wrap{
        background-color: #fcfcfc;
        margin-top: 40px
    }
    .follow_cus_p{
        line-height: 24px
    }
</style>
