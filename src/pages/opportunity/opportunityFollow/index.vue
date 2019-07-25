<template>
    <div class="oppo_follow">
        <i-panel :title="current"></i-panel>
        
        <!-- 提交 -->
        <i-button type="ghost" :long="true" @click="addOppoFollow" class="bottom_btn">确定</i-button>

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
                current: '商机跟进记录',
                
                followData:{},

                followList:{
                    followType:'电话',
                    contactTime:'',
                    followContent:'',
                    contactsId:'',
                    contactsName:'',
                    follow_state:'',
                    follow_stateName:'',
                    imgName:'',
                },

                showtype:false,
                typeList:[],
                showcontact:false,
                contactList:[],
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                this.followData = config.information.customerDetailData

                this.followList = {
                    followType:'电话',
                    contactTime:'',
                    followContent:'',
                    contactsId:'',
                    contactsName:'',
                    follow_state:'',
                    follow_stateName:'',
                    imgName:'',
                }
            },

            typeChange(e){},
            contactChange(e){},

            addOppoFollow(){
                const _this = this
                console.log(this.followList)
                let data = {
                    opportunity_id: this.followData.opportunity_id,
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
            },
        },
    }
</script>

<style>
    .oppo_follow{
        margin-bottom: 40px;
    }
</style>