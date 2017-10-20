<template>
	<div class="page-content">
	    <div class="page-header position-relative">
	        <div class="header-title">
	            <h1>
	                <i class="fa fa-home"></i>
	                当前位置：节假日管理
	            </h1>
	        </div>
	    </div>
		<div class="page-body">
            <div class="row">
                <div class="col-xs-12 col-md-12">
					<!-- 假日方案 -->
					<div class="zh-almanac" id="id_almanac" data-id="2">
						<div class="hint-bar clearfix">
							<span class="margin-right-5">分类</span>
							<select name="type_code" v-model="holidayType">
								<option value="default">默认</option>
								<template v-for="item in holidaysType">
									<option :value="item.typeCode">{{item.typeDesc}}</option>
								</template>
								
							</select>
							<span class="title-bar" id="GZ"></span>
							<div class="control-bar">
								<div class="control-module year-control">
									<a class="prev" id="nianjian" action="prev" href="javascript:;"></a>
									<div class="control"><i class="trigger"></i>
										<div val="2015" class="field year">2015年</div>
									</div>
									<a class="next" id="nianjia" action="next" href="javascript:;"></a>
									<ul class="list year-list hidden">
									</ul>
								</div>
								<div class="control-module month-control">
									<a class="prev" id="yuejian" action="prev" href="javascript:;"></a>
									<div class="control"><i class="trigger"></i>
										<div val="7" class="field month">7月</div>
									</div>
									<a class="next" id="yuejia"  action="next" href="javascript:;"></a>
									<ul class="list month-list hidden">
									</ul>
								</div>
								<div class="btn-today">当前月</div>
							</div>
						</div>
						<div class="alc-container">
							<div class="left">
								<ul class="dates-hd clearfix">
									<li data-id="6" class="days-title last ">日</li>
									<li data-id="0" class="days-title ">一</li>
									<li data-id="1" class="days-title ">二</li>
									<li data-id="2" class="days-title ">三</li>
									<li data-id="3" class="days-title ">四</li>
									<li data-id="4" class="days-title ">五</li>
									<li data-id="5" class="days-title ">六</li>
								</ul>
								<ol class="dates-bd clearfix">
								</ol>
							</div>
							<div class="right">
								<div class="almanac-tips">
									<div class="dates-bar">
										<span class="date"></span><span class="weekday"></span>
									</div>
									<div class="date-show-panel"></div>
									<div class="desc">
										<div class="lunar"></div>
										<div class="lunar-ganzhi"></div>
										<div class="lunar-term"></div>
									</div>
								</div>
								<div class="almanac-extra clearfix">
									<div class="suited">
										<h3 class="st-label">宜</h3>
										<ul class="st-items clearfix" title="">
										</ul>
									</div>
									<div class="tapu">
										<h3 class="st-label">忌</h3>
										<ul class="st-items clearfix" title="">
										</ul>
									</div>
									<div class="ban hidden">
										<ul class="st-items clearfix" title="">
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- //假日方案 -->
                </div>
            </div>
            <div class="row margin-top-10">
            	<div class="col-xs-12 col-md-12 text-align-center">
            		<router-link :to="'classify/'+ holidayType" class="btn btn-info margin-right-10">查询分类</router-link>
            		<button class="btn btn-danger  margin-right-10" v-on:click="holidayInit">初始化</button>
            		<button type="button" class="btn btn-info" v-on:click="updateHoliday">保存</button>
            	</div>
            </div>
        </div>	
	</div>
</template>

<script>
import '../../bootstrap/js/almanac.js';
export default{
	 data() {
        return {
        	//分类选项typeCode
        	holidayType : 'default',
        	//分类列表
          	holidaysType:[],
        }
    },
    created(){
    	let token = localStorage.getItem('token');
    	//查询节假日分类
        $.get(window.config.api + "/holidaysType/queryList.do?token="+token,{})
        .then(data=>{
            if(!data.success){
                //返回错误状态                    
                return false;
            }
            this.holidaysType = data.obj;
        }); 

    },
	mounted() {
		//日历初始化
		$("#id_almanac").almanac({
		    //单击某一天的事件		     
		    clickDay: function(elem){
		      	var _this = $(elem);
		      	//console.log(_this.html())
		      	//console.log('阳历：' + _this.attr('data-year') + '年' + _this.attr('data-month') + '月' + _this.attr('data-solor'));
		      	if(_this.hasClass("weekend")){
		      		_this.removeClass("weekend");
		      	}else{
		      		_this.addClass('weekend');
		      	}
		      
		    }
		});
		//初始时加载放假日期
		this.refresh();
		//分类切换
		$("select[name='type_code']").on("change", ()=>{
			this.refresh();
		})
		//年份减
		$("#nianjian").on("click", ()=>{
			this.refresh();
		})
		//年份加
		$("#nianjia").on("click", ()=>{
			this.refresh();
		})
		//年份选择
		$(".year-list li").on("click", ()=>{
			this.refresh();
		})
		//月份减
		$("#yuejian").on("click", ()=>{
			this.refresh();
		})
		//月份加
		$("#yuejia").on("click", ()=>{
			this.refresh();
		})
		//月份选择
		$(".month-list li").on("click", ()=>{
			this.refresh();
		})
		//当前月
		$(".btn-today").on("click", ()=>{
			this.refresh();
		})
	},
	methods:{

		refresh(){
			/*let token = localStorage.getItem('token');
			//查询节假日
	        $.get(window.config.api + "/holidays/queryList.do?token="+token,{})
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态                    
	                return false;
	            }
	            //console.log(JSON.stringify(data.obj));
	            let holiday = data.obj;
	            //$("ol[class='dates-bd clearfix'] li").addClass('weekend');
           		$("ol[class='dates-bd clearfix'] li").each(function(i){
	            	//循环日历li，先将之前样式移除
	            	$(this).removeClass('weekend');
	            })

	            $("ol[class='dates-bd clearfix'] li").each(function(i){
				   	let _this = this,
				   		day = this.dataset.solor,
				   		month = this.dataset.month,
				   		year = this.dataset.year;
				   		//console.log(day +'&&'+month +'&&'+ year)
				   	if(day != undefined){
				   		$.each(holiday, function(index,value){
					   		if(value.isHoliday == 0){
						   		if( year == value.year && month == value.month && day == value.day){
						   			console.log(day +'=='+ value.day +'&&'+ month +'=='+ value.month +'&&'+ year +'=='+ value.year);
						   			$(_this).addClass('weekend');
						   			return false;
						   		}
					   		}   		
					   	})
				   	}
				   	
			   	})
				   
	        }); */


	        //console.log(parseInt($("div.year").html()) + '-' + parseInt($("div.month").html()));
	        let token = localStorage.getItem('token');
			//查询节假日
			$.get(window.config.api + "/holidays/queryList.do?token="+token,{isHoliday:'0', typeCode:this.holidayType, year:parseInt($("div.year").html()), month: parseInt($("div.month").html())})
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态                    
	                return false;
	            }

	            let holiday = data.obj;
	            //console.log(JSON.stringify(data))
	            $("ol[class='dates-bd clearfix'] li").each(function(i){
	            	//循环日历li，先将之前样式移除
	            	$(this).removeClass('weekend');
	            })

	            $("ol[class='dates-bd clearfix'] li").each(function(i){
				   	let _this = this,
				   		day = this.dataset.solor;
				   		//month = this.dataset.month,
				   		//year = this.dataset.year;
				   		//console.log(day +'&&'+month +'&&'+ year)
				   	if(day != undefined){
				   		$.each(holiday, function(index,value){
				   			if(day == value.day){
				   				_this.dataset.holidayId = value.holidayId;
				   			}
					   		if(value.isHoliday == 0 && day == value.day){
					   			//console.log(day +'=='+ value.day);
					   			$(_this).addClass('weekend');
					   			return false;
					   		}
					   	})
				   	}
			   	})

	        })
	        
		},
		//对当前年份假期初始化
		holidayInit(){
			let token = localStorage.getItem('token');
	    	//查询节假日分类
	        $.get(window.config.api + "/holidays/init.do?token="+token,{typeCode:this.holidayType, year:parseInt($("div.year").html()) })
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态 
	                //alert(1)                   
	                return false;
	            }
	            $.dialog( data.msg);
	            this.refresh();
	        }); 
		},
		//保存并更新节假日信息
		updateHoliday(){
			let token = localStorage.getItem('token');
			//查询节假日
			$.get(window.config.api + "/holidays/queryList.do?token="+token,{isHoliday:'0', typeCode:this.holidayType, year:parseInt($("div.year").html()), month: parseInt($("div.month").html())})
	        .then(data=>{
	            if(!data.success){
	                //返回错误状态  
	                return false;
	            }
	            //console.log(JSON.stringify(data.obj))
	            if(data.obj == undefined){
					$.dialog("请先初始化该年的节假日数据");
					return false;
	            }

	            let holidayArr = [];
				$("ol[class='dates-bd clearfix'] li").each(function(i){
				   	let day = parseInt(this.dataset.solor);
				   		//month = this.dataset.month,
				   		//year = this.dataset.year;
				   		//console.log(day +'&&'+month +'&&'+ year)
				   	if(day != undefined && $(this).hasClass("weekend")){
				   		holidayArr.push(day);
				   	}
			   	})
			   	//console.log(holidayArr);

				
		    	//保存节假日
		        $.get(window.config.api + "/holidays/updateHoliday.do?token="+token,{days:holidayArr, typeCode:this.holidayType, year:parseInt($("div.year").html()), month: parseInt($("div.month").html())})
		        .then(data=>{
		            if(!data.success){
		                //返回错误状态                    
		                return false;
		            }
		            //console.log(data)
					$.dialog( data.msg);
		            this.refresh();
		        }); 
	        })
	
		}

	}
}
</script>


<style lang="sass">

</style>