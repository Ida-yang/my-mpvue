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
  .searchView{
    height: 40px;
    background-color: #f0f0f0;
    padding: 0 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
  .searchBox{
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
  .searchIcon{
    display: inherit;
    flex: 0;
  }
  .searchInput{
    flex: 1;
    width: 250px;
    height: 25px;
    line-height: 25px;
    padding: 2px 8px !important;
    background-color: #ffffff00
  }
  .searchBtn{
    font-size: 14px;
    color: #62a072;
    line-height: 30px;
    margin: 0 10px;
  }
  .searchContainer{
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    font-size: 13px;
  }
  .queryView{
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    position: relative
  }
  .queryLabel{
    font-size: 14px;
  }
  .queryBtn{
    margin: 2px 5px 3px 0 !important;
    font-size: 13px !important;
    width: 71px;
    padding: 4px 0;
    border: 1rpx solid rgba(0, 0, 0, .1);
    border-radius: 4px;
    text-align: center;
  }
  .isActive{
    color: #ff5722;
    border: 1rpx solid #ff5722;
  }
  .resetBtn{
    position: absolute;
    bottom: 0;
    width: 100%;
    font-size: 13px;
  }

  .bottomBtn{
    position: fixed;
    bottom: 0;
    width: 100%;
  }
</style>
