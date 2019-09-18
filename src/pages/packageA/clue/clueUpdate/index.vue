<template>
    <div>
        <!-- <i-panel :title="current"></i-panel> -->
        <i-panel title=" "></i-panel>
        <i-panel :title="clueData.name">
            <!-- <i-input v-model="updateList.cues" title="线索来源" right request @focus="cueFocus" /> -->
            <i-cell title="线索来源" :value="updateList.cues" is-link request  i-class="simple_cell" i-cell-text="color_495060_text" @click="cueFocus"></i-cell>
            <i-input v-model="updateList.poolName" title="公司名称" right request maxlength="50" @input="handleInput($event,2)" />
            <i-input v-model="updateList.contactsName" title="联系人" right request maxlength="20" @input="handleInput($event,3)" />
            <i-input v-model="updateList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,4)" />
            <i-input v-model="updateList.telphone" title="电话" right type="number" maxlength="21" @input="handleInput($event,5)" />
            <i-input v-model="updateList.address" title="详细地址" right placeholder="(最多50字)" maxlength="50" @input="handleInput($event,6)" />
            <i-input v-model="updateList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>

        <!-- 修改 -->
        <i-button @click="updateClue" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showcues" :actions="cueList" show-cancel @cancel="cueCancel" @change="cueChange" />
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
                current: '修改线索',
                clueData:{},

                updateList:{
                    csId:'',
                    id:'',
                    cues:'',
                    cuesid:'',
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
            this.loadType()
            this.loadData()
        },

        methods: {
            loadData(){
                this.clueData = config.information.clueupdateData
                this.updateList = {
                    cues: this.clueData.cues,
                    cuesid: this.clueData.cuesid,
                    poolName: this.clueData.name,
                    contactsName: this.clueData.contacts[0].coName,
                    phone: this.clueData.phone,
                    telphone: this.clueData.telephone,
                    address: this.clueData.address,
                    remark: this.clueData.remark,
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
                    header:{
                        'Cookie': config.SESSIONID
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
                        this.updateList.cues = a.typeName
                        this.updateList.cuesid = a.id
                    }
                });
                this.showcues = false
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
            updateClue(){
                const _this = this
                let data = {
                    id: this.clueData.id,
                    csId: this.clueData.contacts[0].csId,
                    cuesid: this.updateList.cuesid,
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
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/updateClue.do?cId=' + config.userData.cId,  //接口地址
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

<style scoped>
</style>