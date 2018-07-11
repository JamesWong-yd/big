<template>
  <div>
    <Card>
      <p slot="title">项目申请管理</p>
      <a href="#" slot="extra" @click.prevent="changeLimit">
        <Button type="primary" class="header-btn" icon="plus-round">添加项目</Button>
      </a>
      <div>
        <div class="main-search">
          <Row :gutter="20">
            <Col span="2" class="main-asktitle">
            <span>项目名称</span>
            </Col>
            <Col span="3">
            <Input v-model="value1" clearable="clearable"></Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>项目地址</span>
            </Col>
            <Col span="3">
            <Input v-model="value2" clearable="clearable">
            </Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>项目编号</span>
            </Col>
            <Col span="3">
            <Input v-model="value3" clearable="clearable">
            </Input>
            </Col>
            <Col span="2" class="main-asktitle">
            <span>状态</span>
            </Col>
            <Col span="3">
            <Input v-model="value4" clearable="clearable">
            </Input>
            </Col>
            <Col span="4" style="text-align:center">
            <Button type="primary" icon="ios-search">查询</Button>
            <Button type="ghost" icon="refresh">重置</Button>
            </Col>
          </Row>
        </div>
        <div class="main-table">
          <Table border :columns="columns4" :data="data1"></Table>
          <Page class="main-page" :total="total" size="small" show-total show-elevator show-sizer @on-change="pageChangeRender" @on-page-size-change="limitChangeRender"></Page>
        </div>
      </div>
    </Card>
  </div>
</template>
<script>
import { applyTable } from '@/database/apply'
export default {
  data() {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      columns4: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '项目名称',
          key: 'name'
        },
        {
          title: '流程环节',
          key: 'process'
        },
        {
          title: '项目编号',
          key: 'number'
        },
        {
          title: '项目地址',
          key: 'address'
        },
        {
          title: '户数（户）',
          key: 'households'
        },
        {
          title: '状态',
          key: 'state'
        },
        {
          title: 'Action',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.show(params.index)
                    }
                  }
                },
                '查看'
              ),
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
                      this.remove(params.index)
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
                      this.remove(params.index)
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
      total: 0
    }
  },
  created() {
    this.data1 = applyTable
    this.total = applyTable.length
  },
  methods: {
    changeLimit() {},
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status)
    },
    pageChangeRender() {},
    limitChangeRender() {}
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
