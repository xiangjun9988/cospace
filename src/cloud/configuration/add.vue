<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：流程配置
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="widget-body">
                <h5>流程配置信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">申请单名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="applyName">
                                </div>
                            </div>                        
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">申请单编号<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="applyCode">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">流程<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <select name="process" class="form-control">
                                        <option>请选择</option> 
                                        <option>采集填报申请</option> 
                                        <option>资源申请</option> 
                                        <option>资源授权</option>
                                    </select>
                                </div>
                            </div>                           
							<div class="form-group">
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

