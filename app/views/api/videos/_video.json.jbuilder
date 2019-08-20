json.extract! video, :id, :show_id, :name, :description, :runtime, :type
json.videoUrl url_for(video.video_file)