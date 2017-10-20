<template>
    <div class="page-body">
        <div class="row">
            <div class="col-xs-12 col-md-12">
				<div id='container'></div>
				<div id="tip"></div>

				<div class="time">
					<span><i class="fa fa-calendar margin-right-5"></i><span id="theDate"></span></span>
					<span class="pull-right"><i class="fa fa-clock-o margin-right-5"></i><span id="theTime"></span></span>					
					<div class="clock">打卡</div>					
				</div>
										                          
            </div>
        </div>
    </div>
</template>

<style>
.navbar .sidebar-collapse{
	left: 165px;
}
#container {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	min-height: 390px;
}
#tip {
	background-color: #fff;
	padding-left: 10px;
	padding-right: 10px;
	position: absolute;
	font-size: 12px;
	right: 10px;
	top: 20px;
	border-radius: 3px;
	border: 1px solid #ccc;
	line-height: 30px;
}
.time{
	position: absolute;
	top: 390px;
	left: 0;
	width: 100%;
	padding: 20px;	
}	
.clock{
	width: 100px;
	height: 100px;
	line-height: 100px;
	margin: 20px auto 0;
	text-align: center;
	font-size: 20px;
	color: #fff;
	font-weight: 700;
	background: #2dc3e8;
	border-radius: 50%;
	-webkit-border-radius: 50%;
	cursor: pointer;
}
</style>

<script>
export default{
   	mounted: function(){
		//高德地图
		let amapScript = document.createElement('script');
		amapScript.src = 'http://webapi.amap.com/maps?v=1.3&key=8325164e247e15eea68b59e89200988b';
		amapScript.onload = function(){
			var map, geolocation;
		    //加载地图，调用浏览器定位服务
		    map = new AMap.Map('container', {
		        resizeEnable: true
		    });
		    map.plugin('AMap.Geolocation', function() {
		        geolocation = new AMap.Geolocation({
		            enableHighAccuracy: true,//是否使用高精度定位，默认:true
		            timeout: 10000,          //超过10秒后停止定位，默认：无穷大
		            buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
		            zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
		            buttonPosition:'RB'
		        });
		        map.addControl(geolocation);
		        geolocation.getCurrentPosition();
		        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
		        AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
		    });
		    //解析定位结果
		    function onComplete(data) {
		        var str=['定位成功'];
		        str.push('经度：' + data.position.getLng());
		        str.push('纬度：' + data.position.getLat());
		        if(data.accuracy){
		             str.push('精度：' + data.accuracy + ' 米');
		        }//如为IP精确定位结果则没有精度信息
		        str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
		        document.getElementById('tip').innerHTML = str.join('<br>');
		    }
		    //解析定位错误信息
		    function onError(data) {
		        document.getElementById('tip').innerHTML = '定位失败';
		    }	    
		}
		document.body.appendChild(amapScript);

		//日期和时间
		var setDay = new  Array ("日", "一", "二", "三", "四", "五", "六");  
		function showDate() {  
			var myDate = new Date();    
			var year = myDate.getFullYear(); //四位整数表示的年份  
			var month = myDate.getMonth(); //月  
			var date = myDate.getDate(); //日  
			var day = myDate.getDay(); //星期  
			var hour = myDate.getHours(); //时  
			var minutes = myDate.getMinutes(); //分  
			var second = myDate.getSeconds(); //秒
			minutes<10?minutes='0'+minutes:minutes; 
			second<10?second='0'+second:second; 
			var theDateStr = year +"年"+ month +"月"+ date+"日 星期"+ setDay[day];
			var theTimeStr = "当前时间："+ hour +":"+ minutes +":"+ second; 
			document.getElementById("theDate"). innerHTML =theDateStr;
			document.getElementById("theTime"). innerHTML =theTimeStr;
			//setTimeout()是在指定的毫秒数后只执行一次函数  
			window.setTimeout( showDate, 500);  
		};
		window.onload = showDate(); 
   	}
}
</script>



