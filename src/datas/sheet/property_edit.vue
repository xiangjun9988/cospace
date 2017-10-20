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
                <h5>编辑属性信息</h5>
                <hr class="margin-top-10">            
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <form class="form-horizontal">
                            <div class="form-group">
                                <label class="col-lg-3 control-label">中文名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="chineseName" value="营业收入（元）">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">字段名称<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="fieldName" value="yysr">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">数据类型<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <select class="form-control" name="fieldType">
                                        <option>请选择</option>
                                        <option>tinyint</option>
                                        <option>smallint</option>
                                        <option>mediumint</option>
                                    </select>                                    
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">字段长度<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="length" value="30">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">主键<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <select name="isKey" class="form-control">
                                        <option>请选择</option> 
                                        <option>是</option>
                                        <option>否</option> 
                                    </select>                                    
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">允许为空<span class="red margin-left-5">*</span></label>
                                <div class="col-lg-6">
                                    <select name="isEmpty" class="form-control">
                                        <option>请选择</option> 
                                        <option>允许</option>
                                        <option>不允许</option> 
                                    </select>                                    
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">默认值</label>
                                <div class="col-lg-6">
                                    <input type="text" class="form-control" name="default">
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-lg-3 control-label">注释</label>
                                <div class="col-lg-6">
                                    <textarea class="form-control" name="note" rows="4"></textarea>
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

