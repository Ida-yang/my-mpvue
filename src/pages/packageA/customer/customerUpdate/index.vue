<template>
    <div>
        <!-- <i-panel :title="current"></i-panel> -->
        <i-panel title=" "></i-panel>
        <i-panel :title="customerData.pName">
            <i-cell title="客户来源" :value="updateList.source" is-link request i-class="simple_cell" @click="cueFocus(1)"></i-cell>
            <i-cell title="客户分类" :value="updateList.levels" is-link request i-class="simple_cell" @click="cueFocus(2)"></i-cell>
            <i-input v-model="updateList.poolName" title="公司名称" right request maxlength="50" @input="handleInput($event,2)" />
            <i-input v-model="updateList.contactsName" title="联系人" right request maxlength="20" @input="handleInput($event,3)" />
            <i-input v-model="updateList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,4)" />
            <i-input v-model="updateList.telphone" title="电话" right type="number" maxlength="21" @input="handleInput($event,5)" />
            <i-input v-model="updateList.address" title="详细地址" right placeholder="(最多50字)" maxlength="50" @input="handleInput($event,6)" />
            <i-input v-model="updateList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 修改 -->
        <i-button @click="updateCustomer" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showcues" :actions="cueList" show-cancel @cancel="cueCancel(1)" @change="cueChange" />
        <i-action-sheet :visible="showtype" :actions="typeList" show-cancel @cancel="cueCancel(2)" @change="typeChange" />
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index';

    export default {
        data() {
            return {
                current: '修改客户',
                customerData:{},

                updateList:{
                    csId:'',
                    id:'',
                    source:'',
                    customerStateid:'',
                    levels:'',
                    levelsid:'',
                    poolName:'',
                    contactsName:'',
                    phone:'',
                    telphone:'',
                    address:'',
                    remark:'',
                },
                cueData:[],
                typeData:[],

                showcues: false,
                cueList:[],
                showtype:false,
                typeList:[],
            }
        },

        mounted(){
            this.loadType()
            this.loadData()
        },

        methods: {
            loadData(){
                this.customerData = config.information.customerupdateData
                this.updateList = {
                    source: this.customerData.source,
                    customerStateid: this.customerData.sourceid,
                    levels: this.customerData.levels,
                    levelsid: this.customerData.levelsid,
                    poolName: this.customerData.pName,
                    contactsName: this.customerData.contacts[0].coName,
                    phone: this.customerData.contacts[0].phone,
                    telphone: this.customerData.telephone,
                    address: this.customerData.address,
                    remark: this.customerData.remark,
                }
            },
            loadType(){
                const _this = this
                _this.cueList = []
                _this.typeList = []

                wx.request({
                    url: config.defaulthost + 'typeInfo/getTypeInfoByType.do?cId=' + config.userData.cId,  //接口地址
                    data: {
                        type: '客户来源'
                    },
                    success: function (res) {
                        _this.cueData = res.data.name3001
                        _this.typeData = res.data.name4001
                        let info1 = res.data.name3001
                        info1.forEach(el => {
                            _this.cueList.push({name:el.typeName})
                        });
                        let info2 = res.data.name4001
                        info2.forEach(el => {
                            _this.typeList.push({name:el.typeName})
                        });
                    }
                })
            },
            cueFocus(val){
                if(val == 1){
                    this.showcues = true
                }else if(val == 2){
                    this.showtype = true
                }
            },
            cueCancel(val){
                if(val == 1){
                    this.showcues = false
                }else if(val == 2){
                    this.showtype = false
                }
            },
            cueChange(val){
                let key = val.mp.detail.index
                this.cueData.forEach((a,i) => {
                    if(i == key){
                        this.updateList.source = a.typeName
                        this.updateList.customerStateid = a.id
                    }
                });
                this.showcues = false
            },
            typeChange(val){
                let key = val.mp.detail.index
                this.typeData.forEach((a,i) => {
                    if(i == key){
                        this.updateList.levels = a.typeName
                        this.updateList.levelsid = a.id
                    }
                });
                this.showtype = false
            },
            handleInput(e,val){
                let value = e.mp.detail
                if(val === 2){
                    this.updateList.poolName = value
                }else if(val === 3){
                    this.updateList.contactsName = value
                }else if(val === 4){
                    this.updateList.phone = value
                }else if(val === 5){
                    this.updateList.telphone = value
                }else if(val === 6){
                    this.updateList.address = value
                }else if(val === 7){
                    this.updateList.remark = value
                }
            },
            updateCustomer(){
                const _this = this
                let data = {
                    id: this.customerData.id,
                    csId: this.customerData.contacts[0].csId,
                    customerStateid: this.updateList.customerStateid,
                    levelsid: this.updateList.levelsid,
                    poolName: this.updateList.poolName,
                    contactsName: this.updateList.contactsName,
                    phone: this.updateList.phone,
                    telphone: this.updateList.telphone,
                    address: this.updateList.address,
                    remark: this.updateList.remark,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }
                
                let flag = false
                if(!data.phone){
                    $Toast({
                        content: '请填写手机号码',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.contactsName){
                    $Toast({
                        content: '请填写联系人',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.poolName){
                    $Toast({
                        content: '请填写公司名称',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.levelsid){
                    $Toast({
                        content: '请选择客户分类',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/updatepool.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '修改成功',
                                type: 'success'
                            });
                            _this.toCustomer()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toCustomer(){
                // const url = '../main'
                // mpvue.navigateTo({ url })
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
</style>