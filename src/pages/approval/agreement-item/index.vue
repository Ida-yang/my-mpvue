<template>
    <div class="message_wrap">
        <!-- 查询 -->
        <i-tabs @change="changeBar" i-class="order_tabs">
            <i-tab key="first" :title="firstItem">
                &nbsp;
                <i-icon v-if="showFirst" type="packup" />
                <i-icon v-else type="unfold" />
            </i-tab>
            <i-tab key="second" :title="secondItem">
                &nbsp;
                <i-icon v-if="showSecond" type="packup" />
                <i-icon v-else type="unfold" />
            </i-tab>
        </i-tabs>
        <view class="bar_option" v-if="showFirst">
            <p class="option_p" :class="timeActive == item.label ? 'theme_color_text' : ''" v-for="item in timeList" :key="item.label" @click="changeItem($event,item,1)">{{item.name}}</p>
        </view>
        <view class="bar_option" v-if="showSecond">
            <p class="option_p" :class="powerActive == item.label ? 'theme_color_text' : ''" v-for="item in powerList" :key="item.label" @click="changeItem($event,item,2)">{{item.name}}</p>
        </view>
        <view class="detail_module"></view>

        <i-cell-group>
            <i-cell v-for="(item,index) in tableData" :key="index" :title="item.contractName" :label="item.customerpoolName" i-class="group_cell_content" @click="toAgreement(item)">
                <view slot="footer" class="group_cell_footer">
                    <p>{{item.amount}}</p>
                    <p>{{item.ourSignatories || '无'}}</p>
                </view>
            </i-cell>
        </i-cell-group>
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data(){
            return{
                msg: '待审批合同',
                
                tableData:[],
                totalAmount:'',

                searchList:{
                    example:'2',
                    powerid:'12',
                },
                timeList:[
                    {label:'1',name:'已审核'},
                    {label:'2',name:'待审核'},
                ],
                timeActive:'2',
                powerList:[
                    {label:'12',name:'我的'},
                    {label:'13',name:'本组'},
                    {label:'14',name:'本机构'},
                ],
                powerActive: '12',

                firstItem:'待审核',
                secondItem:'我的',

                showFirst: false,
                showSecond: false,
            }
        },

        onShow(){
            this.loadData()
        },
        // 下拉刷新
        onPullDownRefresh(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this
                let data = {
                    example: this.searchList.example,
                }
                if(this.searchList.powerid == '11'){
                    data.pId = ''
                }else if(this.searchList.powerid == '12'){
                    data.pId = config.userData.pId
                }else if(this.searchList.powerid == '13'){
                    data.secondid = config.userData.second_id
                }else if(this.searchList.powerid == '14'){
                    data.deptid = config.userData.private_deptid
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'contract/examineInfo.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data
                        _this.tableData = info
                        wx.stopPullDownRefresh()
                    }
                })
            },
            
            changeBar(e){
                let key = e.target.key
                if(key == 'first'){
                    this.showFirst = !this.showFirst
                    this.showSecond = false
                }else if(key == 'second'){
                    this.showSecond = !this.showSecond
                    this.showFirst = false
                }
            },
            changeItem(e,item,val){
                if(val == 1){
                    this.searchList.example = item.label
                    this.timeActive = item.label
                    this.firstItem = item.name
                    this.showFirst = false
                }else if(val == 2){
                    this.searchList.powerid = item.label
                    this.powerActive = item.label
                    this.secondItem = item.name
                    this.showSecond = false
                }

                this.loadData()
            },

            toAgreement(val){
                const url = '../../packageA/agreement/agreementDetail/main'
                config.information.agreementDetailData = {contract_id:val.id, customerpool_id:val.customerpool_id, contract_name:val.contractName}
                mpvue.navigateTo({ url })
            }
        },
    }
</script>

<style>
</style>