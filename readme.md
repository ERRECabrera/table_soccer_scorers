Instrucciones para ejecutar la prueba:

1. Ejecutar Bundle install.
   >bundle install

2. Ejecutar el archivo ruby "update_info_players.rb" para generar la información de los jugadores más actual.
   >ruby update_info_players.rb

3. Iniciar en la carpeta un servidor en el puerto 8000.
   >ruby -r webrick -e "s = WEBrick::HTTPServer.new(:Port => 8000, :DocumentRoot => Dir.pwd); trap('INT') { s.shutdown }; s.start"

4. Introducir en el navegagor la url:
   >google-chrome "http://localhost:8000/draw_table_scorers.html"

5. Interactuar con la tabla de jugadores.
   Elija cualquiera de sus encabezados para ordenarlos por cada uno de los diferentes criterios.
