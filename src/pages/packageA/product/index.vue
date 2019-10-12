<template>
    <div class="produce_wrap">
    <!-- 查询 -->
        <view class="order_search">
            <view class="order_searck_box">
                <i-icon type="search" size="16" color="#80848f" class="order_search_icon" />
                <input v-model="searchList.searchName" placeholder="请输入公司名称查询" maxlength="50" class="order_search_input" confirm-type="search" @input="handleInput($event,1)" @confirm="search" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="order_search_icon" @click="closeSearch" />
            </view>
        </view>

        <view class="product_content">
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
            <scroll-view scroll-y class="product_wrap">
                <view v-for="(el,i) in productData" :key="el.id" class="product_item">
                    <view v-for="(item,index) in el.itemList" :key="item.id" v-if="el.itemList.length == 1">
                        <p style="margin-bottom:8px">
                            {{item.goodsName}}
                            <span style="color:#80848f">({{el.itemList[0].goodsCode}})</span>
                        </p>
                        <view class="product_item_c">
                            <image :src="item.proImage" style="width:70px;height:70px" />
                            <view class="product_item_price">
                                <p><span style="color:#e62c2c;">￥{{item.price}}</span> / {{item.unit}}</p>
                                <p style="margin-top:5px" v-if="item.title !== el.goodsName">{{item.title}}</p>
                            </view>
                        </view>
                    </view>
                    <view v-if="el.itemList.length > 1">
                        <p style="margin-bottom:8px">{{el.goodsName}}</p>
                        <view class="product_item_c" @click="showItemList($event,el)">
                            <image :src="el.itemList[0].proImage" style="width:70px;height:70px" />
                            <view class="product_item_price">
                                <p><span style="color:#e62c2c;">￥{{el.minprice}}</span><span style="font-size:12px"> 起</span></p>
                                <p style="margin-top:30px;color:#80848f">{{el.itemList.length}}种规格</p>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
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
                            <p>
                                <span style="color:#f56c6c">￥{{sub.price}}</span>
                                <span style="color:#80848f"> / {{sub.unit}}</span>
                            </p>
                        </view>
                    </view>
                </scroll-view>
            </view>
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

                searchList:{
                    searchName:'',
                    classification_id:'',
                    page:1,
                    limit:10,
                },

                isValue:false,

                activename:'name1',
                allactive:true,

                showMore:false,
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

            showItemList(e,row){
                this.showMore = true
                this.proItemData = row
            },
            closeItemList(){
                this.showMore = false
            },
        },
    }
</script>

<style>
    .produce_wrap{
        background-color: #fafafa;
        margin-top: 50px
    }
    .product_content{
        height: calc(100vh - 50px);
        display: flex
    }
    .product_wrap{
        flex: 3;
        height: calc(100vh - 50px);
        background-color: rgb(255, 255, 255);
        float: left;
    }
</style>