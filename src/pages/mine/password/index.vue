<template>
    <div class="password_wrap">
        <i-panel title=" ">
            <i-input v-model="old_password" title="旧密码" right maxlength="50" @input="handleInput($event,1)" />
            <i-input v-model="new_password" title="新密码" right maxlength="50" placeholder="长度不超16位" @input="handleInput($event,2)" />
            <i-input v-model="re_password" title="重复密码" right maxlength="50" @input="handleInput($event,3)" />
        </i-panel>

        <!-- 修改 -->
        <i-button @click="changePassword" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data(){
            return{
                msg: '修改密码',

                old_password:'',
                new_password:'',
                re_password:'',
            }
        },

        methods:{
            handleInput(e,val){
                if(val == 1){
                    this.old_password = e.mp.detail
                }else if(val == 2){
                    this.new_password = e.mp.detail
                }else if(val == 3){
                    this.re_password = e.mp.detail
                }
            },
            changePassword(){
                const _this = this
                let data = {
                    oldPassword: this.old_password,
                    private_password: this.new_password,
                    private_id: config.userData.pId,
                }

                let flag = false
                if(data.private_password !== this.re_password){
                    $Toast({
                        content: '两次输入的密码不一致，请重新输入',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'updatePrivatePassword.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success: function (res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '修改成功，请重新登录',
                                type: 'success'
                            });
                            _this.toLogin()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toLogin(){
                wx.reLaunch({
                    url: '../../login/main',
                })
            },
        },
    }
</script>

<style>
    .password_wrap{
        background-color: #fff;
    }
</style>