<template>
  <div>
    <Card>
      <p slot="title">户主数据</p>
      <a href="#" slot="extra">
        <Button type="primary" class="header-btn" icon="plus-round" @click="add">新增户数</Button>
      </a>
      <div>
        <div class="main-search">
          <Row :gutter="20">
            <Col span="2" class="main-asktitle">
            <span>户主</span>
            </Col>
            <Col span="4">
            <Input v-model="formdata.houseMan" clearable="clearable"></Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>门牌号</span>
            </Col>
            <Col span="4">
            <Input v-model="formdata.number" clearable="clearable">
            </Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>地址</span>
            </Col>
            <Col span="4">
            <Input v-model="formdata.address" clearable="clearable">
            </Input>
            </Col>
            <Col span="4" style="text-align:center">
            <Button type="primary" icon="ios-search" @click="search">查询</Button>
            <Button type="ghost" icon="refresh" @click="reset">重置</Button>
            </Col>
          </Row>
        </div>
        <div class="main-table">
          <Table border :columns="columns4" :loading="loading" :data="data1"></Table>
          <Page class="main-page" :total="total" size="small" show-total show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { trialTable } from '@/database/housedata'
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
      formdata: {
        houseMan: '',
        number: '',
        address: ''
      },
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '门牌号',
          width: 100,
          key: 'number'
        },
        {
          title: '户主',
          width: 120,
          key: 'houseMan'
        },
        {
          title: '核算类型',
          width: 120,
          key: 'moneyType'
        },
        {
          title: '地址',
          width: 220,
          key: 'address'
        },
        {
          title: '房屋面积（㎡）',
          width: 140,
          key: 'area'
        },
        {
          title: '前期费',
          width: 100,
          key: 'fontCost'
        },
        {
          title: '临迁费（除去搬家补偿费）',
          width: 140,
          key: 'middleCost'
        },
        {
          title: '拆运费',
          width: 100,
          key: 'endCost'
        },
        {
          title: '复建费',
          width: 100,
          key: 'reserCost'
        },
        {
          title: '农转用',
          width: 100,
          key: 'farmCost'
        },
        {
          title: '搬家补偿费',
          width: 100,
          key: 'changCost'
        },
        {
          title: '不可预见费',
          width: 100,
          key: 'noseeCost'
        },
        {
          title: '操作',
          width: 130,
          align: 'center',
          fixed: 'right',
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
                      this.editApply(params.row)
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
      this.dataSearch(this.type === '添加' ? [] : trialTable, this.formdata)
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
      this.$emit('huzhushow')
      // vueBus.$emit('initdataBus', data)
    },
    reset() {
      this.formdata.houseMan = ''
      this.formdata.number = ''
      this.formdata.address = ''
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
