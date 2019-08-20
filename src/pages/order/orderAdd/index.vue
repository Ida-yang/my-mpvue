<template>
    <div class="add_or_update_wrap">
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="订单日期" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <picker slot="footer" mode="date" :value="addList.orderTime" :start="nowDate" @change="dealChange($event,1)">
                    <view class="picker cell_picker">
                    {{addList.orderTime}}
                    </view>
                </picker>
            </i-cell>
            <i-cell title="客户名称" :value="addList.customerpoolName" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,1)"></i-cell>
            <i-cell title="结算方式" :value="addList.settlement" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,2)"></i-cell>
            <i-cell title="交货方式" :value="addList.deliveryModeName" is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,3)"></i-cell>
            <i-cell title="产品" :value="addList.orderDetails" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,4)"></i-cell>
            <view style="padding:0 8px">
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
            </view>
            <i-cell title="销售金额" :value="productInfo.totalAmount"  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
            <i-input v-model="productInfo.discountRate" title="折扣率(%)" right type="number" maxlength="3" @input="handleInput($event,2)" />
            <i-input v-model="productInfo.taxRate" title="税率(%)" right type="number" maxlength="3" @input="handleInput($event,3)" />
            <i-cell title="折税后金额" :value="productInfo.realAmount"  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
            <i-input v-model="addList.deliveryAddress" title="交货地址" right type="textarea" maxlength="200" @input="handleInput($event,1)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 新增 -->
        <i-button @click="addOrder" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-action-sheet :visible="showSettle" :actions="settleList" @change="sheetChange($event,1)" />
        <i-action-sheet :visible="showMode" :actions="modeList" show-cancel @cancel="sheetCancel($event,2)" @change="sheetChange($event,2)" />
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '新增订单',

                addList:{
                    ascriptionId:'',  //负责人,取客户负责人
                    customerpoolId:'',
                    customerpoolName:'',
                    deliveryAddress:'',
                    deliveryMode:'',   //交货方式ID
                    deliveryModeName:'',
                    orderDetails:[],
                    orderTime:'',
                    settlement:'',   //结算方式
                },
                productData:[],
                productInfo:{
                    totalAmount: 0,
                    discountRate: '100',
                    taxRate: '0',
                    realAmount: 0,
                },

                showSettle:false,
                settleList:[
                    {name:'一次性付款'},
                    {name:'分次付款'},
                    {name:'月结付款'},
                ],
                showMode:false,
                modeList:[],

                nowDate:'',
            }
        },

        onShow(){
            this.loadData()
        },

        mounted(){
            this.loadList()
            this.loadMode()
        },

        methods: {
            loadData(){
                let poolObj = config.information.orderPoolNameData
                if(poolObj){
                    this.addList.customerpoolName = poolObj.poolName
                    this.addList.customerpoolId = poolObj.poolNameID
                    this.addList.ascriptionId = poolObj.ascriptionId
                    this.productInfo.discountRate = poolObj.discount
                    this.productInfo.taxRate = poolObj.taxRate
                }

                let product = config.information.orderProductData
                if(product.orderProduct){
                    if(this.productData.length == 0){
                        // console.log(this.productData,'产品为空数组')
                        this.productData = product.orderProduct
                    }else{
                        // console.log(this.productData,'需要拼接')
                        let aarr = this.productData
                        let barr = product.orderProduct
                        aarr.forEach((a,i) => {
                            barr.forEach((b,j) => {
                                if(a.id == b.id){
                                    a.countNum += b.countNum
                                    barr.splice(j,1)
                                }
                            });
                        });

                        this.productData = aarr.concat(barr)
                    }
                    this.loadProduct()
                }else{
                    return
                }
            },
            loadProduct(){
                let anum = 0
                this.productData.forEach(el => {
                    if(el.image){
                        el.proImage = config.sourcehost + 'product/' + config.userData.cId + '/' + el.image
                    }else{
                        el.proImage = '../../../static/images/noProduct.png'
                    }

                    let bnum = el.tbGoods.price * el.countNum
                    anum += bnum
                    
                    el.amountOfMoney = bnum.toFixed(2)
                    el.taxRate = this.productInfo.taxRate
                    el.discount = this.productInfo.discountRate
                    let discountAfter = parseFloat(this.productInfo.discountRate) * bnum / 100
                    let taxAmount = parseFloat(this.productInfo.taxRate) * discountAfter / 100
                    let discountAmount = bnum - discountAfter
                    let taxAfter = discountAfter + taxAmount

                    el.discountAmount = discountAmount.toFixed(2)
                    el.discountAfter = discountAfter.toFixed(2)
                    el.taxAmount = taxAmount.toFixed(2)
                    el.taxAfter = taxAfter.toFixed(2)
                });
                this.productInfo.totalAmount = anum.toFixed(2)
                let cnum = parseFloat(this.productInfo.discountRate) * anum / 100
                let dnum = parseFloat(this.productInfo.taxRate) * cnum / 100
                this.productInfo.realAmount = (cnum + dnum).toFixed(2)
            },
            loadList(){
                this.addList = {
                    ascriptionId:'',  //负责人,取客户负责人
                    customerpoolId:'',
                    customerpoolName:'',
                    deliveryAddress:'',
                    deliveryMode:'',   //交货方式ID
                    deliveryModeName:'',
                    orderDetails:[],
                    orderTime:'',
                    settlement:'',   //结算方式
                }
            },
            loadMode(){
                const _this = this
                this.modeList = []
                let data = {
                    type: '交货方式'
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data

                        info.forEach(el => {
                            _this.modeList.push({id:el.id,name:el.typeName})
                        });
                    }
                })
            },
            cellFocus(e,val){
                if(val == 1){
                    const url = '../customers/main'
                    mpvue.navigateTo({ url })
                }else if(val == 2){
                    this.showSettle = true
                }else if(val == 3){
                    this.showMode = true
                }else if(val == 4){
                    if(this.addList.customerpoolId){
                        const url = '../products/main'
                        mpvue.navigateTo({ url })
                    }else{
                        $Toast({
                            content: '请先选择客户',
                            type: 'warning'
                        });
                        return
                    }
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.addList.deliveryAddress = e.mp.detail
                }else if(val == 2){
                    this.productInfo.discountRate = e.mp.detail
                    this.loadProduct()
                }else if(val == 3){
                    this.productInfo.taxRate = e.mp.detail
                    this.loadProduct()
                }
            },
            dealChange(e,val){
                if(val == 1){
                    this.addList.orderTime = e.target.value
                }
            },

            sheetCancel(e,val){
                if(val == 2){
                    this.showMode = false
                }
            },
            sheetChange(e,val){
                const _this = this
                let index = e.target.index
                if(val == 1){
                    this.settleList.forEach((a,i) => {
                        if(i == index){
                            _this.addList.settlement = a.name
                            _this.showSettle = false
                        }
                    });
                }else if(val == 2){
                    this.modeList.forEach((b,j) => {
                        if(j == index){
                            _this.addList.deliveryModeName = b.name
                            _this.addList.deliveryMode = b.id
                            _this.showMode = false
                            
                        }
                    });
                }
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

                this.loadProduct()
            },
            countAdd(e,val){
                this.productData.forEach(el => {
                    if(el.id == val.id){
                        el.countNum ++
                    }
                });

                this.loadProduct()
            },
            countInput(e,val){
                let value = e.target.value

                this.productData.forEach(el => {
                    if(el.id == val.id){
                        el.countNum = parseInt(value)
                    }
                });

                this.loadProduct()
            },

            addOrder(){
                const _this = this

                let newArr = new Array()
                this.productData.forEach(element => {
                    console.log(element)
                    newArr.push({
                        "itemId":element.id,
                        "num":parseInt(element.countNum),
                        "price":parseFloat(element.tbGoods.price),
                        "commitTime":'',
                        "amountOfMoney":element.amountOfMoney ,
                        "discount":element.discount ,
                        "discountAmount":element.discountAmount ,
                        "discountAfter":element.discountAfter ,
                        "taxRate":element.taxRate,
                        "taxAmount":element.taxAmount,
                        "taxAfter":element.taxAfter
                    })
                });
                let data = {
                    ascriptionId: this.addList.ascriptionId,  //负责人,取客户负责人
                    customerpoolId: this.addList.customerpoolId,
                    deliveryAddress: this.addList.deliveryAddress,
                    deliveryMode: this.addList.deliveryMode,   //交货方式ID
                    orderDetails: newArr,
                    orderTime: this.addList.orderTime,
                    settlement: this.addList.settlement,   //结算方式
                    totalSum: this.productInfo.realAmount,
                    pId: config.userData.pId,
                }

                console.log(data)

                let flag = false
                if(data.orderDetails.length == 0){
                    $Toast({
                        content: '请选择产品',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.settlement){
                    $Toast({
                        content: '请选择结算方式',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.customerpoolId){
                    $Toast({
                        content: '请选择客户名称',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.orderTime){
                    $Toast({
                        content: '请选择订单时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'order/insert.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        // "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '新增成功',
                                type: 'success'
                            });
                            _this.toOrder()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toOrder(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
</style>