<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel :title="agreementData.contract_name">
            <i-input v-model="totalAmount" title="总金额" right maxlength="50" disabled />
            <i-input v-model="surplusAmount" title="剩余预计回款金额" right maxlength="50" disabled />
            <i-cell title="回款阶段" :value="backList.back_plan_name" is-link request i-class="simple_cell" @click="optionFocus($event,1)"></i-cell>
            <i-input v-model="backList.price" title="回款金额" right request maxlength="50" @input="handleInput($event,1)" />
            <i-cell title="回款时间" request is-link i-class="simple_cell">
                <picker slot="footer" mode="date" :value="backList.createTime" :start="nowDate" @change="handleInput($event,2)">
                    <view class="picker cell_picker">
                        {{backList.createTime}}
                    </view>
                </picker>
            </i-cell>
            <i-cell title="回款方式" :value="backList.pay_type_name" is-link request i-class="simple_cell" @click="optionFocus($event,2)"></i-cell>
            <i-input v-model="backList.remarks" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,3)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 提交 -->
        <i-button type="ghost" :long="true" @click="submitPayInfo" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showStage" :actions="stageList" @change="itemChange($event,1)" />
        <i-action-sheet :visible="showPayType" :actions="payTypeList" @change="itemChange($event,2)" />
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '回款信息',

                agreementData:{},
                totalAmount:'',
                surplusAmount:'',

                backList:{
                    createTime: '',
                    price: '',
                    back_plan_id: '',
                    back_plan_name: '',
                    pay_type_id: '',
                    pay_type_name: '',
                    remarks: '',
                },
                nowDate:'',

                showStage:false,
                stageList:[],
                showPayType:false,
                payTypeList:[],
            }
        },

        mounted(){
            this.loadData()
            this.loadPayType()
        },

        methods: {
            loadData(){
                let info = config.information.agreementDetailData
                let back = config.information.payinfoData
                this.agreementData = info
                this.totalAmount = info.amount

                let surplus = new Number()
                back.forEach(el => {
                    surplus += el.price
                });
                this.surplusAmount = this.totalAmount - surplus

                let plan = config.information.payplanData
                this.stageList = []
                plan.forEach(el => {
                    this.stageList.push({id:el.id,name:el.stage})
                });

                this.backList = {
                    createTime: '',
                    price: '',
                    back_plan_id: '',
                    back_plan_name: '',
                    remarks: '',
                    pay_type_id: '',
                    pay_type_name: '',
                }
            },
            loadPayType(){
                const _this = this
                this.payTypeList = []
                let data = {
                    type:'收款方式'
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
                            _this.payTypeList.push({id:el.id,name:el.typeName})
                        });
                    }
                })
            },

            optionFocus(e,val){
                console.log(e,val)
                if(val == 1){
                    this.showStage = true
                }else if(val == 2){
                    this.showPayType = true
                }
            },
            handleInput(e,val){
                console.log(e,val)
                if(val == 1){
                    this.backList.price = e.mp.detail
                }else if(val == 2){
                    this.backList.createTime = e.target.value
                }else if(val == 3){
                    this.backList.remarks = e.mp.detail
                }
            },
            itemChange(e,val){
                console.log(e,val)
                const _this = this
                let index = e.target.index
                if(val == 1){
                    this.stageList.forEach((a,i) => {
                        if(i == index){
                            _this.backList.back_plan_id = a.id
                            _this.backList.back_plan_name = a.name
                        }
                    });
                    this.showStage = false
                }else if(val == 2){
                    this.payTypeList.forEach((b,j) => {
                        if(j == index){
                            _this.backList.pay_type_id = b.id
                            _this.backList.pay_type_name = b.name
                        }
                    });
                    this.showPayType = false
                }
            },

            submitPayInfo(){
                const _this = this
                let data = {
                    createTime: this.backList.createTime,
                    price: this.backList.price,
                    back_plan_id: this.backList.back_plan_id,
                    contract_id: this.agreementData.contract_id,
                    customerpool_id: this.agreementData.customerpool_id,
                    remarks: this.backList.remarks,
                    pay_type_id: this.backList.pay_type_id,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                    type: '合同',
                }

                let flag = false
                if(!data.pay_type_id){
                    $Toast({
                        content: '收款方式不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.createTime){
                    $Toast({
                        content: '回款时间不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.price){
                    $Toast({
                        content: '回款金额不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.back_plan_id){
                    $Toast({
                        content: '回款阶段不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(data.price > this.surplusAmount){
                    $Toast({
                        content: '回款金额不能大于' + this.surplusAmount + '元',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return
                
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'back/saveOrUpdate.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '添加成功',
                                type: 'success'
                            });
                            _this.toAgreeDetail()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toAgreeDetail(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
</style>