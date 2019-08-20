json.show do
    json.partial! 'api/shows/show', show: @show
    json.film_id @show.type == "Movie" ? @show.film.id : @show.episodes.first.id
end

json.video do 
    json.partial! 'api/videos/video', video: @video
end
