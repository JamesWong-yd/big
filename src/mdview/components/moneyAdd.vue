<template>
  <div>
    <Card>
      <p slot="title">资金信息</p>
      <a href="#" slot="extra">
        <Button type="primary" class="header-btn" icon="plus-round" @click="add">新增资金信息</Button>
      </a>
      <div>
        <div class="main-table">
          <Table border :columns="columns4" :loading="loading" :data="data1"></Table>
          <Page class="main-page" :total="total" size="small" show-total show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import moneyData from '@/database/money'
import vueBus from '@/libs/vueBus'

export default {
  props: {
    type: {
      type: String,
      default: '添加'
    }
  },
  data() {
    return {
      formdata: {},
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '年份',
          key: 'year'
        },
        {
          title: '本年市财政预算（万元）',
          key: 'sCost'
        },
        {
          title: '本年区财政预算（万元）',
          key: 'qCost'
        },
        {
          title: '本年社会资金（万元）',
          key: 'hCost'
        },
        {
          title: '操作',
          width: 130,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      // this.editApply(params.row)
                    }
                  }
                },
                '修改'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      // this.confirm(params.row, '删除')
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      data1: [],
      total: 0,
      page: 1,
      pageSize: 10,
      loading: false
    }
  },
  created() {
    this.search()
  },
  methods: {
    search(type) {
      if (!type) {
        this.page = 1
      }
      this.dataSearch(this.type === '添加' ? [] : moneyData, this.formdata)
    },
    lookApply(data) {
      this.$emit('changlocaltion', {
        localtion: 'add',
        edit: true,
        title: '查看'
      })
      vueBus.$emit('initdataBus', data)
    },
    editApply(data) {
      this.$emit('changlocaltion', {
        localtion: 'add',
        edit: false,
        title: '修改'
      })
      vueBus.$emit('initdataBus', data)
    },
    reset() {
      this.formdata.aname = ''
      this.formdata.aaddress = ''
      this.formdata.anumber = ''
      this.formdata.state = ''
      this.search()
    },
    changlocaltion() {
      this.$emit('changlocaltion', {
        localtion: 'add',
        edit: false
      })
    },
    pageChangeRender(page) {
      this.page = page
      this.search(true)
    },
    limitChangeRender(size) {
      this.pageSize = size
      this.search()
    },
    dataSearch(odata, req) {
      this.loading = true
      let newData = odata.filter(item => {
        for (let i in req) {
          let str = item[i]
          if (str.indexOf(req[i]) === -1) {
            return false
          }
        }
        return true
      })
      let _this = this
      setTimeout(function() {
        _this.total = newData.length
        let PAGE = (_this.page - 1) * _this.pageSize
        _this.loading = false
        _this.data1 = newData.slice(PAGE, PAGE + _this.pageSize)
      }, 300)
    },
    add() {}
  },
  watch: {
    type: function(){
      this.search()
    }
  }
}
</script>
<style scoped>
.header-btn {
  position: relative;
  top: -4px;
}
.main-asktitle {
  line-height: 32px;
  text-align: right;
}
.main-table {
  margin-top: 20px;
}
.main-page {
  margin-top: 20px;
}
</style>
