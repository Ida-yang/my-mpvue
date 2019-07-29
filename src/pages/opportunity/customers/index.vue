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
                customerpoolsID:'',
                itemList:[],

                poolNameData:[],
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
                    }
                });
            },
            clickpoolName(){
                config.information.opportunityPoolNameData = {
                    poolName:this.cheakItem,
                    poolNameID:this.poolNameID,
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