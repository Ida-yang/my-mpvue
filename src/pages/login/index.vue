<template>
    <view class="login_content">
        <view class="login_view">
            <i-panel i-class="login_label" :title="current"></i-panel>
            <i-panel i-class="login_welcome" title="欢迎您登录"></i-panel>

            <i-input v-model="account" type="text" maxlength="11" title="登录账号" mode="wrapped" i-class="login_input" @input="handinput($event,1)" />
            <i-input v-model="password" type="password" maxlength="16" title="登录密码" mode="wrapped" i-class="login_input" @input="handinput($event,2)" />
            
            <i-button @click="toLogin" type="ghost" i-class="login_submit">登录</i-button>

            <i-message id="message" />
        </view>
        
    </view>
</template>

<script>
    import config from '../../config'
    import { $Toast,$Message } from '../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '云纵CRM系统管理平台',
                account:'18312120303',
                password:'321'
            }
        },

        methods: {
            handinput(e,val){
                if(val === 1){
                    this.account = e.mp.detail
                }else if(val === 2){
                    this.password = e.mp.detail
                }
            },
            toLogin(){
                const _this = this
                let data = {
                    public_username: this.account,
                    public_password: this.password
                }

                let flag = false
                if(!data.public_username){
                    $Toast({
                        content: '登录账号不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.public_password){
                    $Toast({
                        content: '登录密码不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'tologin.do',  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '登录成功',
                                type: 'success'
                            });
                            let info = res.data.map.success
                            if(info.imgUrl){
                                info.portrait = config.sourcehost + 'upload/' + info.cId + '/' + info.imgUrl
                            }else{
                                info.portrait = config.sourcehost + 'upload/staticImg/avatar.jpg'
                            }
                            config.userData = info
                            _this.toIndex()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toIndex () {
                const url = '../index/main'
                if (mpvuePlatform === 'wx') {
                    mpvue.switchTab({ url })
                } else {
                    mpvue.navigateTo({ url })
                }
            },
        },
        created() {
            console.log('page index created', this)
        },
        mounted() {
            console.log('mounted', this)
        },
        onLoad() {
            console.log('page index onLoad', this)
        },
        onReady () {
            console.log('page index onReady', this)
        },
        onShow() {
            console.log('onShow', this)
        },
        onUnload() {
            console.log('onUnload', this)
        },
        onHide() {
            console.log('onHide', this)
        },
    }
</script>

<style>
    .login_content{
        height: 100vh;
        background-image: url('https://crm.yunzoe.com/upload/staticImg/small_procedures_login_bg.png');
        background-size: cover;
        display: flex;
        align-items: center;
    }
    .login_view{
        flex: 1;
        /* background-color: rgba(0, 0, 0, 0.3); */
    }
    .login_label{
        font-size: 24px;
        font-weight: bold;
        color: #ffffff
    }
    .login_welcome{
        font-size: 16px;
        color: #ffffff
    }
    .login_label,.login_welcome{
        text-align: center;
    }
    .login_input{
        width: 70vw;
        margin: 25px auto !important;
    }
    .login_submit{
        width: 70vw;
        margin: 25px auto !important;
    }
</style>