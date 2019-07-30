<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel :title="agreementName"></i-panel>
        <i-steps :current="stepIndex" direction="vertical" i-class="stage_steps">
            <i-step v-for="item in auditLog" :key="item.orderId" :status="item.stepStatus" :icon="item.stepIcon">
                <i-fiche isContent isFooter slot="title" :title="item.realname" :extra="item.auditState" :thumb="item.portrait">
                    <view slot="content">{{item.remarks}}</view>
                    <view slot="footer">{{item.examineTime}}</view>
                </i-fiche>
            </i-step>
        </i-steps>
    </div>
</template>

<script>
    import config from '../../../config'

    export default {
        data () {
            return {
                current: '合同审批流程',

                agreementName:'',

                stepIndex:-1,
                auditLog:[],
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                let info = config.information.agreementDetailData
                this.agreementName = info.contract_name

                let data = {
                    recordId: info.examineRecordId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'examineLog/queryExamineLogList.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data
                        info.forEach(el => {
                            if(el.examineStatus == 1){
                                el.auditState = '审核通过'
                                el.stepStatus = 'finish'
                                el.stepIcon = 'right'
                            }else if(el.examineStatus == 2){
                                el.auditState = '审核未通过'
                                el.stepStatus = 'error'
                                el.stepIcon = 'close'
                            }
                            if(el.img){
                                el.portrait = config.sourcehost + 'upload/' + config.userData.cId + '/' + el.img
                            }else{
                                el.portrait = config.sourcehost + 'upload/staticImg/avatar.jpg'
                            }
                        });

                        _this.auditLog = info
                    }
                })
            },
        }
    }
</script>

<style>
</style>