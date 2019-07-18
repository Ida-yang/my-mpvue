<template>
    <div>
        <p class="datetime-picker">
            {{text}}
        </p>
        <!-- <picker mode="multiSelector" bindchange="bindMultiPickerChange" bindcolumnchange="bindMultiPickerColumnChange" value="{{multiIndex}}" range="{{multiArray}}">
            <view class="picker">
            当前选择：{{multiArray[0][multiIndex[0]]}}，{{multiArray[1][multiIndex[1]]}}，{{multiArray[2][multiIndex[2]]}}
            </view>
        </picker> -->
    </div>
</template>

<script>
    export default {
        props: {
            text:{
                type: String,
                value: '取消'
            },
        }
    }
</script>

<style>
    .datetime-picker {
        padding: 10px;
        box-sizing: border-box
    }
</style>