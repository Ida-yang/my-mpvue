<template>
    <div>
        <i-panel title=" "></i-panel>
        <i-panel title=" "></i-panel>
        <i-input v-model="addList.noteType" title="便签类别" right disabled maxlength="20" @input="handleInput" />
        <i-input v-model="addList.name" right type="textarea" maxlength="200" @input="handleInput" />

        <!-- 新增 -->
        <i-button @click="addNote" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '新增便签',

                addList:{
                    name:'',
                    noteType:'',
                    noteId:'',
                }
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.information.noteaddData

                this.addList = {
                    name:'',
                    noteType: info.name,
                    noteId: info.id
                }
            },
            handleInput(){},
            addNote(){
                const _this = this
                let data = {}
            },
        },
    }
</script>

<style scoped>
</style>