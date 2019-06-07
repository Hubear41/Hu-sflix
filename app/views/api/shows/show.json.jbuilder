json.show do
    json.partial! 'api/shows/show', show: @show
end

json.next_show do 
    json.partial! 'api/shows/show', show: @next_show
end

json.video do
    json.extract! @video, :id, :show_id, :name, :runtime, :credits_time
    json.videoUrl url_for(@video.video_file)
end
