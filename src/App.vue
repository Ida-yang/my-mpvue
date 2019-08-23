<script>
  export default {
    created () {
      // 调用API从本地缓存中获取数据
      /*
      * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
      * 微信：mpvue === wx, mpvuePlatform === 'wx'
      * 头条：mpvue === tt, mpvuePlatform === 'tt'
      * 百度：mpvue === swan, mpvuePlatform === 'swan'
      * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
      */

      let logs
      if (mpvuePlatform === 'my') {
        logs = mpvue.getStorageSync({key: 'logs'}).data || []
        logs.unshift(Date.now())
        mpvue.setStorageSync({
          key: 'logs',
          data: logs
        })
      } else {
        logs = mpvue.getStorageSync('logs') || []
        logs.unshift(Date.now())
        mpvue.setStorageSync('logs', logs)
      }
    },
    log () {
      console.log(`log at:${Date.now()}`)
    }
  }
</script>

<style>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 200rpx 0;
    box-sizing: border-box
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s
  }

  /* ------查询组件样式------- */
  .search_view{
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    padding: 0 10px;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    z-index: 99
  }
  .search_box{
    height: 30px;
    line-height: 30px;
    background-color: #ffffff;
    border: 1px solid #f5f5f5;
    border-radius: 5px;
    padding: 3px;
    box-sizing: border-box;
    display: flex;
    align-items: center
  }
  .search_icon{
    display: inherit;
    border-radius: 5px;
    flex: 0
  }
  .search_input{
    flex: 1;
    width: 240px;
    height: 28px;
    line-height: 25px;
    padding: 0 8px !important;
    box-sizing: border-box
  }
  .search_btn{
    font-size: 14px;
    color: #62a072;
    line-height: 30px;
    margin: 0 10px
  }
  .search_container{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    font-size: 12px
  }
  .query_view{
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative
  }
  .query_label{
    font-size: 13px
  }
  .queryBtn{
    /* margin: 2px 5px 3px 0 !important; */
    margin: 4px 8px !important;
    font-size: 12px !important;
    width: 60px;
    padding: 4px 0;
    /* border: 1rpx solid rgba(0, 0, 0, .1); */
    text-align: center
  }
  .isActive{
    color: #ff5722;
    border-bottom: 1rpx solid #ff5722;
    /* border-radius: 4px; */
  }
  .reset_btn{
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 13px
  }

  /* 列表 */
  .cell_content{
    padding: 0 !important;
    font-size: 14px
  }
  .cell_footer{
    font-size: 12px;
    color: #acacac;
    padding-top: 5px;
    box-sizing: border-box
  }
  .cell_label{
    color: #80848f;
    font-size: 12px
  }
  .pool_cell{
    padding: 15px 20px !important
  }
  .i-swipeout-button{
    height: 100%;
    display: flex
  }
  .i-swipeout-button-item{
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center
  }

  /* 跟进记录 */
  .margin_card{
    margin: 10px 10px 0 10px !important
  }
  .contact_span1{
    color: #80848f
  }
  .contact_span2{
    color: #919191
  }
  .contact_way{
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 18px;
    background-color: #80848faf;
    color: #ffffff;
    border-radius: 9px;
    text-align: center
  }
  .bottom_List{
    margin: 5px 15px;
    position: fixed;
    bottom: 0
  }
  .nomargin_btn{
    margin: 0 !important
  }
  .fullwidth_img{
    margin-top: 10px;
    width: 100%
  }
  .follow_image{
    margin-top: 10px;
    width: 70px;
    height: 70px
  }

  /* 底部按钮 */
  .bottom_btn{
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 9
  }
  /* 底部文本 */
  .bottom_view{
    width: 100vw;
    height: 40px;
    background-color: #fff;
    border-top: 1rpx solid #f5f5f5;
    font-size: 14px;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    bottom: 0;
    z-index: 9
  }
  /* 跟进记录上传图片按钮 */
  .followimg_btn{
    margin-top: 30px !important
  }
  /* 按钮组 */
  .btn_group{
    width: 100%;
    margin-top: 8px;
    display: flex
  }
  .flex_btn{
    flex: 1
  }
  /* 必填 */
  .request_tip{
    margin: 30px 0 0 15px;
    font-size: 12px;
    color: #80848f
  }
  /* 不同文字 */
  .font_size_12{
    font-size: 12px
  }
  .gray_12{
    font-size: 12px;
    color: #80848f
  }
  /* 单个列表 */
  .simple_cell{
    position: relative;
    padding: 10px 15px !important
  }
  .simple_cell::after{
    display: initial !important
  }
  .color_495060_text{
    color: #495060
  }
  /* 列表中picker组件 */
  .cell_picker{
    min-width: 100px;
    height: 24px
  }
  /* 副标题 */
  .vice_panel{
    font-size: 12px;
    color: #80848f
  }
  .small_panel{
    font-size: 14px
  }
  /* 带背景的span */
  .bgc_span{
    display: inline-block;
    padding: 2px 8px;
    box-sizing: border-box;
    background-color: rgb(241, 250, 255);
    border-radius: 8px
  }
  .detail_module{
    width: 100%;
    height: 10px
    /* margin-top: 10px */
  }
  
  .cell_info{
    font-size: 12px;
    color: #80848f;
    padding-top: 6px;
    box-sizing: border-box
  }
  .cell_link{
    background-color: rgb(241, 250, 255) !important;
    width: 100%;
    margin-top: 8px;
    padding: 5px !important;
    color: #5f6164
  }
  .cell_link .i-cell-text{
    font-size: 12px !important
  }
  .add_or_update_wrap{
    margin-bottom: 40px;
    padding-bottom: 10px
  }

  /* 白色背景 */
  .white_bg{
    background-color: #fff;
  }

  /* 便签输入框 */
  .note_input{
    min-height: 300px !important;
  }

  /* 订单查询筛选 */
  .order_search{
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #fafafa;
    z-index: 10
  }
  .order_searck_box{
    width: calc(100% - 30px);
    background-color: #fff;
    margin: 10px 15px;
    border: 1rpx solid #fafafa;
    border-radius: 4px;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
  }
  .order_search_input{
    flex: 0 0 90%;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    padding: 2px 5px;
    box-sizing: border-box;
  }
  .order_tabs{
    height: 36px !important;
    line-height: 36px !important
  }
  .bar_option{
    width: 100vw;
    background-color: rgb(255, 255, 255);
    text-align: center;
    position: fixed;
    z-index: 999
  }
  .option_p{
    font-size: 13px;
    line-height: 36px;
    border-bottom: 1rpx solid #f5f5f5
  }
  .theme_color_text{
    color: #ff6333
  }
  .gray_color_text{
    color: #acacac
  }

  .product_wrap{
    flex: 3;
    height: calc(100vh -80px);
    background-color: rgb(255, 255, 255);
    float: left;
  }
  .product_item{
    padding: 8px;
    font-size: 14px;
    border-bottom: 1rpx solid #f5f5f5
  }
  .product_item_c{
    position: relative;
  }
  .product_item_price{
    position: absolute;
    top: 2px;
    left: 80px;
  }
  .product_item_counter{
    position: absolute;
    bottom: 0;
    right: 2px;
    height: 26px;
    line-height: 26px;
    border-radius: 12px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between
  }
  .counter_btn{
    display: inline-block;
    width: 26px;
    text-align: center;
  }
  .counter_disable{
    color: #a8a8a8
  }
  .counter_text{
    display: inline-block;
    width: 42px;
    text-align: center;
    font-size: 14px
  }
  .product_item_shopping{
    position: absolute;
    bottom: 0;
    right: 20px;
    height: 28px;
    width: 28px;
    border-radius: 13px;
    background-color: #e62c2c;
    display: flex;
    align-items: center;
    justify-content: center
  }
  .product_item_add{
    position: absolute;
    bottom: 0;
    right: 20px;
    height: 28px;
    width: 28px;
    border-radius: 13px;
    background-color: #ff6333;
    display: flex;
    align-items: center;
    justify-content: center
  }
  .product_item_update{
    position: absolute;
    right: 20px;
    top: calc(50% - 7px);
    display: flex;
    align-items: center;
    justify-content: center
  }

  .product_item_more{
    position: fixed;
    top: 0;
    z-index: 98
  }
  .item_more_head{
    width: 100vw;
    height: 100px;
    background-color: rgba(0, 0, 0, 0.281);
  }
  .item_more_content{
    height: calc(100vh - 100px);
    background-color: #fff;
    position: relative;
  }
  .item_more_close{
    color: #c7c7c7;
    position: absolute;
    right: 10px;
    top: 20px
  }
  .item_more_goods{
    padding: 20px 10px;
    font-size: 14px;
    line-height: 20px;
    display: flex
  }
  .item_more_scroll_wrap{
    height: calc(100vh - 240px)
  }
  .item_more_goods_item{
    height: 80px;
    position: relative;
    padding: 20px 10px;
    font-size: 14px;
    border-bottom: 1rpx solid #e9eaec
  }
  .goods_item_head{
    display: flex;
    align-items: center
  }
  .goods_item_foot{
    position: absolute;
    bottom: 20px
  }

  .product_counter{
    background-color: rgba(0, 0, 0, 0.281);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    z-index: 99
  }
  .counter_wrap{
    position: relative;
    background-color: #fff;
    width: 80%;
    margin-left: 10%;
    margin-top: 50%
  }
  .counter_head{
    background-color: #ff6333;
    padding: 10px;
    font-size: 14;
    color: #fff
  }
  .counter_content{
    position: relative;
  }
  .counter_item{
    height: 26px;
    line-height: 26px;
    border-radius: 12px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: space-between
  }
  .counter_foot{
    padding: 5px;
    display: flex;
    text-align: center;
    justify-content: center
  }
  .counter_foot span{
    flex: 1;
    line-height: 28px
  }

  .inline_btn{
    display: inline-block;
    margin-right: 0 !important;
    width: 80px
  }
</style>
