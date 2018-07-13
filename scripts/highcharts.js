//Get stock values
var graphs = 0;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
var company = "&symbol=";
var companyInput;
var key = "&apikey=KHVVP1SVYDH5PPXB";
var urlComplete;
var keySet = [];
var valSet = [];
var keyValSet = [];
var graph = "container";
var graphNum = 0;

$("#button1").click(displayStocks());

$("#input1").keydown(function(key){
  if(key.keyCode === 13){
    displayStocks();
}
});

// $( document ).ajaxComplete(function() {
//   $( ".log" ).text( "Triggered ajaxComplete handler." );
//   graphNum++;
//   if(graphNum === 2){
//     graph = "container2";
// } else if(graph === 3 ){
//     graph = "container3";
// }
// keySet = [];
// valSet = [];
// keyValSet = [];
// });

function displayStocks(){
  companyInput = $("#input1").val().toUpperCase();
  urlComplete = url + company + companyInput + key;

  $.ajax({
    type : "GET",
    async: false,
    url : urlComplete,
    dataType : "json",
    success : function(data) {


      $.each(data, function(index, item) {
        if(index === "Time Series (Daily)"){
          $.each(item, function(key, value) {
            keySet.unshift(key);
            $.each(value, function(property, val) {
              if(property === "4. close"){
                valSet.unshift(val);
            }
        });
            dateSet = keySet;

            for(var i = 0; i < keySet.length; i++){
                var date = new Date(keySet[i]).getTime();
                keyValSet[i] = [date, Number(valSet[i])];
            }

            Highcharts.chart(graph, {
                chart: {
                    zoomType: 'x'
                },
                title: {
                    text: companyInput
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
                    name: companyInput,
                    data: keyValSet
                }]
            }); 
        });
      }
  });
  },
  complete : function() {
      $( ".log" ).text( "Triggered ajaxComplete handler." );
      graphNum++;
      if(graphNum === 2){
        graph = "container2";
    } else if(graph === 3 ){
        graph = "container3";
    }
    keySet = [];
    valSet = [];
    keyValSet = [];
}
});
}
