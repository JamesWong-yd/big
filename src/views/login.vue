<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="title-s">广州市城市更新局 项目管理系统</div>
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Account from '../api/account'
import Cookies from 'js-cookie'

export default {
  data() {
    return {
      form: {
        userName: 'admin',
        password: ''
      },
      rules: {
        userName: [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.form.userName = Cookies.get('_rma')
  },
  methods: {
    _login: async function(req) {
      const res = await Account.login(req)
      if (res.status) {
        res.data.state === 1
          ? this.setState(res.data)
          : this.$Message.error('用户已失效，请联系管理员')
      } else {
        this.$Message.error(res.msg)
      }
    },
    handleSubmit: function() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this._login(this.form)
          let res = {
            status: true,
            msg: '登陆成功',
            data: {
              id: '5abe4ae8ec6f6f17a07b5d32',
              name: 'admin',
              account: 'admin',
              permission: [],
              state: 1,
              token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.IlU1aWpReTYvL1NUWStoNFp6ZXJ5WlArcTBldHNBaFQwSmVEU0syTmhRWWRHOTJWVGlUT0lSRktlSWYyTGNoam43N011QzNxNXFIOUUrcmZKWU1IVXBPVlJEYlpNMHIwV3VOSHN2SFdxaDZqUFZrTTFWeG9HK0JrVldYRFpkY0x5VzBROHRLM1RlUHYzdlZPcm9WRUci.R6__tUvO6A2m9FxXDX2r-_MeAmPqrt8qcUJddiN9PC4'
            }
          }
          this.setState(res.data)
        }
      })
    },
    setState(data) {
      // 服务器验证
      Cookies.set('_rma', this.form.userName, { expires: 1 })
      localStorage._rma = data.token
      this.$store.commit(
        'setAvator',
        'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg'
      )
      // 权限(未处理)
      if (this.form.userName === 'iview_admin') {
        Cookies.set('access', 0, { expires: 1 })
      } else {
        Cookies.set('access', 1, { expires: 1 })
      }
      this.$router.push({
        name: 'home_index'
      })
    }
  }
}
</script>

<style lang="less">
.login {
  .title-s {
    position: relative;
    top: 22%;
    right: 160px;
    text-align: right;
    font-size: 33px;
    transform: translateY(-60%);
  }
  width: 100%;
  height: 100%;
  background-image: url(../images/bg.jpg);
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
