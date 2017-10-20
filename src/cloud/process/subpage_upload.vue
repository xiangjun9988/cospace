<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：流程管理
	            </h1>
	        </div>
	    </div>
        <div class="page-body">
            <div class="widget-body">
                <h5>子页上传</h5>
                <hr class="margin-top-10">              
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">任务ID</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="taskID" value="task1488272639203">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">任务名称</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="taskName" value="开始">
                                </div>
                            </div>  
                            <div class="form-group">
                                <label class="col-lg-3 control-label">应用编码</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="code" value="WISDOMGOV">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">上传文件</label>
                                <div class="col-lg-6 upload">
                                    <input type="file" class="file">
                                    <button class="btn btn-blue" type="button">.cpt文件上传</button>
                                </div>                                
                            </div>                                                       
                            <div class="form-group margin-top-40">
                                <div class="col-lg-offset-3 col-lg-6">
                                   <button class="btn btn-info margin-right-10" type="button">确定</button>
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

<style lang="sass">
.upload{
    position: relative;
    z-index: 0;
    .file{
        position: absolute;
        left: 15px;
        top: 0;
        z-index: 2;        
        width: 100%;
        height: 34px;
        line-height: 34px;
        opacity: 0;
        cursor: pointer;
    }
    .btn{
        position: absolute;
        left: 15px;
        top: 0;
        z-index: 1;
    }
}
</style>