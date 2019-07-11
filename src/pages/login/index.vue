<template>
    <div>
        <i-panel i-class="loginLabel" :title="current"></i-panel>
        <i-panel i-class="loginWelcome" title="欢迎您登录"></i-panel>
            <i-input v-model="account" type="text" maxlength="11" title="登录账号" mode="wrapped" i-class="loginInput" @input="handinput($event,1)" />
            <i-input v-model="password" type="password" maxlength="16" title="登录密码" mode="wrapped" i-class="loginInput" @input="handinput($event,2)" />
        
        <i-button @click="toLogin" type="ghost" i-class="loginSubmit">登录</i-button>

        <i-message id="message" />
        
    </div>
</template>

<script>
    import config from '../../config'
    import { $Message } from '../../../dist/wx/iview/base/index';

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
    .loginLabel{
        font-weight: bold;
        font-size: 18px;
    }
    .loginWelcome{
        font-size: 16px
    }
    .loginLabel,.loginWelcome{
        text-align: center;
    }
    .loginInput{
        /* text-align: left; */
        width: 250px;
        margin: 10px auto !important;
    }
    .loginSubmit{
        width: 280px;
        margin: 10px auto !important;
    }
</style>