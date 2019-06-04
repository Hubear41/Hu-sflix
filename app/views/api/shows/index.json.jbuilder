@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :poster_url, :poster , :preview_id, :movie_id, :episode_ids, :show_type, :genre_ids 
    end
end