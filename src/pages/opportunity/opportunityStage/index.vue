<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel :title="opportunityInfo.name"></i-panel>
        <i-steps :current="stepIndex" direction="vertical" i-class="stage_steps">
            <i-step v-for="(item,index) in stepList" :key="item.sort" :status="item.stepStatus" :icon="item.stepIcon">
                <i-fiche unborder isFooter slot="title" v-if="index == 0" :title="item.step_name" :extra="'成功几率：' + item.step_probability + ' %'">
                    <view slot="footer">
                        创建时间：{{item.createTime}}
                    </view>
                </i-fiche>
                <i-fiche unborder isFooter slot="title" v-if="index < stageIndex && index !== 0" :title="item.step_name" :extra="'成功几率：' + item.step_probability + ' %'">
                    <view slot="footer">
                        推进时间：{{item.createTime}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{{item.duration}}
                    </view>
                </i-fiche>
                <i-fiche slot="title" v-if="index == stageIndex && !failStep" :title="item.step_name" :extra="'成功几率：' + item.step_probability + ' %'">
                </i-fiche>
                <i-fiche slot="title" isFooter v-if="index == stageIndex && failStep" :title="item.step_name" :extra="'成功几率：' + item.step_probability + ' %'">
                    <view slot="footer">
                        推进时间：{{item.createTime}}&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;{{item.duration}}
                    </view>
                </i-fiche>
                <i-fiche unborder slot="title" v-if="index > stageIndex" :title="item.step_name" :extra="'成功几率：' + item.step_probability + ' %'">
                </i-fiche>
            </i-step>
        </i-steps>

        <i-tab-bar v-if="!failStep && !finishStep" :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="playon" icon="playon" current-icon="playon" title="下一步"></i-tab-bar-item>
            <i-tab-bar-item key="offline" icon="offline" current-icon="offline" title="失败关闭"></i-tab-bar-item>
        </i-tab-bar>

        <i-modal title="确认修改商机进度吗？一旦确定将不可撤回" :visible="showNext" @ok="nextStep" @cancel="cancelNext">
            <i-cell title="预计成交时间" is-link>
                <picker slot="footer" mode="date" :value="opportunity_deal" @change="dealChange">
                    <view class="picker" style="min-width:100px;height:20px">
                        {{opportunity_deal}}
                    </view>
                </picker>
            </i-cell>
        </i-modal>
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '商机阶段',

                opportunityInfo:{},

                stepList:[],
                opportunityStep:[],

                stepIndex: '',
                stageIndex:'',
                failStep:false,
                finishStep:false,

                activeBar:'',

                showNext:false,

                opportunity_deal:'',
                stepId:'',
                progressProbability:'',
                failStepId:'',
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                let info = config.information.opportunityDetailData
                this.opportunityInfo = {
                    id: info.opportunity_id,
                    name: info.opportunity_name
                    // id: 143,
                    // name: '广州海飞人力资源有限公司博罗分公司商机',
                }
                this.loadStep()
            },
            loadStep(){
                const _this = this
                
                wx.request({
                    url: config.defaulthost + 'addstep/selectAddstep.do?cId=' + config.userData.cId,  //接口地址
                    success:function(res) {
                        let info = res.data.map.addsteps
                        info.forEach(el => {
                            if(el.step_probability == '0'){
                                _this.failStepId = el.step_id
                            }
                        });
                        _this.stepList = info
                        _this.stepList.length = info.length - 1
                        _this.loadDetail()
                    }
                })
            },
            loadDetail(){
                const _this = this
                let data = {
                    opportunity_id: this.opportunityInfo.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'opportunity/getopportunityById.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        _this.opportunity_deal = res.data.map.success[0].opportunity_deal
                        let info = res.data.map.success[0].opportunityProgress
                        let point = ''
                        _this.opportunityStep = info
                        info.forEach(a => {
                            if(a.progress_probability == '0'){
                                _this.stepIndex = info.length - 1
                                point = info.length - 1
                                _this.failStep = true
                            }else if(a.progress_probability == '100'){
                                _this.stepIndex = info.length
                                point = info.length
                                _this.finishStep = true
                            }else{
                                _this.stepIndex = info.length
                                point = info.length
                                _this.failStep = false
                                _this.finishStep = false
                            }
                        });
                        _this.stageIndex = point

                        _this.stepList.forEach((el,i) => {
                            info.forEach((item,j) => {
                                if(i == j){
                                    el.createTime = item.createTime
                                    if(item.previousTime){
                                        let arr = item.previousTime.split(" ");
                                        let arr2 = item.createTime.split(" ");
                                        let begintime = new Date(arr[0].replace(/-/g, "/"))
                                        let endtime = new Date(arr2[0].replace(/-/g, "/"))
                                        let dateDiff = endtime.getTime() - begintime.getTime();
                                        let dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000));
                                        el.duration = '历时：' + dayDiff + '天'
                                    }
                                }
                                if(i < point){
                                    // console.log(el,'已完成的')
                                    el.stepStatus = 'finish'
                                    el.stepIcon = 'right'
                                }
                                if(i == point){
                                    if(_this.failStep == true){
                                        // console.log(el,'已关闭的')
                                        el.stepStatus = 'error'
                                        el.stepIcon = 'close'
                                        _this.stepIndex = -1
                                    }else if(_this.failStep == false){
                                        // console.log(el,'正在进行中的')
                                        el.stepStatus = 'process'
                                        el.stepIcon = 'brush'
                                    }
                                }
                                if(i > point){
                                    // console.log(el,'还在排队的')
                                    el.stepStatus = 'process'
                                    el.stepIcon = 'time_fill'
                                }
                            });
                        });
                    }
                })
            },

            changeBar(val){
                const _this = this
                let key = val.target.key
                this.activeBar = key
                if(key == 'playon'){
                    this.showNext = true
                    this.stepList.forEach((el,i) => {
                        if(i == this.stepIndex){
                            _this.stepId = el.step_id
                            _this.progressProbability = el.step_probability
                        }
                    });
                }else if(key == 'offline'){
                    const url = '../opportunityFail/main'
                    let length = this.opportunityStep.length - 1
                    config.information.failReason = {
                        previousTime: this.opportunityStep[length].createTime + ':00',
                        oy_id: this.opportunityInfo.id,
                        opportunityDeal: this.opportunity_deal,
                        stepId: this.failStepId,
                        progress_probability: this.progressProbability,
                    }
                    mpvue.navigateTo({ url })
                }
            },
            cancelNext(){
                this.showNext = false
            },
            dealChange(e){
                this.opportunity_deal = e.target.value
            },
            nextStep(){
                const _this = this
                let length = this.opportunityStep.length - 1
                let data = {
                    previousTime: this.opportunityStep[length].createTime + ':00',
                    oy_id: this.opportunityInfo.id,
                    opportunityDeal: this.opportunity_deal,
                    stepId: this.stepId,
                    progress_probability: this.progressProbability,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

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
                                content: '修改成功',
                                type: 'success'
                            });
                            _this.cancelNext()
                            _this.loadData()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },

            // toOppoDetail(){
            //     wx.navigateBack({
            //         delta: 1,
            //     })
            // }
        },
    }
</script>

<style>
    .stage_steps{
        margin-top: 20px;
    }
</style>