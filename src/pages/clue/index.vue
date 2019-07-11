<template>
    <div>
        <i-panel :title="current" right></i-panel>
        <i-card v-for="item in tableData" :key="item.id" :title="item.name" :full="true" class="clueCard">
            <view slot="content" class="clueContent">{{item.address || '无'}}</view>
            <view slot="footer" class="clueFooter">
                {{'负责人：' + item.privateUser[0].private_employee}}
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                {{'状态：' + item.state}}
                &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                {{'未联系天数：' + item.dayNum}}
            </view>
        </i-card>
        <i-load-more v-if="noMore" tip="我是有底线的" :loading="false" />
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                current: '线索',

                init:true,
                noMore:false,
                tableData:[],

                searchList:{
                    searchName:'',
                    stateid:'',
                    cuesid:'',
                    example:'',
                    page:1,
                    limit:10,
                },
                stateList:[],
                cueList:[],
            }
        },

        mounted(){
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
                    stateid: this.searchList.stateid,
                    cuesid: this.searchList.cuesid,
                    example: this.searchList.example,
                    page: this.searchList.page,
                    limit: this.searchList.limit,
                    pId: config.userData.pId,
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'customerTwo/query.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
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
                        }
                        if(info.length < 10){
                            _this.noMore = true
                        }
                        // console.log(_this.noMore)
                    }
                })
            },
            getSearchList(){
                const _this = this

                wx.request({
                    url: config.host + 'typeInfo/getTypeInfoByType.do?cId=' +'201901973891',  //接口地址
                    success:function(res) {
                        // console.log(res.data)
                        _this.stateList = res.data.name1001
                        _this.cueList = res.data.name3001
                    }
                })
            },
        },
    }
</script>

<style scoped>
    .clueContent{
        font-size: 11px;
        color: #80848f
    }
    .clueFooter{
        font-size: 10px;
        color: #80848fc4;
        padding-bottom: 8px;
    }
</style>