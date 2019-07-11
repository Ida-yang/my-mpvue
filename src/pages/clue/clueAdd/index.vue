<template>
    <div>
        <i-panel :title="current"></i-panel>
        <i-panel title=" ">
            <i-input v-model="addList.cues" title="线索来源" right request @focus="cueFocus" />
            <i-input v-model="addList.poolName" title="公司名称" right request maxlength="50" @input="handleInput($event,2)" />
            <i-input v-model="addList.contactsName" title="联系人" right request maxlength="20" @input="handleInput($event,3)" />
            <i-input v-model="addList.phone" title="手机号码" right request type="number" maxlength="11" @input="handleInput($event,4)" />
            <i-input v-model="addList.telphone" title="电话" right type="number" maxlength="21" @input="handleInput($event,5)" />
            <i-input v-model="addList.address" title="详细地址" right placeholder="(最多50字)" maxlength="50" @input="handleInput($event,6)" />
            <i-input v-model="addList.remark" title="备注" right type="textarea" maxlength="200" @input="handleInput($event,7)" />
        </i-panel>

        <!-- 新增 -->
        <i-button @click="addClue" type="ghost" size="small" :long="true" class="bottomBtn">确定</i-button>

        <i-action-sheet :visible="showcues" :actions="cueList" show-cancel @cancel="cueCancel" @change="cueChange" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '新增线索',

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
        },

        methods: {
            loadData(){
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

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/saveClue.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
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
                const url = '../main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style scoped>
</style>