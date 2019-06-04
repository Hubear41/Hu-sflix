@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :preview_id, :movie_id, :episode_ids, :show_type, :genre_ids 
        if ( show.poster.attached? )
            json.posterUrl url_for(show.poster)
        else
            json.posterUrl image_url('temp-bg.png')
        end
            
    end
end