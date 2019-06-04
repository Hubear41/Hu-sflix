json.extract! @show, :id, :title, :director, :tagline, :year, :maturity_rating, :preview_id, :movie_id, :episode_ids, :show_type, :genre_ids
json.photoUrl url_for(@show.poster)
