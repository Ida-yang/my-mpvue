<template>
    <div>
        <i-panel :title="current"></i-panel>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                current: '外勤',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    state:'',
                    example:'',
                    powerid:'12',
                    page:1,
                    limit:10,
                },
            }
        },

        onShow(){
            this.init = true
            this.noMore = false
            this.searchList.page = 1
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
        // 下拉刷新
        onPullDownRefresh(){
            this.init = true
            this.noMore = false
            this.searchList.page = 1
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                let data = {
                    searchName: this.searchList.searchName,
                    state: this.searchList.state,
                    example: this.searchList.example,
                    page: this.searchList.page,
                    limit: this.searchList.limit,
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
                    url: config.defaulthost + 'isit/selectVisit.do?cId=' + config.userData.cId,  //接口地址
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
                            // console.log('我的第一次加载')
                            wx.stopPullDownRefresh()
                        }else{
                            _this.tableData = _this.tableData.concat(info)
                            // console.log('我不是第一次加载了')
                            if(info.length < 10){
                                _this.noMore = true
                            }
                        }

                        _this.tableData.forEach(el => {
                            if(el.checkStatus == 0){
                                el.auditStatus = '未审核'
                            }else if(el.checkStatus == 1){
                                el.auditStatus = '审核中'
                            }else if(el.checkStatus == 2){
                                el.auditStatus = '已审核'
                            }else if(el.checkStatus == 3){
                                el.auditStatus = '未通过'
                            }
                        });
                    }
                })
            },
        },
    }
</script>

<style scoped>
</style>