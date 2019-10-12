<template>
    <div class="edition_wrap">
        <i-cell-group>
            <i-cell title="公司名称">
                <span slot="footer">{{editionData.corporate_name}}</span>
            </i-cell>
            <i-cell title="总用户数">
                <span slot="footer">{{editionData.user_number}}</span>
            </i-cell>
            <i-cell title="可新增用户数">
                <span slot="footer">{{editionData.canAdd}}</span>
            </i-cell>
            <i-cell title="数据中心套餐数">
                <span slot="footer">{{editionData.clue_number}}</span>
            </i-cell>
            <i-cell title="到期时间">
                <span slot="footer">{{editionData.expiry_time}}</span>
            </i-cell>
            <i-cell title="短信数">
                <span slot="footer">{{editionData.send}}</span>
            </i-cell>
        </i-cell-group>
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data(){
            return{
                msg: '版本信息',

                editionData:{}
            }
        },

        onShow(){
            this.loadData()
        },

        methods:{
            loadData(){
                const _this = this

                wx.request({
                    method:'get',
                    url: config.defaulthost + 'configuration/selectByCId.do?cId=' + config.userData.cId,  //接口地址
                    header:{
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        _this.editionData = res.data
                    }
                })
                // configuration/selectByCId.do
            },
        },
    }
</script>

<style>

</style>