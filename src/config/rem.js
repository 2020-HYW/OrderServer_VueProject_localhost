export default function(){
  setHtmlFontSize()
  // 监听 页面尺寸发生变化 的事件
  window.addEventListener('resize',setHtmlFontSize)
  function setHtmlFontSize(){
    // 1.获取当前屏幕的宽度
    var winW = document.body.offsetWidth
    // 2. 以标准375屏幕 根元素100px 为标准 需要3.75rem占满屏幕的值作为参照点
    var htmlFontSize = 20*(winW / 375)
    // 给最大值 超过了默认为200px
    if(htmlFontSize > 40){
      htmlFontSize = 40
    }
    // 3. 把当前根元素的字体大小设置给html的fontSize 注意单位
    document.querySelector('html').style.fontSize = htmlFontSize + 'px'
  }

}
