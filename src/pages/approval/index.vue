<template>
    <div class="approval_wrap">
        <i-cell-group>
            <i-cell title=" 今日需联系" is-link @click="tolink(1)">
                <view slot="icon" class="meaasge_icon_span" style="background-color:rgb(104,150,245)">
                    <image src="../../static/images/jrxlx.png" class="message_image" />
                </view>
            </i-cell>
            <i-cell title=" 分配给我的线索" is-link @click="tolink(2)">
                <view slot="icon" class="meaasge_icon_span" style="background-color:rgb(255,156,46)">
                    <image src="../../static/images/xs.png" class="message_image" />
                </view>
            </i-cell>
            <i-cell title=" 分配给我的客户" is-link @click="tolink(3)">
                <view slot="icon" class="meaasge_icon_span" style="background-color:rgb(37,199,120)">
                    <image src="../../static/images/kh.png" class="message_image" />
                </view>
            </i-cell>
            <i-cell title=" 异常商机信息" is-link @click="tolink(4)">
                <view slot="icon" class="meaasge_icon_span" style="background-color:rgb(152,108,245)">
                    <image src="../../static/images/sj.png" class="message_image" />
                </view>
            </i-cell>
            <i-cell title=" 待审核合同" is-link @click="tolink(5)">
                <view slot="icon" class="meaasge_icon_span" style="background-color:rgb(102,150,246)">
                    <image src="../../static/images/ht.png" class="message_image" />
                </view>
            </i-cell>
            <i-cell title=" 待审核回款" is-link @click="tolink(6)">
                <view slot="icon" class="meaasge_icon_span" style="background-color:rgb(253,172,80)">
                    <image src="../../static/images/hk.png" class="message_image" />
                </view>
            </i-cell>
        </i-cell-group>
    </div>
</template>

<script>
    import config from '../../config'
    import { $Toast,$Message } from '../../../dist/wx/iview/base/index';

    export default {
        data(){
            return{
                msg: '消息'
            }
        },

        methods:{
            tolink(val){
                let url = ''
                if(val == 1){
                    url = '../packageA/call-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 2){
                    url = '../packageA/clue-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 3){
                    url = '../packageA/customer-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 4){
                    url = '../packageA/opportunity-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 5){
                    url = '../packageA/agreement-item/main'
                    mpvue.navigateTo({ url })
                }else if(val == 6){
                    url = '../packageA/payback-item/main'
                    mpvue.navigateTo({ url })
                }
            },
        },
    }
</script>

<style>
    .approval_wrap{
        background-color: #fff;
    }
    .meaasge_icon_span{
        width: 80rpx;
        height: 80rpx;
        border-radius: 40rpx;
        display: flex;
        justify-content: center;
        align-items: center
    }
    .message_image{
        width: 50rpx;
        height: 50rpx
    }
</style>