<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-input v-model="addList.name" title="联系人" right request maxlength="20" @input="handleInput($event,1)" />
            <i-cell title="公司名称" :value="addList.poolName" is-link i-class="simple_cell" request @click="cellFocus($event,1)"></i-cell>
            <i-input v-model="addList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,2)" />
            <i-input v-model="addList.telephone" title="电话" right type="number" maxlength="21" @input="handleInput($event,3)" />
            <i-input v-model="addList.qq" title="QQ" right maxlength="50" @input="handleInput($event,4)" />
            <i-input v-model="addList.email" title="邮箱" right maxlength="50" @input="handleInput($event,5)" />
            <i-input v-model="addList.wechat" title="微信" right maxlength="50" @input="handleInput($event,6)" />
            <i-cell title="性别" :value="addList.sex" is-link i-class="simple_cell" @click="cellFocus($event,2)"></i-cell>
            <i-input v-model="addList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 新增 -->
        <i-button @click="addContact" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-action-sheet :visible="showSex" :actions="sexList" show-cancel @cancel="sexCancel" @change="sexChange" />
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
                current: '新增联系人',

                addList:{
                    name:'',
                    poolName:'',
                    phone:'',
                    telephone:'',
                    qq:'',
                    email:'',
                    wechat:'',
                    sex:'',
                    customerpool_id:'',
                    customeroneId:'',
                    remark:'',
                },

                showSex:false,
                sexList:[
                    {name:'男'},
                    {name:'女'},
                ]
            }
        },

        onShow(){
            if(config.information.contactPoolNameData){
                console.log(config.information.contactPoolNameData)
                this.loadData()
            }
        },

        mounted(){
            this.loadList()
        },

        methods: {
            loadData(){
                let poolObj = config.information.contactPoolNameData
                this.addList.poolName = poolObj.poolName
                this.addList.customeroneId = poolObj.customeroneId
                this.addList.customerpool_id = poolObj.customerpool_id
            },
            loadList(){
                this.addList = {
                    name:'',
                    poolName:'',
                    phone:'',
                    telephone:'',
                    qq:'',
                    email:'',
                    wechat:'',
                    sex:'',
                    customerpool_id:'',
                    customeroneId:'',
                    remark:'',
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.addList.name = e.mp.detail
                }else if(val == 2){
                    this.addList.phone = e.mp.detail
                }else if(val == 3){
                    this.addList.telephone = e.mp.detail
                }else if(val == 4){
                    this.addList.qq = e.mp.detail
                }else if(val == 5){
                    this.addList.email = e.mp.detail
                }else if(val == 6){
                    this.addList.wechat = e.mp.detail
                }else if(val == 7){
                    this.addList.remark = e.mp.detail
                }
            },
            cellFocus(e,val){
                if(val == 1){
                    const url = '../clueandCustomer/main'
                    mpvue.navigateTo({ url })
                }else if(val == 2){
                    this.showSex = true
                }
            },
            sexChange(e){
                let index = e.mp.detail.index
                if(index == 0){
                    this.addList.sex = '男'
                }else if(index == 1){
                    this.addList.sex = '女'
                }
                this.showSex = false
            },
            sexCancel(){
                this.showSex = false
            },

            addContact(){
                const _this = this
                console.log(this.addList)
                let data = {
                    name:this.addList.name,
                    poolName:this.addList.poolName,
                    phone:this.addList.phone,
                    telephone:this.addList.telephone,
                    qq:this.addList.qq,
                    email:this.addList.email,
                    wechat:this.addList.wechat,
                    sex:this.addList.sex,
                    customerpool_id:this.addList.customerpool_id,
                    customeroneId:this.addList.customeroneId,
                    remark:this.addList.remark,
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
                if(!data.poolName){
                    $Toast({
                        content: '请选择公司',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.name){
                    $Toast({
                        content: '请填写联系人',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'insertContacts.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toContact()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toContact(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
</style>