<template>
  <div>
    <Card>
      <p slot="title">项目确认</p>
      <!-- <a href="#" slot="extra">
        <Button type="primary" class="header-btn" icon="plus-round" @click="changlocaltion">添加项目</Button>
      </a> -->
      <div>
        <div class="main-search">
          <Row :gutter="20">
            <Col span="2" class="main-asktitle">
            <span>项目名称</span>
            </Col>
            <Col span="3">
            <Input v-model="formdata.aname" clearable="clearable"></Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>项目地址</span>
            </Col>
            <Col span="3">
            <Input v-model="formdata.aaddress" clearable="clearable">
            </Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>项目编号</span>
            </Col>
            <Col span="3">
            <Input v-model="formdata.anumber" clearable="clearable">
            </Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>状态</span>
            </Col>
            <Col span="3">
            <Select v-model="formdata.state">
              <Option value="正常">正常</Option>
              <Option value="锁止">锁止</Option>
            </Select>
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
import { Database } from '@/database/database'
import vueBus from '@/libs/vueBus'

export default {
  data() {
    return {
      formdata: {
        aname: '',
        aaddress: '',
        anumber: '',
        state: ''
      },
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'aname'
        },
        {
          title: '流程环节',
          key: 'process'
        },
        {
          title: '项目编号',
          key: 'anumber'
        },
        {
          title: '项目地址',
          key: 'aaddress'
        },
        {
          title: '户数（户）',
          key: 'pdangerousnumber'
        },
        {
          title: '状态',
          key: 'state',
          render: (h, params) => {
            return h(
              'div',
              {
                style: {
                  color: params.row.state === '锁止' ? 'red' : '#495060'
                }
              },
              params.row.state
            )
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'info',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.lookApply(params.row)
                    }
                  }
                },
                '查看'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.confirm(params.row, '项目初审')
                    }
                  }
                },
                '通过'
              )
              // h(
              //   'Button',
              //   {
              //     props: {
              //       type: 'error',
              //       size: 'small'
              //     },
              //     on: {
              //       click: () => {
              //         this.remove(params.index)
              //       }
              //     }
              //   },
              //   '删除'
              // )
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
    this.init()
  },
  methods: {
    init() {
      this.dataSearch(this.formdata)
    },
    search(type) {
      if (!type) {
        this.page = 1
      }
      this.dataSearch(this.formdata)
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
    dataSearch(req) {
      let odata = this.$store.state.database.data
      let reqs = Object.assign(req, { process: '项目确认' })
      this.loading = true
      let newData = odata.filter(item => {
        for (let i in reqs) {
          let str = item[i]
          if (str.indexOf(reqs[i]) === -1) {
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
    confirm(e, type) {
      this.$Modal.confirm({
        title: '提示',
        content:
          type !== '删除'
            ? '是否确认该项目通过？'
            : '删除不可恢复，确定删除该项目？',
        onOk: () => {
          this.passProcess(e, type)
        }
      })
    },
    passProcess(e, type) {
      let odata = this.$store.state.database.data
      odata.map(item => {
        if (item.id === e.id) {
          item.process = type
        }
      })
      this.search()
    },
    statechang(e, type) {
      let odata = this.$store.state.database.data
      odata.map(item => {
        if (item.id === e.id) {
          item.state = type
        }
      })
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
