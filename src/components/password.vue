<template>
	<div class="login">
		<div class="loginbox">
			<div class="logo"></div>
			<form class="pwd-form padding-bottom-20">
				<div class="logintext">
					<i></i>
					<input type="password" v-model="pwddata.old" placeholder="请输入旧密码">
				</div>
				<div class="logintext">
					<i></i>
					<input type="password" v-model="pwddata.new1" placeholder="请输入新密码">
				</div>
				<div class="logintext">
					<i></i>
					<input type="password" v-model="pwddata.new2" placeholder="再次确认新密码">
				</div>
				<div style="padding: 0 30px; text-align:right;" >
					<a href="javascript:;" @click="logout()">重新登录</router-link>
				</div>
				<a href="javascript:;" class="pwd-btn" v-on:click="changePwd()">修改密码</a>			
			</form>
		</div>
	</div>
</template>

<script>
export default{
	data(){
		return{
			pwddata: {
				old: '',
				new1: '',
				new2: ''
			}
		}
	},
	methods:{
		changePwd(){
			if(!this.pwddata.old || this.pwddata.old.length<6 || this.pwddata.old.length>12){
				$.dialog('旧密码不能为空，长度在6-12位之间');
				return false;
			}
			if(!this.pwddata.new1 ||this.pwddata.new1.length<6 || this.pwddata.new1.length>12){
				$.dialog('新密码不能为空，长度在6-12位之间');
				return false;
			}
			if(!this.pwddata.new2 ||this.pwddata.new2.length<6 || this.pwddata.new2.length>12){
				$.dialog('请再次确认新密码，长度在6-12位之间');
				return false;
			}
			if(this.pwddata.new1!==this.pwddata.new2){
				$.dialog('新密码两次输入不一致');
				return false;				
			}
			let token = localStorage.getItem('token');
			//检测旧密码（备注：因为数据库没有同步，暂时无法测试接口） 
	      	$.post(window.config.api + "/user/checkPassword.do?token="+token,{password:this.pwddata.old})
	      	.then(data=>{
	          	if(!data.obj.isOk){
	          		$.dialog('原始密码输入错误');
	            	return false
	          	}

	          	//检测新密码两次输入的是否一致    
	           	$.post(window.config.api + "/user/modifyPassword.do?token="+token,{newPassword1:this.pwddata.new1,newPassword2:this.pwddata.new2})
		      	.then(data=>{
		          	if(!data.success){
		          		$.dialog(data.msg);
		            	return false
		          	}
		          	$.dialog(data.msg);
		          	window.location.href="/#/login";
		      });		
	      });			         
			
		},
		//退出登录
		logout(){
	        $.dialog({
	            content:'是否退出系统？',
	            ok:function(){
	                let token = localStorage.getItem('token');
	                $.post(window.config.api + "/login/cospaceLoginOut.do?token="+token,{})            
	                .then(data=>{
	                    if(!data.success){
	                        //返回错误状态
	                        $.dialog(data.msg); 
	                        return false;
	                    }
	                    //$.dialog(data.msg);
	                    window.location.href='/#/login';
	                })  
	                
	            },
	            cancel:function(){}
	        });  
	    }  				
	}
}
</script>

<style lang="sass">
.login{
	min-height: 100%;
	background: url(../bootstrap/img/login_bg.png) center center no-repeat;
	background-size: 100% 100%;
	padding: 8% 0;
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
				height: 20px;
				background: url(../bootstrap/img/password.png) no-repeat;				
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
		.pwd-btn{
			display: block;
			width: 300px;
			height: 40px;
			line-height: 40px;
			text-align: center;
			margin: 20px auto 0;
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