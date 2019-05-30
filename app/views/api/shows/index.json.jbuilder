@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :poster_url
    end
end