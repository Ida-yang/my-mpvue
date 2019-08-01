<template>
    <div class="note_wrap">
        <!-- 查询 -->
        <view class="search_view">
            <!-- <view class="search_box">
                <i-icon type="search" size="16" color="#80848f" class="search_icon" />
                <i-input v-model="searchList.searchName" maxlength="50" i-class="search_input" @input="handleInput($event,1)" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="search_icon" @click="closeSearch" />
            </view>
            <span class="search_btn" @click="search">搜索</span> -->
            <i-icon type="other" size="18" color="#80848f" class="search_icon" @click="queryCriteria" />
        </view>
        <i-drawer mode="right" :visible="searchCriteria" @close="queryCriteria">
            <view class="search_container">
                <i-panel title="个人便签" i-class="query_label">
                    <view class="query_view">
                        <span class="queryBtn" :class="[index == typeActive ? 'isActive':'']" v-for="(item,index) in typeList" :key="item.id" @click="checkCriteria(item,index,1)">{{item.name}}</span>
                    </view>
                </i-panel>
                <i-button @click="reSet" type="ghost" size="small" long="true" class="reset_btn">重置</i-button>
            </view>
        </i-drawer>

        <!-- 列表 -->
        <i-swipeout i-class="i-swipeout-demo-item" :operateWidth="60" v-for="item in tableData" :key="item.id">
            <view slot="content">
                <i-cell i-class="cell_content" >
                    <rich-text :nodes="item.name" />
                    <view class="cell_footer">
                        创建时间：{{item.opportunity_deal}}
                    </view>
                </i-cell>
            </view>
            <view slot="button" class="i-swipeout-button">
                <view class="i-swipeout-button-item" style="width:60px;background-color:#f56c6c" @click="todeleteNote($event,item)">
                    <i-icon size="24" type="trash" style="color:#fff"></i-icon>
                </view>
            </view>
        </i-swipeout>
        
        <!-- 新增 -->
        <picker mode="multiSelector" @change="changeType" @columnchange="columnChange" :value="multiIndex" :range="multiArray">
            <view class="picker">
            <!-- 当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}} -->
                <i-button type="ghost" :long="true" class="bottom_btn">新增</i-button>
            </view>
        </picker>
        
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                current: '便签',

                tableData:[],

                searchList:{
                    searchName:'',
                    typeid:''
                },
                typeList:[],
                typeActive: '-1',

                isValue:false,
                searchCriteria:false,

                multiIndex:[0,0],
                multiArray:[['个人便签','公司公告'],[]]
            }
        },

        onShow(){
            this.getSearchList()
        },
        // 下拉刷新
        onPullDownRefresh(){
            this.getSearchList()
        },

        methods: {
            getSearchList(){
                const _this = this
                let data = {
                    pId: config.userData.pId,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'noteType/getNote.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data
                        _this.typeList = info

                        let itemArr = []
                        info.forEach(el => {
                            itemArr.push(el.name)
                        });

                        _this.multiArray[1] = itemArr

                        _this.loadData()
                    }
                })
            },
            loadData(){
                const _this = this
                let data = {
                    pId: config.userData.pId,
                    parentid: this.searchList.typeid
                }
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'noteType/getNoteTypeByParentId.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        let info = res.data
                        _this.tableData = info
                    }
                })
            },
            handleInput(e,val){
                if(val === 1){
                    this.searchList.searchName = e.mp.detail
                }
                if(e.mp.detail){
                    this.isValue = true
                }else{
                    this.isValue = false
                }
            },
            closeSearch(){
                this.searchList.searchName = ''
                this.isValue = false
                this.search()
            },
            search(){
                this.loadData()
            },
            queryCriteria(){
                this.searchCriteria = !this.searchCriteria
            },
            checkCriteria(item,index,val){
                if(val === 1){
                    this.typeActive = index
                    this.searchList.typeid = item.id
                }
                this.search()
            },
            reSet(){
                this.searchList = {
                    searchName:'',
                    typeid:'',
                }
                this.typeActive = '-1'
                this.loadData()
            },

            changeType(e){
                console.log(e)
                this.multiIndex = e.target.value
            },
            columnChange(e){
                // console.log('修改的列为', e.mp.detail.column, '，值为', e.mp.detail.value);
                const _this = this
                let column = e.mp.detail.column
                let value = e.mp.detail.value
                // var data = {
                //     multiArray: this.multiArray,
                //     multiIndex: this.multiIndex
                // };
                this.multiIndex[column] = value;
                switch (column) {
                case 0:
                    switch (_this.multiIndex[0]) {
                    case 0:
                        console.log(_this.multiArray[1])
                        _this.multiArray[1] = ['爬行动物','爬行动物','爬行动物'];
                        break;
                    case 1:
                        console.log(_this.multiArray[1])
                        _this.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        break;
                    }
                    _this.multiIndex[1] = 0;
                    break;
                case 1:
                    console.log(_this.multiArray[1])
                    break;
                }
                // this.multiArray = data.multiArray
                // this.multiIndex = data.multiIndex
            },

            toAddNote(){
                const url = 'noteAdd/main'
                config.information.noteaddData = {}
                mpvue.navigateTo({ url })
            },
            todeleteNote(e,val){
                console.log(e,val)
            }
        },
    }
</script>

<style>
    .note_wrap{
        background-color: #f5f5f5;
        margin-top: 40px;
        margin-bottom: 40px
    }
</style>