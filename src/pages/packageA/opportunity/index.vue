<template>
    <div class="opportunity_wrap">
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
                <i-panel title="商机进度" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == stateActive ? 'isActive':'']" v-for="(item,index) in stateList" :key="item.step_id" @click="checkCriteria(item,index,2)">{{item.step_name}}</span>
                    </view>
                </i-panel>
                <i-panel title="商机预测" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == predActive ? 'isActive':'']" v-for="(item,index) in predList" :key="item.label" @click="checkCriteria(item,index,3)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="新增时间" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == timeActive ? 'isActive':'']" v-for="(item,index) in timeList" :key="item.label" @click="checkCriteria(item,index,4)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="small" long="true" class="reset_btn">重置</i-button>
            </view>
        </i-drawer>

        <!-- 列表 -->
        <i-swipeout i-class="i-swipeout-demo-item" :operateWidth="60" v-for="item in tableData" :key="item.id">
            <view slot="content" @click="toOpportunityDetail($event,item)">
                <i-cell 
                    i-class="cell_content" 
                    :title="item.opportunity_name"
                    :label="item.customerpool[0].name">
                    <view class="cell_footer">
                        负责人：{{item.private_employee}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        预计成交金额： {{item.opportunity_achievement}}
                    </view>
                    <view class="cell_footer">
                        预计成交时间：{{item.opportunity_deal}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        阶段：{{item.opportunityProgress[0].progress_name}}
                    </view>
                    <view class="cell_footer">
                        <i-progress :percent="item.progress_probability" :status="item.status"></i-progress>
                    </view>
                </i-cell>
            </view>
            <view slot="button" class="i-swipeout-button">
                <view class="i-swipeout-button-item" style="width:60px;background-color:#f5f5f5" @click="toUpdateOpportunity($event,item)">
                    <i-icon size="24" type="editor" style="color:#80848f"></i-icon>
                </view>
            </view>
        </i-swipeout>

        <i-load-more v-if="noMore" tip="我是有底线的" :loading="false" />

        <!-- 新增 -->
        <i-button @click="toAddOpportunity" type="ghost" :long="true" class="bottom_btn">新增</i-button>

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
                current: '商机',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    stateid:'',
                    keyWord:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                },
                stateList:[],
                stateActive: '-1',
                predList:[
                    {label:'6',name:'本月已成交'},
                    {label:'1',name:'预计7天成交'},
                    {label:'2',name:'预计15天成交'},
                    {label:'3',name:'预计本月成交'},
                    {label:'4',name:'预计下月成交'},
                    {label:'5',name:'异常商机'},
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
            this.getSearchList()
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
                    stateid: this.searchList.stateid,
                    keyWord: this.searchList.keyWord,
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
                    url: config.defaulthost + 'opportunity/query.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.map.success
                        info.forEach(el => {
                            el.progress_probability = parseInt(el.opportunityProgress[0].progress_probability)
                            if(el.progress_probability == 100){
                                el.status = 'success'
                            }else if(el.progress_probability == 0){
                                el.status = 'wrong'
                            }else if(el.progress_probability !== 100 && el.progress_probability >= 50){
                                el.status = 'normal'
                            }else{
                                el.status = 'info'
                            }
                        });
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
                    }
                })
            },

            getSearchList(){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'addstep/selectAddstep.do?cId=' + config.userData.cId,  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.stateList = res.data.map.addsteps
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
                    this.stateActive = index
                    this.searchList.stateid = item.step_id
                }else if(val === 3){
                    this.predActive = index
                    this.searchList.keyWord = item.label
                }else if(val === 4){
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
                    queryUrl = 'opportunityJurisdiction/all.do'
                }else if(item.label == '13'){
                    queryUrl = 'opportunityJurisdiction/second.do'
                }else if(item.label == '14'){
                    queryUrl = 'opportunityJurisdiction/dept.do'
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
                    stateid:'',
                    keyWord:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                }
                this.stateActive = '-1'
                this.predActive = '-1'
                this.powerActive = '1'
                this.timeActive = '-1'
                this.init = true
                this.noMore = false
                this.loadData()
            },

            toAddOpportunity(){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'opportunityJurisdiction/insert.do',  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.msg
                        if(info == 'success'){
                            const url = 'opportunityAdd/main'
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
            toUpdateOpportunity(e,val){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'opportunityJurisdiction/update.do',  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.msg
                        if(info == 'success'){
                            const url = 'opportunityUpdate/main'
                            config.information.opportunityupdateData = val
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
            toOpportunityDetail(e,val){
                console.log('11111')
                const url = 'opportunityDetail/main'
                config.information.opportunityDetailData = val
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .opportunity_wrap{
        background-color: #fcfcfc;
        margin-top: 40px;
        margin-bottom: 40px
    }
</style>