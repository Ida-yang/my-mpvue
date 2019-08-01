<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel :title="agreementData.contract_name">
            <i-input v-model="totalAmount" title="总金额" right maxlength="50" disabled />
            <i-input v-model="surplusAmount" title="剩余预计回款金额" right maxlength="50" disabled />
            <i-cell title="回款阶段" :value="planList.stage" is-link request i-class="simple_cell" @click="optionFocus"></i-cell>
            <i-input v-model="planList.price" title="预计回款金额" right request maxlength="50" @input="handleInput($event,1)" />
            <i-cell title="预计回款时间" request is-link i-class="simple_cell">
                <picker slot="footer" mode="date" :value="planList.date" :start="nowDate" @change="handleInput($event,2)">
                    <view class="picker cell_picker">
                    {{planList.date}}
                    </view>
                </picker>
            </i-cell>
            <i-cell title="提醒时间" is-link i-class="simple_cell">
                <i-datetime-picker slot="footer" :value="planList.remind_date" @change="handleInput($event,3)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-input v-model="planList.remarks" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,4)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 提交 -->
        <i-button type="ghost" :long="true" @click="submitPayPlan" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showStage" :actions="stageList" @change="stageChange" />
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '回款计划',

                agreementData:{},
                totalAmount:'',
                surplusAmount:'',

                planList:{
                    date: '',
                    price: '',
                    stage: '',
                    remarks: '',
                    remind_date: '',
                },
                nowDate:'',

                showStage:false,
                stageList:[],
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.information.agreementDetailData
                let plan = config.information.payplanData
                this.agreementData = info
                this.totalAmount = info.amount
                let surplus = new Number()
                plan.forEach(el => {
                    surplus += el.price
                });
                this.surplusAmount = this.totalAmount - surplus

                if(!plan.length || plan.length == 0){
                    this.stageList = [
                        {name:'首笔款'},
                        {name:'阶段款'},
                        {name:'尾笔款'},
                    ]
                }else{
                    this.stageList = [
                        {name:'阶段款'},
                        {name:'尾笔款'},
                    ]
                }
                
                this.planList = {
                    date: '',
                    price: '',
                    stage: '',
                    remarks: '',
                    remind_date: '',
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.planList.price = e.mp.detail
                }else if(val == 2){
                    this.planList.date = e.target.value
                }else if(val == 3){
                    this.planList.remind_date = e.mp.detail + ':00'
                }else if(val == 4){
                    this.planList.remarks = e.mp.detail
                }
            },
            optionFocus(){
                this.showStage = true
            },
            stageChange(e){
                let index = e.target.index

                this.stageList.forEach((el,i) => {
                    if(i == index){
                        this.planList.stage = el.name
                    }
                });
                this.showStage = false
            },
            submitPayPlan(){
                const _this = this
                let data = {
                    date: this.planList.date,
                    price: this.planList.price,
                    stage: this.planList.stage,
                    contract_id: this.agreementData.contract_id,
                    customerpool_id: this.agreementData.customerpool_id,
                    remarks: this.planList.remarks,
                    remind_date: this.planList.remind_date,
                    pId: config.userData.pId,
                }
                let flag = false
                if(!data.date){
                    $Toast({
                        content: '预计回款时间不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.price){
                    $Toast({
                        content: '预计回款金额不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.stage){
                    $Toast({
                        content: '回款阶段不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(data.price > this.surplusAmount){
                    $Toast({
                        content: '预计回款金额不能大于' + this.surplusAmount + '元',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'backPlan/saveOrUpdate.do?cId=' + config.userData.cId,  //接口地址
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