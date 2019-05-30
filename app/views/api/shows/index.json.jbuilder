@shows.each do |show|
    json.set! show.id do 
        json.partial! 'api/shows/show_partial', show: show
    end
end