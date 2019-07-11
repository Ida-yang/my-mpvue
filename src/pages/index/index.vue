<template>
    <div class="container">

        <div class="userinfo" @click="bindViewTap">
        <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
        <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

        <div class="userinfo-nickname">
            <card :text="userInfo.nickName"></card>
        </div>
        </div>

        <div class="container">
            <i-button type="subject" @click="bindViewTap">这是一个按钮</i-button>
        </div>

        <i-avatar :src="userAvator" size="default"></i-avatar>

        <img :src="userAvator" alt="头像" />
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
            handleChange ({ detail }) {
                this.setData({
                    current: detail.key
                });
            }
        },

        mounted () {
            this.userAvator = config.userData.portrait
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