@videos.each do |video|
    json.set! video.id do
        json.extract! video, :id, :show_id, :name, :description
        json.videoUrl url_for(video.video_file)
    end
end