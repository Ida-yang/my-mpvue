<template>
    <div class="note_wrap">
        <!-- 查询 -->
        <view class="search_view">
            <view class="search_box">
                <i-icon type="search" size="16" color="#80848f" class="search_icon" />
                <i-input v-model="searchList.searchName" maxlength="50" i-class="search_input" @input="handleInput($event,1)" />
                <i-icon v-if="isValue" type="close" size="14" color="#80848f" class="search_icon" @click="closeSearch" />
            </view>
            <span class="search_btn" @click="search">搜索</span>
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
            <view slot="content" @click="toUpdateNote($event,item)">
                <i-cell i-class="cell_content" :title="item.title">
                    <!-- <rich-text :nodes="item.title" /> -->
                    <view class="cell_footer">
                        {{item.createTime}}
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
        <i-button type="ghost" :long="true" class="bottom_btn" @click="toAddNote">新增</i-button>

        <i-message id="message" />
    </div>
</template> 

<script>
    import config from '../../../config'
    import { $Message } from '../../../../dist/wx/iview/base/index'

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

                optionIndex:'0',
                optionArray:['个人便签']
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

                        _this.loadData()
                    }
                })
            },
            loadData(){
                const _this = this
                let data = {
                    pId: config.userData.pId,
                    parentid: this.searchList.typeid,
                    name: this.searchList.searchName
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

                        info.forEach(el => {
                            let starIndex = el.name.indexOf('<p>')
                            let endIndex = el.name.indexOf('</p>')
                            let title = el.name.slice(starIndex,endIndex)

                            let reg = new RegExp('[\u4e00-\u9fa5]+$','g')
                            let str = title
                            let values = str.match(/[\u4e00-\u9fa5]/g)
                            if(values){
                                str = str.match(/[\u4e00-\u9fa5]/g).join("")
                            }else{
                                str = str.replace(/[0-9]/g, '')
                                str = str.replace('</p>', '')
                                str = str.replace('<p>', '')
                                str = str.replace('.', '')
                            }

                            el.title = str
                        });
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
            

            toAddNote(){
                const url = 'noteAdd/main'
                mpvue.navigateTo({ url })
            },
            toUpdateNote(e,val){
                const url = 'noteUpdate/main'
                config.information.noteupdateData = val
                mpvue.navigateTo({ url })
            },
            todeleteNote(e,val){
                const _this = this
                let data = {
                    id: val.id,
                    pId: config.userData.pId
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'noteType/deleteNoteTypeById.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '删除成功',
                                type: 'success'
                            });
                            _this.loadData()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
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