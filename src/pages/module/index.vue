<template>
    <div class="module_content">
        <i-panel title="常用" class="small_panel"></i-panel>
        <i-grid i-class="module_view">
            <i-row>
                <i-grid-item @click="toCustomer">
                    <i-grid-icon>
                        <image src="../../static/images/customer.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>客户</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toOpportunity">
                    <i-grid-icon>
                        <image src="../../static/images/opportunity.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>商机</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toAgreement">
                    <i-grid-icon>
                        <image src="../../static/images/agreement.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>合同</i-grid-label>
                </i-grid-item>
            </i-row>
        </i-grid>
        <i-panel title="销售支持" class="small_panel"></i-panel>
        <i-grid i-class="module_view">
            <i-row>
                <i-grid-item @click="toClue">
                    <i-grid-icon>
                        <image src="../../static/images/clue.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>线索</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toCluePool">
                    <i-grid-icon>
                        <image src="../../static/images/cluePool.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>线索池</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toCustomer">
                    <i-grid-icon>
                        <image src="../../static/images/customer.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>客户</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toCustomerPool">
                    <i-grid-icon>
                        <image src="../../static/images/customerPool.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>客户池</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toContact">
                    <i-grid-icon>
                        <image src="../../static/images/contact.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>联系人</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toOpportunity">
                    <i-grid-icon>
                        <image src="../../static/images/opportunity.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>商机</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toAgreement">
                    <i-grid-icon>
                        <image src="../../static/images/agreement.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>合同</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toPayCollection">
                    <i-grid-icon>
                        <image src="../../static/images/payCollection.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>应收回款</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toFollow">
                    <i-grid-icon>
                        <image src="../../static/images/payCollection.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>跟进记录</i-grid-label>
                </i-grid-item>
            </i-row>
        </i-grid>
        <i-panel title="办公" class="small_panel"></i-panel>
        <i-grid i-class="module_view">
            <i-row>
                <i-grid-item @click="toOutwork">
                    <i-grid-icon>
                        <image src="../../static/images/outwork.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>外勤</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toNotYet">
                    <i-grid-icon>
                        <image src="../../static/images/task.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>任务</i-grid-label>
                </i-grid-item>
                <i-grid-item @click="toNotYet">
                    <i-grid-icon>
                        <image src="../../static/images/note.png" style="width:20px;height:20px;" />
                    </i-grid-icon>
                    <i-grid-label>便签</i-grid-label>
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
            toCluePool(){
                console.log('去线索池')
                const url = '../cluePool/main'
                mpvue.navigateTo({ url })
            },
            toCustomer(){
                console.log('去客户')
                const url = '../customer/main'
                mpvue.navigateTo({ url })
            },
            toCustomerPool(){
                console.log('去客户池')
                const url = '../customerPool/main'
                mpvue.navigateTo({ url })
            },
            toContact(){
                console.log('去联系人')
                const url = '../contact/main'
                mpvue.navigateTo({ url })
            },
            toOpportunity(){
                console.log('去商机')
                const url = '../opportunity/main'
                mpvue.navigateTo({ url })
            },
            toAgreement(){
                console.log('去合同')
                const url = '../agreement/main'
                mpvue.navigateTo({ url })
            },
            toPayCollection(){
                console.log('去应收回款')
                const url = '../payCollection/main'
                mpvue.navigateTo({ url })
            },
            toFollow(){
                console.log('去跟进记录')
                const url = '../follow/main'
                mpvue.navigateTo({ url })
            },

            toOutwork(){
                console.log('去外勤')
                const url = '../outwork/main'
                mpvue.navigateTo({ url })
            },
            toTask(){
                console.log('去任务')
                const url = '../task/main'
                mpvue.navigateTo({ url })
            },
            toNote(){
                console.log('去便签')
                const url = '../note/main'
                mpvue.navigateTo({ url })
            },

            toNotYet(){
                console.log('去暂未开放')
                const url = '../notYet/main'
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