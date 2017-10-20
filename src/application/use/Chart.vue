<template>
  <div id="everyMonth"></div>
</template>

<script>
var Highcharts = require('highcharts');
export default {
    name : "Chart",
    data : function() {
      return {
        chartData: {}
      }
    },
    created:function(){
      //获取图表数据
      let token = localStorage.getItem('token');
      //获取月份
      var date = new Date();
      var month = date.getMonth()+1;
      var nowYearMonth = new Array();
      var nowYearMonth_zh = new Array();
      for(var i = 1;i<=month;i++){
        nowYearMonth[i-1] = i;
        nowYearMonth_zh[i-1] = i + "月";
      }

      $.post(window.config.api + "/appCount/queryAppUseTime.do?token="+token,{nowYearMonth:nowYearMonth})
      .then(data=>{
          if(!data.success){
              //返回错误状态                    
              return false;
          }
          this.chartData = data.obj;       

          this.chartData = Highcharts.chart(this.$el, {
              title: {
                text: '应用各月时间统计表（本年）',
                x: -20 //center
              },
              xAxis: {
                categories: nowYearMonth_zh
              },
              yAxis: {
                title: {
                  text: '分钟'
                },
                plotLines: [{
                  value: 0,
                  width: 1,
                  color: '#808080'
                }]
              },
              tooltip: {
                valueSuffix: '分钟'
              },
              legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
              },
              series: data.obj                                  
          })           
      }) 
    }
}
</script>