@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :preview_id, :video_ids, :genre_ids, :movie_id, :preview_id, :episode_ids, :show_type
        if ( show.poster.attached? )
            json.posterUrl url_for(show.poster)
        else
            json.posterUrl image_url('temp-bg.png')
        end    
    end
end