<template>
    <div class="agreement_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <!-- 查询 -->
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
                        <span class="queryBtn" :class="[index == powerActive ? 'isActive':'']" v-for="(item,index) in powerList" :key="item.label" @click="powerCriteria(item,index,1)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="合同类型" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == predActive ? 'isActive':'']" v-for="(item,index) in predList" :key="item.label" @click="checkCriteria(item,index,2)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="新增时间" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == timeActive ? 'isActive':'']" v-for="(item,index) in timeList" :key="item.label" @click="checkCriteria(item,index,3)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="small" long="true" class="reset_btn">重置</i-button>
            </view>
        </i-drawer>

        <!-- 列表 -->
        <i-swipeout i-class="i-swipeout-demo-item" :operateWidth="60" v-for="item in tableData" :key="item.id">
            <view slot="content" @click="toAgreementDetail($event,item)">
                <i-cell 
                    i-class="cell_content" 
                    :title="item.contract_name"
                    :label="item.poolName">
                    <view class="cell_footer">
                        负责人：{{item.our_signatories}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        合同金额： {{item.amount}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        审核状态：{{item.auditStatus}}
                    </view>
                    <view class="cell_footer">
                        合同类型：{{item.contract_type}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        签约时间：{{item.start_date}}
                    </view>
                </i-cell>
            </view>
            <view slot="button" class="i-swipeout-button">
                <view class="i-swipeout-button-item" style="width:60px;background-color:#f5f5f5" @click="toUpdateAgreement($event,item)">
                    <i-icon size="24" type="editor" style="color:#80848f"></i-icon>
                </view>
            </view>
        </i-swipeout>

        <i-load-more v-if="noMore" tip="我是有底线的" :loading="false" />

        <!-- 新增 -->
        <i-button @click="toAddAgreement" type="ghost" :long="true" class="bottom_btn">新增</i-button>

        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '合同',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    type:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                },
                predList:[
                    {label:'1',name:'服务合同'},
                    {label:'2',name:'销售合同'},
                    {label:'3',name:'代理合同'},
                    {label:'4',name:'其他合同'},
                ],
                predActive:'-1',
                powerList:[
                    {label:'11',name:'全部'},
                    {label:'12',name:'我的'},
                    {label:'13',name:'本组'},
                    {label:'14',name:'本机构'},
                ],
                powerActive: '1',
                timeList:[
                    {label:'2',name:'昨天'},
                    {label:'1',name:'今天'},
                    {label:'3',name:'本周'},
                    {label:'4',name:'本月'},
                    {label:'5',name:'上月'},
                ],
                timeActive:'-1',
                

                isValue:false,
                searchCriteria:false,
            }
        },

        onShow(){
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
        // 下拉刷新
        onPullDownRefresh(){
            this.init = true
            this.noMore = false
            this.searchList.page = 1
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                let data = {
                    searchName: this.searchList.searchName,
                    type: this.searchList.type,
                    example: this.searchList.example,
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
                    url: config.defaulthost + 'getContractAll.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.map.success
                        if(_this.init === true){
                            _this.tableData = info
                            _this.init = false
                            // console.log('我的第一次加载')
                            wx.stopPullDownRefresh()
                        }else{
                            _this.tableData = _this.tableData.concat(info)
                            // console.log('我不是第一次加载了')
                            if(info.length < 10){
                                _this.noMore = true
                            }
                        }

                        _this.tableData.forEach(el => {
                            if(el.checkStatus == 0){
                                el.auditStatus = '未审核'
                            }else if(el.checkStatus == 1){
                                el.auditStatus = '审核中'
                            }else if(el.checkStatus == 2){
                                el.auditStatus = '已审核'
                            }else if(el.checkStatus == 3){
                                el.auditStatus = '未通过'
                            }
                        });
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
                if(val === 2){
                    this.predActive = index
                    this.searchList.type = item.name
                }else if(val === 3){
                    this.timeActive = index
                    this.searchList.example = item.label
                }
                this.search()
            },
            powerCriteria(item,index,val){
                const _this = this
                this.powerActive = index
                this.searchList.powerid = item.label

                let queryUrl = ''
                if(item.label == '11'){
                    queryUrl = 'contractJurisdiction/all.do'
                }else if(item.label == '13'){
                    queryUrl = 'contractJurisdiction/second.do'
                }else if(item.label == '14'){
                    queryUrl = 'contractJurisdiction/dept.do'
                }

                if(index == 1){
                    this.search()
                }else{
                    wx.request({
                        url: config.defaulthost + queryUrl,  //接口地址
                        header:{
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            let info = res.data.msg
                            if(info == 'success'){
                                _this.search()
                            }else if(info == 'error'){
                                $Toast({
                                    content: '对不起，您没有此权限',
                                    type: 'error'
                                });
                            }
                        }
                    })
                }
            },
            reSet(){
                this.searchList = {
                    searchName:'',
                    type:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                }
                this.predActive = '-1'
                this.powerActive = '1'
                this.timeActive = '-1'
                this.init = true
                this.noMore = false
                this.loadData()
            },

            toAddAgreement(){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'contractJurisdiction/insert.do',  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.msg
                        if(info == 'success'){
                            const url = 'agreementAdd/main'
                            mpvue.navigateTo({ url })
                        }else if(info == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toUpdateAgreement(e,val){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'contractJurisdiction/update.do',  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.msg
                        if(info == 'success'){
                            const url = 'agreementUpdate/main'
                            config.information.agreementupdateData = val
                            mpvue.navigateTo({ url })
                        }else if(info == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toAgreementDetail(e,val){
                const url = 'agreementDetail/main'
                config.information.agreementDetailData = val
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .agreement_wrap{
        background-color: #fcfcfc;
        margin-top: 40px;
        margin-bottom: 40px
    }
</style>