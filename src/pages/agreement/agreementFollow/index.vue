<template>
    <div>
        <!-- <i-panel :title="current"></i-panel> -->
        <i-panel :title="followData.contract_name">
            <i-cell title="联系方式" :value="followList.followType" is-link request i-class="simple_cell" @click="optionFocus($event,1)"></i-cell>
            <i-cell title="联系人" :value="followList.contactsName" is-link request i-class="simple_cell" @click="optionFocus($event,2)"></i-cell>
            <i-cell title="下次联系时间" is-link i-class="simple_cell">
                <i-datetime-picker slot="footer" :value="followList.contactTime" @change="handleInput($event,2)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-input v-model="followList.followContent" title="跟进内容" right request type="textarea" maxlength="200" @input="handleInput($event,1)" />
            <i-button type="ghost" :long="true" @click="uploadIMG" i-class="followimg_btn">上传图片</i-button>
        </i-panel>
        <image v-if="followImg" mode="aspectFit" :src="followImg" class="fullwidth_img"></image>
        <p class="request_tip"><span style="color:#f56c6c"> * </span>为必填项</p>
        
        <!-- 提交 -->
        <i-button type="ghost" :long="true" @click="addAgreeFollow" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showtype" :actions="typeList" @change="typeChange" />
        <i-action-sheet :visible="showcontact" :actions="contactList" @change="contactChange" />
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
                
                followData:{},
                contactData:[],

                followList:{
                    followType:'电话',
                    contactTime:'',
                    followContent:'',
                    contactsId:'',
                    contactsName:'',
                    imgName:'',
                },
                followImg: '',

                showtype:false,
                typeList:[
                    {name:'电话'},
                    {name:'微信'},
                    {name:'QQ'},
                    {name:'邮箱'},
                    {name:'拜访'},
                ],
                showcontact:false,
                contactList:[],
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                this.followData = config.information.agreementDetailData

                this.followList = {
                    followType:'电话',
                    contactTime:'',
                    followContent:'',
                    contactsId:'',
                    contactsName:'',
                    imgName:'',
                }

                let data = {
                    customerpool_id: this.followData.customerpool_id,
                    page: 1,
                    limit: 9999999,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/getPoolContacts.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        _this.contactData = info
                        info.forEach(el => {
                            _this.contactList.push({name:el.name})
                        });
                        _this.followList.contactsId = info[0].id
                        _this.followList.contactsName = info[0].name
                    }
                })
            },
            optionFocus(e,val){
                if(val === 1){
                    this.showtype = true
                }else if(val === 2){
                    this.showcontact = true
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.followList.followContent = e.mp.detail
                }else if(val == 2){
                    this.followList.contactTime = e.mp.detail
                }
            },
            uploadIMG(){
                const _this = this

                wx.chooseImage({
                    count: 1,
                    success: function(res){
                        // tempFilePath可以作为img标签的src属性显示图片
                        const tempFilePaths = res.tempFilePaths
                        _this.followImg = res.tempFilePaths[0]
                        wx.uploadFile({
                            url: config.defaulthost + 'workOrder/upload.do?cId=' + config.userData.cId,
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success: function (res) {
                                _this.followList.imgName = res.data
                            }
                        })
                    }
                })
            },

            typeChange(e){
                let index = e.target.index
                this.typeList.forEach((el,i) => {
                    if(i == index){
                        this.followList.followType = el.name
                    }
                });
                this.showtype = false
            },
            contactChange(e){
                let index = e.target.index
                this.contactData.forEach((el,i) => {
                    if(i == index){
                        this.followList.contactsName = el.name
                        this.followList.contactsId = el.id
                    }
                });
                this.showcontact = false
            },

            addAgreeFollow(){
                const _this = this
                let data = {
                    contract_id: this.followData.contract_id,
                    customerpool_id: this.followData.customerpool_id,
                    followType: this.followList.followType,
                    contactTime: this.followList.contactTime,
                    followContent: this.followList.followContent,
                    contactsId: this.followList.contactsId,
                    imgName: this.followList.imgName,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }
                console.log(data)

                let flag = false
                if(!data.followContent){
                    $Toast({
                        content: '跟进内容不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.contactsId){
                    $Toast({
                        content: '联系人不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'addFollowFromSmallProcedures.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '添加成功',
                                type: 'success'
                            });
                            _this.toAgreeDetail()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toAgreeDetail(){
                wx.navigateBack({
                    delta: 1,
                })
            }
        },
    }
</script>

<style scoped>
</style>