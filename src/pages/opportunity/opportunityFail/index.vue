<template>
    <div class="oppo_fail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-checkbox-group :current="checkItem" @change="itemChange">
            <i-checkbox v-for="item in failReasonList" position="right" :key="item.id" :value="item.name" :label="item.id">
            </i-checkbox>
        </i-checkbox-group>

        <!-- 确认 -->
        <i-button @click="clickFailReason" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '失败原因',

                confirmData:{},

                failReasonData:[],
                failReasonList:[],

                checkItem:[],
                checkItemID:[]
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                this.confirmData = config.information.failReason
                console.log(this.confirmData)

                this.failReasonList = []
                let data = {
                    type: '失败原因'
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'typeInfo/getTypeInfoGroupByType.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data

                        info.forEach(el => {
                            _this.failReasonList.push({id:el.id,name:el.typeName})
                        });
                        _this.failReasonData = info
                    }
                })
            },

            itemChange(e){
                const index = this.checkItem.indexOf(e.target.value);
                index === -1 ? this.checkItem.push(e.target.value) : this.checkItem.splice(index, 1);
                const item = this.checkItemID.indexOf(e.target.label);
                item === -1 ? this.checkItemID.push(e.target.label) : this.checkItemID.splice(item, 1);
            },

            clickFailReason(){
                const _this = this

                let data = {
                    previousTime: this.confirmData.previousTime,
                    oy_id: this.confirmData.oy_id,
                    stepId: this.confirmData.stepId,
                    codeSnippet: '',
                    reasonsForFailure: this.checkItemID,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

                console.log(data)

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'saveOpportunityProgress.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '关闭成功',
                                type: 'success'
                            });
                            _this.toOppoStage()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toOppoStage(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .oppo_fail_wrap{
        margin-bottom: 40px
    }
</style>