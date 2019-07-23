<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="客户来源" :value="addList.cues" is-link i-class="simple_cell" request @click="cueFocus($event,1)"></i-cell>
            <i-cell title="客户分类" :value="addList.levels" is-link i-class="simple_cell" request @click="cueFocus($event,2)"></i-cell>
            <i-input v-model="addList.poolName" title="公司名称" right request maxlength="50" @input="handleInput($event,2)" @blur="handleBlur" />
            <i-input v-model="addList.contactsName" title="联系人" right request maxlength="20" @input="handleInput($event,3)" />
            <i-input v-model="addList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,4)" />
            <i-input v-model="addList.telphone" title="电话" right type="number" maxlength="21" @input="handleInput($event,5)" />
            <i-input v-model="addList.address" title="详细地址" right placeholder="(最多50字)" maxlength="50" @input="handleInput($event,6)" />
            <i-input v-model="addList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>
        <p class="request_tip"><span style="color:#ed3f14"> * </span>为必填项</p>

        <!-- 新增 -->
        <i-button @click="addCustomer" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showcues" :actions="cueList" show-cancel @cancel="cueCancel(1)" @change="cueChange" />
        <i-action-sheet :visible="showtype" :actions="typeList" show-cancel @cancel="cueCancel(2)" @change="typeChange" />
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
                current: '新增客户',
                existingList:[],

                addList:{
                    cues:'大数据',
                    customerStateid:'3001',
                    levelsid:'',
                    levels:'',
                    poolName:'',
                    contactsName:'',
                    phone:'',
                    telphone:'',
                    address:'',
                    remark:'',
                },
                cuesData:[],
                typeData:[],

                showcues: false,
                cueList:[],
                showtype: false,
                typeList:[]
            }
        },

        mounted(){
            this.loadData()
            this.loadType()
        },

        methods: {
            loadData(){
                this.addList = {
                    cues:'大数据',
                    customerStateid:'3001',
                    levelsid:'',
                    levels:'',
                    poolName:'',
                    contactsName:'',
                    phone:'',
                    telphone:'',
                    address:'',
                    remark:'',
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
                        _this.cuesData = res.data.name3001
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
            cueFocus(e,val){
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
                this.cuesData.forEach((a,i) => {
                    if(i == key){
                        this.addList.cues = a.typeName
                        this.addList.customerStateid = a.id
                    }
                });
                this.showcues = false
            },
            typeChange(val){
                let key = val.mp.detail.index
                this.typeData.forEach((a,i) => {
                    if(i == key){
                        this.addList.levels = a.typeName
                        this.addList.levelsid = a.id
                    }
                });
                this.showtype = false
            },
            handleInput(e,val){
                let value = e.mp.detail
                if(val === 2){
                    this.addList.poolName = value
                }else if(val === 3){
                    this.addList.contactsName = value
                }else if(val === 4){
                    this.addList.phone = value
                }else if(val === 5){
                    this.addList.telphone = value
                }else if(val === 6){
                    this.addList.address = value
                }else if(val === 7){
                    this.addList.remark = value
                }
            },
            handleBlur(e){
                let val = e.target.detail.value
                let data = {
                    name:val,
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/checkName.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == '20000'){
                            $Toast({
                                content: '该公司已存在于线索或客户中',
                                type: 'warning'
                            });
                        }else{
                            return
                        }
                    }
                })
            },
            addCustomer(){
                const _this = this
                let data = {
                    customerStateid: this.addList.customerStateid,
                    levelsid:this.addList.levelsid,
                    poolName: this.addList.poolName,
                    contactsName: this.addList.contactsName,
                    phone: this.addList.phone,
                    telphone: this.addList.telphone,
                    address: this.addList.address,
                    remark: this.addList.remark,
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
                    url: config.defaulthost + 'customerpool/savePool.do?cId=' + config.userData.cId,  //接口地址
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

<style>
</style>