<template>
    <div class="oppo_fail_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <i-checkbox-group :current="checkItem" @change="itemChange">
            <i-checkbox v-for="item in personList" position="right" :key="item.id" :value="item.name" :label="item.id">
            </i-checkbox>
        </i-checkbox-group>

        <!-- 确认 -->
        <i-button @click="toOppoAddorUpdate" type="ghost" :long="true" class="bottom_btn">确定</i-button>

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
                current: '失败原因',

                personData:[],
                personList:[],

                checkItem:[],
                checkItemID:[]
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                this.checkItem = []
                this.checkItemID = []
                this.personList = []

                wx.request({
                    method:'get',
                    url: config.defaulthost + 'customerTwo/getNameAndId.do?cId=' + config.userData.cId,  //接口地址
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success

                        info.forEach(el => {
                            _this.personList.push({id:el.private_id,name:el.private_employee})
                        });
                        _this.personData = info
                    }
                })
            },

            itemChange(e){
                const index = this.checkItem.indexOf(e.target.value);
                index === -1 ? this.checkItem.push(e.target.value) : this.checkItem.splice(index, 1);
                const item = this.checkItemID.indexOf(e.target.label);
                item === -1 ? this.checkItemID.push(e.target.label) : this.checkItemID.splice(item, 1);
            },

            toOppoAddorUpdate(){
                config.information.outworkAssistants = {
                    name:this.checkItem,
                    id:this.checkItemID
                }
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .oppo_fail_wrap{
        margin-bottom: 40px
    }
</style>