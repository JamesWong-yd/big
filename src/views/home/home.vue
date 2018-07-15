<style lang="less">
@import './home.less';
@import '../../styles/common.less';
.avator-img {
  height: 80px;
  width: 80px;
  i {
    line-height: 80px;
    font-size: 65px;
  }
}
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="8">
                <Row class-name="home-page-row1" :gutter="10">
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <Row type="flex" class="user-infor">
                                <Col span="8">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <Avatar class="avator-img" icon="person" size="large" />
                                    </Row>
                                </Col>
                                <Col span="16" style="padding-left:6px;">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <div>
                                            <b class="card-user-infor-name">Admin</b>
                                            <p>super admin</p>
                                        </div>
                                    </Row>
                                </Col>
                            </Row>
                            <div class="line-gray"></div>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录时间:</p></Col>
                                <Col span="16" class="padding-left-8">2018.07.12-13:32:20</Col>
                            </Row>
                            <Row class="margin-top-8">
                                <Col span="8"><p class="notwrap">上次登录地点:</p></Col>
                                <Col span="16" class="padding-left-8">广州</Col>
                            </Row>
                        </Card>
                    </Col>
                    <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-checkbox-outline"></Icon>
                                待办事项
                            </p>
                            <a type="text" slot="extra" @click.prevent="addNewToDoItem">
                                <Icon type="plus-round"></Icon>
                            </a>
                            <Modal
                                v-model="showAddNewTodo"
                                title="添加新的待办事项"
                                @on-ok="addNew"
                                @on-cancel="cancelAdd">
                                <Row type="flex" justify="center">
                                    <Input v-model="newToDoItemValue" icon="compose" placeholder="请输入..." style="width: 300px" />
                                </Row>
                                <Row slot="footer">
                                    <Button type="text" @click="cancelAdd">取消</Button>
                                    <Button type="primary" @click="addNew">确定</Button>
                                </Row>
                            </Modal>
                            <div class="to-do-list-con">
                                <div v-for="(item, index) in toDoList" :key="'todo-item' + (toDoList.length - index)" class="to-do-item">
                                    <to-do-list-item :content="item.title"></to-do-list-item>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
            <Col :md="24" :lg="16">
                <Row>
                    <Card :padding="0">
                        <p slot="title" class="card-title">
                            <Icon type="android-map"></Icon>
                            项目分区统计
                        </p>
                        <div class="data-source-row">
                            <visite-volume></visite-volume>
                        </div>
                    </Card>
                </Row>
                <Row :gutter="10" class="margin-top-10">
                    <Col :md="24" :lg="12" :style="{marginBottom: '10px'}">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="ios-pulse-strong"></Icon>
                                数据来源统计
                            </p>
                            <div class="data-source-row">
                                <data-source-pie></data-source-pie>
                            </div>
                        </Card>
                    </Col>
                    <Col :md="24" :lg="12">
                        <Card>
                            <p slot="title" class="card-title">
                                <Icon type="android-wifi"></Icon>
                                项目资金统计
                            </p>
                            <div class="data-source-row">
                                <user-flow></user-flow>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import cityData from './map-data/get-city-value.js'
import homeMap from './components/map.vue'
import dataSourcePie from './components/dataSourcePie.vue'
import visiteVolume from './components/visiteVolume.vue'
import userFlow from './components/userFlow.vue'
import countUp from './components/countUp.vue'
import inforCard from './components/inforCard.vue'
import mapDataTable from './components/mapDataTable.vue'
import toDoListItem from './components/toDoListItem.vue'

export default {
  name: 'home',
  components: {
    homeMap,
    dataSourcePie,
    visiteVolume,
    userFlow,
    countUp,
    inforCard,
    mapDataTable,
    toDoListItem
  },
  data() {
    return {
      toDoList: [
        {
          title: '21号前处理好天河区改造房屋信息'
        },
        {
          title: '整理荔湾区改造房屋文件'
        },
        {
          title: '20号下午2点会议，需提前通知赵处长'
        },
        {
          title: '通知各部门学习培训'
        },
        {
          title: '文件下放'
        }
      ],
      count: {
        createUser: 496,
        visit: 3264,
        collection: 24389305,
        transfer: 39503498
      },
      cityData: cityData,
      showAddNewTodo: false,
      newToDoItemValue: ''
    }
  },
  computed: {
    avatorPath() {
      return localStorage.avatorImgPath
    }
  },
  methods: {
    addNewToDoItem() {
      this.showAddNewTodo = true
    },
    addNew() {
      if (this.newToDoItemValue.length !== 0) {
        this.toDoList.unshift({
          title: this.newToDoItemValue
        })
        setTimeout(() => {
          this.newToDoItemValue = ''
        }, 200)
        this.showAddNewTodo = false
      } else {
        this.$Message.error('请输入待办事项内容')
      }
    },
    cancelAdd() {
      this.showAddNewTodo = false
      this.newToDoItemValue = ''
    }
  }
}
</script>
