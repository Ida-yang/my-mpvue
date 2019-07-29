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
        
        <i-progress percent="60" circle></i-progress>

        <i-steps direction="vertical">
            <i-step status="finish" icon="barrage">
                <view slot="title">
                    已完成
                </view>
                <view slot="content">
                    这里是该步骤的描述信息
                </view>
            </i-step>
            <i-step status="process" icon="brush">
                <view slot="title">
                    进行中
                </view>
                <view slot="content" icon="camera">
                    这里是该步骤的描述信息
                </view>
            </i-step>
            <i-step status="error" icon="collection">
                <view slot="title">
                    错误
                </view>
                <view slot="content">
                    这里是该步骤的描述信息
                </view>
            </i-step>
        </i-steps>
            

        <div style="margin-top:100px;"></div>

        <rich-text :nodes="nodesText" />

        <i-card title="卡片标题">
            <view slot="content">内容不错</view>
            <view slot="footer">尾部内容</view>
        </i-card>

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

        <view>
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

        <i-button type="warning" @click="uploadIMG">上传图片</i-button>
        
        <i-cell title="只显示箭头" is-link i-class="index_cell">
            <i-datetime-picker class="index_picker"></i-datetime-picker>
        </i-cell>

        
        <view class="section">
            <view class="section__title">日期选择器</view>
            <picker mode="date" :value="date222" start="2015-09-01" end="2017-09-01" @change="DateChange">
                <view class="picker">
                    当前选择: {{date222}}
                </view>
            </picker>
        </view>

        <i-button type="success" @click="bindViewTap">进入小程序</i-button>
    </div>
</template>

<script>
    import config from '../../config'
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

                date222: '2016-09-01',

                nodesText:'<ul style="color:red"><li>你好你好</li><li>世界</li></ul>'
                
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

            clickdatepicker(){},
            DateChange(e){
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.date222 = e.detail.value
            },

            uploadIMG(){
                wx.chooseImage({
                    count: 1,
                    success (res) {
                //         // tempFilePath可以作为img标签的src属性显示图片
                        const tempFilePaths = res.tempFilePaths
                        // console.log(tempFilePaths)
                        wx.uploadFile({
                            url: config.defaulthost + 'goods/masterGraph.do?cId=' + config.userData.cId,
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success: function (res) {
                                // var data = JSON.parse(res)　　//坑2：与wx.request不同，wx.uploadFile返回的是[字符串]，需要自己转为JSON格式
                                console.log(res)
                            }
                        })
                    }
                })
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
    .index_cell{
        position: relative;
    }
    .index_picker{
        position: absolute;
        top: -10px;
        right: 10px;
    }
</style>