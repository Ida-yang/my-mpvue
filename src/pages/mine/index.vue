<template>
    <div class="mine_wrap">
        <!-- <i-panel :title="current"></i-panel> -->
        <view class="mine_user_data">
            <view class="mine_info">
                <image :src="mineData.portrait" class="mine_portrait" />
                <view class="mine_data">
                    <p>{{mineData.name}}<span style="margin-left:50px">{{mineData.role_name}}</span></p>
                    <p>{{mineData.corporate_name}}</p>
                    <p>{{mineData.private_phone}}</p>
                </view>
            </view>
            <view class="mine_communicate">
                <view class="mine_card">
                    <i-icon type="addressbook" size="26" color="#8a8a8a" />
                    <p>通讯录</p>
                </view>
                <view class="mine_card">
                    <i-icon type="group" size="26" color="#707070" />
                    <p>人脉</p>
                </view>
                <view class="mine_card">
                    <i-icon type="businesscard" size="26" color="#8a8a8a" />
                    <p>名片</p>
                </view>
            </view>
        </view>
        <view class="detail_module"></view>
        <i-cell-group>
            <i-cell title="个人资料" is-link>
                <i-icon slot="icon" type="mine" size="20" color="#8a8a8a" />
            </i-cell>
            <i-cell title="修改密码" is-link @click="toPassword">
                <i-icon slot="icon" type="lock" size="20" color="#707070" />
            </i-cell>
            <i-cell title="技术支持" @click="showPhone">
                <i-icon slot="icon" type="mail" size="20" color="#8a8a8a" />
            </i-cell>
            <i-cell title="版本信息" is-link @click="toEdition">
                <i-icon slot="icon" type="prompt" size="20" color="#707070" />
            </i-cell>
        </i-cell-group>

        <i-modal :visible="phoneVisible" @ok="serviceCall" @cancel="closePhone">
            <view>
                <p>客户服务热线</p>
                <p>020-38880730</p>
            </view>
        </i-modal>
    </div>
</template>

<script>
    import config from '../../config'

    export default {
        data () {
            return {
                current: '我的',

                mineData:{},

                phoneVisible:false
            }
        },

        onShow(){
            this.loadData()
        },

        methods: {
            loadData(){
                let info = config.userData
                this.mineData = info
            },
            
            showPhone(){
                this.phoneVisible = true
            },
            closePhone(){
                this.phoneVisible = false
            },
            serviceCall(){
                let phoneNum = '020-38880730'
                wx.makePhoneCall({
                    phoneNumber: phoneNum
                })
            },

            toPassword(){
                const url = 'password/main'
                mpvue.navigateTo({ url })
            },
            toEdition(){
                const url = 'edition/main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .mine_wrap{
        background-color: #fafafa
    }
    .mine_user_data{
        background-color: #fff;
        padding: 35px 0
    }
    .mine_info{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .mine_portrait{
        width: 65px;
        height: 65px;
        border-radius: 50%
    }
    .mine_data{
        width: calc(100% - 150px);
        font-size: 14px;
        line-height: 26px
    }
    .mine_communicate{
        height: 80px;
        display: flex;
        align-items: flex-end;
        justify-content: center
    }
    .mine_card{
        flex: 1;
        font-size: 14px;
        text-align: center
    }
</style>