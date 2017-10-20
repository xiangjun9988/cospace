<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="navbar-container clearfix">
                <div class="navbar-header" style="width:214px;">
                    <a href="#" class="navbar-brand nav-hidden">
                        <small v-if="fromdata.type === 'cloud'">
                            <img src="../bootstrap/img/logo_icons/icon1.png">云管理中心
                        </small>
                        <small v-if="fromdata.type === 'application'">
                            <img src="../bootstrap/img/logo_icons/icon3.png">应用管理中心
                        </small>   
                        <small v-if="fromdata.type === 'message'">
                            <img src="../bootstrap/img/logo_icons/icon7.png">消息中心
                        </small>
                        <small v-if="fromdata.type === 'datas'">
                            <img src="../bootstrap/img/logo_icons/icon7.png">云数据中心
                        </small>                       
                    </a>                                                               
                </div>
                <div class="sidebar-collapse" id="sidebar-collapse">
                    <i class="collapse-icon fa fa-bars"></i>
                </div>
                <div class="navbar-header navbar-header-modules">
                    <router-link to="/"><i class="fa fa-arrow-circle-o-left margin-right-5"></i>云平台主界面</router-link>                   
                </div>
                <div class="navbar-header pull-right nav-before">
                    <div class="navbar-account nav-font">
                        <ul class="account-area account-area-right">
                            <li>
                                <a class="login-area dropdown-toggle no-padding-top no-padding-bottom" data-toggle="dropdown">
                                    <section>
                                        <h2><span>您好，{{$store.state.userMap.userName}}</span></h2>
                                        <h2><span>职务：{{$store.state.userMap.userDutyName}}</span></h2>
                                        <h2><span>角色：{{$store.state.userMap.roleName}}</span></h2>
                                        <h2><span>部门：{{$store.state.userMap.deptName}}</span></h2>
                                    </section>
                                    <i class="fa fa-angle-down"></i>
                                </a>
                                <ul class="pull-right dropdown-menu dropdown-arrow dropdown-login-area">
                                    <li class="dropdown-footer text-align-center">
                                        <a href="javascript:;" @click="logout()"><i class="glyphicon glyphicon-off margin-right-5"></i>退出登录</a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass">
.navbar-header-modules a{
    display: block;
    line-height: 90px;
    padding-left: 15px;
    color: #fff;
    font-size: 20px;
    &:hover{
        text-decoration: none;
    }
}
.account-area-right{
    position: absolute;
    top: 0;
    right: 20px;
    .fa-angle-down{
        margin-left: 10px;
        padding-top: 63px;
        font-size: 24px;
        color: #fff;
    }
}
</style>

<script>
export default{
    props: ['fromdata'],
    methods:{
        //退出登录
        logout(){
            $.dialog({
                content:'是否退出系统？',
                ok:function(){
                    let token = localStorage.getItem('token');
                    $.post(window.config.api + "/login/cospaceLoginOut.do?token="+token)            
                    .then(data=>{
                        if(!data.success){
                            //返回错误状态
                            return false;
                        }
                        window.location.href='/#/login';
                    })
                },
                cancel:function(){}
            });  
        }
    }
}
</script>