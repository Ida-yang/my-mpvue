<template>
    <div class="module_content">
        <i-panel title="客户管理" class="small_panel"></i-panel>
        <i-grid i-class="module_view">
            <i-row>
                <i-grid-item @click="toClue">
                    <i-grid-icon>
                        <i-icon type="homepage" size="28" color="#80848f" />
                    </i-grid-icon>
                    <i-grid-label>线索</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toCustomer">
                    <i-grid-icon>
                        <i-icon type="group_fill" size="28" color="#303331" />
                    </i-grid-icon>
                    <i-grid-label>客户</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toContact">
                    <i-grid-icon>
                        <i-icon type="interactive_fill" size="28" color="#80848f" />
                    </i-grid-icon>
                    <i-grid-label>联系人</i-grid-label>
                </i-grid-item>
            </i-row>
        </i-grid>
        <i-panel title="销售" class="small_panel"></i-panel>
        <i-grid i-class="module_view">
            <i-row>
                <i-grid-item @click="toClue">
                    <i-grid-icon>
                        <i-icon type="addressbook_fill" size="28" color="#303331" />
                    </i-grid-icon>
                    <i-grid-label>线索</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toCustomer">
                    <i-grid-icon>
                        <i-icon type="group_fill" size="28" color="#80848f" />
                    </i-grid-icon>
                    <i-grid-label>客户</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toContact">
                    <i-grid-icon>
                        <i-icon type="interactive_fill" size="28" color="#303331" />
                    </i-grid-icon>
                    <i-grid-label>联系人</i-grid-label>
                </i-grid-item>
            </i-row>
            <i-row>
                <i-grid-item @click="toClue">
                    <i-grid-icon>
                        <i-icon type="addressbook_fill" size="28" color="#80848f" />
                    </i-grid-icon>
                    <i-grid-label>线索</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toCustomer">
                    <i-grid-icon>
                        <i-icon type="group_fill" size="28" color="#303331" />
                    </i-grid-icon>
                    <i-grid-label>客户</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toContact">
                    <i-grid-icon>
                        <i-icon type="interactive_fill" size="28" color="#80848f" />
                    </i-grid-icon>
                    <i-grid-label>联系人</i-grid-label>
                </i-grid-item>
            </i-row>
        </i-grid>
    </div>
</template>

<script>
    import config from '../../config'
    // import { $Message } from '../../../dist/wx/iview/base/index';

    export default {
        data () {
            return {
                current: '功能',
            }
        },

        mounted(){
        },

        methods: {
            
            toClue(){
                console.log('去线索')
                const url = '../clue/main'
                mpvue.navigateTo({ url })
            },
            toCustomer(){
                console.log('去客户')
                const url = '../customer/main'
                mpvue.navigateTo({ url })
            },
            toContact(){
                console.log('去联系人')
                const url = '../contact/main'
                mpvue.navigateTo({ url })
            },
        },
    }
</script>

<style>
    .module_content{
        background-color: #f5f5f5;
    }
    .module_view{
        background-color: #fff;
    }
</style>