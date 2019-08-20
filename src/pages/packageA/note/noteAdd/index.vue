<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-cell :title="addList.noteType1"  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,1)"></i-cell>
        <i-cell title="便签类别" :value="addList.noteType2" request is-link  i-class="simple_cell" i-cell-text="color_495060_text" @click="cellFocus($event,2)"></i-cell>
        <i-input v-model="addList.name" type="textarea" maxlength="110" @input="handleInput" i-input-class="note_input" />

        <!-- 新增 -->
        <i-button @click="addNote" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-action-sheet :visible="showType" :actions="typeList" @change="typeChange" />

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
                    noteType1:'个人便签',
                    noteType2:'',
                    noteId:'',
                },

                showType:false,
                typeList:[],
            }
        },

        mounted(){
            this.getList()
            this.loadData()
        },

        methods: {
            getList(){
                this.addList = {
                    name:'',
                    noteType1:'个人便签',
                    noteType2:'',
                    noteId:'',
                }
            },
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
                    }
                })
            },
            handleInput(e){
                this.addList.name = e.mp.detail
            },
            cellFocus(e,val){
                if(val == 2){
                    this.showType = true
                }
            },
            typeChange(e){
                let index = e.target.index
                this.typeList.forEach((el,i) => {
                    if(i == index){
                        this.addList.noteType2 = el.name
                        this.addList.noteId = el.id
                    }
                });
                this.showType = false
            },
            addNote(){
                const _this = this
                let val = this.addList.name
                val = '<p>' + val + '</p>'
                val = val.replace(/\n/g, '</p><p>')

                if(!this.addList.name){
                    val = ''
                }

                let data = {
                    name: val,
                    parentid: this.addList.noteId,
                    pId: config.userData.pId
                }
                console.log(data)

                let flag = false
                if(!data.parentid){
                    $Toast({
                        content: '请选择便签类别',
                        type: 'warning'
                    });
                    flag = true
                }
                if(!data.name){
                    $Toast({
                        content: '请填写便签内容',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'noteType/insertNote.do?cId=' + config.userData.cId,  //接口地址
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
                            _this.toNote()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toNote(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
</style>