<template>
  <div>
    <came-manage v-show="apply.localtion=== 'manage'" @changlocaltion="changlocaltion"></came-manage>
    <came-add v-show="apply.localtion=== 'add'"
               :edit="edit"
               :initdata="apply.initdata"
               :title="apply.title"
               @changlocaltion="changlocaltion"></came-add>
  </div>
</template>
<script>
import cameManage from './cameManage'
import cameAdd from './cameAdd'
export default {
  name: 'came_index',
  data() {
    return {
      edit: false,
      apply: {
        localtion: 'manage'
      }
    }
  },
  methods: {
    changlocaltion(val) {
      this.apply = val
      this.edit = val.edit
    }
  },
  components: {
    cameManage,
    cameAdd
  }
}
</script>
