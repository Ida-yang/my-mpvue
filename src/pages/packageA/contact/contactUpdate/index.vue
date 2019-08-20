<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel :title="contactName">
            <i-input v-model="updateList.name" title="联系人" right request maxlength="20" @input="handleInput($event,1)" />
            <i-cell title="公司名称" :value="updateList.poolName" is-link  i-class="simple_cell" i-cell-text="color_495060_text" request @click="cellFocus($event,1)"></i-cell>
            <i-input v-model="updateList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,2)" />
            <i-input v-model="updateList.telephone" title="电话" right type="number" maxlength="21" @input="handleInput($event,3)" />
            <i-input v-model="updateList.qq" title="QQ" right maxlength="50" @input="handleInput($event,4)" />
            <i-input v-model="updateList.email" title="邮箱" right maxlength="50" @input="handleInput($event,5)" />
            <i-input v-model="updateList.wechat" title="微信" right maxlength="50" @input="handleInput($event,6)" />
            <i-cell title="性别" :value="updateList.sex" is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,2)"></i-cell>
            <i-input v-model="updateList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>
        
        <!-- 编辑 -->
        <i-button @click="updateContact" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
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
                current: '编辑联系人',
                contactName:'',

                updateList:{
                    name:'',
                    csId:'',
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
                this.loadData()
            }
        },

        mounted(){
            this.loadList()
        },

        methods: {
            loadData(){
                let poolObj = config.information.contactPoolNameData
                this.updateList.poolName = poolObj.poolName
                this.updateList.customeroneId = poolObj.customeroneId
                this.updateList.customerpool_id = poolObj.customerpool_id
            },
            loadList(){
                let contactData = config.information.contactupdateData
                this.contactName = contactData.name
                this.updateList = {
                    name: contactData.name,
                    csId: contactData.csId,
                    poolName: contactData.poolname,
                    phone: contactData.phone,
                    telephone: contactData.telephone,
                    qq: contactData.qq,
                    email: contactData.email,
                    wechat: contactData.wechat,
                    sex: contactData.sex,
                    customerpool_id: '',
                    customeroneId: '',
                    remark: contactData.remark,
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.updateList.name = e.mp.detail
                }else if(val == 2){
                    this.updateList.phone = e.mp.detail
                }else if(val == 3){
                    this.updateList.telephone = e.mp.detail
                }else if(val == 4){
                    this.updateList.qq = e.mp.detail
                }else if(val == 5){
                    this.updateList.email = e.mp.detail
                }else if(val == 6){
                    this.updateList.wechat = e.mp.detail
                }else if(val == 7){
                    this.updateList.remark = e.mp.detail
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
                    this.updateList.sex = '男'
                }else if(index == 1){
                    this.updateList.sex = '女'
                }
                this.showSex = false
            },
            sexCancel(){
                this.showSex = false
            },

            updateContact(){
                const _this = this
                console.log(this.updateList)
                let data = {
                    id:this.updateList.csId,
                    name:this.updateList.name,
                    poolName:this.updateList.poolName,
                    phone:this.updateList.phone,
                    telephone:this.updateList.telephone,
                    qq:this.updateList.qq,
                    email:this.updateList.email,
                    wechat:this.updateList.wechat,
                    sex:this.updateList.sex,
                    customerpool_id:this.updateList.customerpool_id,
                    customeroneId:this.updateList.customeroneId,
                    remark:this.updateList.remark,
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
                    url: config.defaulthost + 'updateContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '编辑成功',
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