<template>
  <div>
    <review-manage v-show="apply.localtion=== 'manage'" @changlocaltion="changlocaltion"></review-manage>
    <review-add v-show="apply.localtion=== 'add'"
               :edit="edit"
               :initdata="apply.initdata"
               :title="apply.title"
               @changlocaltion="changlocaltion"></review-add>
  </div>
</template>
<script>
import reviewManage from './reviewManage'
import reviewAdd from './reviewAdd'
export default {
  name: 'review_index',
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
    reviewManage,
    reviewAdd
  }
}
</script>
