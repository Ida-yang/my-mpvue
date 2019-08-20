<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="线索来源" :value="addList.cues" is-link  i-class="simple_cell" i-cell-text="color_495060_text" request @click="cueFocus"></i-cell>
            <i-input v-model="addList.poolName" title="公司名称" right request maxlength="50" @input="handleInput($event,2)" @blur="handleBlur" />
            <i-input v-model="addList.contactsName" title="联系人" right request maxlength="20" @input="handleInput($event,3)" />
            <i-input v-model="addList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,4)" />
            <i-input v-model="addList.telphone" title="电话" right type="number" maxlength="21" @input="handleInput($event,5)" />
            <i-input v-model="addList.address" title="详细地址" right placeholder="(最多50字)" maxlength="50" @input="handleInput($event,6)" />
            <i-input v-model="addList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 新增 -->
        <i-button @click="addClue" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showcues" :actions="cueList" show-cancel @cancel="cueCancel" @change="cueChange" />
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
                current: '新增线索',
                existingList:[],

                addList:{
                    cues:'大数据',
                    cuesid:'3001',
                    poolName:'',
                    contactsName:'',
                    phone:'',
                    telphone:'',
                    address:'',
                    remark:'',
                },
                typeData:[],

                showcues: false,
                cueList:[],
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
                    cuesid:'3001',
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

                wx.request({
                    url: config.defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + config.userData.cId,  //接口地址
                    data: {
                        type: '客户来源'
                    },
                    success: function (res) {
                        _this.typeData = res.data
                        let info = res.data
                        info.forEach(el => {
                            _this.cueList.push({name:el.typeName})
                        });
                    }
                })
            },
            cueFocus(){
                this.showcues = true
            },
            cueCancel(){
                this.showcues = false
            },
            cueChange(val){
                let key = val.mp.detail.index
                this.typeData.forEach((a,i) => {
                    if(i == key){
                        this.addList.cues = a.typeName
                        this.addList.cuesid = a.id
                    }
                });
                this.showcues = false
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
            addClue(){
                const _this = this
                let data = {
                    cuesid: this.addList.cuesid,
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
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/saveClue.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toClue()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toClue(){
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