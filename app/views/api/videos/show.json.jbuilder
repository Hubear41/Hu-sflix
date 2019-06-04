json.extract! @video, :id, :show_id, :name, :description, :runtime, :credits_time
json.videoUrl url_for(@video.video_file)
# json.coverUrl url_for(@video.cover_image)