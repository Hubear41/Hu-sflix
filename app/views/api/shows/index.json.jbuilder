json.shows do
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
end

json.videos do 
    @previewVideos.each do |video| 
        json.set! video.id do 
            json.extract! video, :id, :show_id, :name, :description
            json.videoUrl url_for(video.video_file)
        end
    end
end