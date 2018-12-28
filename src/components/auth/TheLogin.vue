<template>
<div class="login-wrap">
	<div class="sj-login">
		<p class="sj-title">风了 - 后台管理系统</p>
		<el-form ref="form" :model="form" :rules="rules" class="sj-content">
		  <el-form-item prop="name">
		    <el-input v-model="form.name"  placeholder="用户名"></el-input>
		  </el-form-item>
		  <el-form-item prop="password">
		    <el-input v-model="form.password"  placeholder="密码"></el-input>
		  </el-form-item>
		  <div class="login-btn">
		    <el-button type="primary" @click="onSubmit('form')">登录</el-button>
		  </div>
		</el-form>
	</div>
</div>
	
</template>

<script>
export default {
    data() {
      return {
        form: {
          name: 'admin',
          password: '123456', 
        },
        rules:{
        	name:[
        		{ required: true, message: '请输入用户名', trigger: 'blur' }
        	],
        	password:[
        		{ required: true, message: '请输入密码', trigger: 'blur' }
        	]
        }
      }
    },
    methods: {
      onSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
						this.$store.commit("SET_AUTH", this.form.name);
            this.$router.push('/');
          } else {
            alert('登录失败');
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped lang="scss">
	.login-wrap{
        position: relative;
        width:100%;
        height:100%;
        background-image: url(../../assets/image/login-bg.jpg);
        background-size: 100%;
        background-position:50% 50%;
				background-repeat: no-repeat;
    }
    .sj-title{
        width:100%;
        line-height: 50px;
        text-align: center;
        font-size:20px;
        color: #409EFF;
    }
    .sj-login{
        position: absolute;
        left:50%;
        top:50%;
        width:350px;
        margin:-250px 0 0 -175px;
        border-radius: 5px;
        background:rgba(221,221,221, 0.3);
        overflow: hidden;
    }
    .sj-content{
        padding: 30px 30px;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
        margin-bottom: 10px;
    }
</style>