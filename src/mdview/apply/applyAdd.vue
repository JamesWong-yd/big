<template>
  <div>
    <Card style="position:relative">
      <Spin size="large" fix v-if="spinshow"></Spin>
      <p slot="title">{{title}}项目</p>
      <a href="#" slot="extra">
        <Button type="primary" class="header-btn" icon="plus-round" v-if="!edit" :loading="loading" @click="addData(title)">{{title}}</Button>
        <Button type="ghost" class="header-btn" icon="ios-grid-view" @click="changlocaltion">返回</Button>
      </a>
      <div>
        <div class="main-search">
          <Form :model="formItem"  ref="formValidate" :label-width="120">
            <Row>
              <Col span="8">
                <FormItem label="项目正式编号" required>
                  <Input v-model="formItem.anumber" placeholder="" :disabled="editreturn"></Input>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="项目所属区" required>
                  <Select v-model="formItem.aarea" :disabled="editreturn">
                      <Option value="天河区">天河区</Option>
                      <Option value="海珠区">海珠区</Option>
                      <Option value="越秀区">越秀区</Option>
                      <Option value="荔湾区">荔湾区</Option>
                      <Option value="番禺区">番禺区</Option>
                      <Option value="黄浦区">黄浦区</Option>
                      <Option value="萝岗区">萝岗区</Option>
                      <Option value="南沙区">南沙区</Option>
                      <Option value="从化区">从化区</Option>
                      <Option value="增城区">增城区</Option>
                      <Option value="花都区">花都区</Option>
                  </Select>
                </FormItem>
              </Col>
              <Col span="8">
                <FormItem label="项目名称" required>
                  <Input v-model="formItem.aname" placeholder="" :disabled="editreturn"></Input>
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="24">
                <FormItem label="项目（四至）地址" required>
                  <Input v-model="formItem.aaddress" placeholder="" :disabled="editreturn"></Input>
                </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
        <Tabs>
          <TabPane label="基本信息" name="name1">
            <Form :model="formItem" :label-width="130">
              <Row>
                <Col span="8">
                  <FormItem label="项目所属区" required>
                    <Select v-model="formItem.paddress" :disabled="edit">
                      <Option value="天河区">天河区</Option>
                      <Option value="海珠区">海珠区</Option>
                      <Option value="越秀区">越秀区</Option>
                      <Option value="荔湾区">荔湾区</Option>
                      <Option value="番禺区">番禺区</Option>
                      <Option value="黄浦区">黄浦区</Option>
                      <Option value="萝岗区">萝岗区</Option>
                      <Option value="南沙区">南沙区</Option>
                      <Option value="从化区">从化区</Option>
                      <Option value="增城区">增城区</Option>
                      <Option value="花都区">花都区</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="项目类型" >
                    <Select v-model="formItem.paddress" :disabled="edit">
                      <Option value="旧村">旧村</Option>
                      <Option value="旧厂">旧厂</Option>
                      <Option value="旧城镇">旧城镇</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="项目类型细分" >
                    <Select v-model="formItem.ptypeseg" :disabled="edit">
                      <Option value="旧村成本核算">旧村成本核算</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="改造范围用地面积（公顷）" >
                    <Input v-model="formItem.parea" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="改造主体名称" >
                    <Input v-model="formItem.pname" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="是否拟删除" >
                    <RadioGroup v-model="formItem.pdelete" :disabled="edit">
                      <Radio label="是" :disabled="edit">是</Radio>
                      <Radio label="否" :disabled="edit">否</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="改造方式" >
                    <Select v-model="formItem.pchange" :disabled="edit">
                      <Option value="拆旧建新">拆旧建新</Option>
                      <Option value="退宅还耕">退宅还耕 </Option>
                      <Option value="修缮改造">修缮改造</Option>
                      <Option value="全面改造">全面改造</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="改造模式" >
                    <Select v-model="formItem.pmodel" :disabled="edit">
                      <Option value="自行改造">自行改造</Option>
                      <Option value="统一改造">统一改造</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="改造类别" >
                    <Select v-model="formItem.pchangtype" :disabled="edit">
                      <Option value="人居环境改造">人居环境改造</Option>
                      <Option value="房屋环境改造">房屋环境改造</Option>
                    </Select>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="建筑面积（万平方米）"  :disabled="edit">
                    <Input v-model="formItem.pstructure" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="危房建筑面积（平方米）" :disabled="edit">
                    <Input v-model="formItem.pdangerous" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="危房数量（个）" >
                    <Input v-model="formItem.pdangerousnumber" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="申请纳入计划年份" >
                    <Input v-model="formItem.papply" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="纳入类型" >
                    <Select v-model="formItem.papplytype" :disabled="edit">
                      <Option value="省">省</Option>
                      <Option value="市">市</Option>
                      <Option value="区">区</Option>
                    </Select>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="控制是否稳定" >
                    <RadioGroup v-model="formItem.pcontrol">
                      <Radio label="是" :disabled="edit">是</Radio>
                      <Radio label="否" :disabled="edit">否</Radio>
                    </RadioGroup>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="8">
                  <FormItem label="居住人口（人）" >
                    <Input v-model="formItem.president" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="居住户数（户）" >
                    <Input v-model="formItem.phome" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="标图建库编号" >
                    <Input v-model="formItem.phomenumber" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="重点区位" >
                    <Input v-model="formItem.pfocus" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="项目进展情况说明" >
                    <Input v-model="formItem.pinstructions" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="备注" >
                    <Input v-model="formItem.premark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="附件" >
                    <Upload
                        multiple
                        action="//jsonplaceholder.typicode.com/posts/">
                        <Button type="ghost" icon="ios-cloud-upload-outline">上传附件</Button>
                    </Upload>
                  </FormItem>
                </Col>
              </Row>
            </Form>
          </TabPane>
          <TabPane label="户主数据" name="name2">
            <proEdit :type="title" @huzhushow="huzhushow"></proEdit>
          </TabPane>
          <TabPane label="资金信息" name="name3">
            <p style="margin:20px;color:red">备注：填写的数据默认单位为“万”</p>
            <Form :model="formItem" :label-width="120">
              <Row>
                <Col span="8">
                  <FormItem label="项目总预算" >
                    <Input v-model="formItem.dallmoney" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="市财政预算" >
                    <Input v-model="formItem.dsmoney" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="区财政预算" >
                    <Input v-model="formItem.dqmoney" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
              <Col span="8">
                  <FormItem label="其他总预算" >
                    <Input v-model="formItem.domoney" placeholder="" :disabled="edit" ></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="前期工作经费" >
                    <Input v-model="formItem.dqqmoney" placeholder=""  :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="预计拉动固定资产投资" >
                    <Input v-model="formItem.dyqmoney" placeholder="" :disabled="edit" ></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
              <Col span="8">
                  <FormItem label="项目总支出" >
                    <Input v-model="formItem.dacost" placeholder="" :disabled="edit"></Input>
                  </FormItem>
                </Col>
                <Col span="8">
                  <FormItem label="项目累计拨付" >
                    <Input v-model="formItem.daacost" placeholder=""  :disabled="edit"></Input>
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span="24">
                  <FormItem label="引入产业情况" >
                    <Input v-model="formItem.dyrremark" placeholder="" :disabled="edit" ></Input>
                  </FormItem>
                </Col>
              </Row>
            </Form>
            <money-add :type="title"></money-add>
          </TabPane>
        </Tabs>
      </div>
    </Card>
    <Modal
      :width="'60%'"
      v-model="huzhuedit"
      title="房屋户主数据修改"
      @on-ok="huzhuedit = false"
      @on-cancel="huzhuedit = false">
      <Form :model="formItem1"  ref="formValidate" :label-width="120">
        <Row>
          <Col span="8">
            <FormItem label="户主" required>
              <Input v-model="formItem1.a" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="门牌号" required>
              <Input v-model="formItem1.b" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="房屋面积" >
              <Input v-model="formItem1.c" placeholder=""></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="16">
            <FormItem label="地址" >
              <Input v-model="formItem1.d" placeholder="" ></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="前期费" >
              <Input v-model="formItem1.e" placeholder=""></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="临迁费" >
              <Input v-model="formItem1.f" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="迁运费" >
              <Input v-model="formItem1.g" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="复建费" >
              <Input v-model="formItem1.h" placeholder=""></Input>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="8">
            <FormItem label="农转用" >
              <Input v-model="formItem1.j" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="搬家补签费" >
              <Input v-model="formItem1.k" placeholder=""></Input>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="不可预见费" >
              <Input v-model="formItem1.l" placeholder=""></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>
<script>
import vueBus from '@/libs/vueBus'
import proEdit from '@/mdview/components/proEdit'
import moneyAdd from '@/mdview/components/moneyAdd'

export default {
  props: {
    title: {
      type: String,
      default: '添加'
    },
    initdata: {
      type: String,
      default: ''
    },
    edit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      spinshow: false,
      huzhuedit: false,
      loading: false,
      formItem: {
        anumber: '',
        aarea: '',
        aname: '',
        aaddress: '',
        paddress: '',
        ptype: '',
        ptypeseg: '',
        parea: '',
        pname: '',
        pdelete: '',
        pchange: '',
        pmodel: '',
        pchangtype: '',
        pstructure: '',
        pdangerous: '',
        pdangerousnumber: '',
        papply: '',
        papplytype: '',
        pcontrol: '',
        president: '',
        phome: '',
        phomenumber: '',
        pfocus: '',
        pinstructions: '',
        premark: '',
        dallmoney: '',
        dsmoney: '',
        dqmoney: '',
        domoney: '',
        dqqmoney: '',
        dyqmoney: '',
        dacost: '',
        daacost: '',
        dyrremark: ''
      },
      formItem1: {
        a: '户主1',
        b: 'A01',
        c: '280',
        d: '东圃大街一巷一号',
        e: '5000',
        f: '67200',
        g: '8400',
        h: '64000',
        j: '-',
        k: '2000',
        l: '-'
      }
    }
  },
  computed: {
    editreturn() {
      return this.edit || this.title === '修改'
    }
  },
  created() {},
  mounted() {
    vueBus.$on('initdataBus', e => {
      this.spinshow = true
      let _this = this
      setTimeout(function() {
        _this.formItem = JSON.parse(JSON.stringify(e))
        _this.spinshow = false
      }, 400)
    })
  },
  methods: {
    addData(type) {
      if (
        localStorage.getItem('SETDATABASE_DATA') ===
        JSON.stringify(this.formItem)
      ) {
        this.$Message.warning('请勿重复提交')
        return
      }
      if (
        !(
          this.formItem.aaddress &&
          this.formItem.anumber &&
          this.formItem.aarea &&
          this.formItem.aname
        )
      ) {
        this.$Message.warning('请输入必填项')
      } else {
        this.loading = true
        localStorage.setItem('SETDATABASE_DATA', JSON.stringify(this.formItem))
        if (type === '添加') {
          let formItems = JSON.parse(JSON.stringify(this.formItem))
          formItems.id = new Date() * 1
          formItems.process = '项目申请'
          formItems.state = '锁止'
          this.$store.commit('SETDATABASE_DATA', formItems)
          this.$Message.success(`创建成功`)
        } else {
          let database = this.$store.state.database.data
          for (let i in database) {
            if (database[i].id === this.formItem.id) {
              database[i] = JSON.parse(JSON.stringify(this.formItem))
            }
          }
          this.$store.commit('INIT_DATABASE', database)
          this.$Message.success(`修改成功`)
          vueBus.$emit('tablereset')
        }
        let _this = this
        setTimeout(() => {
          _this.loading = false
        }, 700)
      }
    },
    changlocaltion() {
      for (let i in this.formItem) {
        this.formItem[i] = ''
      }
      this.$emit('changlocaltion', {
        localtion: 'manage',
        edit: false
      })
    },
    huzhushow(){
      this.huzhuedit = true
    }
  },
  components: {
    proEdit,
    moneyAdd
  }
}
</script>
<style scoped>
.main-asktitle {
  line-height: 32px;
  text-align: right;
}
.main-row {
  margin: 10px 0;
}
</style>
<style>
.ivu-input[disabled],
fieldset[disabled] .ivu-input {
  color: #495060 !important;
}
.ivu-select-disabled .ivu-select-selection {
  color: #495060 !important;
}
</style>
