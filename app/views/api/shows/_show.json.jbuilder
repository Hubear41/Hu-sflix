json.extract! show, :id, :title, :director, :tagline, :year, :maturity_rating, :show_type, :genre_ids, :movie_id, :preview_id, :episode_ids
json.nextShowId show.next_show.id
json.posterUrl url_for(show.poster)