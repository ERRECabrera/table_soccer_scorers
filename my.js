function readJsonFile(file){
    var datas = null;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function (){
      if(rawFile.readyState === 4)
      {
          if(rawFile.status === 200 || rawFile.status == 0)
          {
              datas = rawFile.responseText;
          }
      }
    }
    rawFile.send(null);
    return datas;
}

function add_player(img,all_name,game_minutes,goals,goals_x_minute){
  var table_row = "<tr><th  class='text-center'><img src=" +img+ "></th><th>" +all_name+ "</th><th  class='text-center'>" +game_minutes+ "</th><th  class='text-center'>" +goals+ "</th><th  class='text-center'>" +goals_x_minute+ "</th></tr>";
  return table_row;
}

function draw_elements_table(datas){
  datas.forEach(function(player){
    $('#table_js tbody').append(add_player(player.img,player.all_name,player.game_minutes,player.goals,player.goals_x_minute));
  });
}

function sort_elements_by_key(datas,key){
  datas.sort(function(element_a,element_b){
    if (element_a[key] > element_b[key]) {
      return 1;
    }
    if (element_a[key] < element_b[key]) {
      return -1;
    }
    return 0;
  });
}

$(document).on('ready',function(){
  var info = JSON.parse(readJsonFile("http://localhost:8000/info_players.json"));
  draw_elements_table(info);
  $('thead').click(function(event){
    var key = $(event.target).data('key');
    $('#table_js tbody').empty();
    sort_elements_by_key(info,key);
    if (key == 'goals' || key == 'game_minutes') { info.reverse() };
    draw_elements_table(info);
  });
})