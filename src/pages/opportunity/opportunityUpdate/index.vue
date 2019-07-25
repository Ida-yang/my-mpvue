<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-input v-model="updateList.opportunity_name" title="商机名称" right request maxlength="20" @input="handleInput($event,1)" />
            <i-cell title="公司名称" :value="updateList.poolName" request is-link i-class="simple_cell" @click="cellFocus($event,1)"></i-cell>
            <i-cell title="客户决策人" :value="updateList.contact" request is-link i-class="simple_cell" @click="cellFocus($event,2)"></i-cell>
            <i-input v-model="updateList.opportunity_achievement" title="预计成交金额" right request type="number" maxlength="50" @input="handleInput($event,2)" />
            <i-cell title="预计成交时间" request is-link i-class="simple_cell">
                <picker slot="footer" mode="date" :value="updateList.opportunity_deal" :start="nowDate" @change="dealChange">
                    <view class="picker cell_picker">
                    {{updateList.opportunity_deal}}
                    </view>
                </picker>
            </i-cell>
            <i-input v-model="updateList.opportunity_remarks" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,3)" />
        </i-panel>
        <p class="request_tip"><span style="color:#ed3f14"> * </span>为必填项</p>

        <!-- 编辑 -->
        <i-button @click="addOpportunity" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-action-sheet :visible="showContact" :actions="contactList" @change="contactChange" />
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
                current: '编辑商机',

                updateList:{
                    opportunity_id: '',
                    opportunity_name:'',
                    customerpool_id:'',
                    poolName:'',
                    contacts_id:'',
                    contact:'',
                    opportunity_achievement:'',
                    opportunity_deal:'',
                    opportunity_remarks:'',
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
                let poolObj = config.information.opportunityPoolNameData
                this.updateList.poolName = poolObj.poolName
                this.updateList.customerpool_id = poolObj.poolNameID
                if(poolObj.poolNameID !== undefined && poolObj.poolNameID !== null){
                    this.loadContact()
                }
            },
            loadList(){
                let opportunityData = config.information.opportunityupdateData
                this.updateList = {
                    opportunity_id: opportunityData.opportunity_id,
                    opportunity_name: opportunityData.opportunity_name,
                    customerpool_id: opportunityData.customerpool_id,
                    poolName: opportunityData.customerpool[0].name,
                    contacts_id: opportunityData.contacts_id,
                    contact: opportunityData.contacts[0].coName,
                    opportunity_achievement: opportunityData.opportunity_achievement,
                    opportunity_deal: opportunityData.opportunity_deal,
                    opportunity_remarks: opportunityData.opportunity_remarks,
                }
            },
            loadContact(){
                const _this = this
                let data = {
                    customerpool_id: this.updateList.customerpool_id
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
                    this.updateList.opportunity_name = e.mp.detail
                }else if(val == 2){
                    this.updateList.opportunity_achievement = e.mp.detail
                }else if(val == 3){
                    this.updateList.opportunity_remarks = e.mp.detail
                }
            },
            cellFocus(e,val){
                if(val == 1){
                    const url = '../customers/main'
                    mpvue.navigateTo({ url })
                }else if(val == 2){
                    this.showContact = true
                }
            },
            contactChange(e){
                let index = e.mp.detail.index
                this.contactData.forEach((el,i) => {
                    if(i == index){
                        this.updateList.contacts_id = el.id
                        this.updateList.contact = el.name
                        this.showContact = false
                    }
                });
            },
            dealChange(e){
                this.updateList.opportunity_deal = e.target.value
            },

            addOpportunity(){
                const _this = this

                let data = {
                    opportunity_id: this.updateList.opportunity_id,
                    opportunity_name: this.updateList.opportunity_name,
                    customerpool_id: this.updateList.customerpool_id,
                    contacts_id: this.updateList.contacts_id,
                    opportunity_achievement: this.updateList.opportunity_achievement,
                    opportunity_deal: this.updateList.opportunity_deal,
                    opportunity_remarks: this.updateList.opportunity_remarks,
                    user_id: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

                let flag = false
                if(!data.opportunity_deal){
                    $Toast({
                        content: '请选择预计成交时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.opportunity_achievement){
                    $Toast({
                        content: '请填写预计成交金额',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.contacts_id){
                    $Toast({
                        content: '请选择客户决策人',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.customerpool_id){
                    $Toast({
                        content: '请选择公司名称',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.opportunity_name){
                    $Toast({
                        content: '请填写商机名称',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'opportunity/saveOrUpdate.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toOpportunity()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toOpportunity(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
</style>