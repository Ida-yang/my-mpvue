<template>
    <div class="container">

        <div class="userinfo" @click="bindViewTap">
        <!-- <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" /> -->
        <!-- <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" /> -->
        <i-avatar :src="userAvator" size="default"></i-avatar>

        <div class="userinfo-nickname">
            <card :text="userInfo.nickName"></card>
        </div>
        </div>

        <div class="container">
            <i-button type="subject" @click="bindViewTap">查看登录日志</i-button>
        </div>

        
    </div>
</template>

<script>
    import card from '@/components/card'
    import config from '../../config'

    export default {
        data () {
            return {
                userInfo: {
                    nickName: 'mpvue',
                    avatarUrl: 'http://mpvue.com/assets/logo.png'
                },
                current:'homepage',

                userAvator:''
            }
        },

        components: {
            card
        },

        methods: {
            bindViewTap () {
                const url = '../logs/main'
                mpvue.navigateTo({ url })
            },
        },

        mounted () {
            this.userAvator = config.userData.portrait

            console.log(config)
        }
    }
</script>

<style scoped>
    .userinfo {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .userinfo-avatar {
        width: 128rpx;
        height: 128rpx;
        margin: 20rpx;
        border-radius: 50%;
    }
    .userinfo-nickname {
        color: #aaa;
    }
</style>