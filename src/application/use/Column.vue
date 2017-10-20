<template>
  <div id="total"></div>
</template>

<script>
var Highcharts = require('highcharts');
export default {
    name : "Column",
    data : function() {
      return {
        chartData: {}
      }
    },
    created:function(){
      //获取图表数据
      let token = localStorage.getItem('token');
      $.post(window.config.api + "/appCount/queryAppUseTime.do?token="+token)
      .then(data=>{
          if(!data.success){
              //返回错误状态                    
              return false;
          }
          this.chartData = data.obj;

          var appNames = [];          
          var onlinetimes = [];
          for(var i=0; i<this.chartData.length; i++){
            appNames[i] = this.chartData[i].appName;
            onlinetimes[i] = this.chartData[i].ONLINETIME;            
          }
          
          this.chartData = Highcharts.chart(this.$el, {
              //图标样式
              chart: {
                  type: 'column'
              },
              //主标题
              title: {
                  text: '应用累计使用时间统计表'
              },
              //X轴
              xAxis: {
                  categories: appNames               
              },
              //Y轴
              yAxis: {
                  title: {
                      text: '分钟'
                  }
              },
              //单位
              tooltip: {
                  valueSuffix: '分钟'
              },
              //数据
              series: [{
                  name: '应用',
                  data: onlinetimes
              }]
          })          
      })  
    }
}
</script>