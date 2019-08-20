<template>
    <div class="add_or_update_wrap">
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="合同类型" :value="addList.contract_type" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,1)"></i-cell>
            <i-input v-model="addList.contract_name" title="合同名称" right request maxlength="20" @input="handleInput($event,1)" />
            <i-cell title="客户名称" :value="addList.customerpoolName" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,2)"></i-cell>
            <i-cell title="对应商机" :value="addList.opportunityName" is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,3)"></i-cell>
            <i-input v-model="addList.amount" title="合同金额" right request type="number" maxlength="50" @input="handleInput($event,2)" />
            <i-cell title="开始时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <picker slot="footer" mode="date" :value="addList.start_date" :start="nowDate" @change="dealChange($event,1)">
                    <view class="picker cell_picker">
                    {{addList.start_date}}
                    </view>
                </picker>
            </i-cell>
            <i-cell title="结束时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <picker slot="footer" mode="date" :value="addList.end_date" :start="nowDate" @change="dealChange($event,2)">
                    <view class="picker cell_picker">
                    {{addList.end_date}}
                    </view>
                </picker>
            </i-cell>
            <i-cell title="客户签约人" :value="addList.signatorieName" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,4)"></i-cell>
            <i-input v-model="addList.our_signatorieName" title="我方签约人" right maxlength="50" disabled />
            <i-input v-model="addList.remarks" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,3)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 新增 -->
        <i-button @click="addAgreement" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-action-sheet :visible="showType" :actions="typeList" @change="sheetChange($event,1)" />
        <i-action-sheet :visible="showOppo" :actions="oppoList" show-cancel @cancel="sheetCancel($event,2)" @change="sheetChange($event,2)" />
        <i-action-sheet :visible="showsignator" :actions="signatorList" @change="sheetChange($event,3)" />
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '新增合同',

                addList:{
                    orderId:'',
                    contract_type:'',
                    contract_name:'',
                    customerpool_id:'',
                    customerpoolName:'',
                    opportunity_id:'',
                    opportunityName:'',
                    amount:'',
                    start_date:'',
                    end_date:'',
                    signatories:'',
                    signatorieName:'',
                    our_signatorieName:config.userData.name,
                    remarks:'',
                },

                showType:false,
                typeList:[
                    {name:'服务合同'},
                    {name:'销售合同'},
                    {name:'代理合同'},
                    {name:'其他'},
                ],
                showOppo:false,
                oppoList:[],
                showsignator:false,
                signatorList:[],

                nowDate:'',
            }
        },

        onShow(){
            this.loadData()
        },

        mounted(){
            this.loadList()
        },

        methods: {
            loadData(){
                let poolObj = config.information.agreementPoolNameData
                this.addList.customerpoolName = poolObj.poolName
                this.addList.customerpool_id = poolObj.poolNameID
                if(poolObj.poolNameID !== undefined && poolObj.poolNameID !== null){
                    this.loadContact()
                    this.loadOppo()
                }
            },
            loadList(){
                this.addList = {
                    orderId:'',
                    contract_type:'',
                    contract_name:'',
                    customerpool_id:'',
                    customerpoolName:'',
                    opportunity_id:'',
                    opportunityName:'',
                    amount:'',
                    start_date:'',
                    end_date:'',
                    signatories:'',
                    signatorieName:'',
                    our_signatorieName:config.userData.name,
                    remarks:'',
                }
            },
            loadContact(){
                const _this = this
                let data = {
                    customerpool_id: this.addList.customerpool_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getPoolContactsName.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        info.forEach(el => {
                            _this.signatorList.push({ id:el.id,name:el.name})
                        });
                    }
                })
            },
            loadOppo(){
                const _this = this
                let data = {
                    customerpool_id: this.addList.customerpool_id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'opportunity/getOpportunityAll.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data
                        info.forEach(el => {
                            _this.oppoList.push({
                                id:el.opportunity_id,
                                name:el.opportunity_name,
                                number:el.opportunity_number,
                                amount:el.opportunity_achievement,
                                orderId:el.orderId
                            })
                        });
                    }
                })
            },
            cellFocus(e,val){
                if(val == 1){
                    this.showType = true
                }else if(val == 2){
                    const url = '../customers/main'
                    mpvue.navigateTo({ url })
                }else if(val == 3){
                    this.showOppo = true
                }else if(val == 4){
                    this.showsignator = true
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.addList.contract_name = e.mp.detail
                }else if(val == 2){
                    this.addList.amount = e.mp.detail
                }else if(val == 3){
                    this.addList.remarks = e.mp.detail
                }
            },
            dealChange(e,val){
                if(val == 1){
                    let value = e.target.value
                    this.addList.start_date = value
                    let valArr = value.split('-')
                    let y = parseInt(valArr[0]) + 1
                    this.addList.end_date = y + '-' + valArr[1] + '-' + valArr[2]
                }else if(val == 2){
                    this.addList.end_date = e.target.value
                }
            },

            sheetCancel(e,val){
                if(val == 2){
                    this.showOppo = false
                }
            },
            sheetChange(e,val){
                const _this = this
                let index = e.target.index
                if(val == 1){
                    this.typeList.forEach((a,i) => {
                        if(i == index){
                            _this.addList.contract_type = a.name
                            _this.showType = false
                        }
                    });
                }else if(val == 2){
                    this.oppoList.forEach((b,j) => {
                        if(j == index){
                            _this.addList.opportunityName = b.name
                            _this.addList.opportunity_id = b.id
                            _this.addList.amount = b.amount
                            if(b.orderId){
                                _this.addList.orderId = b.orderId
                            }
                            _this.showOppo = false
                            
                        }
                    });
                }else if(val == 3){
                    this.signatorList.forEach((c,k) => {
                        if(k == index){
                            _this.addList.signatorieName = c.name
                            _this.addList.signatories = c.id
                            _this.showsignator = false
                        }
                    });
                }
            },

            addAgreement(){
                const _this = this
                let data = {
                    orderId: this.addList.orderId,
                    contract_type: this.addList.contract_type,
                    contract_name: this.addList.contract_name,
                    customerpool_id: this.addList.customerpool_id,
                    opportunity_id: this.addList.opportunity_id,
                    amount: this.addList.amount,
                    start_date: this.addList.start_date,
                    end_date: this.addList.end_date,
                    signatories: this.addList.signatories,
                    our_signatories: config.userData.pId,
                    remarks: this.addList.remarks,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

                let flag = false
                if(!data.signatories){
                    $Toast({
                        content: '请选择客户签约人',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.start_date){
                    $Toast({
                        content: '请选择合同开始时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.amount){
                    $Toast({
                        content: '请填写合同金额',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.customerpool_id){
                    $Toast({
                        content: '请选择客户名称',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.contract_name){
                    $Toast({
                        content: '请填写合同名称',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.contract_type){
                    $Toast({
                        content: '请选择合同类型',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'insertContract.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '新增成功',
                                type: 'success'
                            });
                            _this.toAgreement()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toAgreement(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
</style>