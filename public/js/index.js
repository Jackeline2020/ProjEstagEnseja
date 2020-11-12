$(function() {
  
  var countF5 = 0;
  var countSecurity = 0;
  var countDatacenter = 0;
  var countWifi = 0;
  var countRouting = 0;
  var countCollaboration = 0;

  $(".avg-f5").each(function(){

    if(parseFloat($(this).text()) >= 3){
      countF5 ++;
    }
  });
  $(".avg-security").each(function(){
    if(parseFloat($(this).text()) >= 3){
      countSecurity ++;
    }
  });
  $(".avg-datacenter").each(function(){
    if(parseFloat($(this).text()) >= 3){
      countDatacenter ++;
    }
  });
  $(".avg-wifi").each(function(){
    if(parseFloat($(this).text()) >= 3){
      countWifi ++;
    }
  });
  $(".avg-routing").each(function(){
    if(parseFloat($(this).text()) >= 3){
      countRouting ++;
    }
  });
  $(".avg-collaboration").each(function(){
    if(parseFloat($(this).text()) >= 3){
      countCollaboration ++;

    }
  });
 // var qtdPessoasCompleted = ()

    $('.next').click(
        function(){
            //alert("testo");
            $(this).addClass("move");}
    )
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels: ["F5","Security","Data Center", "Wifi", "Routing&Switching",  "Collaboration"],
          datasets: [
            {
              label: "Analistas",
              backgroundColor: ["#ef4023", "#1dbd45","#2cd5b6","#ffbd53","#001973","#8f00b3"],
              data: [countF5,countSecurity,countDatacenter,countWifi,countRouting,countCollaboration]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Análise do número de profissionais por LoB'
          }
        }
    });
});