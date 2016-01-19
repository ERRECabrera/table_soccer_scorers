require 'mechanize'
require 'json'
require 'pry'

def get_links_by_href(url,regular_expression)
  agent = Mechanize.new
  page = agent.get(url)
  links = page.links_with(:href => regular_expression )  
end

def get_info_players(links)
  info_html_players = []
  links.each_with_index do |link,index|
    player_page = link.click
    name = player_page.search("div.clearfix dd")[0].text + " " + player_page.search("div.clearfix dd")[1].text 
    img = player_page.search("tr.highlight img").attr('src').value
    game_minutes = player_page.search("td.game-minutes")[0].text.to_i
    goals = player_page.search("td.goals")[0].text.to_i
    goals_x_minute = game_minutes / goals.to_f
    info_html_players << { img: img, all_name: name, game_minutes: game_minutes, goals: goals, goals_x_minute: goals_x_minute.round(1) }
  end
  info_html_players
end

def desc_sort_hash_by_key(hash,key)
  hash.sort_by {|element| element[key]}
end

def save_to_jsonfile(file,var)
  datas = var.to_json
  IO.write(file,datas)
end

links = get_links_by_href("http://es.soccerway.com/national/spain/primera-division/20152016/regular-season/r31781/players/?ICID=PL_3N_04",/^\/players.+\/$/)
info_players = get_info_players(links)
info_players = desc_sort_hash_by_key(info_players,:goals_x_minute)
save_to_jsonfile('info_players.json',info_players)