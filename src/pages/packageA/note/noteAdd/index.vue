<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel title=" "></i-panel>
        <i-cell title="便签类别" :value="addList.noteType" request is-link i-class="simple_cell" @click="cellFocus($event,1)"></i-cell>
        <i-cell title="便签类别" :value="addList.noteType" request is-link i-class="simple_cell" @click="cellFocus($event,2)"></i-cell>
        <i-input v-model="addList.name" right type="textarea" maxlength="200" @input="handleInput" />

        <!-- 新增 -->
        <i-button @click="addNote" type="ghost" :long="true" class="bottom_btn">确定</i-button>

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
                current: '新增便签',

                addList:{
                    name:'',
                    noteType:'',
                    noteId:'',
                },

                searchList:{
                    typeid:'',
                },
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                let data = {
                    pId: config.userData.pId
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

                        _this.loadNote()
                    }
                })
            },
            loadNote(){
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
            handleInput(){},
            cellFocus(e,val){
                if(val == 1){}
            },
            addNote(){
                const _this = this
                let data = {}
            },
        },
    }
</script>

<style scoped>
</style>