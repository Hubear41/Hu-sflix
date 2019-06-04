@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :preview_id, :movie_id, :episode_ids, :show_type, :genre_ids 
        json.photoUrl url_for(show.poster)
    end
end