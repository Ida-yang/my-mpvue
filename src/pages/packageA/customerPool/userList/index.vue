<template>
    <div class="add_or_update_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-input :value="searchNames" type="text" maxlength="50" placeholder="输入用户名称查询" @input="search" />
        <i-radio-group :current="cheakItem" @change="changeUser">
            <i-radio v-for="item in userList" :key="item.id" position="right" :value="item.name" :label="item.id">
            </i-radio>
        </i-radio-group>

        <!-- 确认 -->
        <i-button @click="clickDistribute" type="ghost" :long="true" class="bottom_btn">确认分配</i-button>

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
                current: '选择用户',

                userData:[],
                userList:[],

                cheakItem:'',
                cheakItemID:'',
                searchNames:'',
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                this.userList = []
                let data = {
                    page: 1,
                    limit: 9999999,
                    searchName:this.searchNames
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getPrivateUserAll.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        _this.userData = info
                        info.forEach(el => {
                            _this.userList.push({id:el.private_id,name:el.private_employee})
                        });
                    }
                })
            },
            search(e){
                this.searchNames = e.mp.detail
                this.loadData()
            },
            changeUser(e){
                this.cheakItem = e.target.value
                this.cheakItemID = e.target.label
            },
            clickDistribute(){
                let privateID = config.information.customerPoolDetailData.id
                const _this = this

                let data = {
                    ids: privateID,
                    pId: this.cheakItemID
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerpool/receivepool.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == '200'){
                            $Message({
                                content: '分配成功',
                                type: 'success'
                            });
                            _this.toCustomerPool()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },

            toCustomerPool(){
                // const url = '../main'
                // mpvue.navigateTo({ url })
                wx.navigateBack({
                    delta: 2,
                })
            },
        },
    }
</script>

<style>
</style>