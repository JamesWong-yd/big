<template>
  <div>
    <confirm-manage v-show="apply.localtion=== 'manage'" @changlocaltion="changlocaltion"></confirm-manage>
    <confirm-add v-show="apply.localtion=== 'add'"
               :edit="edit"
               :initdata="apply.initdata"
               :title="apply.title"
               @changlocaltion="changlocaltion"></confirm-add>
  </div>
</template>
<script>
import confirmManage from './confirmManage'
import confirmAdd from './confirmAdd'
export default {
  name: 'confirm_index',
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
    confirmManage,
    confirmAdd
  }
}
</script>
