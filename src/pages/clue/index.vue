<template>
    <div class="clueContainer">
        <!-- 线索 -->
         <!-- 查询 -->
        <view class="searchView">
            <view class="searchBox">
                <i-icon type="search" size="14" color="#80848f" class="searchIcon" />
                <i-input v-model="searchList.searchName" maxlength="50" i-class="searchInput" @input="handleInput($event,1)" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="searchIcon" @click="closeSearch" />
            </view>
            <span class="searchBtn" @click="search">搜索</span>
            <i-icon type="other" size="16" color="#80848f" class="searchIcon" @click="queryCriteria" />
        </view>
        <i-drawer mode="right" :visible="searchCriteria" @close="queryCriteria">
            <view class="searchContainer">
                <i-panel title="线索状态" i-class="queryLabel">
                    <view class="queryView">
                        <span class="queryBtn" :class="[index == stateActive ? 'isActive':'']" v-for="(item,index) in stateList" :key="item.id" @click="checkCriteria(item,index,1)">{{item.typeName}}</span>
                    </view>
                </i-panel>
                <i-panel title="线索来源" i-class="queryLabel">
                    <view class="queryView">
                        <span class="queryBtn" :class="[index == originActive ? 'isActive':'']" v-for="(item,index) in originList" :key="item.id" @click="checkCriteria(item,index,2)">{{item.typeName}}</span>
                    </view>
                </i-panel>
                <i-panel title="数据授权" i-class="queryLabel">
                    <view class="queryView">
                        <span class="queryBtn" :class="[index == powerActive ? 'isActive':'']" v-for="(item,index) in powerList" :key="item.label" @click="checkCriteria(item,index,3)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-panel title="新增时间" i-class="queryLabel">
                    <view class="queryView">
                        <span class="queryBtn" :class="[index == timeActive ? 'isActive':'']" v-for="(item,index) in timeList" :key="item.label" @click="checkCriteria(item,index,4)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="mini" long="true" class="resetBtn">重置</i-button>
            </view>
        </i-drawer>

        <!-- 列表 -->
        <i-card v-for="item in tableData" :key="item.id" :title="item.name" :full="true" class="clueCard">
            <view slot="content" class="clueContent">{{item.address || '无'}}</view>
            <view slot="footer" class="clueFooter">
                {{'负责人：' + item.privateUser[0].private_employee}}
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                {{'状态：' + item.state}}
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                {{'未联系天数：' + item.dayNum}}
            </view>
        </i-card>
        <i-load-more v-if="noMore" tip="我是有底线的" :loading="false" />

        <!-- 新增 -->
        <i-button @click="toAddClue" type="ghost" size="small" long="true" class="bottomBtn">新增</i-button>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                current: '线索',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    stateid:'',
                    cuesid:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                },
                stateList:[],
                stateActive: '-1',
                originList:[],
                originActive:'-1',
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

        mounted(){
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
                    cuesid: this.searchList.cuesid,
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
                    url: config.defaulthost + 'customerTwo/query.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
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
                        }
                        if(info.length < 10){
                            _this.noMore = true
                        }
                        // console.log(_this.noMore)
                    }
                })
            },
            getSearchList(){
                const _this = this

                wx.request({
                    url: config.defaulthost + 'typeInfo/getTypeInfoByType.do?cId=' + config.userData.cId,  //接口地址
                    success:function(res) {
                        // console.log(res.data)
                        _this.stateList = res.data.name1001
                        _this.originList = res.data.name3001
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
                    this.stateActive = index
                    this.searchList.stateid = item.id
                }else if(val === 2){
                    this.originActive = index
                    this.searchList.cuesid = item.id
                }else if(val === 3){
                    this.powerActive = index
                    this.searchList.powerid = item.label
                }else if(val === 4){
                    this.timeActive = index
                    this.searchList.example = item.label
                }
                this.init = true
                this.noMore = false
                this.searchList.page = 1
                this.loadData()
            },
            reSet(){
                this.searchList = {
                    searchName:'',
                    stateid:'',
                    cuesid:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                }
                this.stateActive = '-1'
                this.originActive = '-1'
                this.powerActive = '1'
                this.timeActive = '-1'
                this.init = true
                this.noMore = false
                this.loadData()
            },
            toAddClue(){
                console.log('去线索')
                const url = 'clueAdd/main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .clueContainer{
        margin-bottom: 40px;
    }
    .clueContent{
        font-size: 12px;
        color: #80848f
    }
    .clueFooter{
        font-size: 11px;
        color: #80848fc4;
        padding-bottom: 8px;
    }
</style>