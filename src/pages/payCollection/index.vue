<template>
    <div class="pay_wrap">
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
                <i-panel title="工单状态" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == stateActive ? 'isActive':'']" v-for="(item,index) in stateList" :key="item.label" @click="checkCriteria(item,index,2)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="small" long="true" class="reset_btn">重置</i-button>
            </view>
        </i-drawer>
        
        <i-cell-group>
            <i-cell i-class="pool_cell" v-for="item in tableData" :key="item.id" :title="item.back_plan + '：' + item.price" :label="item.customerName" @click="topayDetail($event,item)">
                <view class="cell_footer">
                    {{'负责人：' + item.private_employee}}
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {{'状态：' + item.checkState}}
                    &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                    {{'类型：' + item.type}}
                </view>
            </i-cell>
        </i-cell-group>

        <i-load-more v-if="noMore" tip="我是有底线的" :loading="false" />
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                current: '应收回款',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    stateid:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                },
                stateList:[
                    {label:'0',name:'待审核'},
                    {label:'1',name:'审核中'},
                    {label:'2',name:'已审核'},
                    {label:'3',name:'未通过'},
                ],
                stateActive: '-1',
                powerList:[
                    {label:'11',name:'全部'},
                    {label:'12',name:'我的'},
                    {label:'13',name:'本组'},
                    {label:'14',name:'本机构'},
                ],
                powerActive: '1',
                

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
                    stateid: this.searchList.stateid,
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
                    url: config.defaulthost + 'back/queryForList.do?cId=' + config.userData.cId,  //接口地址
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
                                el.checkState = '待审核'
                            }else if(el.checkStatus == 1){
                                el.checkState = '审核中'
                            }else if(el.checkStatus == 2){
                                el.checkState = '已审核'
                            }else if(el.checkStatus == 3){
                                el.checkState = '未通过'
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
                if(val === 1){
                    this.powerActive = index
                    this.searchList.powerid = item.label
                }else if(val === 2){
                    this.stateActive = index
                    this.searchList.stateid = item.label
                }
                this.search()
            },
            reSet(){
                this.searchList = {
                    searchName:'',
                    stateid:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                }
                this.stateActive = '-1'
                this.powerActive = '1'
                this.init = true
                this.noMore = false
                this.loadData()
            },

            topayDetail(e,val){
                const url = 'payCollectionDetail/main'
                config.information.payCollectionDetailData = val
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .pay_wrap{
        margin-top: 40px;
    }
</style>