<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：数据源
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="widget-body">
                <h5>数据源信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    	<form class="form-horizontal">
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">数据源名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="sourceName" value="硚口大数据">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="name" value="qkods">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">类型<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <select class="form-control" name="type">
                                        <option>请选择</option>
                                        <option>oracle</option>
                                        <option>mysql</option>
                                        <option>sqlserver</option>
                                    </select>
                                </div>
                            </div>                                                         
                    		<div class="form-group">
                                <label class="col-lg-3 control-label">IP</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="ip" value="10.72.0.79">
                                </div>
                            </div> 
                            <div class="form-group">
                                <label class="col-lg-3 control-label">PORT</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="port" value="3306">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">用户名<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="userName" value="root">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">密码<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="password" value="root1234">
                                </div>
                            </div> 
                            <div class="form-group">
                                <label class="col-lg-3 control-label">数据源描述</label>
                                <div class="col-lg-6">
                                    <textarea name="remark" rows="4" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-lg-offset-3 col-lg-6">
                                   <button class="btn btn-info margin-right-10" type="button">确定</button>
                                    <button class="btn btn-danger margin-right-10" type="button" onclick="history.go(-1);">取消</button>
                                   <button class="btn btn-info" type="button">测试</button>
                               </div>
                            </div>
                        </form> 
                    </div>
                </div> 
            </div>                                 
        </div>	    	    
	</div>
</template>

