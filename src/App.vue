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
    box-sizing: border-box;
  }
  /* this rule will be remove */
  * {
    transition: width 2s;
    -moz-transition: width 2s;
    -webkit-transition: width 2s;
    -o-transition: width 2s;
  }

  /* ------查询组件样式------- */
  .search_view{
    height: 40px;
    background-color: #f0f0f0;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .search_box{
    height: 30px;
    line-height: 30px;
    background-color: #ffffff;
    border: 1px solid #f0f0f0;
    border-radius: 5px;
    padding: 3px;
    box-sizing: border-box;
    display: flex;
    align-items: center
  }
  .search_icon{
    display: inherit;
    border-radius: 5px;
    flex: 0;
  }
  .search_input{
    flex: 1;
    width: 240px;
    height: 28px;
    line-height: 25px;
    padding: 0 8px !important;
    box-sizing: border-box;
  }
  .search_btn{
    font-size: 14px;
    color: #62a072;
    line-height: 30px;
    margin: 0 10px;
  }
  .search_container{
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    font-size: 12px;
  }
  .query_view{
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative
  }
  .query_label{
    font-size: 13px;
  }
  .queryBtn{
    /* margin: 2px 5px 3px 0 !important; */
    margin: 4px 8px !important;
    font-size: 12px !important;
    width: 60px;
    padding: 4px 0;
    /* border: 1rpx solid rgba(0, 0, 0, .1); */
    text-align: center;
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
    font-size: 13px;
  }

  /* 列表 */
  .cell_content{
    padding: 0 !important;
    font-size: 14px;
  }
  .cell_footer{
    font-size: 12px;
    color: #acacac;
    padding-top: 5px;
    box-sizing: border-box
  }

  /* 跟进记录 */
  .margin_card{
    margin: 10px 10px 0 10px !important;
  }
  .follow_view{
    background-color: #fff;
  }
  .contact_span1{
    color: #80848f;
  }
  .contact_span2{
    color: #919191;
  }
  .contact_way{
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 18px;
    background-color: #80848faf;
    color: #ffffff;
    border-radius: 9px;
    text-align: center;
  }
  .bottom_List{
    margin: 5px 15px;
    position: fixed;
    bottom: 0;
  }
  .nomargin_btn{
    margin: 0 !important;
  }
  .fullwidth_img{
    margin-top: 10px;
    width: 100%;
  }
  .follow_image{
    margin-top: 10px;
    width: 70px;
    height: 70px;
  }

  /* 底部按钮 */
  .bottom_btn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
  /* 跟进记录上传图片按钮 */
  .followimg_btn{
    margin-top: 30px !important;
  }
  /* 必填 */
  .request_tip{
    margin: 30px 0 0 15px;
    font-size: 12px;
    color: #80848f;
  }
  .font_size_12{
    font-size: 12px;
  }
  /* 单个列表 */
  .simple_cell{
    position: relative;
  }
  .simple_cell::after{
    display: initial !important;
  }
  /* 列表中picker组件 */
  .cell_picker{
    min-width: 50px;
    height: 30px;
  }
  /* 副标题 */
  .vice_panel{
    font-size: 12px;
    color: #80848f
  }
  .small_panel{
    font-size: 14px;
  }
  /* 带背景的span */
  .bgc_span{
    display: inline-block;
    padding: 2px 8px;
    box-sizing: border-box;
    background-color: rgb(241, 250, 255);
    border-radius: 8px;
  }
</style>
