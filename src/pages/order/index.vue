<template>
    <div class="order_wrap">
        <!-- 查询 -->
        <view class="order_search">
            <view class="order_searck_box">
                <i-icon type="search" size="16" color="#80848f" class="order_search_icon" />
                <input v-model="searchList.searchName" placeholder="请输入公司名称查询" maxlength="50" class="order_search_input" confirm-type="search" @input="handleInput($event,1)" @confirm="search" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="order_search_icon" @click="closeSearch" />
            </view>
        </view>
        <i-tabs @change="changeBar" i-class="order_tabs">
            <i-tab key="first" :title="firstItem">
                &nbsp;
                <i-icon v-if="showFirst" type="packup" />
                <i-icon v-else type="unfold" />
            </i-tab>
            <i-tab key="second" :title="secondItem">
                &nbsp;
                <i-icon v-if="showSecond" type="packup" />
                <i-icon v-else type="unfold" />
            </i-tab>
            <i-tab key="third" :title="thirdItem">
                &nbsp;
                <i-icon v-if="showThird" type="packup" />
                <i-icon v-else type="unfold" />
            </i-tab>
        </i-tabs>
        <view class="bar_option" v-if="showFirst">
            <p class="option_p" :class="powerActive == item.label ? 'theme_color_text' : ''" v-for="item in powerList" :key="item.label" @click="changeItem($event,item,1)">{{item.name}}</p>
        </view>
        <view class="bar_option" v-if="showSecond">
            <p class="option_p" :class="timeActive == item.label ? 'theme_color_text' : ''" v-for="item in timeList" :key="item.label" @click="changeItem($event,item,2)">{{item.name}}</p>
        </view>
        <view class="bar_option" v-if="showThird">
            <p class="option_p" :class="stateActive == item.label ? 'theme_color_text' : ''" v-for="item in stateList" :key="item.label" @click="changeItem($event,item,3)">{{item.name}}</p>
        </view>
        <view class="detail_module"></view>

        <!-- 列表 -->
        <i-swipeout i-class="i-swipeout-demo-item" :operateWidth="120" v-for="item in tableData" :key="item.id">
            <view slot="content" @click="toOrderDetail($event,item)">
                <i-cell 
                    i-class="cell_content" 
                    :title="item.customerName"
                    :label="item.orderNo">
                    <view class="cell_footer">
                        订单时间：{{item.orderTime}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        金额： {{item.totalSum}}
                    </view>
                    <view class="cell_footer">
                        负责人：{{item.ascription}}
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        状态：
                        <span v-if="item.checkStatus == 0">{{item.auditStatus}}</span>
                        <span v-if="item.checkStatus == 1" style="color:rgb(230, 162, 60)">{{item.auditStatus}}</span>
                        <span v-if="item.checkStatus == 2" style="color:rgb(103, 194, 58)">{{item.auditStatus}}</span>
                        <span v-if="item.checkStatus == 3" style="color:rgb(245, 108, 108)">{{item.auditStatus}}</span>
                    </view>
                </i-cell>
            </view>
            <view slot="button" class="i-swipeout-button">
                <view class="i-swipeout-button-item" style="width:60px;background-color:#f5f5f5" @click="toUpdateOrder($event,item)">
                    <i-icon size="24" type="editor" style="color:#80848f"></i-icon>
                </view>
                <view class="i-swipeout-button-item" style="width:60px;background-color:#f56c6c" @click="toDeleteOrder($event,item)">
                    <i-icon size="24" type="trash" style="color:#fff"></i-icon>
                </view>
            </view>
        </i-swipeout>

        <i-load-more v-if="noMore" tip="我是有底线的" :loading="false" />

        <view class="bottom_view">
            <span style="padding-left:15px">合计</span>
            <span style="padding-right:15px">￥{{totalAmount}}</span>
        </view>

        <!-- 新增 -->
        <view class="order_add_btn" @click="toAddOrder">
            <i-icon type="add" size="24" color="#ff6633" />
        </view>

        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="deleteOrder" :mask-closable="false">
            <view slot="header" style="padding: 16px">
                <view style="color: #444;font-size: 16px">确定吗？</view>
                <text>删除后无法恢复哦</text>
            </view>
        </i-action-sheet>
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../config'
    import { $Toast,$Message } from '../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '订单',

                init:true,
                noMore:false,
                tableData:[],
                totalAmount:'',

                searchList:{
                    searchName:'',
                    example:'',
                    examine:'',
                    state:'',
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
                powerActive: '12',
                timeList:[
                    {label:'0',name:'全部'},
                    {label:'2',name:'昨天'},
                    {label:'1',name:'今天'},
                    {label:'3',name:'本周'},
                    {label:'4',name:'本月'},
                    {label:'5',name:'上月'},
                ],
                timeActive:'0',
                stateList:[
                    {label:'',name:'全部'},
                    {label:'0',name:'待审核'},
                    {label:'2',name:'已审核'},
                    {label:'9',name:'待我审核'},
                ],
                stateActive:'',
                

                isValue:false,
                searchCriteria:false,

                firstItem:'我的',
                secondItem:'订单日期',
                thirdItem:'状态',

                showFirst: false,
                showSecond: false,
                showThird: false,

                deleteId:'',

                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#f56c6c'
                    }
                ],
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
                    examine: this.searchList.examine,
                    state: this.searchList.state,
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
                    url: config.defaulthost + 'order/selectOrderList.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.map.orders
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

                        let newArr = new Array()
                        let order_time = ''
                        let num = 0

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

                            num += el.totalSum
                        });

                        _this.totalAmount = num.toFixed(2)
                    }
                })
            },

            handleInput(e,val){
                if(val === 1){
                    this.searchList.searchName = e.target.value
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
            changeBar(e){
                let key = e.target.key
                if(key == 'first'){
                    this.showFirst = !this.showFirst
                    this.showSecond = false
                    this.showFirst = false
                }else if(key == 'second'){
                    this.showFirst = false
                    this.showSecond = !this.showSecond
                    this.showThird = false
                }else if(key == 'third'){
                    this.showFirst = false
                    this.showSecond = false
                    this.showThird = !this.showThird
                }
            },
            changeItem(e,item,val){
                if(val == 1){
                    this.searchList.powerid = item.label
                    this.powerActive = item.label
                    this.firstItem = item.name
                    this.showFirst = false
                }else if(val == 2){
                    this.searchList.example = item.label
                    this.timeActive = item.label
                    this.showSecond = false
                }else if(val == 3){
                    if(item.label == '9'){
                        this.searchList.state = ''
                        this.searchList.examine = config.userData.pId
                    }else{
                        this.searchList.state = item.label
                        this.searchList.examine = null
                    }
                    this.stateActive = item.label
                    this.showThird = false
                }

                this.search()
            },

            toAddOrder(){
                const url = 'orderAdd/main'
                mpvue.navigateTo({ url })
            },
            toUpdateOrder(e,val){
                if(val.checkStatus == 0){
                    const url = 'orderUpdate/main'
                    config.information.orderupdateData = val
                    mpvue.navigateTo({ url })
                }else{
                    $Toast({
                        content: '该订单不可编辑',
                        type: 'warning'
                    });
                }
            },
            toOrderDetail(e,val){
                const url = 'orderDetail/main'
                config.information.orderDetailData = val
                mpvue.navigateTo({ url })
            },
            toDeleteOrder(e,val){
                if(val.checkStatus == 0){
                    this.showDetele = true
                    this.deleteId = val.id
                }else{
                    $Toast({
                        content: '该订单不可删除',
                        type: 'warning'
                    });
                }
            },
            
            cancelDelete(){
                this.showDetele = false
            },
            deleteOrder(val){
                const _this = this
                let data = {
                    id: this.deleteId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'order/delete.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            _this.cancelDelete()
                            $Message({
                                content: '删除成功',
                                type: 'success'
                            });
                            _this.init = true
                            _this.noMore = false
                            _this.searchList.page = 1
                            _this.loadData()
                        }else if(res.data.msg && res.data.msg == 'error'){
                            _this.cancelDelete()
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            }
        },
    }
</script>

<style>
    .order_wrap{
        background-color: #fafafa;
        margin-top: 50px;
        margin-bottom: 40px
    }
    
    .order_add_btn{
        background-color: #fff;
        position: fixed;
        right: 20px;
        bottom: 60px;
        width: 50px;
        height: 50px;
        text-align: center;
        box-shadow: 0 0 5px #ff916f ;
        border-radius: 50%;
        padding-top: 11px;
        box-sizing: border-box
    }
</style>