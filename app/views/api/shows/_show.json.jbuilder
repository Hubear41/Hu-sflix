json.extract! show, :id, :title, :director, :tagline, :year, :maturity_rating, :show_type, :genre_ids, :movie_id, :preview_id, :episode_ids
json.posterUrl url_for(show.poster)