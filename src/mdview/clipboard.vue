<template>
  <div style="padding:20px;width: 100%;">
    <p>创建数据说明：</p>
    <p>1.在项目申请管理 -> 添加项目 ，里面填充数据，建议填充完整十几条，方便假数据制作；</p>
    <p>2.在添加管理中已经缓存数据，关闭页面重新打开可以还原至上次添加纪录；</p>
    <p>3.因浏览器本地储存有限，故添加数据一段时间后做好文本存档,后清除数据在添加，可以分开提供base.js文件；</p>
    <p>4.点击显示数据后，再点击复制数据，否则可能无法复制完全；</p>
    <p>5.点击按钮可以复制出刚刚添加的数据，保存到发送给你的base.js文件中注释位置；</p></p>
    <p>6.添加愉快。</p>
    <br>
    <br>    
    <Button @click="showdata">显示数据</Button>
    <Button type="success" class="tag-read" :data-clipboard-text="database" @click="clip">点击复制</Button>
    <Button type="error" @click="deletedabase">清除数据</Button>
    <br>
    <br>
    <div class="main">{{database}}</div>
    <div style="margin:30px auto; coler:red; font-size:25px;">{{tips}}</div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'

export default {
  name: 'database_index',
  data() {
    return {
      database: '',
      tips: ''
    }
  },
  methods: {
    showdata() {
      this.database = this.$store.state.database.data
      if (!this.database) {
        this.tips = '数据已被清除或未添加'
      } else {
        this.tips = ''
      }
    },
    clip() {
      if (!this.database) return
      let clipboard = new Clipboard('.tag-read')
      let _this = this
      clipboard.on('success', e => {
        _this.$Message.success('复制成功')
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        _this.$Message.error('该浏览器不`支持自动复制,请手动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    deletedabase() {
      localStorage.removeItem('SETDATABASE_DATA')
      this.$store.commit('REMOVEDATABASE_DATA')
    }
  }
}
</script>
<style scoped>
.main {
  width: 1000px;
  text-overflow: clip;
  word-break: break-all;
  word-wrap: break-word;
}
</style>
