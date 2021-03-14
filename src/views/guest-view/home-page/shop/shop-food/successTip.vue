<template>
  <div class="warn">
    <img src="./img/成功.png" alt="">
    <div>提交成功</div>
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
  padding: 20px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  img{
    width: 60px;
    margin-bottom: 10px;
  }
  div{
    font-size: 20px;
    color: #fff;
    text-align: center;
    letter-spacing: 2px;
  }
}
</style>
