<template>
  <div class="shareArea cflex">
    <p class="shareTitle">分享组件一：横向排列</p>
    <div class="bottom rflex">
      <span class="toTitle">分享到：</span>
      <ul class="shareUrl rflex wflex">
        <li>
          <div class="item" @mouseover="showqrcode()" @mouseout="hideqrcode()">
            <icon-svg icon-class="iconwechat" />
          </div>
          <div class="qrcodeArea" v-show="qrcode.show">
            <p class="saoTitle">扫一扫</p>
            <div class="qrcode" id="qrCodeUrl"></div>
          </div>
        </li>
        <li>
          <div class="item" @click="shareToWeibo()">
            <icon-svg icon-class="iconweibo"/>
          </div>
        </li>
        <li>
          <div class="item" @click="shareToQQ()">
            <icon-svg icon-class="iconqq"/>
          </div>
        </li>
        <li>
          <div class="item" @click="shareToQQzone()">
            <icon-svg icon-class="iconqq_zone" />
          </div>
        </li>
        <li>
          <div class="item" @click="shareToDouban()">
            <icon-svg icon-class="icondouban" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2"
import { shareUrl } from "@/utils/env"

export default {
  data() {
    return {
      qrcode: {
        show: false
      },
      qrcodeobj: {
        text: shareUrl, // 要分享的网页路径
        width: 80,
        height: 80,
        colorDark: "#000000",
        colorLight: "#ffffff",
        currectLevel: QRCode.CorrectLevel.H
      }
    }
  },
  mounted() {
    this.creatQrCode();
  },
  methods: {
    showqrcode() {
      this.qrcode.show = true;
    },
    hideqrcode() {
      this.qrcode.show = false;
    },
    creatQrCode() {
      this.$nextTick(() => {
        new  QRCode(document.getElementById('qrCodeUrl'), this.qrcodeobj)
      })
    },
    shareToWeibo() {
      this.$emit('shareToWeibo')
    },
    shareToQQ() {
      this.$emit('shareToQQ')
    },
    shareToQQzone() {
      this.$emit('shareToQQzone')
    },
    shareToDouban() {
      this.$emit('shareToDouban')
    }
  }
}
</script>

<style lang="less" scoped>
.shareArea {
  width: 340px;
  border-radius: 4px;
  align-items: center;
  background-color: #fff;
  .shareTitle {
    width: 100%;
    font-size: 14px;
    border-bottom: 1px solid #e8e8e8;
    padding: 10px;
    box-sizing: border-box;
  }
  .bottom {
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px 8px;
    .toTitle {
      font-size: 13px;
    }
    .shareUrl {
      justify-content: space-between;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 50%;
        position: relative;
        cursor: pointer;
        .title {
          margin-bottom: 10px;
          font-size: 13px;
          color: #a9d86e;
        }
        .item {
          width: 40px;
          height: 40px;
          background-color: #eff2f7;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          .svg-icon {
            font-size: 24px;
          }
          .active {
            color: #ff6c60
          }
        }
        .qrcodeArea {
          position: absolute;
          top: 50px;
          left: -30px;
          text-align: center;
          border: 1px solid #a9d86e;
          border-radius: 4px;
          padding: 10px;
          z-index: 10;
          background-color: #fff;
          .saoTitle {
            font-size: 14px;
            color: #a9d86e;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
