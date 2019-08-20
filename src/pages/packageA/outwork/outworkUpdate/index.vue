<template>
    <div class="add_or_update_wrap">
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="拜访公司" :value="updateList.customerName" request is-link  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
            <i-cell title="拜访时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="updateList.visitTime" @change="dealChange($event,1)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="结束时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="updateList.endTime" @change="dealChange($event,2)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="提醒时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="updateList.remindTime" @change="dealChange($event,3)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="拜访对象" :value="updateList.contact" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,1)"></i-cell>
            <i-input v-model="updateList.visitTheme" title="拜访主题" right request maxlength="50" @input="handleInput($event,1)" />
            <i-input v-model="updateList.visitObjective" title="拜访目的" right request type="textarea" maxlength="200" @input="handleInput($event,2)" />
            <i-cell title="协助人员" :value="updateList.assistants" is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,2)"></i-cell>
            <i-input v-model="updateList.remarks" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,3)" />
        </i-panel>

        <!-- 编辑 -->
        <i-button @click="addOutwork" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-action-sheet :visible="showContact" :actions="contactList" @change="contactChange" />
        
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '编辑外勤',

                updateList:{
                    id:'',
                    customerpoolid:'',
                    customerName:'',
                    contactsid:'',
                    contact:'',
                    visitTime:'',
                    endTime:'',
                    remindTime:'',
                    visitTheme:'',
                    visitObjective:'',
                    assistantsid:[],
                    assistants:[],
                    remarks:'',
                },
                nowDate:'',
                
                showContact:false,
                contactData:[],
                contactList:[],
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
                let poolObj = config.information.outworkPoolName
                this.updateList.customerName = poolObj.poolName
                this.updateList.customerpoolid = poolObj.poolNameID
                if(poolObj.poolNameID !== undefined && poolObj.poolNameID !== null){
                    this.loadContact()
                }

                let assisObj = config.information.outworkAssistants
                if(assisObj){
                    this.updateList.assistantsid = assisObj.id
                    this.updateList.assistants = assisObj.name
                }
            },
            loadList(){
                let info = config.information.outworkupdateData
                console.log(info)
                
                this.updateList = {
                    id: info.id,
                    customerpoolid: info.customerpoolid,
                    customerName: info.customerName,
                    contactsid: info.contactsid,
                    contact: info.contactsName,
                    visitTime: info.visitTime,
                    endTime: info.endTime,
                    remindTime: info.remindTime,
                    visitTheme: info.visitTheme,
                    visitObjective: info.visitObjective,
                    assistantsid:[],
                    assistants:[],
                    remarks: info.remarks,
                }
                info.privateUser.forEach(el => {
                    if(el.private_id){
                        this.updateList.assistantsid.push(el.private_id)
                        this.updateList.assistants.push(el.private_name)
                    }
                });
            },
            loadContact(){
                const _this = this
                this.contactList = []
                let data = {
                    customerpool_id: this.updateList.customerpoolid
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
                        _this.contactData = info
                        info.forEach(el => {
                            _this.contactList.push({id:el.id,name:el.name})
                        });
                    }
                })
            },
            handleInput(e,val){
                if(val == 1){
                    this.updateList.visitTheme = e.mp.detail
                }else if(val == 2){
                    this.updateList.visitObjective = e.mp.detail
                }else if(val == 3){
                    this.updateList.remarks = e.mp.detail
                }
            },
            cellFocus(e,val){
                if(val == 1){
                    this.showContact = true
                }else if(val == 2){
                    const url = '../assistants/main'
                    mpvue.navigateTo({ url })
                }
            },
            contactChange(e){
                let index = e.mp.detail.index
                this.contactData.forEach((el,i) => {
                    if(i == index){
                        this.updateList.contactsid = el.id
                        this.updateList.contact = el.name
                        this.showContact = false
                    }
                });
            },
            dealChange(e,val){
                console.log(e)
                if(val == 1){
                    this.updateList.visitTime = e.mp.detail + ':00'
                }else if(val == 2){
                    this.updateList.endTime = e.mp.detail + ':00'
                }else if(val == 3){
                    this.updateList.remindTime = e.mp.detail + ':00'
                }
            },

            addOutwork(){
                const _this = this

                let data = {
                    id: this.updateList.id,
                    customerpoolid: this.updateList.customerpoolid,
                    customerName: this.updateList.customerName,
                    contactsid: this.updateList.contactsid,
                    visitTime: this.updateList.visitTime,
                    endTime: this.updateList.endTime,
                    remindTime: this.updateList.remindTime,
                    visitTheme: this.updateList.visitTheme,
                    visitObjective: this.updateList.visitObjective,
                    assistantsid: this.updateList.assistantsid,
                    remarks: this.updateList.remarks,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }
                console.log(data)

                let flag = false
                if(!data.visitObjective){
                    $Toast({
                        content: '请填写拜访目的',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.visitTheme){
                    $Toast({
                        content: '请填写拜访主题',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.contactsid){
                    $Toast({
                        content: '请选择拜访对象',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'visit/insertVisit.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toOutwork()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toOutwork(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
</style>