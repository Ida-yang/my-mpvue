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
                        <span class="queryBtn" :class="[index == powerActive ? 'isActive':'']" v-for="(item,index) in powerList" :key="item.label" @click="checkCriteria(item,index,1)">{{item.name}}</span>
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
    </div>
</template>

<script>
    import config from '../../config'

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
                    success:function(res) {
                        // console.log(res.data)
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
                if(val === 1){
                    this.powerActive = index
                    this.searchList.powerid = item.label
                }else if(val === 2){
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
                const url = 'opportunityAdd/main'
                mpvue.navigateTo({ url })
            },
            toUpdateOpportunity(e,val){
                const url = 'opportunityUpdate/main'
                config.information.opportunityupdateData = val
                mpvue.navigateTo({ url })
            },
            toOpportunityDetail(e,val){
                const url = 'opportunityDetail/main'
                config.information.opportunityDetailData = val
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .opportunity_wrap{
        margin-top: 40px;
    }
</style>