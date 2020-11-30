require 'csv'
require 'json'


data = {
  fields: [
    {name: 'Type', format: '', type: 'string'},
    {name: 'Name', format: '', type: 'string'},
    {name: 'latitude', format: '', type: 'integer'},
    {name: 'longitude', format: '', type: 'integer'},
    {name: 'Rooms', format: '', type: 'integer'},
  ],
  rows: []
}

CSV.foreach("geo.csv", {headers: true}) do |row|
  data[:rows] << [
    row["Type"].to_s,
    row["Name"].to_s,
    row["latitude"].to_f,
    row["longitude"].to_f,
    row["Rooms"].to_i
  
end

File.open("geo.json", "w") do |file|
  file.puts data.to_json
end