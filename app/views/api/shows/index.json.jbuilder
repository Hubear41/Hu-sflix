@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :poster_url, :preview_id, :movie_id, :episode_ids
    end
end