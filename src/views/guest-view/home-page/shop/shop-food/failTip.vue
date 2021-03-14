<template>
  <div class="warn">
    <div>提交失败 请重新提交</div>
  </div>
</template>
<script>
export default {
}
</script>
<style lang="less">
.warn{
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 15px 5px;
  width: 250px;
  border-radius: 10px;
  div{
    font-size: 20px;
    color: #fff;
    text-align: center;
    letter-spacing: 2px;
  }
}
</style>
