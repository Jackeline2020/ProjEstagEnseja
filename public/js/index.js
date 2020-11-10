$(function() {

    $('.next').click(
        function(){
            //alert("testo");
            $(this).addClass("move");}
    )
    new Chart(document.getElementById("doughnut-chart"), {
        type: 'doughnut',
        data: {
          labels: ["F5","Security", "Routing&Switching", "Wifi", "Collaboration"],
          datasets: [
            {
              label: "Analistas",
              backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
              data: [2478,5267,734,784,433]
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