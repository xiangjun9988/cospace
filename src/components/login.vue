<template>
	<div class="login">
		<div class="loginbox">
			<div class="logo"></div>
			<form class="login-form padding-bottom-30">
				<div class="logintext form-user">
					<i></i>
					<input type="text" v-model="logindata.userName" placeholder="用户名">
				</div>
				<div class="logintext form-password">
					<i></i>
					<input type="password" v-model="logindata.password" placeholder="密码">
				</div>
				<!--
				<div class="form-yzm">
					<input type="text" v-model="logindata.yzm" placeholder="验证码">
					<a href="javascript:;"><img src="../bootstrap/img/yzm.jpg"></a>
				</div>
				-->
				<div class="forgot">
					<label>
            <input type="checkbox" class="colored-blue" checked="checked">
            <span class="text">记住用户名和密码</span>
	        </label>					
				</div>
				<a href="javascript:;" class="login-btn" @click="confirmLogin()">登录</a>	
			</form>
		</div>
	</div>	
</template>

<script>
var ticketGrantingTicket = "";
export default{
	data(){
		return{
			logindata: {
				userName: '',
				password: ''
			}
		}
	},
	created(){
		let _this = this;
		$(document).keydown(function(event){ 
			if(event.keyCode == 13){
				_this.confirmLogin();
			} 
		}); 
	},
	methods: {
		//获取字符串长度（汉字算两个字符，字母数字算一个）
    getByteLen(val) {      
      var len = 0;      
      for (var i = 0; i < val.length; i++) {        
        var a = val.charAt(i);       
        if (a.match(/[^\x00-\xff]/ig) != null) {          
          len += 2;        
        }        
        else {          
          len += 1;        
        }      
      }      
      return len;    
    },
		confirmLogin(){
			if(this.getByteLen(this.logindata.userName)<4 || this.getByteLen(this.logindata.userName)>16){
				$.dialog('用户名不能为空,长度在4-16之间');
				return false;
			}
			if(this.getByteLen(this.logindata.password)<6 || this.getByteLen(this.logindata.password)>12){
				$.dialog('密码不能为空，长度在6-12之间');
				return false;
			}
			//单点登录请求数据
			$.post(window.config.api + "/login/cospaceLogin.do",{username:this.logindata.userName,password:this.logindata.password})
			.then(data=>{
				if(!data.success){
					//返回错误状态
					$.dialog(data.msg);					
					return false;
				}
				//这里说明登录成功了，存token并跳转到首页	
				localStorage.setItem('token',data.obj.token);
				this.$router.push({path:'/'});
			});
		},
	}
}
</script>

<style lang="sass">
.login{
	min-height: 100%;
	background: url(../bootstrap/img/login_bg.png) center center no-repeat;
	background-size: 100% 100%;
	padding: 10% 0;
	.loginbox{
		width: 380px;
		background: #fff;
		margin: 0 auto;
		box-shadow: 11px 11px 11px rgba(0,0,0,.2);
		-webkit-box-shadow: 11px 11px 11px rgba(0,0,0,.2);
		.logo{
			width: 380px;
			height: 100px;
			background: url(../bootstrap/img/login_logo.png) center center no-repeat;
		}
		.logintext{
			position: relative;			
			padding: 17px 30px;
			&:before{
				display: table;
				content: "";
				position: absolute;
				top: 26px;
				left: 50px;
				width: 20px;
				height:20px;				
			}
			input{
				width: 320px;
				height: 38px;
				line-height: 38px;
				border: 1px solid #87b0f2;
				padding: 0 10px 0 60px;
				border-radius: 6px!important;
				-webkit-border-radius: 6px!important;				
			}			
			i{
				position: absolute;
				left: 0;
				top: 0;
				display: inline-block;
				width: 6px;
				height: 72px;
				background: #fff;
			}
			&:focus, &:hover{
				background: #eef3f6;
				i{
					background: #4b89f1;
				}
			}						
		}		
		.form-user:before{
			background: url(../bootstrap/img/user.png) no-repeat;
		}
		.form-password:before{
			background: url(../bootstrap/img/password.png) no-repeat;
		}
		.form-yzm{
			position: relative;
			margin: 10px 30px 20px;			
			&:before{
				display: table;
				content: "";
				position: absolute;
				top: 9px;
				left: 20px;
				width: 20px;
				height:20px;				
				background: url(../bootstrap/img/yzm.png) no-repeat;
			}
			input{
				width: 160px;
				height: 38px;
				line-height: 38px;
				border: 1px solid #87b0f2;
				padding: 0 10px 0 60px;
				border-radius: 6px!important;
				-webkit-border-radius: 6px!important;				
			}
			a{
				width: 140px;
				height: 36px;
				margin-left: 15px;
			}
		}
		.forgot{
			margin: 10px 30px 20px;
			label{
				cursor: pointer;
			}
		}
		.login-btn{
			display: block;
			width: 300px;
			height: 40px;
			line-height: 40px;
			margin: 0 auto;
			text-align: center;
			background: #36c0d2;
			font-size: 20px;
			color: #fff;
			&:hover{
				text-decoration: none;
				background: #36b0c2;
			}
		}								
	}	
}	
</style>

