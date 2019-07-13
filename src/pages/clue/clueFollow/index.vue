<template>
    <div>
        <!-- <i-panel :title="current"></i-panel> -->
        <i-panel :title="followData.name"></i-panel>
        <i-panel title=" ">
            <!-- <i-input v-model="followList.followType" title="联系方式" right request @focus="optionFocus($event,1)" /> -->
            <!-- <i-input v-model="followList.contactsName" title="联系人" right request  @focus="optionFocus($event,2)" /> -->
            <!-- <i-input v-model="followList.follow_stateName" title="状态" right request  @focus="optionFocus($event,3)" /> -->
            <i-cell title="联系方式" :value="followList.followType" is-link request i-class="simple_cell" @click="optionFocus($event,1)"></i-cell>
            <i-cell title="联系人" :value="followList.contactsName" is-link request i-class="simple_cell" @click="optionFocus($event,2)"></i-cell>
            <i-cell title="状态" :value="followList.follow_stateName" is-link request i-class="simple_cell" @click="optionFocus($event,3)"></i-cell>
            <i-input v-model="followList.contactTime" title="下次联系时间" right  @focus="optionFocus($event,4)" />
            <i-input v-model="followList.followContent" title="跟进内容" right type="textarea" maxlength="200" @input="handleInput($event,1)" />
        </i-panel>
        <p class="request_tip"><span style="color:#ed3f14"> * </span>为必填项</p>

        <!-- 修改 -->
        <i-button @click="addClueFollow" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showtype" :actions="typeList" show-cancel @cancel="typeCancel" @change="typeChange" />
        <i-action-sheet :visible="showcontact" :actions="contactList" show-cancel @cancel="contactCancel" @change="contactChange" />
        <i-action-sheet :visible="showstate" :actions="stateList" show-cancel @cancel="stateCancel" @change="stateChange" />
        <i-action-sheet :visible="showtime" :actions="timeList" show-cancel @cancel="timeCancel" @change="timeChange" />
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
                current: '跟进记录',
                clue_id:7026,

                followData:{},

                followList:{
                    followType:'',
                    contactTime:'',
                    followContent:'',
                    contactsId:'',
                    contactsName:'',
                    follow_state:'',
                    follow_stateName:'',
                },

                showtype:false,
                typeList:[
                    {name:'电话'},
                    {name:'微信'},
                    {name:'QQ'},
                    {name:'邮箱'},
                    {name:'拜访'},
                ],

                showcontact:false,
                contactData:[],
                contactList:[],

                showstate:false,
                stateData:[],
                stateList:[],

                showtime:false,
                timeData:[],
                timeList:[]
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                this.followData = config.information.clueDetailData

                const _this = this
                _this.stateList = []
                _this.contactList = []

                let data = {
                    customeroneId:this.followData.id,
                    page:1,
                    limit:50,
                }

                wx.request({
                    url: config.defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + config.userData.cId,  //接口地址
                    data: {
                        type: '线索状态'
                    },
                    success: function (res) {
                        _this.stateData = res.data
                        let info = res.data
                        info.forEach(el => {
                            _this.stateList.push({name:el.typeName})
                        });
                    }
                })

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/getClueContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success:function(res) {
                        let info2 = res.data.map.success
                        _this.contactData = info2
                        info2.forEach(el => {
                            _this.contactList.push({name:el.name})
                        });
                    }
                })
            },
            optionFocus(e,val){
                if(val === 1){
                    this.showtype = true
                }else if(val === 2){
                    this.showcontact = true
                }else if(val === 3){
                    this.showstate = true
                }else if(val === 4){
                    this.showtime = true
                }
            },
            typeCancel(){
                this.showtype = false
            },
            typeChange(e){
                console.log(e)
                let index = e.target.index
                this.typeList.forEach((el,i) => {
                    if(i == index){
                        this.followList.followType = el.name
                    }
                });
                this.showtype = false
            },

            contactCancel(){
                this.showcontact = false
            },
            contactChange(e){
                console.log(e)
                let index = e.target.index
                this.contactData.forEach((el,i) => {
                    if(i == index){
                        this.followList.contactsName = el.name
                        this.followList.contactsId = el.id
                    }
                });
                this.showcontact = false
            },

            stateCancel(){
                this.showstate = false
            },
            stateChange(e){
                console.log(e)
                let index = e.target.index
                this.stateData.forEach((el,i) => {
                    if(i == index){
                        this.followList.follow_stateName = el.typeName
                        this.followList.follow_state = el.id
                    }
                });
                this.showstate = false
            },

            timeCancel(){
                this.showtime = false
            },
            timeChange(e){
                console.log(e)
            },

            handleInput(e,val){
                console.log(e,val)
                if(val == 1){
                    this.followList.followContent = e.mp.detail
                }
            },


            addClueFollow(){
                console.log(this.followList)
            },
        },
    }
</script>

<style scoped>
</style>