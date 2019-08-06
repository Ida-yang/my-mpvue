<template>
    <div class="not_yet_wrap">
        <image src="../../static/images/not-open-bg.jpg" style="width:100px;height:100px;"></image>
        <p class="not_yet_p">该功能正在试运营，敬请期待</p>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                curren: '暂未开放，敬请期待'
            }
        },
    }
</script>

<style>
    .not_yet_wrap{
        margin-top: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center
    }
    .not_yet_p{
        line-height: 50px;
    }
</style>
