<template>
    <div>
        <!-- <i-panel :title="current"></i-panel> -->
        <i-input :value="poolName" type="text" maxlength="50" placeholder="输入公司名称查询" @input="search" />
        <i-radio-group :current="cheakItem" @change="changeItem">
            <i-radio v-for="item in itemList" :key="item.id" position="right" :value="item.name" :label="item.id">
            </i-radio>
        </i-radio-group>

        <!-- 确认 -->
        <i-button @click="clickpoolName" type="ghost" :long="true" class="bottom_btn">确定</i-button>

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
                current: '新增联系人',
                
                poolName:'',
                itemData:[],

                cheakItem:'',
                customerTwosID:'',
                customerpoolsID:'',
                itemList:[],

                customerTwos:[],
                customerpools:[],
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                this.itemList = []
                let data = {
                    page: 1,
                    limit: 10,
                    pId:config.userData.pId,
                    searchName:this.poolName,
                }

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'rightPoolName.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        let info = res.data.map.success
                        let datas = info.customerTwos.concat(info.customerpools)
                        _this.customerTwos = info.customerTwos
                        _this.customerpools = info.customerpools
                        datas.forEach(el => {
                            _this.itemList.push({id:el.id,name:el.name})
                        });
                    }
                })
            },
            search(e){
                this.poolName = e.mp.detail
                this.loadData()
            },

            changeItem(e){
                let label = e.target.label
                this.cheakItem = e.target.value
                this.customerTwos.forEach(a => {
                    if(label == a.id){
                        console.log('线索的')
                        this.customerTwosID = label
                        this.customerpoolsID = ''
                    }
                });
                this.customerpools.forEach(b => {
                    if(label == b.id){
                        console.log('客户的')
                        this.customerpoolsID = label
                        this.customerTwosID = ''
                    }
                });
            },
            clickpoolName(){
                config.information.contactPoolNameData = {
                    poolName:this.cheakItem,
                    customeroneId:this.customerTwosID,
                    customerpool_id:this.customerpoolsID,
                }
                
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style scoped>
</style>