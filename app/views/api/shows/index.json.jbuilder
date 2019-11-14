json.shows do
    @shows.each do |show|
        json.set! show.id do 
            json.partial! 'api/shows/show', show: show   
            json.genre_ids show.genre_ids
            json.film_id show.type == "Movie" ? show.film.id : nil
            json.runtime show.type == "Movie" ? show.film.runtime : show.episodes.first.runtime
        end
    end
end

json.genres do 
    @genres.each do |genre|
        json.set! genre.id do
            json.partial! 'api/genres/genre', genre: genre
        end
    end
end

json.videos do 
    @preview_videos.each do |video| 
        json.set! video.id do 
            json.partial! 'api/videos/video', video: video
        end
    end
end