<template>
  <div class="shareArea cflex sharelast">
    <p class="shareTitle">分享组件三：仿简书侧栏分享</p>
    <div class="bottom">
      <el-tooltip class="item" effect="dark" content="分享文章" placement="left">
        <el-button class="shareItem" v-popover:leftShareList>
          <icon-svg icon-class="iconshare" />
          <el-popover
            ref="leftShareList"
            popper-class="moreShareList leftShareList"
            placement="left"
            trigger="click"
          >
            <div>
              <ul class="cflex">
                <li>
                  <a href="#" @click="shareToWeixin()">
                    <div class="item">
                      <icon-svg icon-class="iconwechat" />
                      <span>分享到微信</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" @click="shareToWeibo()">
                    <div class="item">
                      <icon-svg icon-class="iconweibo" />
                      <span>分享到微博</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" @click="shareToQQzone()">
                    <div class="item">
                      <icon-svg icon-class="iconqq_zone" />
                      <span>分享到QQ空间</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" @click="shareToQQ()">
                    <div class="item">
                      <icon-svg icon-class="iconqq" />
                      <span>分享到QQ</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" @click="shareToDouban()">
                    <div class="item">
                      <icon-svg icon-class="icondouban" />
                      <span>分享到豆瓣</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="item">
                      <icon-svg icon-class="icontwitter" />
                      <span>分享到Witter</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="item">
                      <icon-svg icon-class="iconfacebook" />
                      <span>分享到Facebook</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <div class="item">
                      <icon-svg icon-class="icongoogle" />
                      <span>分享到Google</span>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </el-popover>
        </el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  name:'jianshuLeftShare',
  methods: {
    shareToWeixin() {
      this.$emit("shareToWeixin");
    },
    shareToQQ() {
      this.$emit("shareToQQ");
    },
    shareToQQzone() {
      this.$emit("shareToQQzone");
    },
    shareToWeibo() {
      this.$emit("shareToWeibo");
    },
    shareToDouban() {
      this.$emit("shareToDouban");
    }
  }
};
</script>

<style lang="less" scoped>
.shareArea {
  width: 340px;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  .shareTitle {
    width: 100%;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px;
    box-sizing: border-box;
  }
  .bottom {
    width: 100%;
    height: 100%;
    align-items: center;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
