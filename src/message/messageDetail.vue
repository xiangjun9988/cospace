<template>
    <div class="page-content">
        <div class="page-header position-relative">
            <div class="header-title">
                <h1>
                    <i class="fa fa-home"></i>
                    当前位置：我收到的消息 / 消息详情
                </h1>
            </div>
        </div>
        <div class="page-body">
            <div class="widget-body">
                 <ul class="no-padding-left margin-bottom-20">
                    <router-link to="/message/receive" class='btn btn-info'>
                        <i class='glyphicon glyphicon-list margin-right-5'></i>更多消息   
                    </router-link>                  
                </ul>
                <h5>消息详情</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">消息标题：</label>
                                <div class="col-lg-5 col-xs-10">
                                    <div>{{$route.query.messageTitle}}</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">消息内容：</label>
                                <div class="col-lg-5 col-xs-10">
                                    <div>{{$route.query.messageContent}}</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">发送者：</label>
                                <div class="col-lg-5 col-xs-10">
                                    <div>{{$route.query.messageAuthorName}}</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">发送时间：</label>
                                <div class="col-lg-5 col-xs-10">
                                    <div>{{$route.query.sendDate}}</div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">消息来源：</label>
                                <div class="col-lg-5 col-xs-10">
                                    <div>{{$route.query.messageSource}}</div>
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
    components: {
       
    },
    data(){
        return {

        }
    },
    created: function(){
        
     
    },
    mounted: function(){
      
    },
    methods: {
        
        
    }
}
</script>

<style scoped lang="sass">
    label{
        padding-top: 0 !important;
    }
</style>