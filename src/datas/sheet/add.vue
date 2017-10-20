<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据表
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="widget-body">
                <h5>数据表信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<form class="form-horizontal">
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">数据源<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="source" value="硚口大数据">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">中文名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="chineseName">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">英文名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="englishName">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                   <button class="btn btn-info margin-right-10" type="button">确定</button>
                                    <button class="btn btn-danger margin-right-10" type="button" onclick="history.go(-1);">取消</button>
                               </div>
                            </div>
                        </form> 
                    </div>
                </div> 
            </div>                                 
        </div>	    	    
	</div>
</template>

