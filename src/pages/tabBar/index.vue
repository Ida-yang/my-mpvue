<template>
    <div>
        <i-notice-bar icon="systemprompt" loop>
            2018年世界杯,将于6月14日至7月15日举行;2018年世界杯,将于6月14日至7月15日举行;
        </i-notice-bar>
        <i-panel title="基本用法"></i-panel>

        <i-tab-bar :current="current" @change="handleChange">
            <i-tab-bar-item key="homepage" icon="homepage" current-icon="homepage_fill" title="Home"></i-tab-bar-item>
            <i-tab-bar-item key="group" icon="group" current-icon="group_fill" title="Friends"></i-tab-bar-item>
            <i-tab-bar-item key="remind" icon="remind" current-icon="remind_fill" count="3" title="Notice"></i-tab-bar-item>
            <i-tab-bar-item key="mine" icon="mine" current-icon="mine_fill" dot title="My"></i-tab-bar-item>
        </i-tab-bar>

        <i-button type="ghost" @click="handleWarning">错误</i-button>
        <i-toast id="toast" />

        <i-button type="ghost" @click="handleSuccess">成功提醒</i-button>
        <i-message id="message" />

        <i-button @click="toggleRight" type="ghost">右边弹出</i-button>
        <i-drawer mode="right" :visible="showRight" @close="toggleRight">
            <view class="demo-container">
                单击遮罩层关闭
            </view>
        </i-drawer>

        <i-page :current="page" total="5" @change="changePage">
            <view slot="prev">Prev</view>
            <view slot="next">Next</view>
        </i-page>

        <view style="margin-top: 100px">
            <i-button type="ghost" @click="handleOpen1">一般用法</i-button>
            <i-button type="ghost" @click="handleOpen2">带有提示、异步</i-button>
        </view>
        <i-action-sheet :visible="actionSheet1" :actions="actions1" show-cancel @cancel="handleCancel1" @change="handleClickItem1" />
        <i-action-sheet :visible="actionSheet2" :actions="actions2" show-cancel @cancel="handleCancel2" @change="handleClickItem2" :mask-closable="false">
            <view slot="header" style="padding: 16px">
                <view style="color: #444;font-size: 16px">确定吗？</view>
                <text>删除后无法恢复哦</text>
            </view>
        </i-action-sheet>

        <i-button type="ghost" @click="openModel">普通对话框</i-button>
        <i-modal title="标题" :visible="modelvisible" @ok="closeModel" @cancel="closeModel">
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
            <view>一些文本</view>
        </i-modal>

        <i-button type="warning" @click="clickdatetimepicker">日期时间选择器</i-button>
        <i-datetimePicker :visible="aaaaaaaaa" show-cancel @cancel="canceldatetimepicker" />

        <i-button type="success" @click="bindViewTap">进入小程序</i-button>
    </div>
</template>

<script>
    import { $Toast,$Message } from '../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: 'homepage',
                showRight: false,
                page: 1,
                actionSheet1: false,
                actionSheet2: false,
                
                actions1: [
                    {
                        name: '选项1'
                    },
                    {
                        name: '选项2'
                    },
                    {
                        name: '去分享',
                        icon: 'share',
                        openType: 'share'
                    }
                ],
                actions2: [
                    {
                        name: '删除',
                        color: '#ed3f14'
                    }
                ],

                modelvisible:false,

                aaaaaaaaa:false,
                
            }
        },

        methods: {
            handleChange (detail) {
                this.current = detail.target.key
            },
            bindViewTap () {
                const url = '../index/main'
                if (mpvuePlatform === 'wx') {
                    mpvue.switchTab({ url })
                } else {
                    mpvue.navigateTo({ url })
                }
            },
            handleWarning(){
                $Toast({
                    content: '这是一个错误的提示',
                    type: 'error'
                });
            },
            handleSuccess(){
                $Message({
                    content: '这是一条成功提醒',
                    type: 'success'
                });
            },
            toggleRight(){
                this.showRight = !this.showRight
            },
            
            changePage (val) {
                const type = val.target.type;
                if (type === 'next') {
                    this.page = this.page + 1
                } else if (type === 'prev') {
                    this.page = this.page - 1
                }
            },

            onShareAppMessage() {
                return {
                    title: 'iView Weapp',
                    imageUrl: 'https://file.iviewui.com/iview-weapp-logo.png'
                };
            },

            handleOpen1 () {
                this.actionSheet1 = true
            },

            handleCancel1 () {
                this.actionSheet1 = false
            },

            handleOpen2 () {
                this.actionSheet2 = true
            },

            handleCancel2 () {
                this.actionSheet2 = false
            },

            handleClickItem1 (e) {
                const index = e.target.index + 1;

                $Message({
                    content: '点击了选项' + index
                });
            },

            handleClickItem2 (e) {
                const action = this.actions2;
                action[0].loading = true;

                this.actions2 = action

                setTimeout(() => {
                    action[0].loading = false;
                    this.actionSheet2 = false,
                    this.actions2 = action
                    $Message({
                        content: '删除成功！',
                        type: 'success'
                    });
                }, 2000);
            },

            openModel(){
                this.modelvisible = true
            },
            closeModel(){
                this.modelvisible = false
            },

            clickdatetimepicker(){
                this.aaaaaaaaa = true
            },
            canceldatetimepicker(){
                this.aaaaaaaaa = false
            },
        },
    }
</script>

<style scoped>
    .demo-container{
        width: 100%;
        height: 100%;
        background-color: #fff;
        text-align: center;
    }
</style>