<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：应用评价 / 回复
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body"> 
                <button type="button" onclick="history.go(-1);" class="btn btn-danger pull-right"><i class="fa fa-arrow-left"></i> 返回 </button>
                <h5>应用评价反馈</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">应用名称：</label>
                                <div class="col-lg-6">
                                   <input type="text" class="form-control" disabled v-model="userEvaluate.appName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">具体菜单：</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" disabled v-model="userEvaluate.moduleName">
                                </div>
                            </div>                            
                            <div class="form-group">
                                <label class="col-lg-3 control-label">满意度：</label>
                                <div class="col-lg-6">
                                   <div class="starts">
                                        <ul id = "pingStar">
                                            <li rel = "1" title = "特别差，给1分"></li>
                                            <li rel = "2" title = "很差，给2分"></li>
                                            <li rel = "3" title = "一般，给3分"></li>
                                            <li rel = "4" title = "很好，给4分"></li>
                                            <li rel = "5" title = "非常好，给5分"></li>
                                            <span id="dir"></span>
                                        </ul>
                                        <input type="hidden" value="" id = "startP" />
                                    </div>
                                </div>
                            </div> 
                            <div class="form-group">
                                <label class="col-lg-3 control-label">内容：</label>
                                <div class="col-lg-6">
                                    <textarea name="explain" rows="4" class="form-control" disabled v-model="userEvaluate.content"></textarea>
                                </div>
                            </div> 
                        </form> 
                    </div>
                </div> 

                <hr class="margin-top-10"> 
                <h5>管理员回复</h5>           
                <div class="row">
                    <div class="col-xs-10 col-xs-push-1">
                        <ul class="adminReply" v-for="item in adminReplyMessage">
                            <li>
                                <h5>{{item.rtimes}}</h5> 
                                <p>{{item.content}}</p>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr class="margin-top-10"> 
                <h5>请在这里回应该反馈</h5>           
                <div class="row">
                    <div class="col-xs-10 col-xs-push-1">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">回复内容：</label>
                                <div class="col-lg-6">
                                    <textarea name="explain" rows="4" class="form-control" v-model="adminReplyContent"></textarea>
                                </div>
                            </div> 
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                   <button class="btn btn-info margin-right-10" type="button" v-on:click="confirm()">提交回复</button>
                                    <button class="btn btn-danger" type="button" onclick="history.go(-1);">取消</button>
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>                                 
        </div> 
    </div>
</template>

<script>

export default{
    data(){
        return {
            //用户评价信息
            userEvaluate: '',
            adminReplyMessage: [],
            adminReplyContent:"",
        }
    },
    created: function(){
        //查询用户提出的原始反馈
        let token = localStorage.getItem('token');
        $.get(window.config.api + "/appRetroaction/findInfoByParams.do?token="+token,{rtype:"1", rstatus:"1", id:this.$route.query.id, appcode:this.$route.query.appcode, appId:this.$route.query.appId})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            //console.log(JSON.stringify(data))
            this.userEvaluate = data.obj;
            setTimeout(()=>{
                this.starts(parseInt(data.obj.star));
            })

        });  
        //查询多条管理员回复的评价
        this.adminReply();
    },
    mounted: function(){
        
    },
    methods: {
        adminReply(){
            //查询多条管理员回复的评价
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/appRetroaction/queryList.do?token="+token,{rtype:"2", rstatus:"1", replyid:this.$route.query.id})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    return false;
                }
                //console.log(JSON.stringify(data))
                this.adminReplyMessage = data.obj;
            }); 
        },
        confirm(){
            //管理员回复
            let token = localStorage.getItem('token');
            $.get(window.config.api + "/appRetroaction/save.do?token="+token,{rtype:"2", replyid:this.$route.query.id, content:this.adminReplyContent})
            .then(data=>{
                if(!data.success){
                    //返回错误状态
                    return false;
                }
                $.dialog(data.msg);
                this.adminReplyContent = "";
                this.adminReply();
            }); 
                            
        },
        starts(i){
            var s = document.getElementById("pingStar"),
                m = document.getElementById("dir"),
                n = s.getElementsByTagName("li"),
                input = document.getElementById("startP");//保存所选值

            for(var j = 0;j < i;j++){
                n[j].className = "on";
            }
            m.innerHTML = n[i-1].getAttribute("title");
        }
    }
}
</script>

<style scoped lang="sass">
.adminReply{
    li{
        list-style:none;
        padding-bottom: 5px;
        border-bottom: dotted 2px #e5e5e5;
    }
}

.starts ul{
    float:left;
    padding-left: 0 !important;
}
.starts ul li{
    list-style: none;
    width:32px;
    height:21px;
    float:left;
    background:url(images/stark2.png) no-repeat;
    
}
.starts ul li.on{
    background:url(images/stars2.png) no-repeat;
}
.starts ul span{
    display:inline;
    float:left;
    padding-left:10px;
    height:21px;
    line-height:21px;
}
</style>