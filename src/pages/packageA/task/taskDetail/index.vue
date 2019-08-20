<template>
    <div class="task_detail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-cell :title="taskDetail.planningTheme">
            <p class="cell_info">关联客户&nbsp;&nbsp;{{taskDetail.customerName}}</p>
            <p class="cell_info">描述：&nbsp;&nbsp;{{taskDetail.describe}}</p>
        </i-cell>

        <i-panel title=" "></i-panel>
        <view>
            <i-cell-group>
                <i-cell title="开始时间" :value="taskDetail.startTime"></i-cell>
                <i-cell title="结束时间" :value="taskDetail.endTime"></i-cell>
                <i-cell title="提醒时间" :value="taskDetail.remindTime"></i-cell>
                <i-cell title="状态" :value="taskDetail.state"></i-cell>
                <i-cell title="负责人" :value="taskDetail.private_employee"></i-cell>
                <i-cell title="部门" :value="taskDetail.deptname"></i-cell>
                <i-cell title="机构" :value="taskDetail.parentname"></i-cell>
            </i-cell-group>
        </view>

        <i-tab-bar :current="activeBar" @change="changeBar" class="bottom_btn">
            <i-tab-bar-item key="offline" icon="offline" current-icon="offline" title="未完成"></i-tab-bar-item>
            <i-tab-bar-item key="success" icon="success" current-icon="success" title="已完成"></i-tab-bar-item>
            <i-tab-bar-item key="more" icon="more" current-icon="more" title="更多"></i-tab-bar-item>
        </i-tab-bar>

        <i-action-sheet :visible="showMore" :actions="moreActions" show-cancel @cancel="cancelMore" @change="changeOption" :mask-closable="false"></i-action-sheet>
        <i-action-sheet :visible="showDetele" :actions="deleteActions" show-cancel @cancel="cancelDelete" @change="deleteTask" :mask-closable="false">
            <view slot="header" style="padding: 16px">
                <view style="color: #444;font-size: 16px">确定吗？</view>
                <text>删除后无法恢复哦</text>
            </view>
        </i-action-sheet>
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '任务详情',

                taskDetail:{},

                activeBar:'',
                showMore:false,
                moreActions:[
                    {name:'作废'},
                    {name:'删除'},
                ],
                showDetele:false,
                deleteActions:[
                    {
                        name: '删除',
                        color: '#f56c6c'
                    }
                ],

                nowTime:'',
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.information.taskDetailData

                this.taskDetail = info
            },
            loadTime(){
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let min = date.getMinutes()
                let sec = date.getSeconds()

                month = (month < 10 ? "0" + month : month)
                day = (day < 10 ? "0" + day : day)
                hour = (hour < 10 ? "0" + hour : hour)
                min = (min < 10 ? "0" + min : min)
                sec = (sec < 10 ? "0" + sec : sec)

                this.nowTime = year + '-' +month + '-' + day + ' ' + hour + ':' + min + ':' + sec
            },
            changeBar(val){
                let key = val.target.key
                this.activeBar = key
                if(key == 'offline'){
                    this.inComplete()
                }else if(key == 'success'){
                    this.complete()
                }else if(key == 'more'){
                    this.showMore = true
                }
            },
            cancelMore(){
                this.showMore = false
            },
            changeOption(val){
                let index = val.target.index
                if(index === 0){
                    if(this.taskDetail.state == '已完成'){
                        $Toast({
                            content: '该任务是已完成状态',
                            type: 'warning'
                        });
                    }else{
                        this.nullify()
                    }
                }else if(index === 1){
                    if(this.taskDetail.state == '已完成'){
                        $Toast({
                            content: '不可删除',
                            type: 'warning'
                        });
                    }else{
                        this.showDetele = true
                    }
                }
                this.showMore = false
            },
            cancelDelete(){
                this.showDetele = false
            },
            inComplete(){
                const _this = this
                this.loadTime()
                let data = {
                    id: this.taskDetail.id,
                    state: '未完成',
                    updateTime: this.nowTime,
                    pId: config.userData.pId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'workPlan/updateWorkPlan.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '已修改为未完成',
                                type: 'success'
                            });
                            config.information.taskDetailData.state = '未完成'
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
            complete(){
                const _this = this
                this.loadTime()
                let data = {
                    id: this.taskDetail.id,
                    state: '已完成',
                    updateTime: this.nowTime,
                    pId: config.userData.pId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'workPlan/updateWorkPlan.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '已完成',
                                type: 'success'
                            });
                            config.information.taskDetailData.state = '已完成'
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
            nullify(){
                const _this = this
                this.loadTime()
                let data = {
                    id: this.taskDetail.id,
                    state: '作废',
                    updateTime: this.nowTime,
                    pId: config.userData.pId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'workPlan/updateWorkPlan.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '已作废',
                                type: 'success'
                            });
                            config.information.taskDetailData.state = '作废'
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
            deleteTask(){
                const _this = this
                let data = {
                    id: this.taskDetail.id
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'workPlan/deleteWorkPlan.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.success && res.data.success == true){
                            $Message({
                                content: '删除成功',
                                type: 'success'
                            });
                            _this.tooutwork()
                        }else if(res.data.msg && res.data.msg == 'error'){
                            $Toast({
                                content: '对不起，您没有此权限',
                                type: 'error'
                            });
                            _this.cancelDelete()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
        },
    }
</script>

<style>
    .task_detail_wrap{
        background-color: #f5f5f5;
        margin-bottom: 50px
    }
</style>