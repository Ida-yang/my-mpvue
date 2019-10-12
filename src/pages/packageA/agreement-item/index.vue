<template>
    <div>{{msg}}</div>
</template>

<script>
    import config from '../../../config'
    import { $Toast,$Message } from '../../../../dist/wx/iview/base/index';

    export default {
        data(){
            return{
                msg: '待审批合同'
            }
        },

        methods:{
        },
    }
</script>

<style>
</style>