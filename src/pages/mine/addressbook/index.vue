<template>
    <div class="address_book_wrap">
        <i-input :value="searchList.searchName" type="text" maxlength="50" placeholder="输入用户名称查询" @input="search" />
        <i-cell-group>
            <i-cell v-for="item in tableData" :key="item.private_id" :title="item.private_employee" :label="item.private_phone">
                <image slot="footer" src="../../../static/images/call_phone.png" @click="callPhone(item)" style="width:22px;height:22px;" />
            </i-cell>
        </i-cell-group>
        
        <i-toast id="toast" />
        <i-message id="message" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data(){
            return{
                msg: '通讯录',

                init:true,
                noMore:false,

                searchList:{
                    searchName: '',
                    page: 1,
                    limit: 10
                },

                tableData:[]
            }
        },

        onShow(){
            this.loadData()
        },
        // 触底加载
        onReachBottom(){
            // console.log('碰到底部啦')
            this.searchList.page = this.searchList.page + 1
            if(this.noMore == false){
                this.loadData()
            }
        },

        methods:{
            loadData(){
                const _this = this
                let data = {
                    searchName: this.searchList.searchName,
                    deptid: '',
                    page: this.searchList.page,
                    limit: this.searchList.limit,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'getPrivateUserAll.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data.map.success
                        if(_this.init === true){
                            _this.tableData = info
                            _this.init = false
                            wx.stopPullDownRefresh()
                        }else{
                            _this.tableData = _this.tableData.concat(info)
                            if(info.length < 10){
                                _this.noMore = true
                            }
                        }
                    }
                })
            },

            search(e){
                this.init = true
                this.noMore = false
                this.searchList.page = 1
                this.searchList.searchName = e.mp.detail
                this.loadData()
            },

            callPhone(val){
                let phoneNum = val.private_phone
                if(phoneNum){
                    wx.makePhoneCall({
                        phoneNumber: phoneNum
                    })
                }else{
                    $Toast({
                        content: '无法呼叫，请添加手机号码',
                        type: 'error'
                    });
                }
            }
        },
    }
</script>

<style>

</style>