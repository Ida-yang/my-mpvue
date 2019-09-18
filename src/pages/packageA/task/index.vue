<template>
    <div class="task_wrap">
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
                <i-panel title="任务时间" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == timeActive ? 'isActive':'']" v-for="(item,index) in timeList" :key="item.label" @click="checkCriteria(item,index,2)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="任务状态" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == stateActive ? 'isActive':'']" v-for="(item,index) in stateList" :key="item.label" @click="checkCriteria(item,index,3)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="small" long="true" class="reset_btn">重置</i-button>
            </view>
        </i-drawer>

        <!-- 列表 -->
        <i-swipeout i-class="i-swipeout-demo-item" :operateWidth="60" v-for="item in tableData" :key="item.id">
            <view slot="content" @click="toTaskDetail($event,item)">
                <i-cell 
                    i-class="cell_content" 
                    :title="item.planningTheme"
                    :label="item.customerName">
                    <view class="cell_footer">
                        负责人：{{item.private_employee}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        状态：{{item.state}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        时间： {{item.startTime}}
                    </view>
                </i-cell>
            </view>
            <view slot="button" class="i-swipeout-button">
                <view class="i-swipeout-button-item" style="width:60px;background-color:#f5f5f5" @click="toUpdateTask($event,item)">
                    <i-icon size="24" type="editor" style="color:#80848f"></i-icon>
                </view>
            </view>
        </i-swipeout>

        <!-- 新增 -->
        <i-button @click="toAddTask" type="ghost" :long="true" class="bottom_btn">新增</i-button>
        
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '任务',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    state:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                },

                powerList:[
                    {label:'11',name:'全部'},
                    {label:'12',name:'我的'},
                    {label:'13',name:'本组'},
                    {label:'14',name:'本机构'},
                ],
                powerActive: '1',
                timeList:[
                    {label:'1',name:'昨天'},
                    {label:'2',name:'今天'},
                    {label:'5',name:'明天'},
                    {label:'3',name:'本周'},
                    {label:'6',name:'本月'},
                    {label:'7',name:'上月'},
                    {label:'8',name:'下月'},
                ],
                timeActive:'-1',
                stateList:[
                    {label:'1',name:'未完成'},
                    {label:'2',name:'已完成'},
                    {label:'3',name:'作废'},
                ],
                stateActive: '-1',
                

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
                    example: this.searchList.example,
                    page: this.searchList.page,
                    limit: this.searchList.limit,
                }
                if(this.searchList.state){
                    data.state = this.searchList.state
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
                    url: config.defaulthost + 'workPlan/selectWorkPlan.do?cId=' + config.userData.cId,  //接口地址
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
                            console.log('我的第一次加载')
                            wx.stopPullDownRefresh()
                        }else{
                            _this.tableData = _this.tableData.concat(info)
                            console.log('我不是第一次加载了')
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
                    this.timeActive = index
                    this.searchList.example = item.label
                }else if(val === 3){
                    this.stateActive = index
                    this.searchList.state = item.name
                }
                this.search()
            },
            powerCriteria(item,index,val){
                const _this = this
                this.powerActive = index
                this.searchList.powerid = item.label

                let queryUrl = ''
                if(item.label == '11'){
                    queryUrl = 'workPlanJurisdiction/all.do'
                }else if(item.label == '13'){
                    queryUrl = 'workPlanJurisdiction/second.do'
                }else if(item.label == '14'){
                    queryUrl = 'workPlanJurisdiction/dept.do'
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
                    state:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                }
                this.stateActive = '-1'
                this.powerActive = '1'
                this.timeActive = '-1'
                this.init = true
                this.noMore = false
                this.loadData()
            },

            toAddTask(){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'workPlanJurisdiction/insert.do',  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.msg
                        if(info == 'success'){
                            const url = 'taskAdd/main'
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
            toUpdateTask(e,val){
                if(val.state == '已完成'){
                    $Toast({
                        content: '不可编辑',
                        type: 'warning'
                    });
                }else{
                    wx.request({
                        url: config.defaulthost + 'workPlanJurisdiction/update.do',  //接口地址
                        header:{
                            'Cookie': config.SESSIONID
                        },
                        success:function(res) {
                            let info = res.data.msg
                            if(info == 'success'){
                                const url = 'taskUpdate/main'
                                config.information.taskupdateData = val
                                mpvue.navigateTo({ url })
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
            toTaskDetail(e,val){
                const url = 'taskDetail/main'
                config.information.taskDetailData = val
                mpvue.navigateTo({ url })
            },
        }
    }
</script>

<style>
    .task_wrap{
        background-color: #fcfcfc;
        margin-top: 40px;
        margin-bottom: 40px
    }
</style>