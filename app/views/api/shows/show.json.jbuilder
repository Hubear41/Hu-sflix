json.show do
    json.extract! @show, :id, :title, :director, :tagline, :year, :maturity_rating, :show_type, :genre_ids, :movie_id, :preview_id, :episode_ids, :next_show_id
    json.posterUrl url_for(@show.poster)
end

json.video do
    json.extract! @video, :id, :show_id, :name, :runtime, :credits_time
    json.videoUrl url_for(@video.video_file)
end
