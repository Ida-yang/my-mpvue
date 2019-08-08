<template>
    <div class="add_or_update_wrap">
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="拜访公司" :value="addList.customerName" request is-link i-class="simple_cell" @click="cellFocus($event,1)"></i-cell>
            <i-cell title="拜访时间" request is-link i-class="simple_cell">
                <i-datetime-picker slot="footer" :value="addList.visitTime" @change="dealChange($event,1)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="结束时间" request is-link i-class="simple_cell">
                <i-datetime-picker slot="footer" :value="addList.endTime" @change="dealChange($event,2)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="提醒时间" request is-link i-class="simple_cell">
                <i-datetime-picker slot="footer" :value="addList.remindTime" @change="dealChange($event,3)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="拜访对象" :value="addList.contact" request is-link i-class="simple_cell" @click="cellFocus($event,2)"></i-cell>
            <i-input v-model="addList.visitTheme" title="拜访主题" right request type="number" maxlength="50" @input="handleInput($event,1)" />
            <i-input v-model="addList.visitObjective" title="拜访目的" right request type="textarea" maxlength="200" @input="handleInput($event,2)" />
            <i-cell title="协助人员" :value="addList.assistants" is-link i-class="simple_cell" @click="cellFocus($event,3)"></i-cell>
            <i-input v-model="addList.remarks" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,3)" />
        </i-panel>

        <!-- 新增 -->
        <i-button @click="addOutwork" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-action-sheet :visible="showContact" :actions="contactList" @change="contactChange" />
        
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '新增外勤',

                addList:{
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
                this.addList.customerName = poolObj.poolName
                this.addList.customerpoolid = poolObj.poolNameID
                if(poolObj.poolNameID !== undefined && poolObj.poolNameID !== null){
                    this.loadContact()
                }

                let assisObj = config.information.outworkAssistants
                if(assisObj){
                    this.addList.assistantsid = assisObj.id
                    this.addList.assistants = assisObj.name
                }
            },
            loadList(){
                this.addList = {
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
                }
            },
            loadContact(){
                const _this = this
                this.contactList = []
                let data = {
                    customerpool_id: this.addList.customerpoolid
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
                    this.addList.visitTheme = e.mp.detail
                }else if(val == 2){
                    this.addList.visitObjective = e.mp.detail
                }else if(val == 3){
                    this.addList.remarks = e.mp.detail
                }
            },
            cellFocus(e,val){
                if(val == 1){
                    const url = '../customers/main'
                    mpvue.navigateTo({ url })
                }else if(val == 2){
                    this.showContact = true
                }else if(val == 3){
                    const url = '../assistants/main'
                    mpvue.navigateTo({ url })
                }
            },
            contactChange(e){
                let index = e.mp.detail.index
                this.contactData.forEach((el,i) => {
                    if(i == index){
                        this.addList.contactsid = el.id
                        this.addList.contact = el.name
                        this.showContact = false
                    }
                });
            },
            dealChange(e,val){
                console.log(e)
                if(val == 1){
                    this.addList.visitTime = e.mp.detail + ':00'
                }else if(val == 2){
                    this.addList.endTime = e.mp.detail + ':00'
                }else if(val == 3){
                    this.addList.remindTime = e.mp.detail + ':00'
                }
            },

            addOutwork(){
                const _this = this

                let data = {
                    customerpoolid: this.addList.customerpoolid,
                    customerName: this.addList.customerName,
                    contactsid: this.addList.contactsid,
                    visitTime: this.addList.visitTime,
                    endTime: this.addList.endTime,
                    remindTime: this.addList.remindTime,
                    visitTheme: this.addList.visitTheme,
                    visitObjective: this.addList.visitObjective,
                    assistantsid: this.addList.assistantsid,
                    remarks: this.addList.remarks,
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
                if(!data.remindTime){
                    $Toast({
                        content: '请选择提醒时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.endTime){
                    $Toast({
                        content: '请选择结束时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.visitTime){
                    $Toast({
                        content: '请填写拜访时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.customerpoolid){
                    $Toast({
                        content: '请选择拜访公司',
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
                                content: '新增成功',
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