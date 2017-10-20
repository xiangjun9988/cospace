<template>
	<div class="home">
		<div class="top clearfix">
			<div class="container">
				<div class="logo"></div>
				<div class="basicinfo clearfix">
					<div class="photo-fl">
						<img v-bind:src="api +'/'+ $store.state.userMap.userPicBak +'?token='+token" v-if="api +'/'+ $store.state.userMap.userPicBak +'?token='+token">
						<img src="../bootstrap/img/head.png" v-else>
					</div>	
					<div class="info-fr">
						<span class="username">欢迎，{{$store.state.userMap.userName}}</span>
						<span class="department">部门：{{$store.state.userMap.deptName}}</span>
						<span class="job">职务：{{$store.state.userMap.userDutyName}}</span><br/>
						<div class="passedit">
							<router-link to="password"></router-link>
							<i class="glyphicon glyphicon-lock"></i><span>修改密码</span>
						</div>
						<div class="logout">
							<a href="javascript:;" @click="logout()"></a>
							<i class="glyphicon glyphicon-off"></i><span>退出登录</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="content clearfix">
			<div class="container">
				<div class="row">
					<div class="col-md-8">
						<div class="applys">
							<div class="title">吉云大数据支撑平台</div>
							<div class="applys-body">
								<ul class="system clearfix">
									<li v-for="(item, i) in system1" :class="'system'+ i%4" @click="intoApply(item.appId)">
										<router-link :to="item.frontUrl">
											<i class="icon"></i>
											<span class="text">{{item.appName}}</span>
										</router-link>     
									</li>
									<li v-for="(item, i) in system2" :class="'system'+ (i+system1.length)%4"  @click="clickToApp(item)">
										<a>
											<i class="icon"></i>
											<span class="text">{{item.appName}}</span>	            	
										</a>
									</li>
								</ul>
								<div class="line"></div>
								<ul class="general clearfix">
									<li v-for="(item, i) in general1" :class="'general'+ i%4" @click="intoApply(item.appId)">
										<router-link :to="item.frontUrl">
											<i class="icon"></i>
											<span class="text">{{item.appName}}</span>
										</router-link>     
									</li>
									<li v-for="(item, i) in general2" :class="'general'+ (i+general1.length)%4"  @click="clickToApp(item)">
										<a>
											<i class="icon"></i>
											<span class="text">{{item.appName}}</span>	            	
										</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
					<div class="col-md-4">
						<div class="systemInfo">
							<div class="title">系统消息</div>
							<ul class="info">
								<li>关于印发《武汉市建设工程项目。。。</li>
								<li>市公共行政服务中“迎七一 展。。。</li>
								<li>武汉市区级进驻公共行政服务。。</li>
								<li>关于开展以“学讲话、讲诚信。。。</li>
								<li>关于中心开展“平安随手拍”</li>
								<li>关于中心开展“平安建随手拍”</li>
								<li>关于印发《武汉市建设工程项目</li>
								<li>市公共行政服务中“迎七一 </li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data(){
			return{
				api: '',
			//源数据
			token: '',			
			//系统应用数据
			system: [],
			system1: [],
			system2: [],
			//普通应用数据
			general: [],
			general1: [],
			general2: [],
			//消息中心
			newsData: []		
		}
	},
	created(){

		this.api = window.config.api;
		let token = localStorage.getItem('token');
		this.token = token;	
		$.post(window.config.api + "/login/checkToken.do?token="+token)
		.then(data=>{
			if(!data.success){
				$.dialog('登录鉴权超时,访问令牌无效,请重新登录！')
				this.$router.push({path: '/login'});
				return false
			}
		}); 

		//获取当前登录用户绑定的应用模块数据
		$.get(window.config.api + "/login/getUserInfoByToken.do?token="+token)
		.then(data=>{
			if(!data.success){
				return false
			}
			this.system = data.obj.appList.filter(item=>item.appType == '01');
			this.system1 = this.system.filter(item=>item.frontUrl != undefined);
			this.system2 = this.system.filter(item=>item.frontUrl == undefined);

			this.general = data.obj.appList.filter(item=>item.appType === '02');
			this.general1 = this.general.filter(item=>item.frontUrl != undefined);
			this.general2 = this.general.filter(item=>item.frontUrl == undefined);

	    //获取消息中心的数据
	    $.get(window.config.api + "/sorMessage/queryListByPage.do?token="+token,{messageRecId:data.obj.userMap.userId})
	    .then(data=>{   	
	    	if(!data.success){
	    		return false
	    	}
	    	this.newsData = data.obj.records;
	    });

	    $('.systemInfo').css('height',$('.applys').height());
	});    	
	},
	methods:{
		intoApply(appId){
			let token = localStorage.getItem('token');
			//进入每一个应用时加载此接口，为了统计各应用使用时间
			$.post(window.config.api + "/appCount/count.do?token="+token,{c:30000,appId:appId})
			.then(data=>{
				if(!data.success){
					$.dialog(data.msg);
					return false;
				}
			});			
		},
		//上传头像
		doUpload() {
			if($("#uploadForm input[type='file']").val() == ''){
				$.dialog('请选择需要上传的图片');
				return false;
			}		  
			let token = localStorage.getItem('token');
			var formData = new FormData($( "#uploadForm" )[0]);  
			$.ajax({  
				url: window.config.api + "/user/uploadUserPic.do?token="+token,  
				type: 'POST',  
				data: formData,  
				async: false,  
				cache: false,  
				contentType: false,  
				processData: false,  
				success: function (returndata) {  
					$.dialog({
						content:'头像上传成功,重新登录后有效',
						ok:function(){
							window.location.href='/#/login';
						},
						cancel:function(){}
					});			      	
				},  
				error: function (returndata) { 
					$.dialog('头像上传失败');
				}  
			});  
		},
		clickToApp(item){
			var newWindow=window.open();
			let token = localStorage.getItem('token');



			if(item.appLinkType == '01'){
				//进入每一个应用时加载此接口
				newWindow.location.href=item.appUrl+'?token='+token;
			}
			if(item.appLinkType == '02'){
				//进入每一个应用时加载此接口
				$.post(window.config.api + "/login/getServiceTicket.do?token="+token,{redirectUrl:item.appUrl})
				.then(data=>{
					if(!data.success){
						$.dialog(data.msg);
						return false;
					}

					let url = new Set( item.appUrl );
					if(url.has('?')){
						newWindow.location.href=item.appUrl+'&ticket='+data.obj.ticket;
					}else{
						newWindow.location.href=item.appUrl+'?ticket='+data.obj.ticket;
					}
					
					this.intoApply(item.appId);
				});
			}
			
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
	@media (min-width: 1200px){
		.container {
		    width: 1230px;
		}
	}
	.home{
		min-height: 100%;	
		background: url(../bootstrap/img/index_bg.png) center center no-repeat;
		background-size: 100% 100%;
		ul{
			margin-bottom:0;
			li{
				list-style: none;
			}
		}
		.top{
			background: rgba(34,128,211,.6);
			height: 100px;
			.logo{
				float: left;
				width: 350px;
				height: 70px;
				background:url(../bootstrap/img/logo.png) top center no-repeat;
				margin-top: 16px;
			}
			.basicinfo{
				float: right;
				height: 70px;
				.photo-fl{
					float: right;
					width: 72px;
					height: 72px;
					margin-top: 20px;
					border: 4px solid rgba(255,255,255,.3);
					border-radius: 100%;
					img{
						display: block;
						width: 64px;
						height: 64px;
					}
				} 	 		
				.info-fr{
					float: right;
					padding: 0;
					margin-left: -3px;
					margin-top: 20px;
					text-align: right;
					margin-right: 20px;
					span{
						display: inline-block;
						width: auto;
						height: 35px;
						line-height: 27px;
						padding: 0 10px;
						font-size: 14px;
						color: #fff;
					}				
				}
				.passedit,
				.logout{
					display: inline-block;
					border: 4px solid #3a89de;
					border-radius: 30px;
					height: 32px;
					position: relative;
					padding: 0 8px;
					color: #fff;
					background: #65a4e5;
					span{
						line-height: 24px;
						font-size: 14px;
						color: #fff;
					}
					a{
						display: block;
						cursor: pointer;
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
					}
				}
			} 	 		
		} 
		.content{
			margin: 40px auto 0 auto;	
			.applys{
				height: 450px;
				.title{
					background: url(../bootstrap/img/content-titleBg.png) no-repeat;
					background-size: contain;
					line-height: 39px;
					height: 50px;
					color: #fff;
					text-align: center;
					font-size: 22px;
				}
				.applys-body{
					background: url(../bootstrap/img/content-bodyBg.png) no-repeat;
					background-size: contain;
					padding: 45px;
					.line{
						height: 2px;
						background: #b0c9f1;
					}
					ul{
						padding: 0;
						margin: 0;
						li{
							display: inline-block;
							float: left;
							width: 80px;
							height: 123px;
							margin: 0 20px;
							cursor: pointer;
							text-align: center;
							a{
								color: #fff;
								&:hover{
									text-decoration: none;
								}
								.icon{
									display: block;
									height: 80px;
								}
								.text{
									display: block;
									text-align: center;
									font-size: 16px;
									line-height: 43px;
								}					
							}								
						}
					}
					.system{
						li{
							margin-bottom: 32px;
							&.system0{
								.icon{
									background: url(../bootstrap/img/logo_icons/icon11.png) no-repeat;
								}
							}
							&.system1{
								.icon{
									background: url(../bootstrap/img/logo_icons/icon22.png) no-repeat;
								}					
							}
							&.system2{					
								.icon{
									background: url(../bootstrap/img/logo_icons/icon33.png) no-repeat;
								}					
							}
							&.system3{				
								.icon{
									background: url(../bootstrap/img/logo_icons/icon77.png) no-repeat;
								}							
							}				
						}
					}
					.general{
						li{
							margin-top: 45px;
							&.general0{
								.icon{
									background: url(../bootstrap/img/logo_icons/icon44.png) no-repeat;
								}					
							}
							&.general1{
								.icon{
									background: url(../bootstrap/img/logo_icons/icon66.png) no-repeat;
								}
							}
							&.general2{					
								.icon{
									background: url(../bootstrap/img/logo_icons/icon55.png) no-repeat;
								}					
							}
							&.general3{				
								.icon{
									background: url(../bootstrap/img/logo_icons/icon66.png) no-repeat;
								}							
							}				
						}						
					}
					
				}
			}
			
			.systemInfo{
				background: url(../bootstrap/img/content-infoBg.png) no-repeat;
				position: relative;
				.title{
					font-size: 20px;
					width: 30px;
					height: 100px;
					color: #fff;
					position: absolute;
					top: 30px;
					left: 5px;
					text-align: center;
					line-height: 20px;
				}
				ul{
					margin: 0;
					padding: 0;
					padding-left: 60px;
					padding-right: 50px;
					width: 100%;
					box-sizing: border-box;
					li{
						box-sizing: border-box;
						line-height: 50px;
						font-size: 14px;
						color: #fff;
						border-bottom: 1px solid rgba(255,255,255,.2);
					}
				}
			}
		}

	}
</style>

