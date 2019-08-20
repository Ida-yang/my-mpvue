<template>
    <div class="order_product_wrap">
        <!-- 查询 -->
        <view class="order_search">
            <i-icon type="search" size="16" color="#80848f" class="order_search_icon" />
            <input v-model="searchList.searchName" placeholder="请输入公司名称查询" maxlength="50" class="order_search_input" confirm-type="search" @input="handleInput($event,1)" @confirm="search" />
            <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="order_search_icon" @click="closeSearch" />
        </view>

        <view class="order_product_content">
            <scroll-view scroll-y class="caption_wrap">
                <i-collapse :name="activename" accordion i-class="order_collapse">
                    <i-collapse-item title="全部商品" name="name1" i-class="order_collapse_item" @collapse="collapseClick($event,item,1)"></i-collapse-item>
                    <i-collapse-item v-for="(item,index) in classData" :key="index" :title="item.name" :name="item.id" i-class="order_collapse_item" i-collapse-title-wrap="order_collapse_title" @collapse="collapseClick($event,item,2)">
                        <view slot="content">
                            <p v-for="(el,i) in item.next" :key="i" class="order_collapse_c_p" :class="el.active ? 'theme_color_text' : ''" @click="collapseItem($event,el,2)">{{el.name}}</p>
                        </view>
                    </i-collapse-item>
                </i-collapse>
            </scroll-view>
            <scroll-view scroll-y class="product_wrap">
                <view v-for="item in productData" :key="item.id" class="product_item">
                    <p style="margin-bottom:8px">{{item.tbGoods.goodsName}}</p>
                    <view class="product_item_c">
                        <image :src="item.proImage" style="width:70px;height:70px" />
                        <view class="product_item_price">
                            <p style="margin-bottom:10px">{{item.title}}</p>
                            <p><span style="color:#e62c2c;">￥{{item.tbGoods.price}}</span> /{{item.tbGoods.unit}}</p>
                        </view>
                        <view class="product_item_counter">
                            <span class="counter_btn" :class="item.countNum == 0 ? 'gray_color_text' : ''" @click="countReduce($event,item)">-</span>
                            <input v-model="item.countNum" class="counter_text" @input="countInput($event,item)"></input>
                            <span class="counter_btn" @click="countAdd($event,item)">+</span>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>

        <!-- 新增 -->
        <view class="bottom_view">
            <span style="padding-left:15px">共 {{totalNumber}} 个</span>
            <!-- <span>
                合计<span style="color:#e62c2c">￥{{totalAmount}}</span> -->
                <i-button @click="addProduct" type="subject" i-class="inline_btn">确定</i-button>
            <!-- </span> -->
        </view>
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '产品',

                init:true,
                noMore:false,
                classData:[],
                productData:[],

                searchList:{
                    searchName:'',
                    classification_id:'',
                    page:1,
                    limit:10,
                },

                isValue:false,
                searchCriteria:false,

                activename:'name1',

                totalNumber:0,
                totalAmount:0
            }
        },

        mounted(){
            this.init = true
            this.noMore = false
            this.searchList.page = 1
            this.loadClass()
            this.loadData()
        },

        onReachBottom(){
            // console.log('碰到底部啦')
            this.searchList.page = this.searchList.page + 1
            if(this.noMore == false){
                this.loadData()
            }
        },

        methods: {
            loadClass(){
                const _this = this
                wx.request({
                    method:'get',
                    url: config.defaulthost + 'classification/getClassificationNodeTree.do?cId=' + config.userData.cId,  //接口地址
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.classData = res.data.map.success
                    }
                })
            },
            loadData(){
                const _this = this
                let data = {
                    searchName: this.searchList.searchName,
                    classification_id: this.searchList.classification_id,
                    page: this.searchList.page,
                    limit: this.searchList.limit,
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'goods/search.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.map.goods

                        info.forEach(el => {
                            el.countNum = 0
                            if(el.image){
                                el.proImage = config.sourcehost + 'product/' + config.userData.cId + '/' + el.image
                            }else{
                                el.proImage = '../../../static/images/noProduct.png'
                            }
                        });

                        if(_this.init === true){
                            _this.productData = info
                            _this.init = false
                            // console.log('我的第一次加载')
                            wx.stopPullDownRefresh()
                        }else{
                            _this.productData = _this.productData.concat(info)
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

            collapseClick(e,val,index){
                if(index == 1){
                    this.searchList.classification_id = ''
                }else if(index == 2){
                    this.searchList.classification_id = val.id
                }
                
                this.search()
            },
            collapseItem(e,val,index){
                this.searchList.classification_id = val.id

                this.classData.forEach(item => {
                    if(item.id == val.parentid){
                        item.next.forEach(el => {
                            el.active = false
                            if(el.id == val.id){
                                el.active = true
                            }
                        });
                    }
                });
                this.search()
            },

            countReduce(e,val){
                this.productData.forEach(el => {
                    if(el.id == val.id){
                        if(el.countNum == 0){
                            return
                        }else{
                            el.countNum --
                        }
                    }
                });

                this.countAll()
            },
            countAdd(e,val){
                this.productData.forEach(el => {
                    if(el.id == val.id){
                        el.countNum ++
                    }
                });

                this.countAll()
            },
            countInput(e,val){
                let value = e.target.value

                this.productData.forEach(el => {
                    if(el.id == val.id){
                        el.countNum = parseInt(value)
                    }
                });

                this.countAll()
            },

            countAll(){
                let num = 0
                let amount = 0
                this.productData.forEach(el => {
                    if(el.countNum){
                        let a = 0
                        num += el.countNum
                        a = el.countNum * el.tbGoods.price
                        amount += a
                    }
                });

                console.log(num,amount)

                this.totalNumber = num
                this.totalAmount = amount
            },


            addProduct(){
                // let productData = []
                // let orderDetails = []
                let newArr = new Array()

                this.productData.forEach((el,i) => {
                    if(el.countNum){
                        newArr.push(el)
                    }
                });

                config.information.orderProductData = {
                    orderProduct: newArr,
                    totalNumber: this.totalNumber,
                    totalAmount: this.totalAmount
                }

                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .order_product_wrap{
        background-color: #fafafa;
        padding-top: 50px;
        margin-bottom: 40px
    }
    .order_product_content{
        height: calc(100vh - 80px);
        display: flex
    }
    .caption_wrap{
        flex: 1;
        float: left;
    }
    .order_collapse{
        font-size: 14px
    }
    .order_collapse_item{
        border-top: 0 !important;
        line-height: 32px
    }
    .order_collapse_title{
        overflow: hidden;
        height: 32px;
    }
    .order_collapse_c_p{
        overflow: hidden;
        padding-left: 10px;
        height: 32px;
        line-height: 32px
    }

    
</style>