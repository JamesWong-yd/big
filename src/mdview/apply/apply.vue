<template>
  <div>
    <apply-manage v-show="apply.localtion=== 'manage'" @changlocaltion="changlocaltion"></apply-manage>
    <apply-add v-show="apply.localtion=== 'add'"
               :edit="edit"
               :initdata="apply.initdata"
               :title="apply.title"
               @changlocaltion="changlocaltion"></apply-add>
  </div>
</template>
<script>
import applyManage from './applyManage'
import applyAdd from './applyAdd'
export default {
  name: 'apply_index',
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
    applyManage,
    applyAdd
  }
}
</script>
