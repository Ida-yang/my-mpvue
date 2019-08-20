<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-cell :title="updateList.noteType1"  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
        <i-cell title="便签类别" :value="updateList.noteType2" request  i-class="simple_cell" i-cell-text="color_495060_text"></i-cell>
        <i-input v-model="updateList.name" type="textarea" maxlength="110" @input="handleInput" i-input-class="note_input" />

        <!-- 修改 -->
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
                current: '编辑便签',

                updateList:{
                    id:'',
                    name:'',
                    noteType1:'个人便签',
                    noteType2:'',
                    noteId:'',
                },
            }
        },

        mounted(){
            this.getList()
        },

        methods: {
            getList(){
                let info = config.information.noteupdateData
                let val = info.name
                val = val.replace(new RegExp('</p><p>','g'), '\n')
                val = val.replace('</p>', '')
                val = val.replace('<p>', '')

                this.updateList = {
                    id: info.id,
                    name: val,
                    noteType1: '个人便签',
                    noteType2: info.parentName,
                    noteId: info.parentid,
                }
            },
            handleInput(e){
                this.updateList.name = e.mp.detail
            },
            addNote(){
                const _this = this
                let val = this.updateList.name
                val = '<p>' + val + '</p>'
                val = val.replace(/\n/g, '</p><p>')

                if(!this.updateList.name){
                    val = ''
                }

                let data = {
                    id: this.updateList.id,
                    name: val,
                    parentid: this.updateList.noteId,
                    pId: config.userData.pId
                }
                console.log(data)

                let flag = false
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
                    url: config.defaulthost + 'noteType/updateNoteById.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '修改成功',
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