@shows.each do |show|
    json.set! show.id do 
        json.extract! show, :id, :title, :tagline, :preview_id, :video_ids, :movie_id, :preview_id, :episode_ids, :show_type, :maturity_rating
        if ( show.poster.attached? )
            json.posterUrl url_for(show.poster)
        else
            json.posterUrl image_url('temp-bg.png')
        end    
    end
end