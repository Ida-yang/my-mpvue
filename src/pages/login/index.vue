<template>
    <view class="login_content">
        <view class="login_view">
            <!-- <i-panel i-class="login_label" :title="current"></i-panel>
            <i-panel i-class="login_welcome" title="欢迎您登录"></i-panel> -->
            <image class="login_logo" src="../../static/images/logo.png" style="width:80px;height:80px;" />

            <i-input :value="account" type="text" maxlength="11" right title="登录账号" mode="wrapped" i-class="login_input" @input="handinput($event,1)" />
            <i-input :value="password" type="password" maxlength="16" right title="登录密码" mode="wrapped" i-class="login_input" @input="handinput($event,2)" />
            
            <view class="login_submit">
                <i-button @click="toLogin" type="ghost" i-class="login_btn">登录</i-button>
                <i-button @click="toExperience" type="ghost" i-class="experience_btn">体验</i-button>
            </view>

            <i-message id="message" />
            <i-toast id="toast" />
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
                account:'',
                password:''
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
                if(!data.public_password){
                    $Toast({
                        content: '登录密码不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(!data.public_username){
                    $Toast({
                        content: '登录账号不能为空',
                        type: 'error'
                    });
                    flag = true
                }
                if(flag) return
                
                wx.request({
                    method:'post',
                    url: config.defaulthost + 'tologin.do',  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    success: function (res) {
                        console.log(res)
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
                            let cookie = res.header["Set-Cookie"]
                            let sessionPos = cookie.indexOf(",")
                            let JSESSIONID = cookie.substring(0, sessionPos)
                            let rememberMe = cookie.substring(sessionPos+1)
                            if(JSESSIONID !== undefined && JSESSIONID !== null){
                                let startPos = JSESSIONID.indexOf("JSESSIONID=")
                                let endPos = JSESSIONID.indexOf(";")
                                if(startPos != -1){
                                    config.SESSIONID = JSESSIONID.substring(startPos, endPos)
                                }
                            }
                            if(rememberMe !== undefined && rememberMe !== null){
                                let sessionRem = rememberMe.indexOf("rememberMe=")
                                if(sessionRem != -1){
                                    config.rememberMe = rememberMe
                                }
                            }
                            _this.setLocalStorage()
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
            toExperience(){
                const _this = this
                let data = {
                    public_username: '18933916278',
                    public_password: '123456'
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
                            let cookie = res.header["Set-Cookie"]
                            let sessionPos = cookie.indexOf(",")
                            let JSESSIONID = cookie.substring(0, sessionPos)
                            let rememberMe = cookie.substring(sessionPos+1)
                            if(JSESSIONID !== undefined && JSESSIONID !== null){
                                let startPos = JSESSIONID.indexOf("JSESSIONID=")
                                let endPos = JSESSIONID.indexOf(";")
                                if(startPos != -1){
                                    config.SESSIONID = JSESSIONID.substring(startPos, endPos)
                                }
                            }
                            if(rememberMe !== undefined && rememberMe !== null){
                                let sessionRem = rememberMe.indexOf("rememberMe=")
                                if(sessionRem != -1){
                                    config.rememberMe = rememberMe
                                }
                            }
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
            setLocalStorage(){
                wx.setStorage({
                    key:"yzCRMaccount",
                    data: [this.account,this.password]
                })
            },
            getLocalStorage(){
                const _this = this
                wx.getStorage({
                    key: 'yzCRMaccount',
                    success (res) {
                        _this.account = res.data[0]
                        _this.password = res.data[1]
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
            // console.log('page index created', this)
        },
        mounted() {
            // console.log('mounted', this)
        },
        onLoad() {
            // console.log('page index onLoad', this)
        },
        onReady () {
            // console.log('page index onReady', this)
        },
        onShow() {
            // console.log('onShow', this)
            this.getLocalStorage()
        },
        onUnload() {
            // console.log('onUnload', this)
        },
        onHide() {
            // console.log('onHide', this)
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
        margin-bottom: 100px
    }
    .login_logo{
        margin-left: calc(50% - 40px)
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
        display: flex;
        align-items: center
    }
    .experience_btn,.login_btn{
        flex: 1;
        width: calc(35vw - 20px)
    }
</style>