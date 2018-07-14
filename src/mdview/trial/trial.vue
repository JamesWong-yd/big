<template>
  <div>
    <trial-manage v-show="apply.localtion=== 'manage'" @changlocaltion="changlocaltion"></trial-manage>
    <trial-add v-show="apply.localtion=== 'add'"
               :edit="edit"
               :initdata="apply.initdata"
               :title="apply.title"
               @changlocaltion="changlocaltion"></trial-add>
  </div>
</template>
<script>
import trialManage from './trialManage'
import trialAdd from './trialAdd'
export default {
  name: 'trial_index',
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
    trialManage,
    trialAdd
  }
}
</script>
