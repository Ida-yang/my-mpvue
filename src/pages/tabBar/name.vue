<template>
    <div>
        <view class="section">
            <view class="section__title">普通选择器</view>
            <picker bindchange="bindPickerChange" value="{{index}}" range="{{array}}">
                <view class="picker">
                当前选择：{{array[index]}}
                </view>
            </picker>
        </view>
        <view class="section">
            <view class="section__title">多列选择器</view>
            <picker mode="multiSelector" bindchange="bindMultiPickerChange" bindcolumnchange="bindMultiPickerColumnChange" value="{{multiIndex}}" range="{{multiArray}}">
                <view class="picker">
                当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
                </view>
            </picker>
        </view>
        <view class="section">
            <view class="section__title">时间选择器</view>
            <picker mode="time" value="{{time}}" start="09:01" end="21:01" bindchange="bindTimeChange">
                <view class="picker">
                当前选择: {{time}}
                </view>
            </picker>
        </view>

        <view class="section">
            <view class="section__title">日期选择器</view>
            <picker mode="date" value="{{date}}" start="2015-09-01" end="2017-09-01" bindchange="bindDateChange">
                <view class="picker">
                当前选择: {{date}}
                </view>
            </picker>
        </view>
        <view class="section">
            <view class="section__title">省市区选择器</view>
            <picker mode="region" bindchange="bindRegionChange" value="{{region}}" custom-item="{{customItem}}">
                <view class="picker">
                当前选择：{{region[0]}}，{{region[1]}}，{{region[2]}}
                </view>
            </picker>
        </view>
    </div>
</template>

<script>
    export default {
        data() {
            return{
                array: ['美国', '中国', '巴西', '日本'],
                objectArray: [
                {
                    id: 0,
                    name: '美国'
                },
                {
                    id: 1,
                    name: '中国'
                },
                {
                    id: 2,
                    name: '巴西'
                },
                {
                    id: 3,
                    name: '日本'
                }
                ],
                index: 0,
                multiArray: [['无脊柱动物', '脊柱动物'], ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'], ['猪肉绦虫', '吸血虫']],
                objectMultiArray: [
                    [
                        {
                            id: 0,
                            name: '无脊柱动物'
                        },
                        {
                            id: 1,
                            name: '脊柱动物'
                        }
                    ], [
                        {
                            id: 0,
                            name: '扁性动物'
                        },
                        {
                            id: 1,
                            name: '线形动物'
                        },
                        {
                            id: 2,
                            name: '环节动物'
                        },
                        {
                            id: 3,
                            name: '软体动物'
                        },
                        {
                            id: 3,
                            name: '节肢动物'
                        }
                    ], [
                        {
                            id: 0,
                            name: '猪肉绦虫'
                        },
                        {
                            id: 1,
                            name: '吸血虫'
                        }
                    ]
                ],
                multiIndex: [0, 0, 0],
                date: '2016-09-01',
                time: '12:01',
                region: ['广东省', '广州市', '海珠区'],
                customItem: '全部'
            }
        },
        methods:{
            bindPickerChange(e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.setData({
                    index: e.detail.value
                })
            },
            bindMultiPickerChange (e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.setData({
                    multiIndex: e.detail.value
                })
            },
            bindMultiPickerColumnChange (e) {
                console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
                var data = {
                    multiArray: this.data.multiArray,
                    multiIndex: this.data.multiIndex
                };
                data.multiIndex[e.detail.column] = e.detail.value;
                switch (e.detail.column) {
                case 0:
                    switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'];
                        data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                        break;
                    case 1:
                        data.multiArray[1] = ['鱼', '两栖动物', '爬行动物'];
                        data.multiArray[2] = ['鲫鱼', '带鱼'];
                        break;
                    }
                    data.multiIndex[1] = 0;
                    data.multiIndex[2] = 0;
                    break;
                case 1:
                    switch (data.multiIndex[0]) {
                    case 0:
                        switch (data.multiIndex[1]) {
                        case 0:
                            data.multiArray[2] = ['猪肉绦虫', '吸血虫'];
                            break;
                        case 1:
                            data.multiArray[2] = ['蛔虫'];
                            break;
                        case 2:
                            data.multiArray[2] = ['蚂蚁', '蚂蟥'];
                            break;
                        case 3:
                            data.multiArray[2] = ['河蚌', '蜗牛', '蛞蝓'];
                            break;
                        case 4:
                            data.multiArray[2] = ['昆虫', '甲壳动物', '蛛形动物', '多足动物'];
                            break;
                        }
                        break;
                    case 1:
                        switch (data.multiIndex[1]) {
                        case 0:
                            data.multiArray[2] = ['鲫鱼', '带鱼'];
                            break;
                        case 1:
                            data.multiArray[2] = ['青蛙', '娃娃鱼'];
                            break;
                        case 2:
                            data.multiArray[2] = ['蜥蜴', '龟', '壁虎'];
                            break;
                        }
                        break;
                    }
                    data.multiIndex[2] = 0;
                    break;
                }
                console.log(data.multiIndex);
                this.setData(data);
            },
            bindDateChange(e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.setData({
                    date: e.detail.value
                })
            },
            bindTimeChange(e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.setData({
                    time: e.detail.value
                })
            },
            bindRegionChange (e) {
                console.log('picker发送选择改变，携带值为', e.detail.value)
                this.setData({
                    region: e.detail.value
                })
            }
        },
    }
</script>



    {
      "text": "订单",
      "pagePath": "pages/order/main",
      "iconPath": "static/tabs/02-1.png",
      "selectedIconPath": "static/tabs/02-2.png"
    }, 
    , {
      "text": "审批",
      "pagePath": "pages/approval/main",
      "iconPath": "static/tabs/04-1.png",
      "selectedIconPath": "static/tabs/04-2.png"
    }, {
      "text": "我的",
      "pagePath": "pages/mine/main",
      "iconPath": "static/tabs/05-1.png",
      "selectedIconPath": "static/tabs/05-2.png"
    }



    {
      "name": "订单",
      "pagePath": "pages/order/main",
      "icon": "static/tabs/02-1.png",
      "activeIcon": "static/tabs/02-2.png"
    }, 
    , {
      "name": "审批",
      "pagePath": "pages/approval/main",
      "icon": "static/tabs/04-1.png",
      "activeIcon": "static/tabs/04-2.png"
    }, {
      "name": "我的",
      "pagePath": "pages/mine/main",
      "icon": "static/tabs/05-1.png",
      "activeIcon": "static/tabs/05-2.png"
    }