<template>
    <div class="add_or_update_wrap">
        <i-panel title=" "></i-panel>
        <i-panel title=" ">
            <i-cell title="关联客户" :value="addList.customerName" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,1)"></i-cell>
            <i-cell title="开始时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="addList.startTime" @change="dealChange($event,1)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="结束时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="addList.endTime" @change="dealChange($event,2)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-cell title="提醒时间" request is-link  i-class="simple_cell" i-cell-text="color_495060_text">
                <i-datetime-picker slot="footer" :value="addList.remindTime" @change="dealChange($event,3)" class="cell_picker"></i-datetime-picker>
            </i-cell>
            <i-input v-model="addList.planningTheme" title="任务主题" right request maxlength="50" @input="handleInput($event,1)" />
            <i-input v-model="addList.describe" title="描述" right request type="textarea" maxlength="200" @input="handleInput($event,2)" />
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
                current: '新增任务',

                addList:{
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

        onShow(){
            this.loadData()
        },

        mounted(){
            this.loadList()
        },

        methods: {
            loadData(){
                let poolObj = config.information.taskPoolName
                this.addList.customerName = poolObj.poolName
                this.addList.customerId = poolObj.poolNameID
            },
            loadList(){
                this.addList = {
                    customerId:'',
                    customerName:'',
                    startTime:'',
                    endTime:'',
                    remindTime:'',
                    planningTheme:'',
                    describe:'',
                }
            },
            handleInput(e,val){
                if(val == 1){
                    this.addList.planningTheme = e.mp.detail
                }else if(val == 2){
                    this.addList.describe = e.mp.detail
                }
            },
            cellFocus(e,val){
                if(val == 1){
                    const url = '../customers/main'
                    mpvue.navigateTo({ url })
                }
            },
            dealChange(e,val){
                console.log(e)
                if(val == 1){
                    this.addList.startTime = e.mp.detail + ':00'
                }else if(val == 2){
                    this.addList.endTime = e.mp.detail + ':00'
                }else if(val == 3){
                    this.addList.remindTime = e.mp.detail + ':00'
                }
            },

            addTask(){
                const _this = this

                let data = {
                    customerId: this.addList.customerId,
                    customerName: this.addList.customerName,
                    startTime: this.addList.startTime,
                    endTime: this.addList.endTime,
                    remindTime: this.addList.remindTime,
                    planningTheme: this.addList.planningTheme,
                    describe: this.addList.describe,
                    pId: config.userData.pId,
                    secondid: config.userData.second_id,
                    deptid: config.userData.private_deptid,
                }
                console.log(data)

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
                if(!data.remindTime){
                    $Toast({
                        content: '请选择提醒时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.endTime){
                    $Toast({
                        content: '请选择结束时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.startTime){
                    $Toast({
                        content: '请填写开始时间',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.customerId){
                    $Toast({
                        content: '请选择关联客户',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'workPlan/insertWorkPlan.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '新增成功',
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

<style>
</style>