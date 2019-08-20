<template>
    <div class="add_or_update_wrap">
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="关联客户" :value="updateList.customerName" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,1)"></i-cell>
            <i-cell title="开始时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="updateList.startTime" @change="dealChange($event,1)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="结束时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="updateList.endTime" @change="dealChange($event,2)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="提醒时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="updateList.remindTime" @change="dealChange($event,3)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-input v-model="updateList.planningTheme" title="任务主题" right request maxlength="50" @input="handleInput($event,1)" />
            <i-input v-model="updateList.describe" title="描述" right request type="textarea" maxlength="200" @input="handleInput($event,2)" />
        </i-panel>

        <!-- 新增 -->
        <i-button @click="addTask" type="ghost" :long="true" class="bottom_btn">确定</i-button>
        
        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '编辑任务',

                updateList:{
                    id:'',
                    customerId:'',
                    customerName:'',
                    startTime:'',
                    endTime:'',
                    remindTime:'',
                    planningTheme:'',
                    describe:'',
                },
                nowDate:'',
            }
        },

        mounted(){
            this.loadList()
        },

        methods: {
            loadList(){
                let info = config.information.taskupdateData

                this.updateList = {
                    id: info.id,
                    customerId: info.customerId,
                    customerName: info.customerName,
                    startTime: info.startTime,
                    endTime: info.endTime,
                    remindTime: info.remindTime,
                    planningTheme: info.planningTheme,
                    describe: info.describe,
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.updateList.planningTheme = e.mp.detail
                }else if(val == 2){
                    this.updateList.describe = e.mp.detail
                }
            },
            cellFocus(e,val){
                if(val == 1){
                    const url = '../customers/main'
                    mpvue.navigateTo({ url })
                }
            },
            dealChange(e,val){
                if(val == 1){
                    this.updateList.startTime = e.mp.detail + ':00'
                }else if(val == 2){
                    this.updateList.endTime = e.mp.detail + ':00'
                }else if(val == 3){
                    this.updateList.remindTime = e.mp.detail + ':00'
                }
            },

            addTask(){
                const _this = this

                let data = {
                    id: this.updateList.id,
                    customerId: this.updateList.customerId,
                    customerName: this.updateList.customerName,
                    startTime: this.updateList.startTime,
                    endTime: this.updateList.endTime,
                    remindTime: this.updateList.remindTime,
                    planningTheme: this.updateList.planningTheme,
                    describe: this.updateList.describe,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }

                let flag = false
                if(!data.describe){
                    $Toast({
                        content: '请填写描述',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.planningTheme){
                    $Toast({
                        content: '请填写任务主题',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'workPlan/updateWorkPlan.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toTask()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toTask(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
</style>