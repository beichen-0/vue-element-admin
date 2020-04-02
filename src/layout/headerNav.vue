<template>
  <header
    class="header_nav rflex"
    :style="{'width': headNavWidth + 'px'}"
    id="header_container"
  >
    <div class="right_nav" ref="rightNav">
      <top-menu />
      <div class="userinfo_right rflex">
        <div class="notify_row">
          <ul class="top_menu">
            <li class="li-badge">
              <el-tooltip class="item" effect="dark" content="访问github" placement="top">
                <a :href="github" target="_blank">
                  <icon-svg icon-class="iconGithub" />
                </a>
              </el-tooltip>
            </li>
            <li class="li-badge">
              <a :href="github" target="_blank" v-popover:qcode>
                <icon-svg icon-class="iconwechat" />
                <el-popover
                  ref="qcode"
                  popper-class="qcodepopper"
                  placement="bottom"
                  trigger="hover"
                >
                  <div class="wechat-area cflex">
                    <p class="titles">加我微信</p>
                    <img :src="wechat.wechatImg" alt="加我微信" />
                  </div>
                </el-popover>
              </a>
            </li>
            <li class="li-badge">
              <a :href="github" target="_blank" v-popover:qqcode>
                <icon-svg icon-class="iconqq" />
                <el-popover
                  ref="qqcode"
                  popper-class="qcodepopper"
                  placement="bottom"
                  trigger="hover"
                >
                  <div class="wechat-area cflex">
                    <p class="titles">加入qq群</p>
                    <img :src="qq.qqImg" alt="加入qq群" />
                  </div>
                </el-popover>
              </a>
            </li>
          </ul>
        </div>
        <div class="userinfo">
          <el-menu
            class="el-menu-demo"
            mode="horizontal"
          >
            <el-submenu index="1">
              <template slot="title">
                <img :src="langLogo" class="langAvatar" alt="">
              </template>
              <el-menu-item index="1-1" @click="changeLocale('zh')">
                <img :src="chinaImg" class="langAvatar" alt="">
                <span class="intro">中文</span>
              </el-menu-item>
              <el-menu-item index="1-2" @click="changeLocale('en')">
                <img :src="americaImg" class="langAvatar" alt="">
                <span class="intro">EngList</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <div class="welcome">
                  <span class="name">{{ $t('commons.hi') }},</span>
                  <span class="name avatarname">{{ $t(`commons.${name}`) }}</span>
                  <img :src="avatar" class="avatar" alt="">
                </div>
              </template>
              <el-menu-item index="2-1" @click="setDialogInfo('info')">{{ $t('commons.infoShow') }}</el-menu-item>
              <el-menu-item index="2-2" @click="setDialogInfo('pass')">
                {{ $t('commons.infoModify') }}
              </el-menu-item>
              <el-menu-item index="2-3" @click="setDialogInfo('logout')">
                {{ $t('commons.quit') }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

import * as mUtils from '@/utils/mutils'
import { setToken, getToken } from '@/utils/auth'
import { github } from "@/utils/env"

import topMenu from './topMenu.vue'

import wechatImg from '@/assets/img/wechat.jpg'
import qqImg from '@/assets/img/qq.png'
import logoImg from '@/assets/img/logo.png'
import chinaImg from '@/assets/img/china.svg'
import americaImg from '@/assets/img/america.svg'

export default {
  name: 'header-nav',
  data() {
    return {
      logo: logoImg,
      langLogo: getToken('langLogo') || americaImg,
      chinaImg: chinaImg,
      americaImg: americaImg,
      wechat: {
        wechatImg: wechatImg,
        isWechat: false
      },
      qq: {
        qqImg: qqImg,
        isQq: false
      },
      github: github,
      menu: {
        userBgColor: '#f0f2f5'
      }
    }
  },
  components: {
    topMenu
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'sidebar']),
    headNavWidth() {
      return document.body.clientWidth - this.sidebar.width
    }
  },
  methods: {
    showWechat () {
      this.wechat.isWechat = true
    },
    hideWechat() {
      this.wechat.isWechat = false
    },
    showQq() {
      this.qq.isQq = true
    },
    hideQq() {
      this.qq.isQq = false
    },
    logout() {
      this.$store.dispatch('logout')
        .then(() => {
          location.reload()
        })
    },
    /**
     * 弹出框-修改密码或者系统设置
     * @param {string} cmditem 弹出类型 
    */
    setDialogInfo(cmditem) {
      switch(cmditem) {
        case 'info':
          this.$router.push('/infoManage/infoShow/infoShow1')
          break
        case 'pass':
          this.$router.push('/infoManage/infoModify/infoModify1')
          break
        case 'logout':
          this.logout()
          break
      }
    },
    // 切换语言
    changeLocale(type) {
      setToken('lang', type)
      this.$i18n.locale = type
      if(type === 'en') {
        this.langLogo = this.americaImg
      } else {
        this.langLogo = this.chinaImg
      }
      setToken('langLogo', this.langLogo)
    }
  }
}
</script>

<style lang="less" scoped>
.right_nav {
  display: flex;
  flex: 1;
  width: calc(100% - 180px);
  padding-right: 15px;
  justify-content: space-between;
  box-shadow: 0px 2px 5px 0px rgba(237, 233, 233, .5);
}
.header_nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 10;
  transition: width .2s;
  justify-content: space-between;
  height: 60px;
  box-sizing: border-box;
  background-color: #fff;
  .logout {
    vertical-align: center; // 文字与图片的对齐方式
    cursor: pointer;
  }
}
.middle {
  align-items: center;
  border: 1px solid;
}
.userinfo_right {
  width: 320px;
  padding: 0 10px;
  justify-content: space-between;
}
.userinfo {
  line-height: 60px;
  text-align: right;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.lanAvatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .avatarname {
    color: #a9d86e;
    font-weight: border;
    font-size: 13px;
  }
}
.username {
  cursor: pointer;
  margin-left: 5px;
}
.border {
  border: 1px solid;
}
.notify_row {
  line-height: 60px;
  flex: 1;
  ul {
    display: flex;
    justify-content: space-around;
  }
}
ul.top_menu > li {
  position: relative;
}
</style>
