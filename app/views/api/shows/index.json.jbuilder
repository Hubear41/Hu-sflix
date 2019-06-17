json.shows do
    @shows.each do |show|
        json.set! show.id do 
            json.partial! 'api/shows/show', show: show   
        end
    end
end

json.videos do 
    @previewVideos.each do |video| 
        json.set! video.id do 
            json.partial! 'api/videos/video', video: video
        end
    end
end