<template>
    <div class="sign_in_wrap">
        <view>
            <map id="map" :longitude="longitude" :latitude="latitude" scale="18" show-location style="width: 100%; height: 300px;"></map>
        </view>
        <view class="sign_in_view">
            <p class="p1">当前位置</p>
            <p class="p2">{{address}}&nbsp;&nbsp;></p>
        </view>

        <view class="sign_in_photo" @click="photograph">
            <image src="../../../../static/images/photograph.png" class="sign_in_img" />
        </view>

        <image v-if="photoImg" mode="aspectFit" :src="photoImg" class="fullwidth_img"></image>
        <view class="detail_module"></view>

        <!-- 编辑 -->
        <i-button @click="signIn" type="ghost" :long="true" class="bottom_btn">确定</i-button>

        <i-message id="message" />
        <i-toast id="toast" />
    </div>
</template>

<script>
    import config from '../../../../config'
    import { $Toast,$Message } from '../../../../../dist/wx/iview/base/index'
    // 引入SDK核心类
    var QQMapWX = require('../../../../../static/libs/qqmap-wx-jssdk.js');
    // 实例化API核心类
    var qqmapsdk = new QQMapWX({
        key: 'BBEBZ-EANWV-NZTP5-UTXD3-XQ2H7-IOBFT'//申请的开发者秘钥key
    });
    export default {
        data(){
            return{
                longitude:'',
                latitude:'',

                address:'',
                photoCheck:'',

                photoImg:'',
            }
        },

        mounted(){
            // this.getthisLocation()
            this.getuserLocation()
        },

        methods:{
            getuserLocation(){
                // wx.authorize({
                //     scope: 'scope.userLocation',
                //     success: (res) => {
                    
                //     },
                // })
                wx.getSetting({
                    success(res){
                        console.log(res,1111)
                    },
                    fail(err){
                        console.log(err,2222)
                    }
                })
            },
            getthisLocation(){
                const _this = this
                wx.getLocation({
                    type: 'gcj02',
                    // type: 'wgs84',
                    success (res) {
                        console.log(res)
                        _this.latitude = res.latitude
                        _this.longitude = res.longitude

                        qqmapsdk.reverseGeocoder({
                            location: {
                                latitude: res.latitude,
                                longitude: res.longitude
                            },
                            success (res) {
                                //获取当前地址成功
                                console.log(res)
                                _this.address = res.result.address
                            },
                            fail (res) {
                                console.log(res)
                            }
                        });
                    },
                    fail(){
                        wx.getSetting({
                            success (res) {
                                var statu = res.authSetting;
                                if (!statu['scope.userLocation']) {
                                    wx.showModal({
                                        title: '是否授权当前位置',
                                        content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                                        success (tip) {
                                            if (tip.confirm) {
                                                wx.openSetting({
                                                    success (data) {
                                                        if (data.authSetting["scope.userLocation"] === true) {
                                                            wx.showToast({
                                                                title: '授权成功',
                                                                icon: 'success',
                                                                duration: 1000
                                                            })
                                                            //授权成功之后，再调用chooseLocation选择地方
                                                            wx.getLocation({
                                                                type: 'wgs84',
                                                                success (res) {
                                                                    _this.latitude = res.latitude
                                                                    _this.longitude = res.longitude

                                                                    qqmapsdk.reverseGeocoder({
                                                                        location: {
                                                                            latitude: res.latitude,
                                                                            longitude: res.longitude
                                                                        },
                                                                        success (res) {
                                                                            //获取当前地址成功
                                                                            _this.address = res.result.address
                                                                        },
                                                                        fail () {
                                                                        }
                                                                    });
                                                                },
                                                            })
                                                        } else {
                                                            wx.showToast({
                                                                title: '授权失败',
                                                                icon: 'success',
                                                                duration: 1000
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            },
                            fail (res) {
                                wx.showToast({
                                    title: '调用授权窗口失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
            },
            getPermission(obj){
                const _this = this
                wx.chooseLocation({
                    success (res) {
                        console.log(res,11111)
                        if(res.address){
                            _this.address = res.address
                            _this.latitude = res.latitude
                            _this.longitude = res.longitude
                        }else{
                            qqmapsdk.reverseGeocoder({
                                location: {
                                    latitude: res.latitude,
                                    longitude: res.longitude
                                },
                                success (res) {
                                    //获取当前地址成功
                                    console.log(res)
                                    _this.address = res.result.address
                                },
                                fail() {
                                }
                            });
                        }
                    },
                    fail(){
                        wx.getSetting({
                            success (res) {
                                var statu = res.authSetting;
                                if (!statu['scope.userLocation']) {
                                    wx.showModal({
                                        title: '是否授权当前位置',
                                        content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                                        success (tip) {
                                            if (tip.confirm) {
                                                wx.openSetting({
                                                    success (data) {
                                                        if (data.authSetting["scope.userLocation"] === true) {
                                                            wx.showToast({
                                                                title: '授权成功',
                                                                icon: 'success',
                                                                duration: 1000
                                                            })
                                                            //授权成功之后，再调用chooseLocation选择地方
                                                            wx.chooseLocation({
                                                                success (res) {
                                                                    if(res.address){
                                                                        _this.address = res.address
                                                                        _this.latitude = res.latitude
                                                                        _this.longitude = res.longitude
                                                                    }else{
                                                                        qqmapsdk.reverseGeocoder({
                                                                            location: {
                                                                                latitude: res.latitude,
                                                                                longitude: res.longitude
                                                                            },
                                                                            success (res) {
                                                                                //获取当前地址成功
                                                                                _this.address = res.result.address
                                                                            },
                                                                            fail () {
                                                                            }
                                                                        });
                                                                    }
                                                                },
                                                            })
                                                        } else {
                                                            wx.showToast({
                                                                title: '授权失败',
                                                                icon: 'success',
                                                                duration: 1000
                                                            })
                                                        }
                                                    }
                                                })
                                            }
                                        }
                                    })
                                }
                            },
                            fail (res) {
                                wx.showToast({
                                    title: '调用授权窗口失败',
                                    icon: 'success',
                                    duration: 1000
                                })
                            }
                        })
                    }
                })
            },
            photograph(){
                const _this = this
                wx.chooseImage({
                    count: 1,
                    sizeType: ['original', 'compressed'],
                    sourceType: ['camera'],
                    success (res) {
                        // tempFilePath可以作为img标签的src属性显示图片
                        console.log(res)
                        const tempFilePaths = res.tempFilePaths
                        _this.photoImg = res.tempFilePaths[0]
                        wx.uploadFile({
                            url: config.defaulthost + 'workOrder/upload.do?cId=' + config.userData.cId,
                            filePath: tempFilePaths[0],
                            name: 'file',
                            success: function (res) {
                                _this.photoCheck = res.data
                            }
                        })
                    }
                })
            },
            signIn(){
                const _this = this
                let date = new Date()
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hour = date.getHours()
                let min = date.getMinutes()
                let sec = date.getSeconds()

                month = (month < 10 ? "0" + month : month)
                day = (day < 10 ? "0" + day : day)
                hour = (hour < 10 ? "0" + hour : hour)
                min = (min < 10 ? "0" + min : min)
                sec = (sec < 10 ? "0" + sec : sec)

                let outworkObj = config.information.outworkDetailData

                let data = {
                    id: outworkObj.id,
                    addressCheck: this.address,
                    timeCheck: year + '-' +month + '-' + day + ' ' + hour + ':' + min + ':' + sec,
                    photoCheck: this.photoCheck,
                }
                console.log(data)

                let flag = false
                if(!data.photoCheck){
                    $Toast({
                        content: '请拍照上传',
                        type: 'warning'
                    });
                    flag = true
                }
                if(flag) return

                wx.request({
                    method:'post',
                    url: config.defaulthost + 'visit/photoCheck.do?cId=' + config.userData.cId,  //接口地址
                    data: data,
                    header:{
                        "Content-Type": "application/x-www-form-urlencoded",
                        'Cookie': config.SESSIONID
                    },
                    success:function(res) {
                        if(res.data.code && res.data.code == "200"){
                            $Message({
                                content: '签到成功',
                                type: 'success'
                            });
                            _this.toOutworkDetail()
                        }else{
                            $Message({
                                content: res.data.msg,
                                type: 'error'
                            });
                        }
                    }
                })
            },
            toOutworkDetail(){
                wx.navigateBack({
                    delta: 1,
                })
            },
        },
    }
</script>

<style>
    .sign_in_wrap{
        margin-bottom: 40px
    }
    .sign_in_view{
        margin: 50px 0;
        text-align: center;
        line-height: 30px;
    }
    .sign_in_view .p2{
        font-size: 14px
    }
    .sign_in_photo{
        margin-left: calc(50vw - 35px);
        width: 70px;
        height: 70px;
        border: 1rpx solid #707070;
        border-radius: 50%;
        padding: 15px;
        box-sizing: border-box
    }
    .sign_in_img{
        width: 40px;
        height: 40px;
        border-radius: 50%
    }
</style>
