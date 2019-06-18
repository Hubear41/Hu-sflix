json.shows do
    @shows.each do |show|
        json.set! show.id do 
            json.partial! 'api/shows/show', show: show   
            json.genre_ids show.genre_ids
        end
    end
end

json.genres do 
    @genres.each do |genre|
        json.partial! 'api/genres/genre', genre: genre
    end
end

json.videos do 
    @previewVideos.each do |video| 
        json.set! video.id do 
            json.partial! 'api/videos/video', video: video
        end
    end
end