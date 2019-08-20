<template>
    <div class="add_or_update_wrap">
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
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index'

    export default {
        data () {
            return {
                current: '选择客户',
                
                poolName:'',
                itemData:[],

                cheakItem:'',
                poolNameID:'',
                ascriptionId:'',
                itemList:[],

                poolNameData:[],

                taxRate:'',
                discount:''
            }
        },

        mounted(){
            this.loadData()
        },

        methods: {
            loadData(){
                const _this = this
                this.itemList = []
                this.cheakItem = ''
                this.poolNameID = ''
                this.ascriptionId = ''
                let data = {
                    page: 1,
                    limit: 10,
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
                        let info = res.data.map.success.customerpools
                        _this.poolNameData = info
                        info.forEach(el => {
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
                this.poolNameData.forEach(a => {
                    if(label == a.id){
                        this.poolNameID = label
                        this.ascriptionId = a.user_id
                        if(a.discount){
                            this.discount = a.discount
                        }else{
                            this.discount = '100'
                        }
                        if(a.taxRate){
                            this.taxRate = a.taxRate
                        }else{
                            this.taxRate = '0'
                        }
                    }
                });
            },
            clickpoolName(){
                config.information.orderPoolNameData = {
                    poolName: this.cheakItem,
                    poolNameID: this.poolNameID,
                    ascriptionId: this.ascriptionId,
                    taxRate: this.taxRate,
                    discount: this.discount
                }
                
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
</style>