<template>
    <div class="order_product_wrap">
        <!-- 查询 -->
        <view class="order_search">
            <view class="order_searck_box">
                <i-icon type="search" size="16" color="#80848f" class="order_search_icon" />
                <input v-model="searchList.searchName" placeholder="请输入公司名称查询" maxlength="50" class="order_search_input" confirm-type="search" @input="handleInput($event,1)" @confirm="search" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="order_search_icon" @click="closeSearch" />
            </view>
        </view>

        <view class="order_product_content">
            <scroll-view scroll-y class="caption_wrap">
                <i-collapse :name="activename" accordion i-class="product_collapse">
                    <i-collapse-item title="全部商品" name="name1" :class="allactive ? 'theme_color_text' : ''" i-class="product_collapse_item" @collapse="collapseClick($event,item,1)"></i-collapse-item>
                    <i-collapse-item v-for="(item,index) in classData" :key="index" :title="item.name" :name="item.id" i-class="product_collapse_item" i-collapse-title-wrap="product_collapse_title" @collapse="collapseClick($event,item,2)">
                        <view slot="content">
                            <p v-for="(el,i) in item.next" :key="i" class="product_collapse_c_p" :class="el.active ? 'theme_color_text' : ''" @click="collapseItem($event,el,2)">{{el.name}}</p>
                        </view>
                    </i-collapse-item>
                </i-collapse>
            </scroll-view>
            <scroll-view scroll-y class="order_product_right">
                <view v-for="(el,i) in productData" :key="el.id" class="product_item">
                    <view v-for="(item,index) in el.itemList" :key="item.id" v-if="el.itemList.length == 1">
                        <p style="margin-bottom:8px">{{item.goodsName}}</p>
                        <view class="product_item_c">
                            <image :src="item.proImage" style="width:70px;height:70px" />
                            <view class="product_item_price">
                                <p><span style="color:#e62c2c;">￥{{item.price}}</span> / {{item.unit}}</p>
                                <p style="margin-top:5px" v-if="item.title !== el.goodsName">{{item.title}}</p>
                            </view>
                            <view class="product_item_add" @click="showCounters($event,el,item)">
                                <i-icon type="add" size="20" color="#fff" />
                            </view>
                        </view>
                    </view>
                    <view v-if="el.itemList.length > 1">
                        <p style="margin-bottom:8px">{{el.goodsName}}</p>
                        <view class="product_item_c">
                            <image :src="el.itemList[0].proImage" style="width:70px;height:70px" />
                            <view class="product_item_price">
                                <p><span style="color:#e62c2c;">￥{{el.minprice}}</span><span style="font-size:12px"> 起</span></p>
                                <p style="margin-top:30px;color:#80848f">{{el.itemList.length}}种规格可选</p>
                            </view>
                            <view class="product_item_shopping" @click="showItemList($event,el)">
                                <i-icon type="publishgoods_fill" size="20" color="#fff" />
                            </view>
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
        
        <view class="product_item_more" v-if="showMore">
            <view class="item_more_head"></view>
            <view class="item_more_content">
                <i-icon type="close" color="#bebebe" size="20" class="item_more_close" @click="closeItemList" />
                <view class="item_more_goods">
                    <image :src="proItemData.itemList[0].proImage" style="width:100px;height:100px;" />
                    <p style="margin-left:24px;">{{proItemData.goodsName}}</p>
                </view>
                <scroll-view scroll-y class="item_more_scroll_wrap">
                    <view v-for="sub in proItemData.itemList" :key="sub.id" class="item_more_goods_item">
                        <view class="goods_item_head">
                            <image :src="sub.proImage" style="width:20px;height:20px;" />
                            <span style="margin-left:10px">
                                {{sub.goodsSpec}}
                                <span style="color:#80848f">({{sub.goodsCode}})</span>
                            </span>
                        </view>
                        <view class="goods_item_foot">
                            <p style="color:#80848f">市场价 ￥{{sub.price}} / {{sub.unit}}</p>
                            <p>
                                <span style="color:#f56c6c">￥{{sub.discountAfter}}</span>
                                <span style="color:#80848f"> / {{sub.unit}}</span>
                            </p>
                        </view>
                        <view class="product_item_add" style="margin-bottom:20px" @click="showCounters($event,1,sub)">
                            <i-icon type="add" size="20" color="#fff" />
                        </view>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="product_counter" v-if="showCounter">
            <view class="counter_wrap">
                <view class="counter_head">{{countProduct.goodsName}}</view>
                <view class="counter_content">
                    <i-cell title="数量" i-class="simple_cell" i-cell-text="color_495060_text">
                        <view slot="footer" class="counter_item">
                            <span class="counter_btn" :class="countProduct.countNum == 0 ? 'gray_color_text' : ''" @click="itemcountReduce">-</span>
                            <input :value="countProduct.countNum" type="number" class="counter_text" @input="itemCountInput($event,1)"></input>
                            <span class="counter_btn" @click="itemcountAdd">+</span>
                        </view>
                    </i-cell>
                    <i-input v-model="countProduct.price" title="单价" right type="number" maxlength="11" @input="itemCountInput($event,2)" />
                    <i-cell title="消费金额" :value="countProduct.amountOfMoney"  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
                    <i-input v-model="countProduct.discount" title="折扣率(%)" right type="number" maxlength="3" @input="itemCountInput($event,3)" />
                    <i-cell title="折扣金额" :value="countProduct.discountAmount"  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
                    <i-cell title="折后金额" :value="countProduct.discountAfter"  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
                </view>
                <view class="counter_foot">
                    <span style="border-right:1rpx solid #e9eaec" @click="closeCounter($event,1)">取消</span>
                    <span style="color:#ff6333" @click="closeCounter($event,2)">确定</span>
                </view>
            </view>
            <!-- <view class="product_item_counter">
                <span class="counter_btn" :class="item.countNum == 0 ? 'gray_color_text' : ''" @click="countReduce($event,el,item)">-</span>
                <input v-model="item.countNum" class="counter_text" @input="countInput($event,el,item)"></input>
                <span class="counter_btn" @click="countAdd($event,el,item)">+</span>
            </view>
            <view class="counter_item">
                <span class="counter_btn" :class="sub.countNum == 0 ? 'gray_color_text' : ''" @click="itemcountReduce($event,sub)">-</span>
                <input :value="sub.countNum" class="counter_text" @input="itemcountInput($event,sub)"></input>
                <span class="counter_btn" @click="itemcountAdd($event,sub)">+</span>
            </view> -->
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
                proItemData:{},
                countProduct:{},

                searchList:{
                    searchName:'',
                    classification_id:'',
                    page:1,
                    limit:10,
                },

                isValue:false,
                searchCriteria:false,

                activename:'name1',
                allactive:true,

                showMore:false,
                showCounter:false,

                totalNumber:0,
                totalAmount:0,
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
                let customerinfo = config.information.orderPoolNameData
                const _this = this
                let data = {
                    searchName: this.searchList.searchName,
                    classification_id: this.searchList.classification_id,
                    page: this.searchList.page,
                    limit: this.searchList.limit,
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'goods/searchGoods.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.map.goods

                        info.forEach(item => {
                            let priceArr = new Array()
                            item.itemList.forEach(el => {
                                el.goodsName = item.goodsName
                                el.discount = customerinfo.discount
                                el.discountAfter = parseFloat(el.discount) * parseFloat(el.price) / 100
                                el.countNum = 0
                                if(el.image){
                                    el.proImage = config.sourcehost + 'product/' + config.userData.cId + '/' + el.image
                                }else{
                                    el.proImage = '../../../static/images/noProduct.png'
                                }
                                if(el.spec1 && !el.spec2 && !el.spec3){
                                    // console.log('只有一个')
                                    el.goodsSpec = el.spec1
                                }else if(el.spec1 && el.spec2 && !el.spec3){
                                    // console.log('有两个')
                                    el.goodsSpec = el.spec1 + ', ' + el.spec2
                                }else if(el.spec1 && el.spec2 && el.spec3){
                                    // console.log('有三个')
                                    el.goodsSpec = el.spec1 + ', ' + el.spec2 + ', ' + el.spec3
                                }
                                priceArr.push(el.price)
                            });

                            item.minprice = Math.min.apply(null,priceArr)
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

                this.search()
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
                    this.allactive = true
                }else if(index == 2){
                    this.searchList.classification_id = val.id
                    this.allactive = false
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

            showCounters(e,row,val){
                this.showCounter = true

                if(row !== 1){
                    this.proItemData = row
                }
                this.countProduct = val
            },
            closeCounter(e,val){
                if(val == 2){
                    this.proItemData.itemList.forEach(el => {
                        if(el.id == this.countProduct.id){
                            // console.log(el,'替换小的值')
                            el = this.countProduct
                        }
                    });

                    this.productData.forEach(item => {
                        if(item.id == this.proItemData.id){
                            // console.log(item,'替换大的值')
                            item = this.proItemData
                        }
                    });
                }
                this.showCounter = false

                this.countAll()
            },

            showItemList(e,row){
                this.showMore = true
                this.proItemData = row
                this.countProduct = row
            },
            closeItemList(){
                this.showMore = false

                this.countAll()
            },

            countReduce(e,row,val){
                this.productData.forEach(item => {
                    if(item.id == row.id){
                        item.itemList.forEach(el => {
                            if(el.id == val.id){
                                if(el.countNum == 0){
                                    return
                                }else{
                                    el.countNum --
                                }
                            }
                        });
                    }
                });

                this.countAll()
            },
            countAdd(e,row,val){
                this.productData.forEach(item => {
                    if(item.id == row.id){
                        item.itemList.forEach(el => {
                            if(el.id == val.id){
                                el.countNum ++
                            }
                        });
                    }
                });

                this.countAll()
            },
            countInput(e,row,val){
                let value = e.target.value

                this.productData.forEach(item => {
                    if(item.id == row.id){
                        item.itemList.forEach(el => {
                            if(el.id == val.id){
                                el.countNum = parseInt(value)
                            }
                        });
                    }
                });

                this.countAll()
            },

            itemcountReduce(){
                if(this.countProduct.countNum == 0){
                    return
                }else{
                    this.countProduct.countNum --
                }

                this.countdiscount()
            },
            itemcountAdd(){
                this.countProduct.countNum ++

                this.countdiscount()
            },
            itemCountInput(e,val){
                if(val == 1){
                    this.countProduct.countNum = e.target.value
                }else if(val == 2){
                    this.countProduct.price = e.mp.detail
                }else if(val == 3){
                    this.countProduct.discount = e.mp.detail
                }

                this.countdiscount()
            },

            countdiscount(){
                let a = 0
                let b = 0
                let c = 0

                a = parseInt(this.countProduct.countNum) * parseFloat(this.countProduct.price)
                b = parseFloat(this.countProduct.discount) * a / 100
                c = a - b
                console.log(a,b,c)
                this.countProduct.amountOfMoney = a.toFixed(2)
                this.countProduct.discountAfter = b.toFixed(2)
                this.countProduct.discountAmount = c.toFixed(2)
            },

            countAll(){
                let num = 0
                let amount = 0
                this.productData.forEach(item => {
                    item.itemList.forEach(el => {
                        if(el.countNum){
                            let a = 0
                            num += el.countNum
                            a = el.countNum * item.price
                            amount += a
                        }
                    });
                });

                this.totalNumber = num
                this.totalAmount = amount
            },


            addProduct(){
                let newArr = new Array()

                this.productData.forEach(item => {
                    item.itemList.forEach(el => {
                        if(el.countNum){
                            newArr.push(el)
                        }
                    });
                });

                console.log(newArr)

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
        margin-top: 50px;
        margin-bottom: 40px
    }
    .order_product_content{
        height: calc(100vh - 100px);
        display: flex
    }
    .order_product_right{
        flex: 3;
        height: calc(100vh - 80px);
        background-color: rgb(255, 255, 255);
        float: left;
    }
</style>