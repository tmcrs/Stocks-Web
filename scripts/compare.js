//Get stock values
var graphs = 0;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
var company = "&symbol=";
var companyInput1;
var companyInput2;
var key = "&apikey=KHVVP1SVYDH5PPXB";
var urlComplete1;
var urlComplete2;
var keySet1 = [];
var valSet1 = [];
var keyValSet1 = [];
var keySet2 = [];
var valSet2 = [];
var keyValSet2 = [];


$("#button1").click(displayStocks());

$("#input2").keydown(function(key){
  if(key.keyCode === 13){
    displayStocks();
}
});

function displayStocks(){
  companyInput1 = $("#input1").val().toUpperCase();
  companyInput2 = $("#input2").val().toUpperCase();
  urlComplete1 = url + company + companyInput1 + key;
  urlComplete2 = url + company + companyInput2 + key;

  $.ajax({
    type : "GET",
    async: false,
    url : urlComplete1,
    dataType : "json",
    success : function(data) {


      $.each(data, function(index, item) {
        if(index === "Time Series (Daily)"){
          $.each(item, function(key, value) {
            keySet1.unshift(key);
            $.each(value, function(property, val) {
              if(property === "4. close"){
                valSet1.unshift(val);
            }
        });
            dateSet = keySet1;

            for(var i = 0; i < keySet1.length; i++){
                var date = new Date(keySet1[i]).getTime();
                keyValSet1[i] = [date, Number(valSet1[i])];
            }

            Highcharts.chart("compare_container1", {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: companyInput1
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Price'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: companyInput1,
                    data: keyValSet1
                }]
            }); 
        });
      }
  });
  }
});
    $.ajax({
    type : "GET",
    async: false,
    url : urlComplete2,
    dataType : "json",
    success : function(data) {


      $.each(data, function(index, item) {
        if(index === "Time Series (Daily)"){
          $.each(item, function(key, value) {
            keySet2.unshift(key);
            $.each(value, function(property, val) {
              if(property === "4. close"){
                valSet2.unshift(val);
            }
        });
            dateSet = keySet2;

            for(var i = 0; i < keySet2.length; i++){
                var date = new Date(keySet2[i]).getTime();
                keyValSet2[i] = [date, Number(valSet2[i])];
            }

            Highcharts.chart("compare_container2", {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: companyInput2
                },
                subtitle: {
                    text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                },
                xAxis: {
                    type: 'datetime'
                },
                yAxis: {
                    title: {
                        text: 'Price'
                    }
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    area: {
                        fillColor: {
                            linearGradient: {
                                x1: 0,
                                y1: 0,
                                x2: 0,
                                y2: 1
                            },
                            stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                            ]
                        },
                        marker: {
                            radius: 2
                        },
                        lineWidth: 1,
                        states: {
                            hover: {
                                lineWidth: 1
                            }
                        },
                        threshold: null
                    }
                },
                series: [{
                    type: 'area',
                    name: companyInput2,
                    data: keyValSet2
                }]
            }); 
        });
      }
  });
  }
});
}
