<template>
	<div class="wrap">
        <!-- Loading Container 
        <div class="loading-container">
            <div class="loading-progress">
                <img width="40" height="40" src="../bootstrap/img/loading.gif">
            </div>
        </div>        
        /Loading Container --> 
                       
		<router-view></router-view>
	</div>
</template>

<script>
export default{
    created(){
        //如果用户已经登录
        //生成一个用户data
        //传下去
        this.$store.commit('SAVE_USER', {});
        //获取存储的变量token的值
        let token = localStorage.getItem('token');
        if(token){
            //发送请求用户登录信息接口拿到用户真实信息
            //如果后端能返回当前用户的登录信息则无需重复登录
            //如果后端返回失效的登录信息则跳转到登录页重新登录
            $.post(window.config.api + "/login/getUserInfoByToken.do?token="+token)
            .then(data=>{
                if(!data.success){
                    this.$router.push({path: '/login'});
                    return false;
                }
                data.obj.userMap.roleName = data.obj.roleList.length ? data.obj.roleList[0].roleName : "";
                //通过vuex修改页面标题
                this.$store.commit('SAVE_USER', data.obj.userMap);
            }); 
        }
        else{            
            if(!/^\#\/(login|password)/.test(window.location.hash)){
                this.$router.push({path: '/login'});
            }
        } 

        if(window.location.hash != "#/login"){
            //判断token是否有效
            $.post(window.config.api + "/login/checkToken.do?token="+token)
            .then(data=>{
                if(!data.success){
                    $.dialog('登录鉴权超时,访问令牌无效,请重新登录！')
                    this.$router.push({path: '/login'});
                    return false
                }
            }); 
        }
        
    }
}
</script>