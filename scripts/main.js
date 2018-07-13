//Get stock values
var graphs = 0;
var url = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY";
var company = "&symbol=";
var companyInput;
var key = "&apikey=KHVVP1SVYDH5PPXB";
var urlComplete;
var keySet = [];
var valSet = [];
// var data;
var canvas1 = $("#myChart1");
var canvas2 = $("#myChart2");
var canvas3 = $("#myChart3");
var options = {
  responsive: true
};

$("#button1").click(displayStocks());

$("#input1").keydown(function(key){
  if(key.keyCode === 13){
    displayStocks();
  }
});

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

            var data = {
              labels: keySet,
              datasets: [
              {
                label: companyInput,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 0,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1.5,
                pointHitRadius: 2,
                data: valSet
              }
              ]
            };
            if(graphs === 1) {
              var myLineChart1 = new Chart(canvas1, {
                type: 'line',
                data: data,
                options: options
              });
            } else if (graphs === 2) {
              var myLineChart2 = new Chart(canvas2, {
                type: 'line',
                data: data,
                options: options
              });
            } else if (graphs === 3){
              var myLineChart3 = new Chart(canvas3, {
                type: 'line',
                data: data,
                options: options
              });
            }

          });
        }
      });
    }
  }).done(function() {
    graphs++;
  });
}